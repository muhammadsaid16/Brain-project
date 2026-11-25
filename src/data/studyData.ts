import type { ClippingAxis } from "@/types/brain";

export type Localized = { en: string; ar: string };
export type Point3 = [number, number, number];
export type StudyMode =
  | "anatomy"
  | "pathways"
  | "sections"
  | "clinical"
  | "vascular"
  | "references";
export const t = (en: string, ar: string): Localized => ({ en, ar });

export const SOURCES = {
  cortex: {
    title: "Purves et al. — The Lateral Surface of the Brain",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK10811/",
    topic: t("Cortical landmarks and regional functions", "المعالم القشرية ووظائف المناطق"),
  },
  overview: {
    title: "NINDS — Brain Basics: Know Your Brain",
    url: "https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-know-your-brain",
    topic: t("Brain regions, cerebellum and brainstem", "مناطق الدماغ والمخيخ وجذع الدماغ"),
  },
  motor: {
    title: "StatPearls — Neuroanatomy, Corticospinal Cord Tract",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK535423/",
    topic: t("Descending motor pathway and crossing", "المسار الحركي النازل والتصالب"),
  },
  language: {
    title: "StatPearls — Conduction Aphasia",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK537006/",
    topic: t("Repetition deficits and the language network", "اضطراب التكرار وشبكة اللغة"),
  },
  arcuate: {
    title: "Bernal & Ardila (2009) — The role of the arcuate fasciculus in conduction aphasia",
    url: "https://pubmed.ncbi.nlm.nih.gov/19690094/",
    topic: t("Limits of the classical disconnection model", "حدود نموذج الانفصال التقليدي"),
  },
  vision: {
    title: "Glisson — Visual Loss Due to Optic Chiasm and Retrochiasmal Visual Pathway Lesions",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10564022/",
    topic: t("Visual fields and optic radiation lesions", "المجال البصري وآفات الإشعاع البصري"),
  },
  blood: {
    title: "Purves et al. — The Blood Supply of the Brain and Spinal Cord",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK11042/",
    topic: t("Anterior and posterior circulation", "الدوران الأمامي والخلفي"),
  },
  territories: {
    title: "StatPearls — Neuroanatomy, Cerebral Blood Supply",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK532297/",
    topic: t(
      "Arterial territories and clinical correlations",
      "الأقاليم الشريانية والارتباطات السريرية"
    ),
  },
  planes: {
    title: "OpenStax — Anatomical Terminology",
    url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/1-6-anatomical-terminology",
    topic: t("Sagittal, frontal and transverse planes", "المستويات السهمية والإكليلية والمستعرضة"),
  },
} satisfies Record<string, { title: string; url: string; topic: Localized }>;
export type SourceId = keyof typeof SOURCES;

export const REGION_SOURCES: Record<string, SourceId[]> = {
  "frontal-lobe": ["cortex", "motor", "territories"],
  "parietal-lobe": ["cortex", "territories"],
  "temporal-lobe": ["cortex", "vision", "territories"],
  "occipital-lobe": ["cortex", "vision", "territories"],
  cerebellum: ["overview", "blood"],
  brainstem: ["overview", "motor", "blood"],
  "brocas-area": ["language", "arcuate", "territories"],
  "wernickes-area": ["language", "arcuate", "territories"],
};

export interface StudyStructure {
  id: string;
  name: Localized;
  color: string;
  summary: Localized;
  clinical: Localized;
  steps: Localized[];
  regionIds: string[];
  sources: SourceId[];
  curves: Point3[][];
}

