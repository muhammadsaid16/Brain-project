"use client";

import { useBrainStore } from "@/store/useBrainStore";
import { useEffect } from "react";

export function LanguageDocumentSync() {
  const language = useBrainStore((state) => state.language);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return null;
}
