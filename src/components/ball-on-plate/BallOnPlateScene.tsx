"use client";

/* Three.js scene objects are intentionally mutated by effects and the render loop. */
/* eslint-disable react-hooks/immutability */

import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { sampleReplay, samplePolicy, validateReplay, type PolicySample, type Replay, type ModelConfig } from './replay';

interface Props {
  active: boolean; playing: boolean; restart: number; resetCamera: number; mobile: boolean;
  onReady: (scaled: boolean) => void; onProgress: (time: number) => void; onPolicy: (sample: PolicySample) => void;
  onEnd: () => void; onError: () => void;
}
interface Assets { scene: THREE.Group; replay: Replay; config: ModelConfig }
const base = '/models/ball-on-plate/';
/** Dark CAD scrap wrongly parented under the tilt rig — hide it (detach alone still looked wrong). */
const HIDE_TILT_SCRAP = ['TiltInner_2'];

function disposeScene(scene: THREE.Object3D) {
  scene.traverse(object => { if (object instanceof THREE.Mesh) {
    object.geometry.dispose();
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) material.dispose();
  } });
}

function hideTiltScrap(scene: THREE.Group) {
  for (const name of HIDE_TILT_SCRAP) {
    const obj = scene.getObjectByName(name);
    if (obj) obj.visible = false;
  }
}
function World({ assets, ...props }: Props & { assets: Assets }) {
  const { camera, gl, invalidate } = useThree();
  const callbacks = useRef(props);
  useEffect(() => { callbacks.current = props; });
  const controls = useRef<OrbitControls | null>(null);
  const time = useRef(0);
  const lastReport = useRef(-1);
  const lastTick = useRef<number | null>(null);
  const ball = useRef<THREE.Mesh>(null);
  const target = useRef<THREE.Mesh>(null);
  const trail = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(61 * 3), 3));
    return new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color: '#2563eb', transparent: true, opacity: 0.85, depthWrite: false, depthTest: false,
    }));
  }, []);
  const trailDots = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12 * 3), 3));
    return new THREE.Points(geometry, new THREE.PointsMaterial({
      color: '#1d4ed8', size: 0.012, sizeAttenuation: true, transparent: true, opacity: 0.95,
      depthWrite: false, depthTest: false,
    }));
  }, []);
  const outer = useMemo(() => assets.scene.getObjectByName('TiltOuter')!, [assets]);
  const inner = useMemo(() => assets.scene.getObjectByName('TiltInner')!, [assets]);
  const { config, replay } = assets;
  const scaleX = config.plateSize[0] / replay.plateSize[0];
  const scaleY = config.plateSize[1] / replay.plateSize[1];
  const center = config.plateCenter.map((v, i) => v - config.innerPivot[i]) as [number, number, number];

  useEffect(() => {
    const control = new OrbitControls(camera, gl.domElement);
    controls.current = control;
    control.target.fromArray(config.target);
    control.enablePan = false; control.enableDamping = false;
    control.minDistance = 1.1; control.maxDistance = 3.5;
    control.minPolarAngle = 0.18; control.maxPolarAngle = Math.PI * 0.48;
    control.touches.ONE = THREE.TOUCH.ROTATE;
    control.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    // Vertical gestures scroll the page; horizontal gestures orbit the model.
    gl.domElement.style.touchAction = 'pan-y';
    gl.domElement.tabIndex = 0;
    gl.domElement.setAttribute('aria-label', '3D model. Arrow keys rotate; plus and minus zoom.');
    const keyboard = (event: KeyboardEvent) => {
      if (!control.enabled || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '-', '='].includes(event.key)) return;
      event.preventDefault();
      const offset = camera.position.clone().sub(control.target);
      const spherical = new THREE.Spherical().setFromVector3(offset);
      if (event.key === 'ArrowLeft') spherical.theta -= 0.12;
      if (event.key === 'ArrowRight') spherical.theta += 0.12;
      if (event.key === 'ArrowUp') spherical.phi -= 0.12;
      if (event.key === 'ArrowDown') spherical.phi += 0.12;
      if (event.key === '+' || event.key === '=') spherical.radius *= 0.9;
      if (event.key === '-') spherical.radius *= 1.1;
      spherical.phi = THREE.MathUtils.clamp(spherical.phi, control.minPolarAngle, control.maxPolarAngle);
      spherical.radius = THREE.MathUtils.clamp(spherical.radius, control.minDistance, control.maxDistance);
      camera.position.copy(control.target).add(new THREE.Vector3().setFromSpherical(spherical));
      control.update(); invalidate();
    };
    gl.domElement.addEventListener('keydown', keyboard);
    const changed = () => invalidate();
    control.addEventListener('change', changed);
    control.update();
    let recoveryTimer: ReturnType<typeof setTimeout> | undefined;
    const lost = (event: Event) => {
      event.preventDefault(); lastTick.current = null;
      recoveryTimer = setTimeout(() => { if (gl.getContext().isContextLost()) callbacks.current.onError(); }, 4000);
    };
    const restored = () => { clearTimeout(recoveryTimer); lastTick.current = null; invalidate(); };
    gl.domElement.addEventListener('webglcontextrestored', restored);
    gl.domElement.addEventListener('webglcontextlost', lost);
    callbacks.current.onReady(Math.abs(scaleX - 1) > 0.01 || Math.abs(scaleY - 1) > 0.01);
    return () => { clearTimeout(recoveryTimer); control.dispose(); gl.domElement.removeEventListener('webglcontextrestored', restored); gl.domElement.removeEventListener('webglcontextlost', lost); gl.domElement.removeEventListener('keydown', keyboard); };
  }, [camera, gl, invalidate, config, scaleX, scaleY]);
  useEffect(() => {
    const eye = new THREE.Vector3().fromArray(config.camera);
    const lookAt = new THREE.Vector3().fromArray(config.target);
    if (props.mobile) eye.sub(lookAt).multiplyScalar(1.15).add(lookAt);
    camera.position.copy(eye);
    controls.current?.target.fromArray(config.target);
    controls.current?.update(); invalidate();
  }, [props.resetCamera, props.mobile, camera, config, invalidate]);
  useEffect(() => { time.current = 0; lastReport.current = -1; lastTick.current = null; invalidate(); }, [props.restart, invalidate]);
  useEffect(() => {
    if (controls.current) controls.current.enabled = props.active;
    lastTick.current = null;
    if (props.active) invalidate();
  }, [props.active, props.playing, invalidate]);
  useEffect(() => () => {
    trail.geometry.dispose(); trail.material.dispose();
    trailDots.geometry.dispose(); trailDots.material.dispose();
  }, [trail, trailDots]);
  // Plate sits slightly above CAD frame geometry so backside parts don't bleed through.
  const plateY = center[1] + 0.004;
  const plateThickness = 0.014;
  const surfaceY = plateY + plateThickness / 2;
  const markY = surfaceY + 0.004;

  useFrame(() => {
    const now = performance.now();
    if (props.active && props.playing) {
      if (lastTick.current !== null) {
        time.current += Math.min((now - lastTick.current) / 1000, 0.1);
        if (time.current >= replay.duration) time.current %= replay.duration;
      }
      lastTick.current = now;
    } else lastTick.current = null;
    const f = sampleReplay(replay, time.current);
    // CAD rig: outer rotates about world X, inner about its local Z.
    outer.rotation.x = -f[4]; inner.rotation.z = -f[3];
    ball.current?.position.set(center[0] + f[1] * scaleX, surfaceY + replay.ballRadius, center[2] - f[2] * scaleY);
    target.current?.position.set(center[0] + f[5] * scaleX, markY, center[2] - f[6] * scaleY);
    const positions = trail.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i <= 60; i++) {
      const point = sampleReplay(replay, Math.max(0, time.current - 2 + i / 30));
      positions.setXYZ(i, center[0] + point[1] * scaleX, markY, center[2] - point[2] * scaleY);
    }
    positions.needsUpdate = true;
    const dots = trailDots.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < 12; i++) {
      const point = sampleReplay(replay, Math.max(0, time.current - 2 + i * (2 / 11)));
      dots.setXYZ(i, center[0] + point[1] * scaleX, markY + 0.001, center[2] - point[2] * scaleY);
    }
    dots.needsUpdate = true;
    if (time.current - lastReport.current >= 0.1 || time.current < lastReport.current) {
      callbacks.current.onPolicy(samplePolicy(replay, time.current));
      callbacks.current.onProgress(time.current); lastReport.current = time.current;
    }
    if (props.active && props.playing) invalidate();
  });
  return <>
    <hemisphereLight args={['#f8fafc', '#94a3b8', 2.1]} />
    <directionalLight position={[2, 4, 3]} intensity={2.8} />
    <directionalLight position={[-2, 1, -2]} intensity={1.1} />
    <primitive object={assets.scene} />
    {/* Attach overlays to the inner frame so all motion shares the real pivot. */}
    {createPortal(<>
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
      <mesh ref={ball} renderOrder={4}><sphereGeometry args={[replay.ballRadius, 28, 20]} /><meshStandardMaterial color="#1e293b" metalness={0.55} roughness={0.28} /></mesh>
      <mesh ref={target} rotation={[-Math.PI / 2, 0, 0]} renderOrder={5}>
        <ringGeometry args={[0.017, 0.022, 40]} />
        <meshBasicMaterial color="#2563eb" side={THREE.DoubleSide} depthWrite={false} depthTest={false} />
      </mesh>
      <primitive object={trail} frustumCulled={false} renderOrder={5} />
      <primitive object={trailDots} frustumCulled={false} renderOrder={6} />
    </>, inner)}
    <mesh position={[config.target[0], config.floor - 0.002, config.target[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.25, 1.25]} /><meshBasicMaterial transparent opacity={0.18} map={shadowTexture()} depthWrite={false} />
    </mesh>
  </>;
}
let shadow: THREE.CanvasTexture | undefined;
function shadowTexture() {
  if (shadow) return shadow;
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(64, 64, 12, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(30,41,59,0.45)'); gradient.addColorStop(1, 'rgba(30,41,59,0)');
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 128);
  shadow = new THREE.CanvasTexture(canvas); return shadow;
}
export default function BallOnPlateScene(props: Props) {
  const [assets, setAssets] = useState<Assets | null>(null);
  const onError = useRef(props.onError);
  useEffect(() => { onError.current = props.onError; }, [props.onError]);
  useEffect(() => {
    let cancelled = false, loaded: THREE.Group | undefined;
    const abort = new AbortController();
    const loadJSON = async (name: string) => {
      const response = await fetch(base + name, { signal: abort.signal });
      if (!response.ok) throw new Error('Asset unavailable'); return response.json();
    };
    const loader = new GLTFLoader(); loader.setMeshoptDecoder(MeshoptDecoder);
    Promise.all([loader.loadAsync(base + 'model.glb'), loadJSON('replay.json'), loadJSON('model-config.json')])
      .then(([gltf, replay, config]) => {
        loaded = gltf.scene;
        if (cancelled) { disposeScene(loaded); return; }
        if (!loaded.getObjectByName('TiltOuter') || !loaded.getObjectByName('TiltInner')) throw new Error('Missing model rig');
        hideTiltScrap(loaded);
        setAssets({ scene: loaded, replay: validateReplay(replay), config });
      }).catch(error => { if (!cancelled) { console.error('Ball-on-Plate assets could not be loaded:', error); onError.current(); } });
    return () => { cancelled = true; abort.abort(); if (loaded) disposeScene(loaded); };
  }, []);
  if (!assets) return null;
  return <div className="bop-canvas"><Canvas frameloop="demand" dpr={props.mobile ? 1 : [1, 1.5]}
    camera={{ position: assets.config.camera, fov: 38, near: 0.01, far: 20 }}
    gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }}
    onCreated={({ gl }) => { gl.setClearColor('#f1f5f9'); gl.toneMapping = THREE.ACESFilmicToneMapping; }}
    fallback={<p>3D is unavailable in this browser.</p>}>
      <World assets={assets} {...props} />
    </Canvas></div>;
}