// Hand-authored schematic curves in the normalized model space; not tractography.
export const PATHWAYS: StudyStructure[] = [
  {
    id: "arcuate",
    name: t("Arcuate fasciculus", "الحزمة القوسية"),
    color: "#a78bfa",
    summary: t(
      "A dorsal language connection between posterior temporal and frontal language regions; supports speech processing and repetition.",
      "اتصال لغوي ظهري بين المناطق الصدغية الخلفية والجبهية، يساهم في معالجة الكلام وتكراره."
    ),
    clinical: t(
      "Impaired repetition can accompany damage to this network. Conduction aphasia cannot be reduced to a single tract lesion.",
      "قد يصاحب تلف هذه الشبكة ضعف تكرار الكلام. ولا تُختزل الحبسة التوصيلية في آفة مسار واحد."
    ),
    steps: [
      t("Posterior temporal language regions", "مناطق اللغة الصدغية الخلفية"),
      t("Dorsal perisylvian white matter", "المادة البيضاء الظهرية حول شق سيلفيوس"),
      t("Inferior frontal language regions", "مناطق اللغة الجبهية السفلية"),
    ],
    regionIds: ["wernickes-area", "brocas-area"],
    sources: ["language", "arcuate"],
    curves: [
      [
        [-0.95, 0.35, -0.25],
        [-0.85, 0.85, -0.4],
        [-0.7, 0.95, 0.1],
        [-0.9, 0.4, 0.65],
      ],
    ],
  },
  {
    id: "corticospinal",
    name: t("Corticospinal tract", "السبيل القشري الشوكي"),
    color: "#34d399",
    summary: t(
      "Descending fibers link motor cortex with spinal motor circuits for voluntary movement. Most cross in the caudal medulla.",
      "تربط ألياف نازلة القشرة الحركية بالدوائر الحركية الشوكية للحركة الإرادية، ويعبر معظمها في النخاع المستطيل السفلي."
    ),
    clinical: t(
      "A lesion above the pyramidal crossing may cause weakness on the opposite side. This schematic ends near the cervicomedullary junction.",
      "قد تسبب الآفة أعلى التصالب الهرمي ضعفًا في الجهة المقابلة. ينتهي الرسم قرب الوصل البصلي الرقبي."
    ),
    steps: [
      t("Motor cortex", "القشرة الحركية"),
      t("Internal capsule", "المحفظة الداخلية"),
      t("Midbrain → pons → medullary pyramids", "الدماغ المتوسط ← الجسر ← أهرام النخاع المستطيل"),
      t("Pyramidal crossing → spinal cord", "التصالب الهرمي ← النخاع الشوكي"),
    ],
    regionIds: ["frontal-lobe", "brainstem"],
    sources: ["motor"],
    curves: [
      [
        [-0.45, 0.95, 0.3],
        [-0.32, 0.45, 0.15],
        [-0.2, -0.1, 0.05],
        [-0.12, -0.7, 0.02],
        [0.12, -1.2, 0],
      ],
      [
        [0.45, 0.95, 0.3],
        [0.32, 0.45, 0.15],
        [0.2, -0.1, 0.05],
        [0.12, -0.7, 0.02],
        [-0.12, -1.2, 0],
      ],
    ],
  },
  {
    id: "optic",
    name: t("Optic radiations", "الإشعاعات البصرية"),
    color: "#fbbf24",
    summary: t(
      "Fibers carry visual signals from the lateral geniculate nucleus to primary visual cortex via temporal and parietal routes.",
      "تنقل الألياف الإشارات البصرية من النواة الركبية الوحشية إلى القشرة البصرية الأولية عبر مسارين صدغي وجداري."
    ),
    clinical: t(
      "Temporal (Meyer loop) injury can cause opposite upper-quadrant field loss; parietal radiation injury can affect the opposite lower quadrant.",
      "قد تؤدي إصابة عروة ماير الصدغية إلى فقد الربع العلوي المقابل من المجال البصري، وإصابة الألياف الجدارية إلى فقد الربع السفلي المقابل."
    ),
    steps: [
      t("Lateral geniculate nucleus", "النواة الركبية الوحشية"),
      t("Temporal / parietal white matter", "المادة البيضاء الصدغية / الجدارية"),
      t("Occipital visual cortex", "القشرة البصرية القذالية"),
    ],
    regionIds: ["temporal-lobe", "parietal-lobe", "occipital-lobe"],
    sources: ["vision"],
    curves: [
      [
        [-0.3, 0.1, 0],
        [-0.65, -0.1, 0.4],
        [-0.75, 0, -0.6],
        [-0.45, 0.35, -1],
      ],
      [
        [-0.3, 0.1, 0],
        [-0.6, 0.65, -0.35],
        [-0.45, 0.35, -1],
      ],
    ],
  },
];

