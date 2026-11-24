"use client";

import { BRAIN_REGIONS } from "@/data/brainData";
import { useBrainStore } from "@/store/useBrainStore";
import type { BrainRegion } from "@/types/brain";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useState } from "react";
import * as THREE from "three";

interface HotspotPinProps {
  region: BrainRegion;
}

function HotspotPin({ region }: HotspotPinProps) {
  const selectedRegionId = useBrainStore((state) => state.selectedRegionId);
  const hoveredRegionId = useBrainStore((state) => state.hoveredRegionId);
  const labelsVisible = useBrainStore((state) => state.labelsVisible);
  const language = useBrainStore((state) => state.language);
  const quizMode = useBrainStore((state) => state.quizMode);
  const quizState = useBrainStore((state) => state.quizState);
  const lastAnswerRegionId = useBrainStore((state) => state.lastAnswerRegionId);
  const selectRegion = useBrainStore((state) => state.selectRegion);
  const setHoveredRegion = useBrainStore((state) => state.setHoveredRegion);
  const submitQuizAnswer = useBrainStore((state) => state.submitQuizAnswer);

  const [facingCamera, setFacingCamera] = useState(true);

  const isSelected = selectedRegionId === region.id;
  const isHovered = hoveredRegionId === region.id;

  // Quiz evaluation state
  const isLastAnswered = lastAnswerRegionId === region.id;
  const isQuizCorrect = quizMode && isLastAnswered && quizState === "correct";
  const isQuizIncorrect = quizMode && isLastAnswered && quizState === "incorrect";

  // Precompute normal vector from brain center (0,0,0) to position
  const normal = useMemo(() => {
    return new THREE.Vector3(...region.position).normalize();
  }, [region.position]);

  const posVec = useMemo(() => {
    return new THREE.Vector3(...region.position);
  }, [region.position]);

  // Calculate whether this hotspot is on the side facing the camera
  useFrame(({ camera }) => {
    const toCamera = camera.position.clone().sub(posVec).normalize();
    const dot = normal.dot(toCamera);
    const isFacing = dot > -0.1;

    if (isFacing !== facingCamera) {
      setFacingCamera(isFacing);
    }
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quizMode) {
      submitQuizAnswer(region.id);
    } else {
      selectRegion(region.id);
    }
  };

  const displayName = language === "ar" ? region.nameAr : region.nameEn;

  // Active theme color
  const activeColor = isQuizCorrect
    ? "#10b981"
    : isQuizIncorrect
      ? "#f43f5e"
      : isSelected
        ? "#06b6d4"
        : isHovered
          ? "#a855f7"
          : region.color;

  return (
    <group position={region.position}>
      <Html
        center
        distanceFactor={5.2}
        className="pointer-events-auto select-none transition-all duration-200"
      >
        <div
          className={`flex flex-col items-center transition-all duration-300 ${
            facingCamera ? "opacity-100 scale-100" : "opacity-25 scale-75 pointer-events-none"
          }`}
        >
          {/* Refined Medical Pin Button */}
          <button
            type="button"
            onClick={handleClick}
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
            className="group relative flex items-center justify-center p-1 focus:outline-none cursor-pointer"
            title={displayName}
          >
            {/* Refined Medical Crosshair Reticle (Clean, sleek, non-distracting) */}
            <span
              className={`relative flex h-4 w-4 items-center justify-center rounded-full border bg-[#07070d]/80 backdrop-blur-sm transition-all duration-200 ${
                isSelected
                  ? "scale-125 border-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.9)]"
                  : isHovered
                    ? "scale-115 border-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    : "border-gray-400/60 hover:scale-110 shadow-[0_0_4px_rgba(0,0,0,0.5)]"
              }`}
              style={{
                borderColor: isSelected || isHovered ? activeColor : undefined,
              }}
            >
              {/* Inner Precision Reticle Dot */}
              {quizMode ? (
                <span className="text-[9px] font-bold text-white leading-none">
                  {isQuizCorrect ? "✓" : isQuizIncorrect ? "✗" : "?"}
                </span>
              ) : (
                <span
                  className="h-1.5 w-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: isSelected || isHovered ? activeColor : "#e2e8f0",
                  }}
                />
              )}
            </span>
          </button>

          {/* Compact, Sleek Anatomy Tag */}
          {!quizMode && labelsVisible && (
            <div
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClick(e as unknown as React.MouseEvent);
                }
              }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              className={`mt-0.5 rounded-md px-2 py-0.5 text-center shadow-lg backdrop-blur-md transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? "bg-[#0d0d18]/95 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.4)] scale-105"
                  : isHovered
                    ? "bg-[#0d0d18]/95 border-purple-400 text-purple-100 shadow-[0_0_12px_rgba(168,85,247,0.4)] scale-105"
                    : "bg-[#07070d]/85 border-purple-500/25 text-gray-200 hover:border-purple-400 hover:text-white"
              }`}
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              <span className="text-[10px] font-semibold tracking-tight whitespace-nowrap block">
                {displayName}
              </span>
            </div>
          )}

          {/* Quiz Mode Feedback Tag */}
          {quizMode && (isQuizCorrect || isQuizIncorrect) && (
            <div
              className={`mt-0.5 rounded-md px-2 py-0.5 text-[10px] font-bold shadow-md border whitespace-nowrap ${
                isQuizCorrect
                  ? "bg-emerald-950/95 text-emerald-300 border-emerald-400"
                  : "bg-rose-950/95 text-rose-300 border-rose-400"
              }`}
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              {displayName} {isQuizCorrect ? "✓" : "✗"}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

export function Hotspots() {
  const pickedCoords = useBrainStore((state) => state.pickedCoords);
  const devPickerMode = useBrainStore((state) => state.devPickerMode);
  const setPickedCoords = useBrainStore((state) => state.setPickedCoords);
  const labelsVisible = useBrainStore((state) => state.labelsVisible);
  const quizMode = useBrainStore((state) => state.quizMode);

  return (
    <group>
      {(labelsVisible || quizMode) &&
        BRAIN_REGIONS.map((region) => (
          <HotspotPin key={region.id} region={region} />
        ))}

      {/* Dev Coordinate Picker Marker */}
      {devPickerMode && pickedCoords && (
        <group position={pickedCoords}>
          <Html center distanceFactor={5.2} className="pointer-events-auto select-none">
            <div className="flex flex-col items-center">
              <span className="relative flex h-4 w-4 items-center justify-center rounded-full border border-amber-300 bg-amber-500 shadow-[0_0_10px_#f59e0b]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <div className="mt-1 flex items-center gap-1 rounded bg-amber-950/90 px-1.5 py-0.5 text-[9px] font-mono text-amber-200 border border-amber-500/50 backdrop-blur-md shadow-md">
                <span>
                  [{pickedCoords[0]}, {pickedCoords[1]}, {pickedCoords[2]}]
                </span>
                <button
                  type="button"
                  onClick={() => setPickedCoords(null)}
                  className="ml-1 text-amber-400 hover:text-white font-bold"
                  title="Clear picked coordinate"
                >
                  ✕
                </button>
              </div>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}
