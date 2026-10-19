"use client";

/* eslint-disable react-hooks/immutability */

import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import type { ModelConfig } from "./replay";

interface Props {
  active: boolean;
  /** Radians — plate pitch (inner Z). */
  tiltX: number;
  /** Radians — plate roll (outer X). */
  tiltY: number;
  resetKey: number;
  onReady: () => void;
  onError: () => void;
  onStatus: (status: string) => void;
}

interface Assets {
  scene: THREE.Group;
  config: ModelConfig;
  ballRadius: number;
}

const base = "/models/ball-on-plate/";
const G = 9.81;
const DAMPING = 0.45;
/** Soft bounce against the plate rim so the ball can roll back when tilted. */
const WALL_RESTITUTION = 0.35;
/** Dark CAD scrap wrongly parented under the tilt rig. */
const HIDE_TILT_SCRAP = ["TiltInner_2"];
const TRAIL_LEN = 80;
const DEFAULT_BALL_RADIUS = 0.02;

function disposeScene(scene: THREE.Object3D) {
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      for (const material of Array.isArray(object.material)
        ? object.material
        : [object.material]) {
        material.dispose();
      }
    }
  });
}

function hideTiltScrap(scene: THREE.Group) {
  for (const name of HIDE_TILT_SCRAP) {
    const obj = scene.getObjectByName(name);
    if (obj) obj.visible = false;
  }
}

function World({
  assets,
  active,
  tiltX,
  tiltY,
  resetKey,
  onReady,
  onStatus,
}: Props & { assets: Assets }) {
  const { camera, invalidate } = useThree();
  const ball = useRef<THREE.Mesh>(null);
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const history = useRef<{ x: number; y: number }[]>([]);
  const lastTick = useRef<number | null>(null);
  const lastSample = useRef(0);
  const statusRef = useRef(onStatus);
  const readyRef = useRef(onReady);

  useEffect(() => {
    statusRef.current = onStatus;
    readyRef.current = onReady;
  }, [onStatus, onReady]);

  const outer = useMemo(
    () => assets.scene.getObjectByName("TiltOuter")!,
    [assets]
  );
  const inner = useMemo(
    () => assets.scene.getObjectByName("TiltInner")!,
    [assets]
  );
  const trail = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(TRAIL_LEN * 3), 3)
    );
    geometry.setDrawRange(0, 0);
    return new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({
        color: "#2563eb",
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        depthTest: false,
      })
    );
  }, []);
  const trailDots = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(24 * 3), 3)
    );
    geometry.setDrawRange(0, 0);
    return new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: "#1d4ed8",
        size: 0.012,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        depthTest: false,
      })
    );
  }, []);
  const { config, ballRadius } = assets;
  const halfX = config.plateSize[0] / 2 - ballRadius;
  const halfY = config.plateSize[1] / 2 - ballRadius;
  const center = config.plateCenter.map(
    (v, i) => v - config.innerPivot[i]
  ) as [number, number, number];
  const plateY = center[1] + 0.004;
  const plateThickness = 0.014;
  const surfaceY = plateY + plateThickness / 2;
  const markY = surfaceY + 0.004;

  useEffect(() => {
    camera.position.fromArray(config.camera);
    camera.lookAt(
      config.target[0],
      config.target[1],
      config.target[2]
    );
    readyRef.current();
    invalidate();
  }, [camera, config, invalidate]);

  useEffect(() => {
    lastTick.current = null;
    if (active) invalidate();
  }, [active, invalidate]);

  useEffect(() => {
    pos.current = { x: 0, y: 0 };
    vel.current = { x: 0, y: 0 };
    history.current = [{ x: 0, y: 0 }];
    lastTick.current = null;
    lastSample.current = 0;
    trail.geometry.setDrawRange(0, 0);
    trailDots.geometry.setDrawRange(0, 0);
    statusRef.current("Ball centered. Move the mouse over the machine to tilt.");
    invalidate();
  }, [resetKey, invalidate, trail, trailDots]);

  useEffect(() => {
    invalidate();
  }, [tiltX, tiltY, invalidate]);

  useEffect(
    () => () => {
      trail.geometry.dispose();
      trail.material.dispose();
      trailDots.geometry.dispose();
      trailDots.material.dispose();
    },
    [trail, trailDots]
  );

  useFrame(() => {
    // Same CAD rig convention as the SAC replay viewer.
    outer.rotation.x = -tiltY;
    inner.rotation.z = -tiltX;

    const now = performance.now();
    if (active) {
      const dt =
        lastTick.current === null
          ? 0
          : Math.min((now - lastTick.current) / 1000, 0.05);
      lastTick.current = now;

      if (dt > 0) {
        const ax = G * Math.sin(tiltY);
        const ay = -G * Math.sin(tiltX);
        vel.current.x += ax * dt;
        vel.current.y += ay * dt;
        const damp = Math.exp(-DAMPING * dt);
        vel.current.x *= damp;
        vel.current.y *= damp;
        pos.current.x += vel.current.x * dt;
        pos.current.y += vel.current.y * dt;

        // Keep the ball on the plate: bounce off the rim instead of freezing.
        if (pos.current.x > halfX) {
          pos.current.x = halfX;
          vel.current.x = -Math.abs(vel.current.x) * WALL_RESTITUTION;
        } else if (pos.current.x < -halfX) {
          pos.current.x = -halfX;
          vel.current.x = Math.abs(vel.current.x) * WALL_RESTITUTION;
        }
        if (pos.current.y > halfY) {
          pos.current.y = halfY;
          vel.current.y = -Math.abs(vel.current.y) * WALL_RESTITUTION;
        } else if (pos.current.y < -halfY) {
          pos.current.y = -halfY;
          vel.current.y = Math.abs(vel.current.y) * WALL_RESTITUTION;
        }

        lastSample.current += dt;
        if (lastSample.current >= 1 / 30) {
          lastSample.current = 0;
          history.current.push({ x: pos.current.x, y: pos.current.y });
          if (history.current.length > TRAIL_LEN) history.current.shift();
        }

        if (Math.abs(tiltX) < 1e-4 && Math.abs(tiltY) < 1e-4) {
          const speed = Math.hypot(vel.current.x, vel.current.y);
          if (speed < 0.01) {
            vel.current = { x: 0, y: 0 };
            statusRef.current("Plate level. Move the mouse to tilt.");
          } else {
            statusRef.current("Ball rolling…");
          }
        } else {
          statusRef.current("Tilting — ball keeps moving freely.");
        }
      }
    } else {
      lastTick.current = null;
    }

    ball.current?.position.set(
      center[0] + pos.current.x,
      surfaceY + ballRadius,
      center[2] - pos.current.y
    );

    const path = history.current;
    const linePos = trail.geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < path.length; i++) {
      linePos.setXYZ(
        i,
        center[0] + path[i].x,
        markY,
        center[2] - path[i].y
      );
    }
    linePos.needsUpdate = true;
    trail.geometry.setDrawRange(0, path.length);

    const dotCount = Math.min(24, path.length);
    const dots = trailDots.geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < dotCount; i++) {
      const idx =
        path.length === 1
          ? 0
          : Math.round((i / Math.max(1, dotCount - 1)) * (path.length - 1));
      dots.setXYZ(
        i,
        center[0] + path[idx].x,
        markY + 0.001,
        center[2] - path[idx].y
      );
    }
    dots.needsUpdate = true;
    trailDots.geometry.setDrawRange(0, dotCount);

    if (active) invalidate();
  });

  return (
    <>
      <hemisphereLight args={["#f8fafc", "#94a3b8", 2.1]} />
      <directionalLight position={[2, 4, 3]} intensity={2.8} />
      <directionalLight position={[-2, 1, -2]} intensity={1.1} />
      <primitive object={assets.scene} />
      {createPortal(
        <>
          <mesh position={[center[0], plateY, center[2]]} renderOrder={2}>
            <boxGeometry args={[config.plateSize[0], plateThickness, config.plateSize[1]]} />
            <meshStandardMaterial
              color="#e2e8f0"
              roughness={0.72}
              metalness={0.08}
              polygonOffset
              polygonOffsetFactor={-2}
              polygonOffsetUnits={-2}
            />
          </mesh>
          <mesh ref={ball} renderOrder={4}>
            <sphereGeometry args={[ballRadius, 28, 20]} />
            <meshStandardMaterial color="#1e293b" metalness={0.55} roughness={0.28} />
          </mesh>
          <primitive object={trail} frustumCulled={false} renderOrder={5} />
          <primitive object={trailDots} frustumCulled={false} renderOrder={6} />
        </>,
        inner
      )}
    </>
  );
}