export const VESSELS: StudyStructure[] = [
  {
    id: "aca",
    name: t("Anterior cerebral artery · ACA", "الشريان المخي الأمامي · ACA"),
    color: "#fb7185",
    summary: t(
      "Supplies much of the medial frontal and parietal cortex, including leg representations.",
      "يغذي جزءًا كبيرًا من القشرة الجبهية والجدارية الإنسية، بما فيها تمثيل الطرف السفلي."
    ),
    clinical: t(
      "Infarction may cause opposite leg-predominant weakness; territories and symptoms vary.",
      "قد يسبب الاحتشاء ضعفًا مقابلًا يغلب على الساق؛ تختلف الأقاليم والأعراض بين الأشخاص."
    ),
    steps: [
      t("Internal carotid circulation", "الدوران السباتي الداخلي"),
      t("Medial frontal and parietal surfaces", "السطوح الجبهية والجدارية الإنسية"),
    ],
    regionIds: ["frontal-lobe", "parietal-lobe"],
    sources: ["blood", "territories"],
    curves: [
      [
        [-0.15, -0.25, 0.45],
        [-0.1, 0.25, 0.9],
        [-0.08, 0.9, 0.55],
        [-0.08, 1.05, -0.4],
      ],
      [
        [0.15, -0.25, 0.45],
        [0.1, 0.25, 0.9],
        [0.08, 0.9, 0.55],
        [0.08, 1.05, -0.4],
      ],
    ],
  },
  {
    id: "mca",
    name: t("Middle cerebral artery · MCA", "الشريان المخي الأوسط · MCA"),
    color: "#f97316",
    summary: t(
      "Supplies much of the lateral hemisphere and deep structures through perforating branches.",
      "يغذي معظم السطح الوحشي لنصف الكرة وبنى عميقة عبر فروع نافذة."
    ),
    clinical: t(
      "Infarction may cause opposite face/arm weakness and language impairment in the dominant hemisphere.",
      "قد يسبب الاحتشاء ضعف الوجه والذراع المقابلين واضطراب اللغة عند إصابة النصف السائد."
    ),
    steps: [
      t("Internal carotid circulation", "الدوران السباتي الداخلي"),
      t("Sylvian fissure → lateral cortex", "شق سيلفيوس ← القشرة الوحشية"),
    ],
    regionIds: ["frontal-lobe", "parietal-lobe", "temporal-lobe", "brocas-area", "wernickes-area"],
    sources: ["blood", "territories"],
    curves: [
      [
        [-0.15, -0.25, 0.45],
        [-0.65, 0, 0.5],
        [-1, 0.3, 0.2],
        [-0.95, 0.75, -0.2],
      ],
      [
        [-0.65, 0, 0.5],
        [-0.95, 0.2, 0.7],
        [-0.85, 0.65, 0.7],
      ],
      [
        [0.15, -0.25, 0.45],
        [0.65, 0, 0.5],
        [1, 0.3, 0.2],
        [0.95, 0.75, -0.2],
      ],
      [
        [0.65, 0, 0.5],
        [0.95, 0.2, 0.7],
        [0.85, 0.65, 0.7],
      ],
    ],
  },
  {
    id: "pca",
    name: t("Posterior cerebral artery · PCA", "الشريان المخي الخلفي · PCA"),
    color: "#f472b6",
    summary: t(
      "Usually arises from the basilar artery and supplies occipital and inferomedial temporal regions.",
      "ينشأ عادةً من الشريان القاعدي ويغذي المناطق القذالية والصدغية السفلية الإنسية."
    ),
    clinical: t(
      "Occipital infarction can cause opposite homonymous visual-field loss.",
      "قد يؤدي احتشاء القشرة القذالية إلى فقد نصف المجال البصري المتجانس المقابل."
    ),
    steps: [
      t("Vertebrobasilar circulation", "الدوران الفقري القاعدي"),
      t("Occipital / inferomedial temporal cortex", "القشرة القذالية / الصدغية السفلية الإنسية"),
    ],
    regionIds: ["occipital-lobe", "temporal-lobe"],
    sources: ["blood", "territories", "vision"],
    curves: [
      [
        [0, -0.8, -0.1],
        [0, -0.25, -0.1],
        [-0.35, -0.1, -0.35],
        [-0.6, 0.15, -0.9],
        [-0.3, 0.55, -1],
      ],
      [
        [0, -0.25, -0.1],
        [0.35, -0.1, -0.35],
        [0.6, 0.15, -0.9],
        [0.3, 0.55, -1],
      ],
    ],
  },
];

