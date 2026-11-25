"use client";

import { BRAIN_REGIONS } from "@/data/brainData";
import {
  CLINICAL_CASES,
  PATHWAYS,
  SECTION_PLANES,
  SOURCES,
  type SourceId,
  type StudyStructure,
  VESSELS,
  t,
} from "@/data/studyData";
import { useBrainStore } from "@/store/useBrainStore";
import { useStudyStore } from "@/store/useStudyStore";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  HeartPulse,
  Languages,
  Layers,
  RotateCcw,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";

const MODES = [
  { id: "anatomy", name: t("Anatomy", "التشريح"), icon: Brain },
  { id: "pathways", name: t("Pathways", "المسارات"), icon: GitBranch },
  { id: "sections", name: t("Sections", "المقاطع"), icon: Layers },
  { id: "clinical", name: t("Cases", "الحالات"), icon: Stethoscope },
  { id: "vascular", name: t("Vessels", "الأوعية"), icon: HeartPulse },
  { id: "references", name: t("References", "المراجع"), icon: BookOpen },
] as const;

export function SourceLinks({ ids }: { ids: SourceId[] }) {
  const language = useBrainStore((s) => s.language);
  return (
    <div className="study-sources">
      <h3>{language === "ar" ? "المصادر والقراءة الإضافية" : "Sources & further reading"}</h3>
      {ids.map((id) => (
        <a key={id} href={SOURCES[id].url} target="_blank" rel="noopener noreferrer" dir="ltr">
          {SOURCES[id].title}
          <ExternalLink size={13} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

export function StudyNavigation() {
  const mode = useStudyStore((s) => s.mode);
  const setMode = useStudyStore((s) => s.setMode);
  const language = useBrainStore((s) => s.language);
  const toggleLanguage = useBrainStore((s) => s.toggleLanguage);
  return (
    <header className="study-navigation" dir={language === "ar" ? "rtl" : "ltr"}>
      <a href="/" className="study-brand">
        <Brain size={22} />
        <span>
          NeuroAtlas <small>LEARNING LAB</small>
        </span>
      </a>
      <nav aria-label={language === "ar" ? "أوضاع الدراسة" : "Study modes"}>
        {MODES.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-current={mode === id ? "page" : undefined}
            onClick={() => setMode(id)}
          >
            <Icon size={16} />
            <span>{name[language]}</span>
          </button>
        ))}
      </nav>
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      >
        <Languages size={18} />
        <span>{language === "ar" ? "EN" : "عربي"}</span>
      </button>
    </header>
  );
}

function StructureDetails({ structure }: { structure: StudyStructure }) {
  const language = useBrainStore((s) => s.language);
  return (
    <>
      <div className="study-detail-heading">
        <span style={{ background: structure.color }} />
        <h2>{structure.name[language]}</h2>
      </div>
      <p>{structure.summary[language]}</p>
      <h3>{language === "ar" ? "تتبّع الاتصال" : "Trace the connection"}</h3>
      <ol className="study-steps">
        {structure.steps.map((step, i) => (
          <li key={step.en}>
            <span>{i + 1}</span>
            {step[language]}
          </li>
        ))}
      </ol>
      <h3>{language === "ar" ? "المناطق المرتبطة" : "Connected regions"}</h3>
      <div className="study-region-chips">
        {structure.regionIds.map((id) => {
          const region = BRAIN_REGIONS.find((r) => r.id === id);
          if (!region) return null;
          return <span key={id}>{language === "ar" ? region.nameAr : region.nameEn}</span>;
        })}
      </div>
      <div className="study-callout">
        <h3>{language === "ar" ? "ارتباط سريري" : "Clinical connection"}</h3>
        <p>{structure.clinical[language]}</p>
      </div>
      <SourceLinks ids={structure.sources} />
    </>
  );
}

function Sections() {
  const language = useBrainStore((s) => s.language);
  const axis = useBrainStore((s) => s.clippingAxis);
  const offset = useBrainStore((s) => s.clippingOffset);
  const setAxis = useBrainStore((s) => s.setClippingAxis);
  const setOffset = useBrainStore((s) => s.setClippingOffset);
  const setView = useStudyStore((s) => s.setView);
  const plane = SECTION_PLANES.find((p) => p.id === axis) ?? SECTION_PLANES[0];
  return (
    <>
      <div className="study-selector">
        {SECTION_PLANES.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={axis === p.id}
            onClick={() => {
              setAxis(p.id);
              setOffset(0);
              setView(p.id);
            }}
          >
            {p.name[language]}
          </button>
        ))}
      </div>
      <h2>{plane.name[language]}</h2>
      <p>{plane.description[language]}</p>
      <label className="study-slider-label" htmlFor="section-depth">
        {language === "ar" ? "موضع مستوى القطع" : "Section plane position"}
        <output htmlFor="section-depth" dir="ltr">
          {(-offset).toFixed(2)}
        </output>
      </label>
      <input
        id="section-depth"
        type="range"
        min={-1.25}
        max={1.25}
        step={0.01}
        value={-offset}
        onChange={(e) => setOffset(-Number(e.target.value))}
        className="study-range"
      />
      <div className="study-actions">
        <button
          type="button"
          onClick={() => {
            setOffset(0);
            setView(axis);
          }}
        >
          <RotateCcw size={16} />
          {language === "ar" ? "توسيط ومحاذاة" : "Center & align"}
        </button>
        <button type="button" onClick={() => setView("overview")}>
          {language === "ar" ? "عرض ثلاثي الأبعاد" : "3D overview"}
        </button>
      </div>
      <div className="study-callout">
        <h3>{language === "ar" ? "ماذا يعرض هذا الوضع؟" : "What am I viewing?"}</h3>
        <p>
          {language === "ar"
            ? "المستوى الأزرق يوضح مكان القطع في شبكة سطح الدماغ. لا يحتوي النموذج على حجم نسيجي داخلي، لذا السطح المفتوح ليس مقطع MRI ولا يُظهر أنوية أو بطينات داخلية."
            : "The blue plane marks a cut through the brain surface mesh. This model has no internal tissue volume: the open surface is not an MRI slice and does not show internal nuclei or ventricles."}
        </p>
      </div>
      <p className="study-muted">
        {language === "ar"
          ? "العلامات تعرض محاور النموذج X وY وZ؛ لا تمثل اصطلاح عرض أشعة معتمدًا. أعد المحاذاة بعد تدوير النموذج."
          : "Labels show model axes X, Y and Z, not a validated radiological orientation. Use Center & align after rotating the model."}
      </p>
      <SourceLinks ids={["planes"]} />
    </>
  );
}

function ClinicalCases() {
  const language = useBrainStore((s) => s.language);
  const setPathway = useStudyStore((s) => s.setPathway);
  const setVessel = useStudyStore((s) => s.setVessel);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);
  const item = CLINICAL_CASES[index];
  const answer = answers[item.id];
  const structures = item.type === "pathway" ? PATHWAYS : VESSELS;
  const score = CLINICAL_CASES.filter((c) => answers[c.id] === c.target).length;
  const reset = () => {
    setIndex(0);
    setAnswers({});
    setFinished(false);
  };
  if (finished)
    return (
      <div className="study-results">
        <CheckCircle2 size={40} />
        <h2>{language === "ar" ? "اكتملت الجولة" : "Session complete"}</h2>
        <p className="study-score">
          {score} / {CLINICAL_CASES.length}
        </p>
        <p>
          {language === "ar"
            ? "راجع تفسير كل حالة؛ النتيجة تعكس الإجابة الأولى."
            : "Review each explanation; the score reflects your first answer."}
        </p>
        <button type="button" onClick={reset}>
          {language === "ar" ? "إعادة الحالات" : "Restart cases"}
        </button>
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setFinished(false);
          }}
        >
          {language === "ar" ? "مراجعة الإجابات" : "Review answers"}
        </button>
      </div>
    );
  return (
    <>
      <p className="study-eyebrow">
        {language === "ar" ? "حالة تعليمية خيالية" : "FICTIONAL TEACHING CASE"} · {index + 1}/
        {CLINICAL_CASES.length}
      </p>
      <h2>{item.title[language]}</h2>
      <p className="study-case-prompt">{item.prompt[language]}</p>
      <div className="study-options">
        {item.options.map((id) => {
          const structure = structures.find((s) => s.id === id);
          if (!structure) return null;
          return (
            <button
              type="button"
              key={id}
              disabled={!!answer}
              className={
                answer ? (id === item.target ? "correct" : id === answer ? "incorrect" : "") : ""
              }
              onClick={() => {
                setAnswers((prev) => ({ ...prev, [item.id]: id }));
                item.type === "pathway" ? setPathway(item.target) : setVessel(item.target);
              }}
            >
              {structure.name[language]}
              {answer && id === item.target && <CheckCircle2 size={16} />}
            </button>
          );
        })}
      </div>
      {answer && (
        <div aria-live="polite" className="study-callout">
          <h3>
            {answer === item.target
              ? language === "ar"
                ? "إجابة صحيحة"
                : "Correct"
              : language === "ar"
                ? "راجع الرابط التشريحي"
                : "Review the anatomical connection"}
          </h3>
          <p>{item.explanation[language]}</p>
          <SourceLinks ids={item.sources} />
        </div>
      )}
      <div className="study-actions">
        <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>
          {language === "ar" ? "السابق" : "Previous"}
        </button>
        <button
          type="button"
          disabled={!answer}
          onClick={() =>
            index === CLINICAL_CASES.length - 1 ? setFinished(true) : setIndex(index + 1)
          }
        >
          {index === CLINICAL_CASES.length - 1
            ? language === "ar"
              ? "النتيجة"
              : "Finish"
            : language === "ar"
              ? "الحالة التالية"
              : "Next case"}
        </button>
      </div>
      <p className="study-muted">
        {language === "ar"
          ? "اختر إجابة ليظهر التفسير، ثم استكشف البنية المرتبطة في وضع المسارات أو الأوعية."
          : "Choose an answer to reveal the explanation, then explore the structure in Pathways or Vessels."}
      </p>
    </>
  );
}

