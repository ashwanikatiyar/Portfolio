"use client";

import React, { useRef, useEffect, useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFLoader } from "three-stdlib";
import * as THREE from "three";

export default function Lamp({
  visible,
  delay = 1,
}: {
  visible: boolean;
  delay?: number;
}) {
  const gltf = useLoader(GLTFLoader, "/hangingLamp.glb");
  const lampRef = useRef<THREE.Object3D>(null);
  const { size, viewport, mouse } = useThree();

  const [isVisible, setIsVisible] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (visible && startTimeRef.current === null) {
      const startTime = performance.now() + delay * 1000;
      startTimeRef.current = startTime;

      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [visible, delay]);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (child.name.toLowerCase().includes("bulb")) {
          mat.emissive = new THREE.Color("#ff6666");
          mat.emissiveIntensity = 20;
          mat.needsUpdate = true;
        }
      }
    });
  }, [gltf]);

  useFrame(() => {
    if (!lampRef.current || startTimeRef.current === null) return;

    const currentTime = performance.now();
    if (currentTime < startTimeRef.current) return;

    // Fall-down animation
    const targetY = 8;
    lampRef.current.position.y = THREE.MathUtils.lerp(
      lampRef.current.position.y,
      targetY,
      0.05
    );

    // Interactive swing with mouse
    const targetRotationX = mouse.y * 0.3; // tilt forward/back based on Y
    const targetRotationZ = -mouse.x * 0.3; // tilt left/right based on X

    lampRef.current.rotation.x = THREE.MathUtils.lerp(
      lampRef.current.rotation.x,
      targetRotationX,
      0.1
    );

    lampRef.current.rotation.z = THREE.MathUtils.lerp(
      lampRef.current.rotation.z,
      targetRotationZ,
      0.1
    );
  });

  return (
    <group
      ref={lampRef}
      position={[0, 10, 0]}
      visible={isVisible}
      scale={[0.2, 0.2, 0.2]}
    >
      <primitive object={gltf.scene} />
      <pointLight
        position={[0, -0.1, 0]}
        intensity={100}
        distance={20}
        decay={1.5}
        color={"#ff6666"}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
}


