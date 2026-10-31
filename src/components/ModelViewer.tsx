"use client";

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import * as THREE from "three";

interface ModelViewerProps {
  modelPath: string;
  className?: string;
}

function FittedModel({ scene }: { scene: THREE.Object3D }) {
  const [fitted] = useState(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 4 / maxDim : 1;
    const center = box.getCenter(new THREE.Vector3());
    return {
      scale,
      position: new THREE.Vector3(-center.x * scale, -center.y * scale, -center.z * scale),
    };
  });

  return (
    <group scale={fitted.scale} position={fitted.position}>
      <primitive object={scene} />
    </group>
  );
}

export default function ModelViewer({ modelPath, className }: ModelViewerProps) {
  const [scene, setScene] = useState<THREE.Object3D | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loader = new GLTFLoader();
    loader
      .loadAsync(modelPath)
      .then((gltf) => {
        if (!cancelled) setScene(gltf.scene);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [modelPath]);

  if (failed) {
    return (
      <div className={`flex h-full w-full items-center justify-center px-6 text-center text-sm text-slate-300 ${className || ""}`}>
        The 3D model could not be loaded.
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className || ""}`}>
      {!scene && <p role="status" className="flex h-full items-center justify-center text-sm text-slate-300">Loading the 3D model…</p>}
      {scene && (
        <Canvas
          frameloop="demand"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl, scene: threeScene }) => {
            try {
              const pmrem = new THREE.PMREMGenerator(gl);
              threeScene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
              pmrem.dispose();
            } catch {
              // Local lights still show the model if the generated environment fails.
            }
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[8, 10, 6]} intensity={1.4} />
          <directionalLight position={[-6, 3, -4]} intensity={0.5} />
          <FittedModel scene={scene} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate
            minDistance={2}
            maxDistance={15}
            makeDefault
          />
        </Canvas>
      )}
    </div>
  );
}
