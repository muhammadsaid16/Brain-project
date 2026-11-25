import type { StudyMode } from "@/data/studyData";
import type { ClippingAxis } from "@/types/brain";
import { create } from "zustand";
import { useBrainStore } from "./useBrainStore";

interface StudyState {
  mode: StudyMode;
  selectedPathway: string;
  selectedVessel: string;
  cameraView: ClippingAxis | "overview";
  cameraRevision: number;
  setMode: (mode: StudyMode) => void;
  setPathway: (id: string) => void;
  setVessel: (id: string) => void;
  setView: (view: ClippingAxis | "overview") => void;
}

export const useStudyStore = create<StudyState>((set) => ({
  mode: "anatomy",
  selectedPathway: "arcuate",
  selectedVessel: "aca",
  cameraView: "overview",
  cameraRevision: 0,
  setMode: (mode) => {
    const brain = useBrainStore.getState();
    brain.exitQuiz();
    brain.selectRegion(null);
    if (brain.clippingEnabled) brain.toggleClipping();
    if (mode === "sections") {
      brain.setClippingOffset(0);
      brain.toggleClipping();
    }
    set((state) => ({
      mode,
      cameraView: mode === "sections" ? brain.clippingAxis : "overview",
      cameraRevision: state.cameraRevision + 1,
    }));
  },
  setPathway: (selectedPathway) => set({ selectedPathway }),
  setVessel: (selectedVessel) => set({ selectedVessel }),
  setView: (cameraView) =>
    set((state) => ({ cameraView, cameraRevision: state.cameraRevision + 1 })),
}));
