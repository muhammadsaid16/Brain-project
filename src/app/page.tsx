"use client";

import { CanvasLoader } from "@/components/canvas/BrainCanvas";
import { AnatomyInspector } from "@/components/ui/AnatomyInspector";
import { LabDock } from "@/components/ui/LabDock";
import { QuizOverlay } from "@/components/ui/QuizOverlay";
import { RegionsSidebar } from "@/components/ui/RegionsSidebar";
import dynamic from "next/dynamic";

const BrainCanvas = dynamic(() => import("@/components/canvas/BrainCanvas"), {
  ssr: false,
  loading: () => <CanvasLoader />,
});

export default function Home() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-[#07070d]">
      {/* 3D WebGL Canvas Layer (100vw x 100vh) */}
      <BrainCanvas />

      {/* Floating Glassmorphic UI Panels */}
      <RegionsSidebar />
      <AnatomyInspector />
      <LabDock />
      <QuizOverlay />
    </main>
  );
}
