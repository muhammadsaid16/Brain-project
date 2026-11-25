"use client";

import { BRAIN_REGIONS } from "@/data/brainData";
import { useBrainStore } from "@/store/useBrainStore";
import type { InspectorTab } from "@/types/brain";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Crosshair,
  ExternalLink,
  HeartPulse,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { useMemo } from "react";

export function AnatomyInspector() {
  const selectedRegionId = useBrainStore((state) => state.selectedRegionId);
  const isInspectorOpen = useBrainStore((state) => state.isInspectorOpen);
  const toggleInspector = useBrainStore((state) => state.toggleInspector);
  const activeTab = useBrainStore((state) => state.activeInspectorTab);
  const setActiveTab = useBrainStore((state) => state.setActiveInspectorTab);
  const language = useBrainStore((state) => state.language);
  const selectRegion = useBrainStore((state) => state.selectRegion);

  const region = useMemo(
    () => BRAIN_REGIONS.find((r) => r.id === selectedRegionId),
    [selectedRegionId]
  );

  const isRtl = language === "ar";

  if (!isInspectorOpen || !region) return null;

  const tabs: {
    id: InspectorTab;
    labelEn: string;
    labelAr: string;
    titleEn: string;
    titleAr: string;
    icon: typeof BookOpen;
  }[] = [
    {
      id: "overview",
      labelEn: "Overview",
      labelAr: "عام",
      titleEn: "Anatomical Overview",
      titleAr: "نظرة تشريحية عامة",
      icon: BookOpen,
    },
    {
      id: "functions",
      labelEn: "Functions",
      labelAr: "الوظائف",
      titleEn: "Physiological Functions",
      titleAr: "الوظائف الفسيولوجية والإدراكية",
      icon: Activity,
    },
    {
      id: "clinical",
      labelEn: "Clinical",
      labelAr: "سريري",
      titleEn: "Clinical (Lesions)",
      titleAr: "المتلازمات السريرية والآفات",
      icon: Stethoscope,
    },
    {
      id: "vascular",
      labelEn: "Vascular",
      labelAr: "التروية",
      titleEn: "Vascular Supply",
      titleAr: "التروية الوعائية والشريانية",
      icon: HeartPulse,
    },
  ];

  return (
    <section
      aria-label={isRtl ? "مستكشف التشريح" : "Anatomy Inspector"}
      className={`fixed top-4 right-4 z-20 flex w-[410px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-purple-500/25 bg-[#0d0d18]/95 shadow-2xl shadow-purple-950/60 backdrop-blur-2xl transition-all duration-300 max-h-[calc(100dvh-5.5rem)] overflow-hidden max-sm:left-2 max-sm:right-2 max-sm:top-auto max-sm:bottom-[calc(env(safe-area-inset-bottom)+5rem)] max-sm:w-auto max-sm:max-h-[44dvh] ${
        isInspectorOpen
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Top Header Card */}
      <div className="relative border-b border-purple-500/20 p-4 bg-gradient-to-b from-purple-950/30 to-transparent">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              className="mt-1 flex h-4 w-4 shrink-0 rounded-full border border-white/40 shadow-sm"
              style={{ backgroundColor: region.color }}
            />
            <div>
              <span className="inline-block rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-mono text-purple-300 border border-purple-500/30">
                {isRtl ? region.categoryLabelAr : region.categoryLabelEn}
              </span>
              <h2 className="mt-1 text-lg font-bold text-white tracking-tight">
                {isRtl ? region.nameAr : region.nameEn}
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                {region.latinName || (isRtl ? region.nameEn : region.nameAr)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleInspector(false)}
            title={isRtl ? "إغلاق المستكشف" : "Close Inspector"}
            aria-label={isRtl ? "إغلاق المستكشف" : "Close Inspector"}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Clean, Non-wrapping Navigation Tabs */}
        <div className="mt-3.5 grid grid-cols-4 gap-1 rounded-xl bg-[#07070d]/70 p-1 border border-purple-500/20">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                title={isRtl ? tab.titleAr : tab.titleEn}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 px-1 text-xs font-semibold tracking-tight transition-all duration-200 select-none ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md shadow-purple-900/50 scale-[1.02]"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="whitespace-nowrap text-[11px] truncate">
                  {isRtl ? tab.labelAr : tab.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-gray-200 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                {isRtl ? "الملخص التشريحي" : "Anatomical Summary"}
              </h3>
              <p className="mt-1.5 leading-relaxed text-gray-300 bg-purple-950/20 p-3 rounded-xl border border-purple-500/15">
                {isRtl ? region.overview.summaryAr : region.overview.summaryEn}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Crosshair className="h-3.5 w-3.5 text-cyan-400" />
                {isRtl ? "الموقع في القحف" : "Cranial Location"}
              </h3>
              <p className="mt-1.5 leading-relaxed text-gray-300">
                {isRtl ? region.overview.locationAr : region.overview.locationEn}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                {isRtl ? "أبرز المعالم العصبية" : "Key Neuroanatomical Landmarks"}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {region.overview.keyLandmarks.map((lm) => (
                  <li
                    key={lm}
                    className="flex items-start gap-2 rounded-lg bg-[#07070d]/50 p-2 border border-purple-900/30"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="text-gray-300 leading-snug">{lm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Functions */}
        {activeTab === "functions" && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-cyan-400" />
              {isRtl ? "الوظائف الفسيولوجية والإدراكية" : "Physiological & Cognitive Functions"}
            </h3>
            <div className="space-y-2">
              {(isRtl ? region.functions.ar : region.functions.en).map((fn, idx) => (
                <div
                  key={`${region.id}-fn-${idx}`}
                  className="flex items-start gap-2.5 rounded-xl border border-purple-500/15 bg-purple-950/15 p-2.5 transition-colors hover:border-cyan-400/30"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-[10px] font-mono font-bold text-cyan-300">
                    {idx + 1}
                  </span>
                  <p className="text-gray-200 leading-relaxed">{fn}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Clinical (Lesions) */}
        {activeTab === "clinical" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                {isRtl ? "المتلازمات السريرية" : "Clinical Syndromes & Lesions"}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(isRtl ? region.clinical.syndromesAr : region.clinical.syndromesEn).map((syn) => (
                  <span
                    key={syn}
                    className="rounded-lg bg-rose-950/40 px-2.5 py-1 text-[11px] font-medium text-rose-200 border border-rose-500/30"
                  >
                    {syn}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Stethoscope className="h-3.5 w-3.5 text-purple-400" />
                {isRtl ? "أعراض ومظاهر الأذى القشري" : "Symptoms of Lesion / Damage"}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {(isRtl ? region.clinical.symptomsAr : region.clinical.symptomsEn).map(
                  (sym, idx) => (
                    <li
                      key={`${region.id}-sym-${idx}`}
                      className="flex items-start gap-2 rounded-lg bg-[#07070d]/60 p-2.5 border border-purple-900/30"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span className="text-gray-300 leading-relaxed">{sym}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <span>📋</span>
                {isRtl ? "حالة سريرية نموذجية (Vignette)" : "Classic Clinical Vignette"}
              </h4>
              <p className="mt-1.5 text-xs italic leading-relaxed text-amber-100/90">
                "{isRtl ? region.clinical.classicCaseAr : region.clinical.classicCaseEn}"
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Vascular Supply */}
        {activeTab === "vascular" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <HeartPulse className="h-3.5 w-3.5 text-rose-400" />
                {isRtl ? "الشرايين المغذية الرئيسية" : "Arterial Supply"}
              </h3>
              <div className="mt-2 space-y-2">
                {(isRtl ? region.vascularSupply.arteriesAr : region.vascularSupply.arteriesEn).map(
                  (art, idx) => (
                    <div
                      key={`${region.id}-art-${idx}`}
                      className="flex items-start gap-2 rounded-xl bg-purple-950/20 p-2.5 border border-purple-500/20"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-rose-500 shrink-0" />
                      <span className="text-gray-200 leading-snug">{art}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5" />
                {isRtl ? "مظاهر السكتة الدماغية (Stroke)" : "Stroke Presentation"}
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-300">
                {isRtl
                  ? region.vascularSupply.strokeManifestationAr
                  : region.vascularSupply.strokeManifestationEn}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-purple-500/15 p-3 bg-[#07070d]/40 flex items-center justify-between text-xs text-gray-400">
        <span className="font-mono text-[10px]">
          Target: [{region.position[0]}, {region.position[1]}, {region.position[2]}]
        </span>
        <button
          type="button"
          onClick={() => selectRegion(region.id)}
          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
        >
          <span>{isRtl ? "إعادة تركيز الكاميرا" : "Re-center Camera"}</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </section>
  );
}
