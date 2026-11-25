"use client";

import { useBrainStore } from "@/store/useBrainStore";
import type { ClippingAxis } from "@/types/brain";
import {
  BarChart2,
  Camera,
  Crosshair,
  Eye,
  EyeOff,
  GraduationCap,
  Layers,
  RotateCcw,
  Scissors,
  Sliders,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function LabDock() {
  const language = useBrainStore((state) => state.language);
  const labelsVisible = useBrainStore((state) => state.labelsVisible);
  const toggleLabels = useBrainStore((state) => state.toggleLabels);
  const hologramMode = useBrainStore((state) => state.hologramMode);
  const toggleHologram = useBrainStore((state) => state.toggleHologram);
  const clippingEnabled = useBrainStore((state) => state.clippingEnabled);
  const toggleClipping = useBrainStore((state) => state.toggleClipping);
  const clippingAxis = useBrainStore((state) => state.clippingAxis);
  const setClippingAxis = useBrainStore((state) => state.setClippingAxis);
  const clippingOffset = useBrainStore((state) => state.clippingOffset);
  const setClippingOffset = useBrainStore((state) => state.setClippingOffset);
  const triggerResetCamera = useBrainStore((state) => state.triggerResetCamera);
  const devPickerMode = useBrainStore((state) => state.devPickerMode);
  const toggleDevPicker = useBrainStore((state) => state.toggleDevPicker);
  const pickedCoords = useBrainStore((state) => state.pickedCoords);

  const quizMode = useBrainStore((state) => state.quizMode);
  const startQuiz = useBrainStore((state) => state.startQuiz);
  const exitQuiz = useBrainStore((state) => state.exitQuiz);

  const [showClippingDrawer, setShowClippingDrawer] = useState(false);

  const isRtl = language === "ar";

  const handleClippingToggle = () => {
    toggleClipping();
    if (!clippingEnabled) {
      setShowClippingDrawer(true);
    }
  };

  const axes: { id: ClippingAxis; labelEn: string; labelAr: string; plane: string }[] = [
    { id: "sagittal", labelEn: "Sagittal (X)", labelAr: "سهمي (X)", plane: "Left / Right" },
    { id: "axial", labelEn: "Axial (Y)", labelAr: "محوري (Y)", plane: "Superior / Inferior" },
    { id: "coronal", labelEn: "Coronal (Z)", labelAr: "إكليلي (Z)", plane: "Anterior / Posterior" },
  ];

  return (
    <nav
      aria-label="Lab Controls Dock"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-20 flex max-w-[calc(100vw-1rem)] flex-col items-center gap-2"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Dev Picker Active Floating Badge */}
      {devPickerMode && (
        <div className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/80 px-4 py-1.5 text-xs text-amber-200 shadow-lg shadow-amber-950/50 backdrop-blur-md animate-pulse">
          <Crosshair className="h-3.5 w-3.5 text-amber-400" />
          <span>
            {isRtl
              ? "وضع التقاط الإحداثيات نشط (انقر على سطح المخ للنسخ)"
              : "Coordinate Picker Active (Click brain surface to copy [x,y,z])"}
          </span>
          {pickedCoords && (
            <span className="font-mono text-[11px] text-white bg-amber-500/30 px-2 py-0.5 rounded-full">
              Copied! [{pickedCoords[0]}, {pickedCoords[1]}, {pickedCoords[2]}]
            </span>
          )}
        </div>
      )}

      {/* Cross-Section / MRI Clipping Slider Drawer */}
      {clippingEnabled && showClippingDrawer && (
        <div className="w-80 sm:w-96 rounded-2xl border border-cyan-500/30 bg-[#0d0d18]/90 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 text-xs text-cyan-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Scissors className="h-3.5 w-3.5" />
              {isRtl ? "مستوى القطع المقطعي (MRI Slicer)" : "MRI Cross-Section Slicer"}
            </span>
            <span className="font-mono text-[11px] text-gray-400">
              Offset: {clippingOffset.toFixed(2)}
            </span>
          </div>

          {/* Plane Selector */}
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {axes.map((axis) => (
              <button
                key={axis.id}
                type="button"
                onClick={() => setClippingAxis(axis.id)}
                className={`rounded-lg px-2 py-1.5 text-[11px] font-medium transition-all ${
                  clippingAxis === axis.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm"
                    : "bg-[#07070d]/50 text-gray-400 hover:text-white border border-transparent"
                }`}
              >
                {isRtl ? axis.labelAr : axis.labelEn}
              </button>
            ))}
          </div>

          {/* Slice Depth Slider */}
          <div className="mt-3 flex items-center gap-3">
            <span className="text-[11px] text-gray-400 font-mono">-1.5</span>
            <input
              type="range"
              min={-1.5}
              max={1.5}
              step={0.02}
              value={clippingOffset}
              onChange={(e) => setClippingOffset(Number.parseFloat(e.target.value))}
              className="flex-1 accent-cyan-400 cursor-pointer h-1.5 bg-gray-700 rounded-lg"
            />
            <span className="text-[11px] text-gray-400 font-mono">+1.5</span>
          </div>

          <div className="mt-2 flex justify-between items-center text-[10px] text-gray-400">
            <span>
              {isRtl ? "حرك المؤشر لقطع أنسجة الدماغ" : "Drag slider to slice through brain tissue"}
            </span>
            <button
              type="button"
              onClick={() => setClippingOffset(0)}
              className="text-cyan-400 hover:text-white underline"
            >
              {isRtl ? "تصفير" : "Center"}
            </button>
          </div>
        </div>
      )}

      {/* Main Glassmorphic Dock Container */}
      <div className="lab-dock-scroll flex items-center gap-1.5 sm:gap-2 rounded-2xl border border-purple-500/25 bg-[#0d0d18]/90 p-2 shadow-2xl shadow-purple-950/60 backdrop-blur-xl">
        {/* Button 1: Cross-Section Slicer */}
        <div className="relative">
          <button
            type="button"
            onClick={handleClippingToggle}
            title={
              isRtl ? "مستوى القطع التشريحي (MRI)" : "Cross-Section Slicer (MRI Clipping Plane)"
            }
            className={`group flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 border ${
              clippingEnabled
                ? "border-cyan-400/60 bg-cyan-950/60 text-cyan-300 shadow-md shadow-cyan-950/50"
                : "border-transparent text-gray-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Scissors
              className={`h-4 w-4 ${clippingEnabled ? "text-cyan-400" : "text-gray-400"}`}
            />
            <span className="hidden md:inline">{isRtl ? "قطع مقطعي" : "MRI Slice"}</span>
          </button>
          {clippingEnabled && (
            <button
              type="button"
              onClick={() => setShowClippingDrawer(!showClippingDrawer)}
              title="Toggle Slice Controls"
              className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] text-black font-bold shadow"
            >
              <Sliders className="h-2.5 w-2.5" />
            </button>
          )}
        </div>

        <div className="h-5 w-[1px] bg-purple-500/20" />

        {/* Button 2: Hologram / X-Ray Mode */}
        <button
          type="button"
          onClick={toggleHologram}
          title={isRtl ? "تبديل وضع الهولوجرام / الأشعة السينية" : "Toggle Hologram / X-Ray Mode"}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 border ${
            hologramMode
              ? "border-purple-400/60 bg-purple-950/70 text-purple-300 shadow-md shadow-purple-950/50"
              : "border-transparent text-gray-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Sparkles
            className={`h-4 w-4 ${hologramMode ? "text-purple-400 animate-pulse" : "text-gray-400"}`}
          />
          <span className="hidden md:inline">{isRtl ? "هولوجرام" : "Hologram"}</span>
        </button>

        {/* Button 3: Show/Hide Labels */}
        <button
          type="button"
          onClick={toggleLabels}
          title={isRtl ? "إظهار / إخفاء التسميات ثلاثية الأبعاد" : "Show / Hide 3D Labels"}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 border ${
            labelsVisible
              ? "border-purple-500/30 bg-purple-900/20 text-purple-200"
              : "border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300"
          }`}
        >
          {labelsVisible ? (
            <Eye className="h-4 w-4 text-purple-400" />
          ) : (
            <EyeOff className="h-4 w-4 text-gray-500" />
          )}
          <span className="hidden md:inline">
            {labelsVisible ? (isRtl ? "التسميات" : "Labels") : isRtl ? "مخفية" : "Hidden"}
          </span>
        </button>

        <div className="h-5 w-[1px] bg-purple-500/20" />

        {/* Button 4: Interactive Quiz Mode */}
        <button
          type="button"
          onClick={() => (quizMode ? exitQuiz() : startQuiz())}
          title={isRtl ? "بدء الاختبار السريري والتشريحي" : "Launch Neuroanatomy Quiz"}
          className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 border shadow-lg ${
            quizMode
              ? "border-rose-400/60 bg-gradient-to-r from-rose-950 to-purple-950 text-rose-200 shadow-rose-950/50"
              : "border-emerald-400/40 bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 text-emerald-300 hover:border-emerald-400 shadow-emerald-950/40"
          }`}
        >
          <GraduationCap className={`h-4 w-4 ${quizMode ? "text-rose-400" : "text-emerald-400"}`} />
          <span>
            {quizMode
              ? isRtl
                ? "إنهاء الاختبار"
                : "Exit Quiz"
              : isRtl
                ? "بدء الاختبار 🎓"
                : "Quiz Mode 🎓"}
          </span>
        </button>

        <div className="h-5 w-[1px] bg-purple-500/20" />

        {/* Button 5: Reset Camera */}
        <button
          type="button"
          onClick={triggerResetCamera}
          title={isRtl ? "إعادة ضبط الكاميرا للوضع الافتراضي" : "Reset Camera to Default Overview"}
          className="flex items-center gap-1.5 rounded-xl border border-transparent px-3 py-2 text-xs font-medium text-gray-300 hover:border-purple-500/30 hover:bg-white/5 hover:text-white transition-all"
        >
          <RotateCcw className="h-4 w-4 text-gray-400 group-hover:text-cyan-400" />
          <span className="hidden lg:inline">{isRtl ? "إعادة الكاميرا" : "Reset View"}</span>
        </button>

        {/* Button 6: Dev Coordinate Picker */}
        <button
          type="button"
          onClick={toggleDevPicker}
          title={
            isRtl
              ? "محدد الإحداثيات للمطور (Shift+Click)"
              : "Dev 3D Coordinate Picker (Shift+Click)"
          }
          className={`flex items-center justify-center rounded-xl p-2 text-xs transition-all border ${
            devPickerMode
              ? "border-amber-400/70 bg-amber-950/70 text-amber-300 shadow-md shadow-amber-950/50"
              : "border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200"
          }`}
        >
          <Crosshair className="h-4 w-4" />
        </button>

        {/* Button 7: Admin Dashboard */}
        <Link
          href="/admin"
          target="_blank"
          title={isRtl ? "لوحة تحكم الزوار (Admin)" : "Admin Analytics Dashboard"}
          className="flex items-center justify-center rounded-xl p-2 text-xs transition-all border border-transparent text-gray-400 hover:border-purple-500/30 hover:bg-white/5 hover:text-cyan-400"
        >
          <BarChart2 className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}
