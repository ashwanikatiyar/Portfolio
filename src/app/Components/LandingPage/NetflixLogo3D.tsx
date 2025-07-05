//portfolio/src/app/Components/Landing Page/NetflixLogo3D.tsx
"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { Html } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import SecondSection from "./SecondSection";
import Footer from "../Footer/Footer1";
import Lamp from "./Lamp"; // adjust the path if needed

const MODEL_PATH = "/Ashwani.glb";
const DEFAULT_ROTATION = new THREE.Euler(-10.9, 0, 0);

interface GLTFResult extends THREE.Group {
  nodes: { [key: string]: THREE.Mesh };
  materials: { [key: string]: THREE.Material };
  animations: THREE.AnimationClip[];
}

function Model({
  isUserRotating,
  scrollScale,
}: {
  isUserRotating: boolean;
  scrollScale: number;
}) {
  const gltf = useLoader(GLTFLoader, MODEL_PATH);
  const modelRef = useRef<THREE.Object3D>(null);



  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const material = child.material as THREE.MeshStandardMaterial;
        material.emissive = new THREE.Color(0xe50914);
        material.emissiveIntensity = 1;
        material.needsUpdate = true;
      }
    });
  }, [gltf]);

  useFrame(({ clock }) => {
    if (!modelRef.current) return;
    const time = clock.getElapsedTime();
    modelRef.current.position.y = Math.sin(time * 1.8) * 0.2;
    const lerpedScale = THREE.MathUtils.lerp(
      modelRef.current.scale.x,
      scrollScale,
      0.1
    );
    modelRef.current.scale.setScalar(lerpedScale);
    if (!isUserRotating) {
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        DEFAULT_ROTATION.x,
        0.1
      );
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        DEFAULT_ROTATION.y,
        0.1
      );
      modelRef.current.rotation.z = THREE.MathUtils.lerp(
        modelRef.current.rotation.z,
        DEFAULT_ROTATION.z,
        0.1
      );
    }
  });

  return <primitive ref={modelRef} object={gltf.scene} position={[0, 0, 0]} />;
}

export default function NetflixLogo3D() {
  const [isUserRotating, setIsUserRotating] = useState(false);
  const [scrollScale, setScrollScale] = useState(1.2);
  const [showSecondSection, setShowSecondSection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

    const [showLamp, setShowLamp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLamp(true);
    }, 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const newScale = THREE.MathUtils.clamp(1.2 + scrollY / 300, 1.2, 3);
      setScrollScale(newScale);
      setShowSecondSection(scrollY > maxScroll * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Autoplay failed:", err);
          });
        }
      }
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleMobileTap = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsUserRotating(true);
  };

  return (
    <>
      <div
        className="h-screen w-full sticky top-0 z-10"
        onTouchStart={isMobile ? handleMobileTap : undefined}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          className="w-full h-full bg-black"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          <directionalLight
            castShadow
            position={[5, 10, 5]}
            intensity={1.2}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <Suspense fallback={<Html center><div className="text-white text-9xl font-extrabold">WELCOME</div></Html>}>
  <Model isUserRotating={isUserRotating} scrollScale={scrollScale} />
  <Lamp visible={showLamp} />
</Suspense>


          <Suspense
            fallback={
              <Html center>
                <div className="text-white text-9xl font-extrabold">
                  WELCOME
                </div>
              </Html>
            }
          >
            <Model isUserRotating={isUserRotating} scrollScale={scrollScale} />
          </Suspense>

          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.6, 0]}
            receiveShadow
          >
            <planeGeometry args={[10, 10]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={20}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.25}
              color="#111111"
              metalness={0.6}
            />
          </mesh>

          {!isMobile && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
              minPolarAngle={Math.PI / 2 - 0.1}
              maxPolarAngle={Math.PI / 2 + 0.1}
              onStart={() => setIsUserRotating(true)}
              onEnd={() => setIsUserRotating(false)}
            />
          )}
        </Canvas>
      </div>

      <SecondSection />
      <Footer />
      <audio
        ref={audioRef}
        src="/Netflix-Intro-Sound-Effect.mp3"
        preload="auto"
      />
    </>
  );
}
