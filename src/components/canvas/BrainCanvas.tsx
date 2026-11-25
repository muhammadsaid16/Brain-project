"use client";

import { BRAIN_REGIONS } from "@/data/brainData";
import { SECTION_PLANES } from "@/data/studyData";
import { useBrainStore } from "@/store/useBrainStore";
import { useStudyStore } from "@/store/useStudyStore";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type React from "react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { BrainModel } from "./BrainModel";
import { Hotspots } from "./Hotspots";
import { StudyLayers } from "./StudyLayers";

type OrbitControlsHandle = React.ComponentRef<typeof OrbitControls>;

const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 1.2, 3.8);
const DEFAULT_CAMERA_TARGET = new THREE.Vector3(0, 0, 0);

function CameraController() {
  const invalidate = useThree((state) => state.invalidate);
  const controlsRef = useRef<OrbitControlsHandle>(null);
  const selectedRegionId = useBrainStore((state) => state.selectedRegionId);
  const resetCameraTrigger = useBrainStore((state) => state.resetCameraTrigger);

  const cameraView = useStudyStore((state) => state.cameraView);
  const cameraRevision = useStudyStore((state) => state.cameraRevision);
  const mode = useStudyStore((state) => state.mode);

  const activeRegion = useMemo(
    () => BRAIN_REGIONS.find((r) => r.id === selectedRegionId),
    [selectedRegionId]
  );

  const desiredPosition = useRef(DEFAULT_CAMERA_POS.clone());
  const desiredTarget = useRef(DEFAULT_CAMERA_TARGET.clone());
  const isTransitioning = useRef(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotion.current = query.matches;
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Update target when region selection changes
  useEffect(() => {
    if (activeRegion) {
      desiredPosition.current.set(...activeRegion.cameraPosition);
      desiredTarget.current.set(...activeRegion.cameraTarget);
      isTransitioning.current = true;
      invalidate();
    }
  }, [activeRegion, invalidate]);

  // Handle reset camera trigger
  useEffect(() => {
    if (resetCameraTrigger > 0) {
      desiredPosition.current.copy(DEFAULT_CAMERA_POS);
      desiredTarget.current.copy(DEFAULT_CAMERA_TARGET);
      isTransitioning.current = true;
      invalidate();
    }
  }, [resetCameraTrigger, invalidate]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: revision repeats the same preset after manual orbiting
  useEffect(() => {
    const plane = SECTION_PLANES.find((p) => p.id === cameraView);
    desiredPosition.current.set(
      ...(plane
        ? plane.camera
        : mode === "pathways" || mode === "vascular"
          ? ([-3.8, 1.1, 1.2] as [number, number, number])
          : ([0, 1.2, 3.8] as [number, number, number]))
    );
    desiredTarget.current.copy(DEFAULT_CAMERA_TARGET);
    isTransitioning.current = true;
    invalidate();
  }, [cameraView, cameraRevision, mode, invalidate]);

  useFrame((state, delta) => {
    if (!controlsRef.current) return;

    if (isTransitioning.current) {
      state.invalidate();
      const step = reducedMotion.current ? 1 : 1 - Math.exp(-3.5 * delta);

      state.camera.position.lerp(desiredPosition.current, step);
      controlsRef.current.target.lerp(desiredTarget.current, step);
      controlsRef.current.update();

      const distPos = state.camera.position.distanceTo(desiredPosition.current);
      const distTarget = controlsRef.current.target.distanceTo(desiredTarget.current);

      if (distPos < 0.05 && distTarget < 0.05) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={1.4}
      maxDistance={7.5}
      rotateSpeed={0.7}
      panSpeed={0.7}
      zoomSpeed={0.8}
      onStart={() => {
        // User manual interaction overrides fly-to transition
        isTransitioning.current = false;
      }}
    />
  );
}

function StudioLighting() {
  return (
    <>
      {/* Ambient Fill */}
      <ambientLight color="#181428" intensity={1.2} />

      {/* Main Clinical Key Light */}
      <directionalLight
        position={[6, 8, 6]}
        intensity={2.4}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Rim / Grooves Accent Light (Neon Purple) */}
      <directionalLight position={[-7, 5, -6]} intensity={3.0} color="#a855f7" />

      {/* Inferior / Gyri Fill Light (Cyan Glow) */}
      <directionalLight position={[0, -5, 5]} intensity={1.5} color="#06b6d4" />

      {/* Top Subtle Point Light */}
      <pointLight position={[0, 4, 0]} intensity={1.0} color="#e0e7ff" distance={8} />
    </>
  );
}

export function CanvasLoader() {
  const language = useBrainStore((state) => state.language);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07070d]/90 backdrop-blur-md z-30">
      <div className="relative flex items-center justify-center">
        {/* Pulsing rings */}
        <div className="absolute h-24 w-24 rounded-full border border-purple-500/30 animate-ping" />
        <div className="absolute h-16 w-16 rounded-full border border-cyan-500/40 animate-pulse" />

        {/* Brain icon / spinner */}
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-500/30">
          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#07070d]">
            <svg
              className="h-6 w-6 text-cyan-400 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Loading indicator"
            >
              <title>Loading</title>
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        </div>
      </div>

      <p className="mt-6 font-mono text-sm tracking-widest text-purple-300 uppercase animate-pulse">
        {language === "ar"
          ? "جارٍ تحميل النموذج العصبي ثلاثي الأبعاد..."
          : "Loading Neural Geometry..."}
      </p>
      <span className="mt-1 text-xs text-gray-500">High-Resolution 3D Neuroanatomy</span>
    </div>
  );
}

export default function BrainCanvas() {
  const mode = useStudyStore((state) => state.mode);
  const [labelTarget, setLabelTarget] = useState<HTMLDivElement | null>(null);
  const labelPortal = useMemo(() => (labelTarget ? { current: labelTarget } : null), [labelTarget]);
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#07070d]">
      <div ref={setLabelTarget} className="pointer-events-none absolute inset-0 z-10" />
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          shadows={mode === "anatomy"}
          frameloop="demand"
          dpr={[1, 1.5]}
          camera={{ position: [0, 1.2, 3.8], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="h-full w-full"
        >
          <StudioLighting />
          <CameraController />
          <BrainModel />
          {mode === "anatomy" && labelPortal && <Hotspots portal={labelPortal} />}
          {labelPortal && <StudyLayers portal={labelPortal} />}
        </Canvas>
      </Suspense>
    </div>
  );
}
