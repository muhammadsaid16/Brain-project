import { QUIZ_QUESTIONS } from "@/data/brainData";
import type { ClippingAxis, InspectorTab } from "@/types/brain";
import { create } from "zustand";

export type Language = "en" | "ar";
export type QuizState = "answering" | "correct" | "incorrect" | "completed";

interface BrainStoreState {
  // Navigation & Inspection
  selectedRegionId: string | null;
  hoveredRegionId: string | null;
  activeInspectorTab: InspectorTab;
  isInspectorOpen: boolean;
  isSidebarOpen: boolean;
  language: Language;

  // Visual Controls
  labelsVisible: boolean;
  hologramMode: boolean;
  clippingEnabled: boolean;
  clippingAxis: ClippingAxis;
  clippingOffset: number;
  resetCameraTrigger: number;

  // Developer Coordinate Picker
  devPickerMode: boolean;
  pickedCoords: [number, number, number] | null;

  // Quiz Mode
  quizMode: boolean;
  quizScore: number;
  quizStreak: number;
  currentQuizIndex: number;
  quizState: QuizState;
  lastAnswerRegionId: string | null;

  // Actions
  selectRegion: (id: string | null) => void;
  setHoveredRegion: (id: string | null) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  toggleInspector: (open?: boolean) => void;
  toggleSidebar: (open?: boolean) => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;

  toggleLabels: () => void;
  toggleHologram: () => void;
  toggleClipping: () => void;
  setClippingAxis: (axis: ClippingAxis) => void;
  setClippingOffset: (offset: number) => void;
  triggerResetCamera: () => void;

  toggleDevPicker: () => void;
  setPickedCoords: (coords: [number, number, number] | null) => void;

  startQuiz: () => void;
  exitQuiz: () => void;
  submitQuizAnswer: (regionId: string) => void;
  nextQuizQuestion: () => void;
  resetQuiz: () => void;
}

export const useBrainStore = create<BrainStoreState>((set, get) => ({
  // Defaults
  selectedRegionId: null,
  hoveredRegionId: null,
  activeInspectorTab: "overview",
  isInspectorOpen: false,
  isSidebarOpen: true,
  language: "en",

  labelsVisible: true,
  hologramMode: false,
  clippingEnabled: false,
  clippingAxis: "sagittal",
  clippingOffset: 0,
  resetCameraTrigger: 0,

  devPickerMode: false,
  pickedCoords: null,

  quizMode: false,
  quizScore: 0,
  quizStreak: 0,
  currentQuizIndex: 0,
  quizState: "answering",
  lastAnswerRegionId: null,

  selectRegion: (id) =>
    set({
      selectedRegionId: id,
      isInspectorOpen: id !== null,
    }),

  setHoveredRegion: (id) => set({ hoveredRegionId: id }),

  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),

  toggleInspector: (open) =>
    set((state) => ({
      isInspectorOpen: open !== undefined ? open : !state.isInspectorOpen,
    })),

  toggleSidebar: (open) =>
    set((state) => ({
      isSidebarOpen: open !== undefined ? open : !state.isSidebarOpen,
    })),

  setLanguage: (lang) => set({ language: lang }),

  toggleLanguage: () =>
    set((state) => ({
      language: state.language === "en" ? "ar" : "en",
    })),

  toggleLabels: () =>
    set((state) => ({
      labelsVisible: !state.labelsVisible,
    })),

  toggleHologram: () =>
    set((state) => ({
      hologramMode: !state.hologramMode,
    })),

  toggleClipping: () =>
    set((state) => ({
      clippingEnabled: !state.clippingEnabled,
    })),

  setClippingAxis: (axis) => set({ clippingAxis: axis }),

  setClippingOffset: (offset) => set({ clippingOffset: offset }),

  triggerResetCamera: () =>
    set((state) => ({
      resetCameraTrigger: state.resetCameraTrigger + 1,
      selectedRegionId: null,
      isInspectorOpen: false,
    })),

  toggleDevPicker: () =>
    set((state) => ({
      devPickerMode: !state.devPickerMode,
    })),

  setPickedCoords: (coords) => set({ pickedCoords: coords }),

  startQuiz: () =>
    set({
      quizMode: true,
      quizScore: 0,
      quizStreak: 0,
      currentQuizIndex: 0,
      quizState: "answering",
      lastAnswerRegionId: null,
      selectedRegionId: null,
      isInspectorOpen: false,
    }),

  exitQuiz: () =>
    set({
      quizMode: false,
      quizState: "answering",
      lastAnswerRegionId: null,
    }),

  submitQuizAnswer: (regionId) => {
    const { currentQuizIndex, quizScore, quizStreak, quizState } = get();
    if (quizState !== "answering") return;

    const currentQuestion = QUIZ_QUESTIONS[currentQuizIndex];
    if (!currentQuestion) return;

    const isCorrect = currentQuestion.targetRegionId === regionId;

    if (isCorrect) {
      set({
        quizScore: quizScore + 100 + quizStreak * 25,
        quizStreak: quizStreak + 1,
        quizState: "correct",
        lastAnswerRegionId: regionId,
      });
    } else {
      set({
        quizStreak: 0,
        quizState: "incorrect",
        lastAnswerRegionId: regionId,
      });
    }
  },

  nextQuizQuestion: () => {
    const { currentQuizIndex } = get();
    if (currentQuizIndex + 1 >= QUIZ_QUESTIONS.length) {
      set({ quizState: "completed" });
    } else {
      set({
        currentQuizIndex: currentQuizIndex + 1,
        quizState: "answering",
        lastAnswerRegionId: null,
      });
    }
  },

  resetQuiz: () =>
    set({
      quizScore: 0,
      quizStreak: 0,
      currentQuizIndex: 0,
      quizState: "answering",
      lastAnswerRegionId: null,
    }),
}));