export default function BallOnPlatePlaygroundScene(props: Props) {
  const [assets, setAssets] = useState<Assets | null>(null);
  const onError = useRef(props.onError);
  useEffect(() => {
    onError.current = props.onError;
  }, [props.onError]);

  useEffect(() => {
    let cancelled = false;
    let loaded: THREE.Group | undefined;
    const abort = new AbortController();
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    Promise.all([
      loader.loadAsync(base + "model.glb"),
      fetch(base + "model-config.json", { signal: abort.signal }).then((r) => {
        if (!r.ok) throw new Error("config missing");
        return r.json();
      }),
      fetch(base + "replay.json", { signal: abort.signal })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ])
      .then(([gltf, config, replay]) => {
        loaded = gltf.scene;
        if (cancelled) {
          disposeScene(loaded);
          return;
        }
        if (
          !loaded.getObjectByName("TiltOuter") ||
          !loaded.getObjectByName("TiltInner")
        ) {
          throw new Error("Missing model rig");
        }
        hideTiltScrap(loaded);
        const ballRadius =
          typeof replay?.ballRadius === "number" && replay.ballRadius > 0
            ? replay.ballRadius
            : DEFAULT_BALL_RADIUS;
        setAssets({ scene: loaded, config, ballRadius });
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Ball-on-Plate playground failed to load:", error);
          onError.current();
        }
      });

    return () => {
      cancelled = true;
      abort.abort();
      if (loaded) disposeScene(loaded);
    };
  }, []);

  if (!assets) return null;

  return (
    <div className="bop-canvas">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: assets.config.camera, fov: 38, near: 0.01, far: 20 }}
        gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#f1f5f9");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
      >
        <World assets={assets} {...props} />
      </Canvas>
    </div>
  );
}
