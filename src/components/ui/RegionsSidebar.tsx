"use client";

import { BRAIN_REGIONS } from "@/data/brainData";
import { useBrainStore } from "@/store/useBrainStore";
import type { BrainCategory, BrainRegion } from "@/types/brain";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Folder,
  FolderOpen,
  Languages,
  MessageSquare,
  Search,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

export function RegionsSidebar() {
  const isInspectorOpen = useBrainStore((state) => state.isInspectorOpen);
  const isSidebarOpen = useBrainStore((state) => state.isSidebarOpen);
  const toggleSidebar = useBrainStore((state) => state.toggleSidebar);
  const selectedRegionId = useBrainStore((state) => state.selectedRegionId);
  const selectRegion = useBrainStore((state) => state.selectRegion);
  const hoveredRegionId = useBrainStore((state) => state.hoveredRegionId);
  const setHoveredRegion = useBrainStore((state) => state.setHoveredRegion);
  const language = useBrainStore((state) => state.language);
  const toggleLanguage = useBrainStore((state) => state.toggleLanguage);
  const quizMode = useBrainStore((state) => state.quizMode);

  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState<Record<BrainCategory, boolean>>({
    lobes: false,
    hindbrain: false,
    language: false,
  });

  const isRtl = language === "ar";

  const toggleCategory = (cat: BrainCategory) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const filteredRegions = useMemo(() => {
    if (!searchQuery.trim()) return BRAIN_REGIONS;
    const q = searchQuery.toLowerCase();
    return BRAIN_REGIONS.filter((region) => {
      const searchableText = [
        region.nameEn,
        region.nameAr,
        region.latinName,
        region.overview.summaryEn,
        region.overview.summaryAr,
        region.overview.locationEn,
        region.overview.locationAr,
        ...region.overview.keyLandmarks,
        ...region.functions.en,
        ...region.functions.ar,
        ...region.clinical.syndromesEn,
        ...region.clinical.syndromesAr,
        ...region.clinical.symptomsEn,
        ...region.clinical.symptomsAr,
        ...region.vascularSupply.arteriesEn,
        ...region.vascularSupply.arteriesAr,
      ];

      return searchableText.some((text) => text?.toLowerCase().includes(q));
    });
  }, [searchQuery]);

  const categories: {
    key: BrainCategory;
    titleEn: string;
    titleAr: string;
    icon: typeof Brain;
    color: string;
  }[] = [
    {
      key: "lobes",
      titleEn: "Cerebral Lobes",
      titleAr: "فصوص المخ",
      icon: Brain,
      color: "text-purple-400",
    },
    {
      key: "hindbrain",
      titleEn: "Hindbrain Structures",
      titleAr: "بنى الدماغ الخلفي",
      icon: Folder,
      color: "text-emerald-400",
    },
    {
      key: "language",
      titleEn: "Language Centers",
      titleAr: "مراكز اللغة والتواصل",
      icon: MessageSquare,
      color: "text-cyan-400",
    },
  ];

  return (
    <aside
      className={`fixed top-20 left-4 z-20 flex flex-col transition-all duration-300 ease-in-out max-sm:left-2 max-sm:top-[7.5rem] ${
        isSidebarOpen ? "w-80 max-w-[calc(100vw-2rem)]" : "w-12"
      } ${isInspectorOpen ? "max-sm:hidden" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="relative flex flex-col rounded-2xl border border-purple-500/20 bg-[#0d0d18]/90 shadow-2xl shadow-purple-950/40 backdrop-blur-xl overflow-hidden max-h-[calc(100dvh-9rem)] max-sm:max-h-[44dvh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-purple-500/15 p-3.5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-md shadow-purple-600/30">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#07070d]">
                <Brain className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col truncate">
                <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  NeuroAtlas 3D
                  <span className="rounded-full bg-purple-500/20 px-1.5 py-0.2 text-[10px] font-mono text-purple-300 border border-purple-500/30">
                    v1.0
                  </span>
                </span>
                <span className="text-[11px] text-gray-400 truncate">
                  {isRtl ? "أطلس التشريح العصبي التفاعلي" : "Interactive Neuroanatomy"}
                </span>
              </div>
            )}
          </div>

          {/* Controls: Language Toggle & Collapse */}
          <div className="flex items-center gap-1">
            {isSidebarOpen && (
              <button
                type="button"
                onClick={toggleLanguage}
                title={isRtl ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}
                className="flex h-8 items-center gap-1 rounded-lg px-2 text-xs font-medium text-gray-300 hover:bg-purple-900/30 hover:text-cyan-300 transition-colors border border-purple-500/20"
              >
                <Languages className="h-3.5 w-3.5" />
                <span>{language === "en" ? "عربي" : "EN"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => toggleSidebar()}
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-purple-900/30 hover:text-white transition-colors"
            >
              {isSidebarOpen ? (
                isRtl ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )
              ) : isRtl ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        {isSidebarOpen && (
          <div className="flex flex-col overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
            {/* Search Input */}
            <div className="relative mb-3">
              <Search
                className={`absolute top-2.5 h-4 w-4 text-gray-400 pointer-events-none ${
                  isRtl ? "right-3" : "left-3"
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={isRtl ? "ابحث عن منطقة دماغية" : "Search brain regions"}
                placeholder={isRtl ? "بحث في المناطق والوظائف..." : "Search regions, functions..."}
                className={`w-full rounded-xl border border-purple-500/20 bg-[#07070d]/60 py-2 text-xs text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all ${
                  isRtl ? "pr-9 pl-3" : "pl-9 pr-3"
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={`absolute top-2.5 text-xs text-gray-400 hover:text-white ${
                    isRtl ? "left-3" : "right-3"
                  }`}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quiz Mode Banner if active */}
            {quizMode && (
              <div className="mb-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-2.5 text-xs text-emerald-200">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{isRtl ? "وضع الاختبار نشط" : "Quiz Mode Active"}</span>
                </div>
                <p className="mt-1 text-[11px] text-emerald-300/80">
                  {isRtl
                    ? "انقر على النقاط الثلاثية في النموذج للإجابة!"
                    : "Rotate 3D brain and click the target pins to answer questions!"}
                </p>
              </div>
            )}

            {/* Region Tree */}
            <div className="space-y-3">
              {categories.map((cat) => {
                const categoryRegions = filteredRegions.filter((r) => r.category === cat.key);
                if (categoryRegions.length === 0) return null;

                const isCollapsed = collapsedCategories[cat.key];
                const IconComponent = cat.icon;

                return (
                  <div key={cat.key} className="space-y-1">
                    {/* Category Header */}
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.key)}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:bg-purple-950/30 hover:text-purple-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className={`h-3.5 w-3.5 ${cat.color}`} />
                        <span>{isRtl ? cat.titleAr : cat.titleEn}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-purple-900/40 px-1.5 py-0.5 text-[10px] font-mono text-purple-300">
                          {categoryRegions.length}
                        </span>
                        {isCollapsed ? (
                          <Folder className="h-3.5 w-3.5 text-gray-500" />
                        ) : (
                          <FolderOpen className="h-3.5 w-3.5 text-purple-400" />
                        )}
                      </div>
                    </button>

                    {/* Regions List */}
                    {!isCollapsed && (
                      <div className="space-y-1 pl-1">
                        {categoryRegions.map((region) => {
                          const isSelected = selectedRegionId === region.id;
                          const isHovered = hoveredRegionId === region.id;

                          return (
                            <button
                              key={region.id}
                              type="button"
                              onClick={() => selectRegion(region.id)}
                              onMouseEnter={() => setHoveredRegion(region.id)}
                              onMouseLeave={() => setHoveredRegion(null)}
                              className={`group flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs transition-all duration-200 border ${
                                isSelected
                                  ? "border-cyan-400/60 bg-gradient-to-r from-purple-900/60 to-cyan-950/60 text-white shadow-md shadow-cyan-950/50"
                                  : isHovered
                                    ? "border-purple-500/40 bg-purple-900/30 text-purple-200"
                                    : "border-transparent text-gray-300 hover:bg-white/5"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <span
                                  className="h-2 w-2 rounded-full shrink-0 transition-transform group-hover:scale-125"
                                  style={{ backgroundColor: region.color }}
                                />
                                <div className="flex flex-col truncate">
                                  <span className="font-medium truncate">
                                    {isRtl ? region.nameAr : region.nameEn}
                                  </span>
                                  <span className="text-[10px] text-gray-500 font-mono truncate">
                                    {isRtl ? region.nameEn : region.nameAr}
                                  </span>
                                </div>
                              </div>

                              <span
                                className={`text-[10px] font-mono transition-opacity ${
                                  isSelected
                                    ? "text-cyan-300 opacity-100"
                                    : "text-gray-500 opacity-0 group-hover:opacity-100"
                                }`}
                              >
                                {isRtl ? "عرض ↗" : "View ↗"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredRegions.length === 0 && (
              <div
                className="rounded-xl border border-purple-500/15 bg-purple-950/20 px-3 py-5 text-center"
                aria-live="polite"
              >
                <Search className="mx-auto h-5 w-5 text-gray-500" aria-hidden="true" />
                <p className="mt-2 text-xs font-medium text-gray-300">
                  {isRtl ? "لم نعثر على مناطق مطابقة" : "No matching regions found"}
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  {isRtl ? "جرّب اسمًا أو مصطلحًا آخر." : "Try another name or term."}
                </p>
              </div>
            )}

            {/* Quick Helper Note */}
            <div className="mt-4 border-t border-purple-500/15 pt-3 text-[11px] text-gray-500">
              <p className="leading-relaxed">
                {isRtl
                  ? "💡 انقر على أي منطقة للتكبير التلقائي عليها وفتح ملف الفحص السريري."
                  : "💡 Click any region to automatically fly the camera to it and inspect clinical details."}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