export const SECTION_PLANES: {
  id: ClippingAxis;
  name: Localized;
  description: Localized;
  camera: Point3;
  rotation: Point3;
  labels: [string, string, string, string];
}[] = [
  {
    id: "sagittal",
    name: t("Sagittal", "سهمي"),
    description: t(
      "Divides left and right. The central plane is midsagittal.",
      "يفصل اليمين عن اليسار، ويُسمى المستوى المركزي سهميًا ناصفًا."
    ),
    camera: [4, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    labels: ["Y+", "Y−", "Z−", "Z+"],
  },
  {
    id: "coronal",
    name: t("Coronal", "إكليلي"),
    description: t("Divides anterior and posterior portions.", "يفصل الجزء الأمامي عن الخلفي."),
    camera: [0, 0, 4],
    rotation: [0, 0, 0],
    labels: ["Y+", "Y−", "X−", "X+"],
  },
  {
    id: "axial",
    name: t("Axial", "محوري"),
    description: t(
      "Divides superior and inferior portions. View shown from above.",
      "يفصل الجزء العلوي عن السفلي. العرض هنا من الأعلى."
    ),
    camera: [0, 4, 0.001],
    rotation: [-Math.PI / 2, 0, 0],
    labels: ["Z−", "Z+", "X−", "X+"],
  },
];

export const CLINICAL_CASES = [
  {
    id: "repeat",
    title: t("Case 01 · Speech repetition", "الحالة ١ · تكرار الكلام"),
    prompt: t(
      "A patient speaks fluently and follows simple instructions, but struggles to repeat a sentence. Which connection is most relevant in the classical model?",
      "يتكلم مريض بطلاقة ويتبع التعليمات البسيطة، لكنه يجد صعوبة في تكرار جملة. أي اتصال هو الأكثر ارتباطًا بهذا النمط في النموذج التقليدي؟"
    ),
    options: ["arcuate", "corticospinal", "optic"],
    target: "arcuate",
    type: "pathway",
    explanation: t(
      "The dorsal language network supports repetition. The arcuate fasciculus is a useful classical correlate, but cortical and other network lesions can also cause conduction aphasia.",
      "تدعم شبكة اللغة الظهرية التكرار. الحزمة القوسية ارتباط تعليمي تقليدي مفيد، لكن الآفات القشرية وغيرها ضمن الشبكة قد تسبب الحبسة التوصيلية أيضًا."
    ),
    sources: ["language", "arcuate"] as SourceId[],
  },
  {
    id: "motor",
    title: t("Case 02 · Descending motor signals", "الحالة ٢ · الإشارات الحركية النازلة"),
    prompt: t(
      "A small left-sided lesion above the pyramidal crossing produces right-sided weakness. Which descending pathway best explains this finding?",
      "تسبب آفة صغيرة يسارًا أعلى التصالب الهرمي ضعفًا في الجانب الأيمن. أي مسار نازل يفسر ذلك؟"
    ),
    options: ["optic", "arcuate", "corticospinal"],
    target: "corticospinal",
    type: "pathway",
    explanation: t(
      "Most corticospinal fibers cross in the lower medulla. Damage above that crossing can produce weakness on the opposite side of the body.",
      "يعبر معظم ألياف السبيل القشري الشوكي في أسفل النخاع المستطيل؛ لذا قد تسبب إصابته أعلى التصالب ضعفًا في الجهة المقابلة من الجسم."
    ),
    sources: ["motor"] as SourceId[],
  },
  {
    id: "visual",
    title: t("Case 03 · A visual-field clue", "الحالة ٣ · دليل من المجال البصري"),
    prompt: t(
      "An occipital infarct produces loss of the opposite half of the visual field in both eyes. Which major artery is most relevant?",
      "يسبب احتشاء قذالي فقد النصف المقابل من المجال البصري في كلتا العينين. أي شريان رئيسي هو الأكثر ارتباطًا؟"
    ),
    options: ["aca", "mca", "pca"],
    target: "pca",
    type: "vessel",
    explanation: t(
      "The PCA supplies much of the occipital cortex. Injury here can cause contralateral homonymous hemianopia; actual vascular territories vary.",
      "يغذي الشريان المخي الخلفي جزءًا كبيرًا من القشرة القذالية، وقد تؤدي إصابتها إلى عمى نصفي متجانس مقابل؛ وتتباين الأقاليم الوعائية فعليًا."
    ),
    sources: ["territories", "vision"] as SourceId[],
  },
];
