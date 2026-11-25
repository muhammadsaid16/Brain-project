"use client";

import { CanvasLoader } from "@/components/canvas/BrainCanvas";
import { StudyNavigation, StudyWorkspace } from "@/components/study/StudyWorkspace";
import { AnatomyInspector } from "@/components/ui/AnatomyInspector";
import { LabDock } from "@/components/ui/LabDock";
import { QuizOverlay } from "@/components/ui/QuizOverlay";
import { RegionsSidebar } from "@/components/ui/RegionsSidebar";
import { useStudyStore } from "@/store/useStudyStore";
import dynamic from "next/dynamic";

const BrainCanvas = dynamic(() => import("@/components/canvas/BrainCanvas"), {
  ssr: false,
  loading: () => <CanvasLoader />,
});

export default function Home() {
  const mode = useStudyStore((state) => state.mode);
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-[#07070d]">
      {/* 3D WebGL Canvas Layer (100vw x 100vh) */}
      <div className={mode === "anatomy" ? "absolute inset-0" : "study-canvas-shell"}>
        <BrainCanvas />
      </div>
      <StudyNavigation />
      <StudyWorkspace />

      {/* Floating Glassmorphic UI Panels */}
      {mode === "anatomy" && (
        <>
          <RegionsSidebar />
          <AnatomyInspector />
          <LabDock />
          <QuizOverlay />
        </>
      )}
    </main>
  );
}