export function StudyWorkspace() {
  const mode = useStudyStore((s) => s.mode);
  const pathway = useStudyStore((s) => s.selectedPathway);
  const vessel = useStudyStore((s) => s.selectedVessel);
  const setPathway = useStudyStore((s) => s.setPathway);
  const setVessel = useStudyStore((s) => s.setVessel);
  const language = useBrainStore((s) => s.language);
  if (mode === "anatomy") return null;
  const structures = mode === "pathways" ? PATHWAYS : VESSELS;
  const selected =
    structures.find((s) => s.id === (mode === "pathways" ? pathway : vessel)) ?? structures[0];
  const name = MODES.find((m) => m.id === mode)?.name[language];
  return (
    <>
      <div className="study-scene-caption" dir={language === "ar" ? "rtl" : "ltr"}>
        <span>NEUROATLAS / {name}</span>
        <p>
          {language === "ar"
            ? "اسحب للتدوير · قرّب لاستكشاف التفاصيل"
            : "Drag to rotate · zoom to explore"}
        </p>
        {(mode === "pathways" || mode === "vascular") && (
          <strong>
            {language === "ar"
              ? "تمثيل تخطيطي تقريبي — ليس إعادة بناء تصويرية"
              : "Approximate schematic · not an imaging reconstruction"}
          </strong>
        )}
      </div>
      <aside className="study-panel" aria-label={name} dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="study-panel-heading">
          <p className="study-eyebrow">{language === "ar" ? "مختبر التعلّم" : "LEARNING LAB"}</p>
          <h1>{name}</h1>
        </div>
        <div className="study-panel-body">
          {(mode === "pathways" || mode === "vascular") && (
            <>
              <div className="study-selector vertical">
                {structures.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    aria-pressed={selected.id === s.id}
                    onClick={() => (mode === "pathways" ? setPathway(s.id) : setVessel(s.id))}
                  >
                    <span style={{ background: s.color }} />
                    {s.name[language]}
                  </button>
                ))}
              </div>
              <StructureDetails structure={selected} />
            </>
          )}
          {mode === "sections" && <Sections />}
          {mode === "clinical" && <ClinicalCases />}
          {mode === "references" && (
            <>
              <h2>{language === "ar" ? "اقرأ ما وراء النموذج" : "Read beyond the model"}</h2>
              <p>
                {language === "ar"
                  ? "ترتبط الشروح الجديدة بمصادرها مباشرةً. مراجع المناطق تدعم الموضوع العام ولا تمثل تدقيقًا لكل عبارة في المحتوى القديم. المادة التعليمية لم تخضع لمراجعة سريرية مستقلة."
                  : "New explanations link directly to their sources. Region references support the topic, and are not a claim-by-claim audit of legacy content. The teaching material has not had independent clinical review."}
              </p>
              {Object.entries(SOURCES).map(([id, source]) => (
                <div key={id} className="study-reference-card">
                  <p>{source.topic[language]}</p>
                  <SourceLinks ids={[id as SourceId]} />
                </div>
              ))}
              <p className="study-muted">
                {language === "ar"
                  ? "المجسمات التخطيطية مرسومة برمجيًا. النموذج السطحي الموجود بالمشروع لا يوفر نسيجًا داخليًا أو معلومات ألياف أو أوعية مُجزّأة."
                  : "Schematic geometry is authored in code. The existing surface asset has no internal tissue, tractography or segmented vessel data."}
              </p>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
