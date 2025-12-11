"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelViewerProps {
  modelPath: string;
  className?: string;
}

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current && scene) {
      // Calculate bounding box
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      // Scale the model to be visible (target size of ~4-5 units)
      const targetSize = 4;
      const scale = maxDim > 0 ? targetSize / maxDim : 1;
      
      // Apply scale
      groupRef.current.scale.setScalar(scale);
      
      // Center the model
      const center = box.getCenter(new THREE.Vector3());
      groupRef.current.position.x = -center.x * scale;
      groupRef.current.position.y = -center.y * scale;
      groupRef.current.position.z = -center.z * scale;
    }
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

export default function ModelViewer({ modelPath, className }: ModelViewerProps) {
  return (
    <div className={`w-full h-full relative ${className || ""}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <Model modelPath={modelPath} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            minDistance={2}
            maxDistance={15}
            makeDefault
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

