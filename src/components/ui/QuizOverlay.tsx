"use client";

import { BRAIN_REGIONS, QUIZ_QUESTIONS } from "@/data/brainData";
import { useBrainStore } from "@/store/useBrainStore";
import confetti from "canvas-confetti";
import {
  AlertCircle,
  ArrowRight,
  Award,
  CheckCircle2,
  Flame,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

export function QuizOverlay() {
  const quizMode = useBrainStore((state) => state.quizMode);
  const quizScore = useBrainStore((state) => state.quizScore);
  const quizStreak = useBrainStore((state) => state.quizStreak);
  const currentQuizIndex = useBrainStore((state) => state.currentQuizIndex);
  const quizState = useBrainStore((state) => state.quizState);
  const lastAnswerRegionId = useBrainStore((state) => state.lastAnswerRegionId);
  const exitQuiz = useBrainStore((state) => state.exitQuiz);
  const nextQuizQuestion = useBrainStore((state) => state.nextQuizQuestion);
  const resetQuiz = useBrainStore((state) => state.resetQuiz);
  const language = useBrainStore((state) => state.language);

  const [showHint, setShowHint] = useState(false);

  const isRtl = language === "ar";
  const currentQuestion = QUIZ_QUESTIONS[currentQuizIndex];

  // Trigger celebration effects on correct answer or quiz completion
  useEffect(() => {
    if (quizState === "correct") {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#10b981", "#34d399", "#06b6d4", "#a855f7"],
      });
    } else if (quizState === "completed") {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#ec4899", "#06b6d4", "#fbbf24", "#10b981"],
      });
    }
  }, [quizState]);

  // Reset hint state on question change
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset hint on question change
  useEffect(() => {
    setShowHint(false);
  }, [currentQuizIndex]);

  if (!quizMode) return null;

  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuizIndex + 1) / totalQuestions) * 100);

  const targetRegion = currentQuestion
    ? BRAIN_REGIONS.find((r) => r.id === currentQuestion.targetRegionId)
    : null;

  const answeredRegion = lastAnswerRegionId
    ? BRAIN_REGIONS.find((r) => r.id === lastAnswerRegionId)
    : null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-4 sm:p-6"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Top Floating Quiz Status Bar */}
      <div className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-purple-500/25 bg-[#0d0d18]/85 p-3.5 shadow-2xl shadow-purple-950/60 backdrop-blur-xl max-w-xl mx-auto w-full">
        {/* Score & Streak */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
            <Trophy className="h-4 w-4 text-cyan-400" />
            <span>
              {isRtl ? "النقاط:" : "Score:"} {quizScore}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
            <Flame className="h-4 w-4 animate-bounce text-amber-400" />
            <span>
              {quizStreak} {isRtl ? "متتالية" : "Streak"}
            </span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-mono text-purple-300">
              {currentQuizIndex + 1} / {totalQuestions}
            </span>
          </div>

          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <button
            type="button"
            onClick={exitQuiz}
            title={isRtl ? "إنهاء الاختبار" : "Exit Quiz"}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Center Completed Modal */}
      {quizState === "completed" ? (
        <div className="pointer-events-auto mx-auto my-auto flex max-w-md flex-col items-center rounded-3xl border border-emerald-500/40 bg-[#0d0d18]/95 p-6 sm:p-8 text-center shadow-2xl shadow-emerald-950/60 backdrop-blur-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-xl shadow-emerald-500/30">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#07070d]">
              <Award className="h-8 w-8 text-emerald-400" />
            </div>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-white tracking-tight">
            {isRtl ? "تهانينا! أنهيت الاختبار بنجاح" : "Neuroanatomy Mastered!"}
          </h2>
          <p className="mt-2 text-xs text-gray-300 leading-relaxed">
            {isRtl
              ? "لقد أتممت جميع الأسئلة التشريحية والحالات السريرية بدقة فائقة!"
              : "You have successfully navigated through the clinical cases and anatomical landmarks!"}
          </p>

          <div className="mt-6 flex items-center justify-center gap-6 rounded-2xl border border-purple-500/20 bg-purple-950/20 px-6 py-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400">
                {isRtl ? "المجموع الكلي" : "Final Score"}
              </div>
              <div className="text-xl font-bold text-cyan-300">{quizScore} pts</div>
            </div>
            <div className="h-8 w-[1px] bg-purple-500/20" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400">
                {isRtl ? "أعلى متتالية" : "Max Streak"}
              </div>
              <div className="text-xl font-bold text-amber-400">🔥 {quizStreak}</div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={resetQuiz}
              className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/50 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-900/60 transition-all shadow-lg"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{isRtl ? "إعادة الاختبار" : "Play Again"}</span>
            </button>
            <button
              type="button"
              onClick={exitQuiz}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-5 py-2 text-xs font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-purple-950/50"
            >
              <span>{isRtl ? "العودة للوضع الحر" : "Back to Free Lab"}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Bottom Active Question Card */
        <div className="pointer-events-auto mx-auto max-w-xl w-full rounded-2xl border border-purple-500/30 bg-[#0d0d18]/90 p-5 shadow-2xl shadow-purple-950/80 backdrop-blur-2xl transition-all mb-20">
          {/* Question Type Tag */}
          <div className="flex items-center justify-between">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider border ${
                currentQuestion?.type === "clinical"
                  ? "bg-amber-950/60 text-amber-300 border-amber-500/40"
                  : "bg-cyan-950/60 text-cyan-300 border-cyan-500/40"
              }`}
            >
              {currentQuestion?.type === "clinical"
                ? isRtl
                  ? "🩺 حالة سريرية (Clinical Case)"
                  : "🩺 Clinical Vignette"
                : isRtl
                  ? "🎯 تحديد تشريحي (Identification)"
                  : "🎯 Anatomical Identification"}
            </span>

            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              {isRtl ? "انقر على النقطة المستهدفة في المخ" : "Click the target pin on the 3D brain"}
            </span>
          </div>

          {/* Question Prompt */}
          <h3 className="mt-3 text-sm font-semibold text-white leading-relaxed">
            {isRtl ? currentQuestion?.promptAr : currentQuestion?.promptEn}
          </h3>

          {/* Feedback Section (When answered) */}
          {quizState === "correct" && (
            <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs text-emerald-200 animate-fadeIn">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold text-emerald-300 block">
                  {isRtl ? "إجابة صحيحة ومتقنة! ✓" : "Correct Diagnosis! ✓"}
                </span>
                <p className="mt-1 text-gray-300 leading-relaxed">
                  {isRtl ? currentQuestion?.explanationAr : currentQuestion?.explanationEn}
                </p>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={nextQuizQuestion}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black hover:bg-emerald-400 transition-colors shadow-md shadow-emerald-500/30"
                  >
                    <span>{isRtl ? "السؤال التالي" : "Next Question"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {quizState === "incorrect" && (
            <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs text-rose-200 animate-fadeIn">
              <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold text-rose-300 block">
                  {isRtl ? "إجابة غير دقيقة! ✗" : "Incorrect Target! ✗"}
                </span>
                <p className="mt-0.5 text-gray-300">
                  {isRtl
                    ? `اخترت: ${answeredRegion?.nameAr || "منطقة أخرى"}. حاول مرة أخرى!`
                    : `You selected: ${answeredRegion?.nameEn || "another region"}. Give it another try!`}
                </p>
                <p className="mt-1 text-xs text-amber-300 italic">
                  💡 {isRtl ? currentQuestion?.hintAr : currentQuestion?.hintEn}
                </p>
              </div>
            </div>
          )}

          {/* Hint Toggle during answering */}
          {quizState === "answering" && (
            <div className="mt-3 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 text-gray-400 hover:text-cyan-300 transition-colors"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>
                  {showHint
                    ? isRtl
                      ? "إخفاء التلميح"
                      : "Hide Hint"
                    : isRtl
                      ? "هل تحتاج تلميحاً؟"
                      : "Need a hint?"}
                </span>
              </button>

              {showHint && (
                <span className="rounded-lg bg-purple-950/40 px-2.5 py-1 text-[11px] text-purple-200 border border-purple-500/30">
                  💡 {isRtl ? currentQuestion?.hintAr : currentQuestion?.hintEn}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
