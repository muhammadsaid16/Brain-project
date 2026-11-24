import type { BrainRegion, QuizQuestion } from "@/types/brain";

export const BRAIN_REGIONS: BrainRegion[] = [
  {
    id: "frontal-lobe",
    nameEn: "Frontal Lobe",
    nameAr: "الفص الجبهي",
    latinName: "Lobus frontalis",
    category: "lobes",
    categoryLabelEn: "Cerebral Lobes",
    categoryLabelAr: "فصوص المخ",
    position: [0.35, 0.75, 0.77],
    cameraPosition: [0.6, 1.3, 2.3],
    cameraTarget: [0.35, 0.7, 0.6],
    color: "#8b5cf6", // Purple
    overview: {
      summaryEn:
        "The largest of the four cerebral lobes, situated anterior to the central sulcus. It orchestrates high-order executive functions, planning, motor execution, personality, and expressive communication.",
      summaryAr:
        "أكبر فصوص المخ الأربعة، يقع أمام التلم المركزي. يتولى تنسيق الوظائف التنفيذية العليا، التخطيط، التحكم الحركي، صياغة الشخصية، واللغة التعبيرية.",
      locationEn:
        "Anterior cranial fossa, extending from the frontal pole back to the central sulcus (of Rolando).",
      locationAr: "الحفرة القحفية الأمامية، يمتد من القطب الجبهي حتى التلم المركزي (رولاندو).",
      keyLandmarks: [
        "Precentral Gyrus (Primary Motor Cortex - Brodmann Area 4)",
        "Premotor & Supplementary Motor Areas (Brodmann Area 6)",
        "Prefrontal Cortex (Dorsolateral, Orbitofrontal, Ventromedial)",
        "Frontal Eye Fields (Brodmann Area 8)",
      ],
    },
    functions: {
      en: [
        "Executive control: strategic decision making, working memory, and cognitive flexibility",
        "Primary voluntary motor control via pyramidal Betz cells in the precentral gyrus",
        "Social cognition, emotional impulse regulation, and ethical judgment (Orbitofrontal cortex)",
        "Conjugate voluntary saccadic eye movements (Frontal eye field)",
        "Motivation, initiation, and goal-directed behavioral drive",
      ],
      ar: [
        "التحكم التنفيذي: اتخاذ القرارات الإستراتيجية، الذاكرة العاملة، والمرونة المعرفية",
        "التحكم الحركي الإرادي الأولي عبر الخلايا الهرمية في التلفيف أمام المركزي",
        "الإدراك الاجتماعي وضبط الاندفاع العاطفي والحكم القيمي (القشرة الحجاجية الجبهية)",
        "حركات العين الإرادية السريعة المزدوجة (الحقل البصري الجبهي)",
        "المبادرة، التحفيز، وتوجيه السلوك نحو الأهداف",
      ],
    },
    clinical: {
      syndromesEn: [
        "Frontal Lobe Syndrome (Phineas Gage phenotype)",
        "Contralateral Hemiparesis / Spastic Paralysis",
        "Abulia and Akinetic Mutism (Bilateral lesions)",
        "Utilization Behavior & Disinhibition",
      ],
      syndromesAr: [
        "متلازمة الفص الجبهي (نمط فينياس غيج)",
        "شلل نصفي تشنجي في الجانب المعاكس",
        "الخرس الحركي وانعدام الإرادة (في الآفات الثنائية)",
        "فقدان الكبح والسلوك الاستغلالي البيئي",
      ],
      symptomsEn: [
        "Profound personality alteration with loss of social decorum and emotional lability",
        "Impaired abstract reasoning, mental set shifting, and perseverance on tasks",
        "Emergence of primitive reflexes (grasp, snout, palmomental)",
        "Gait apraxia (Bruns ataxia or magnetic gait)",
      ],
      symptomsAr: [
        "تغير عميق في الشخصية مع فقدان الحياء الاجتماعي وتقلب العواطف",
        "صعوبة في التفكير المجرد والمواظبة المرضية على أنماط تفكير متكررة",
        "ظهور المنعكسات البدائية (منعكس القبض والرشف)",
        "تعذر الأداء الحركي للمشي (المشية المغناطيسية)",
      ],
      classicCaseEn:
        "A 48-year-old executive presents with marked apathy, inappropriate jokes in professional settings, reckless financial decisions, and poor grooming, following a bifrontal meningioma.",
      classicCaseAr:
        "مريض يبلغ 48 عاماً يظهر تبلداً عاطفياً، مزاحاً غير لائق في بيئة العمل، قرارات مالية متهورة، وإهمالاً للنظافة الشخصية إثر ورم سحائي جبهي مزدوج.",
    },
    vascularSupply: {
      arteriesEn: [
        "Anterior Cerebral Artery (ACA) - Medial aspect and superior border (motor cortex for lower limb)",
        "Middle Cerebral Artery (MCA) - Lateral convexity (motor cortex for face and upper limb)",
      ],
      arteriesAr: [
        "الشريان المخي الأمامي (ACA) - الوجه الإنسي والحافة العلوية (القشرة الحركية للطرف السفلي)",
        "الشريان المخي الأوسط (MCA) - التحدب الجانبي (القشرة الحركية للوجه والطرف العلوي)",
      ],
      strokeManifestationEn:
        "ACA occlusion triggers contralateral leg-predominant weakness and transcortical motor aphasia; MCA occlusion causes contralateral face/arm hemiplegia and expressive language deficit.",
      strokeManifestationAr:
        "انسداد ACA يسبب ضعفاً أغلبياً في الطرف السفلي المقابل، بينما انسداد MCA يسبب شللاً نصفياً للوجه والذراع وحبسة تعبيرية.",
    },
  },
  {
    id: "parietal-lobe",
    nameEn: "Parietal Lobe",
    nameAr: "الفص الجداري",
    latinName: "Lobus parietalis",
    category: "lobes",
    categoryLabelEn: "Cerebral Lobes",
    categoryLabelAr: "فصوص المخ",
    position: [0.22, 1.16, -0.2],
    cameraPosition: [0.5, 2.6, 0.4],
    cameraTarget: [0.15, 0.8, -0.1],
    color: "#06b6d4", // Cyan
    overview: {
      summaryEn:
        "Located behind the central sulcus and superior to the lateral fissure. It is the primary sensory processing hub that seamlessly maps somatosensory feedback, spatial navigation, and multisensory integration.",
      summaryAr:
        "يقع خلف التلم المركزي وفوق الشق الجانبي. يعد المركز الأساسي لمعالجة الإحساس الجسدي، وتكامل الخرائط المكانية والوعي الحيزي للمحيط والجسد.",
      locationEn:
        "Parieto-occipital cranial vault bounded anteriorly by central sulcus, posteriorly by parieto-occipital sulcus.",
      locationAr: "القبو القحفي الجداري، يحده أماماً التلم المركزي وخلفاً التلم الجداري القذالي.",
      keyLandmarks: [
        "Postcentral Gyrus (Primary Somatosensory Cortex - Brodmann Areas 3, 1, 2)",
        "Superior Parietal Lobule (Spatial orientation & stereognosis)",
        "Inferior Parietal Lobule (Supramarginal & Angular Gyri)",
        "Intraparietal Sulcus",
      ],
    },
    functions: {
      en: [
        "Primary somatosensory reception (tactile localization, vibration, 2-point discrimination, proprioception)",
        "Somatotopic representation across the sensory homunculus",
        "Spatial coordinate transformation and visual-motor guidance for grasping",
        "Calculation, arithmetic cognition, and reading comprehension (dominant angular gyrus)",
        "Hemispatial attention and body schema representation (non-dominant right parietal)",
      ],
      ar: [
        "استقبال الإحساس الجسدي الأولي (اللمس، الاهتزاز، التمييز بين نقطتين، وحس الوضعية)",
        "التمثيل الجسدي النطاقي عبر قزم الإحساس (Sensory Homunculus)",
        "تحويل الإحداثيات المكانية والتوجيه البصري الحركي لالتقاط الأشياء",
        "القدرات الحسابية، التجريد العددي، وقراءة الرموز (التلفيف الزاوي السائد)",
        "الانتباه المكاني النصفي والمخطط التخيلي لهيئة الجسد (الفص الجداري الأيمن غير السائد)",
      ],
    },
    clinical: {
      syndromesEn: [
        "Gerstmann Syndrome (Dominant inferior parietal lobule)",
        "Contralateral Hemispatial Neglect (Non-dominant right parietal)",
        "Balint Syndrome (Bilateral parieto-occipital watershed lesions)",
        "Astereognosis & Agraphesthesia",
      ],
      syndromesAr: [
        "متلازمة غيرستمان (الفصيص الجداري السفلي السائد)",
        "متلازمة الإهمال المكاني النصفي (الفص الجداري الأيمن غير السائد)",
        "متلازمة بالينت (آفات احتشائية ثنائية جدارية قذالية)",
        "تعذر تعرف المجسمات باللمس (Astereognosis) وفقد الإحساس بالرسم الجلدي",
      ],
      symptomsEn: [
        "Gerstmann tetrad: Finger agnosia, right-left disorientation, agraphia, and acalculia",
        "Complete disregard of contralateral visual/tactile field (shaving half of face, eating half of plate)",
        "Optic ataxia, ocular apraxia, and simultanagnosia (in Balint syndrome)",
        "Loss of cortical sensation while crude pain and temperature remain intact",
      ],
      symptomsAr: [
        "رباعية غيرستمان: تعذر تمييز الأصابع، خلط اليمين واليسار، تعذر الكتابة، وتعذر الحساب",
        "تجاهل تام للجانب المعاكس من العالم الحسي (حلاقة نصف الوجه فقط، أكل نصف الطبق)",
        "رنح بصري، تعذر حركة العين الإرادية، وتعذر الإدراك البصري المتزامن (بالينت)",
        "فقدان الإحساس القشري المعقد مع بقاء الألم الخام والحرارة سليمين",
      ],
      classicCaseEn:
        "A 64-year-old stroke survivor persistently denies that his left arm belongs to him (asomatognosia) and collides with doorframes on his left side despite intact visual fields.",
      classicCaseAr:
        "مريض يبلغ 64 عاماً بعد جلطة دماغية ينكر أن يده اليسرى تخصه، ويصطدم بجوانب الأبواب على يساره رغم سلامة مجال الرؤية الأولي.",
    },
    vascularSupply: {
      arteriesEn: [
        "Middle Cerebral Artery (MCA) - Inferior and superior parietal lobules on lateral hemisphere",
        "Anterior Cerebral Artery (ACA) - Medial surface, posterior paracentral lobule",
      ],
      arteriesAr: [
        "الشريان المخي الأوسط (MCA) - الفصيصات الجدارية العلوية والسفلية على التحدب الخارجي",
        "الشريان المخي الأمامي (ACA) - السطح الإنسي والفصيص حول المركزي الخلفي",
      ],
      strokeManifestationEn:
        "Right MCA inferior division stroke yields left hemineglect and sensory extinction. Dominant MCA stroke yields Gerstmann syndrome and conduction aphasia.",
      strokeManifestationAr:
        "انسداد الفرع السفلي للـ MCA الأيمن ينتج إهمالاً نصفياً أيسر، بينما انسداد الجانب السائد يسبب متلازمة غيرستمان وحبسة توصيلية.",
    },
  },
  {
    id: "temporal-lobe",
    nameEn: "Temporal Lobe",
    nameAr: "الفص الصدغي",
    latinName: "Lobus temporalis",
    category: "lobes",
    categoryLabelEn: "Cerebral Lobes",
    categoryLabelAr: "فصوص المخ",
    position: [-1.21, 0.07, 0.16],
    cameraPosition: [-2.9, 0.5, 0.6],
    cameraTarget: [-0.9, 0.05, 0.15],
    color: "#ec4899", // Rose Pink
    overview: {
      summaryEn:
        "Situated inferior to the lateral sulcus. It houses the primary auditory cortex, receptive language architecture, and the medial temporal hippocampal formation essential for episodic memory consolidation.",
      summaryAr:
        "يقع أسفل الشق الجانبي (سيلفيوس). يضم القشرة السمعية الأولية، مراكز فهم اللغة وتفسيرها، والتراكيب الحوفية الإنسية (الحصين) المسؤولة عن تحويل الذاكرة العرضية وترسيخها.",
      locationEn:
        "Middle cranial fossa, beneath the Sylvian fissure extending anteriorly to the temporal pole.",
      locationAr: "الحفرة القحفية الوسطى، أسفل شق سيلفيوس ممتداً للأمام حتى القطب الصدغي.",
      keyLandmarks: [
        "Superior Temporal Gyrus (Heschl Gyri - Brodmann Areas 41 & 42)",
        "Hippocampus and Parahippocampal Gyrus (Medial temporal)",
        "Amygdala (Anterior medial pole)",
        "Fusiform Gyrus (Occipitotemporal face area - Brodmann Area 37)",
      ],
    },
    functions: {
      en: [
        "Primary auditory tone processing and frequency tonotopic mapping (Heschl gyri)",
        "Long-term declarative and episodic memory encoding (Hippocampal complex)",
        "Emotional valence assignment and fear conditioning (Amygdaloid complex)",
        "Complex visual object recognition and facial identification (Fusiform face area)",
        "Vestibular and visceral autonomic visceral feedback integration",
      ],
      ar: [
        "معالجة النغمات السمعية ورسم الترددات الطوبوغرافية الصوتية (تلافيف هيشل)",
        "ترميز الذاكرة التصريحية والعرضية طويلة الأمد (معقد الحصين)",
        "تحديد القيمة العاطفية للمثيرات والاستجابة للخوف (معقد اللوزة)",
        "التعرف البصري المعقد على الأشكال وتمييز الوجوه (التلفيف المغزلي)",
        "تكامل الإشارات الدهليزية والاستجابات الحشوية الذاتية",
      ],
    },
    clinical: {
      syndromesEn: [
        "Klüver-Bucy Syndrome (Bilateral anterior temporal / amygdala destruction)",
        "Temporal Lobe Epilepsy (Mesial temporal sclerosis)",
        "Prosopagnosia (Bilateral or right fusiform lesions)",
        "Anterograde Amnesia (Bilateral hippocampal necrosis, e.g. HSV encephalitis)",
      ],
      syndromesAr: [
        "متلازمة كلوفر-بوسي (تلف ثنائي للقطب الصدغي الأمامي واللوزة)",
        "صرع الفص الصدغي (تصلب الحصين الإنسي)",
        "عمى التعرف على الوجوه (Prosopagnosia)",
        "فقد الذاكرة التقدمي (نخر الحصين الثنائي كالتهاب الدماغ بالهربس)",
      ],
      symptomsEn: [
        "Hyperoral exploration, hypersexuality, docility, and psychic blindness (Klüver-Bucy)",
        "Epigastric rising sensation, olfactory hallucinations (uncinate fits), and déjà vu aura",
        "Inability to recognize familiar faces despite normal visual acuity",
        "Total inability to form new declarative memories while remote recall stays intact",
      ],
      symptomsAr: [
        "فرط الاستكشاف الفموي، فرط النشاط الجنسي، الوداعة المرضية، والعمى النفسي",
        "شعور صاعد في رأس المعدة، هلاوس شمية (نوبات المعقف)، وشعور وهمي بالألفة (Déjà vu)",
        "عدم القدرة على تمييز وجوه الأقارب رغم حدة البصر التامة",
        "عجز كامل عن تشكيل ذكريات تصريحية جديدة مع بقاء الذكريات القديمة سليمة",
      ],
      classicCaseEn:
        "A 32-year-old with refractory temporal lobe epilepsy experiences a burning rubber odor followed by lip-smacking automatisms, staring, and postictal retrograde confusion.",
      classicCaseAr:
        "مريض صرع يبلغ 32 عاماً يشم رائحة مطاط محترق يعقبها حركات مص ولعق لا إرادية، جمود بصري، ثم تشوش ذهني بعد النوبة.",
    },
    vascularSupply: {
      arteriesEn: [
        "Middle Cerebral Artery (MCA) - Superior and middle temporal gyri",
        "Posterior Cerebral Artery (PCA) - Inferior temporal gyrus, fusiform gyrus, and hippocampus",
        "Anterior Choroidal Artery - Amygdala and anterior hippocampus",
      ],
      arteriesAr: [
        "الشريان المخي الأوسط (MCA) - التلافيف الصدغية العلوية والوسطى",
        "الشريان المخي الخلفي (PCA) - التلفيف الصدغي السفلي، التلفيف المغزلي، والحصين",
        "الشريان المشيمي الأمامي - اللوزة والحصين الأمامي",
      ],
      strokeManifestationEn:
        "PCA branch infarction causes acute memory loss and contralateral superior quadrantanopia ('pie in the sky'); MCA branch affects language and hearing comprehension.",
      strokeManifestationAr:
        "احتشاء فروع PCA يسبب فقدان ذاكرة حاداً وعمى ربعياً علوياً معاكساً، بينما فروع MCA تؤثر على فهم اللغة والمسموعات.",
    },
  },
  {
    id: "occipital-lobe",
    nameEn: "Occipital Lobe",
    nameAr: "الفص القذالي",
    latinName: "Lobus occipitalis",
    category: "lobes",
    categoryLabelEn: "Cerebral Lobes",
    categoryLabelAr: "فصوص المخ",
    position: [0.02, 0.07, -1.06],
    cameraPosition: [0.2, 0.4, -2.9],
    cameraTarget: [0.02, -0.1, -0.75],
    color: "#3b82f6", // Blue
    overview: {
      summaryEn:
        "The most posterior cerebral lobe, nestled over the tentorium cerebelli. It constitutes the cortical powerhouse of visual processing, translating retinal retinotopic input into colors, motion, edges, and conscious sight.",
      summaryAr:
        "أكثر فصوص المخ خلفية، يستند فوق خيمة المخيخ. يمثل المعالج القشري المركزي للإبصار، حيث يحول إشارات شبكية العين إلى ألوان، حركة، حواف، وإدراك بصري واعٍ.",
      locationEn:
        "Posterior cranial fossa tentorial surface, posterior to the parieto-occipital sulcus.",
      locationAr: "يستقر فوق خيمة المخيخ في مؤخرة القحف، خلف التلم الجداري القذالي.",
      keyLandmarks: [
        "Calcarine Sulcus (Primary Visual Cortex / Striate Cortex - Brodmann Area 17)",
        "Cuneus (Superior bank of calcarine fissure - represents inferior visual field)",
        "Lingual Gyrus (Inferior bank of calcarine fissure - represents superior visual field)",
        "Visual Association Cortices (V2, V3, V4, V5/MT - Brodmann Areas 18 & 19)",
      ],
    },
    functions: {
      en: [
        "Primary retinotopic image decoding with strict spatial mapping from retina to striate cortex",
        "Color discrimination and chromatic perception mediated by V4",
        "Motion tracking, velocity computation, and direction selectivity mediated by V5/MT",
        "Binocular disparity calculations for stereoscopic 3D depth perception",
        "Bifurcation into dorsal 'Where' stream (parietal) and ventral 'What' stream (temporal)",
      ],
      ar: [
        "فك تشفير الصور الشبكية مع رسم خرائط دقيقة من الشبكية إلى القشرة المخططة",
        "تمييز الألوان والإدراك اللوني الدقيق عبر باحة V4",
        "تتبع الحركة وحساب السرعة والاتجاه عبر باحة V5/MT",
        "حساب التفاوت بين العينين لتكوين الرؤية المجسمة ثلاثية الأبعاد وعمق المجال",
        "توزيع مسارات الرؤية إلى مسار 'أين' الظهري نحو الجداري ومسار 'ما هو' البطني نحو الصدغي",
      ],
    },
    clinical: {
      syndromesEn: [
        "Contralateral Homonymous Hemianopia with Macular Sparing (PCA occlusion)",
        "Cortical Blindness & Anton-Babinski Syndrome (Bilateral striate infarction)",
        "Visual Agnosia (Apperceptive vs Associative)",
        "Akinetopsia (Motion blindness via V5 lesion)",
      ],
      syndromesAr: [
        "عمى نصفي مماثل في الجانب المعاكس مع بقاء البقعة الصفراء سليمة",
        "العمى القشري ومتلازمة أنطون-بابينسكي (إنكار العمى)",
        "العمه البصري (فقد القدرة على تعرف الأشياء المرئية)",
        "عمى الحركة (Akinetopsia - رؤية الأشياء كلقطات ثابتة متقطعة)",
      ],
      symptomsEn: [
        "Loss of visual input from contralateral half of both eyes; macular sparing occurs due to MCA dual supply",
        "Anton syndrome: Complete cortical blindness with persistent confabulatory denial of sight loss",
        "Achromatopsia: Loss of color perception with world appearing in shades of gray",
        "Visual hallucinations: Simple unformed flashes, geometric zigzags (phosphenes, migraine fortification)",
      ],
      symptomsAr: [
        "فقدان نصف المجال البصري المعاكس في كلتا العينين، مع نجاة مركز الرؤية بفضل التروية المزدوجة من MCA",
        "متلازمة أنطون: عمى قشري تام مع إنكار قاطع للعمى واختلاق تفاصيل وهمية للرؤية",
        "عمى الألوان المكتسب: رؤية العالم بدرجات رمادية باهتة",
        "هلاوس بصرية بدائية: ومضات ضوئية وخطوط منكسرة (حصون الصداع النصفي)",
      ],
      classicCaseEn:
        "A 71-year-old patient who suffered bilateral occipital strokes cannot see anything in front of him, yet cheerfully describes the 'necktie' the doctor is wearing and bumps into hospital beds.",
      classicCaseAr:
        "مريض يبلغ 71 عاماً بعد احتشاء قذالي ثنائي لا يستطيع رؤية أي شيء، ومع ذلك يصف بدقة وهمية لون ربطة عنق الطبيب ويصطدم بالأسرة أثناء المشي.",
    },
    vascularSupply: {
      arteriesEn: [
        "Posterior Cerebral Artery (PCA) - Primary supplier of medial and inferior occipital cortex (calcarine artery)",
        "Middle Cerebral Artery (MCA) - Supplies lateral occipital pole providing collateral flow to macular representation",
      ],
      arteriesAr: [
        "الشريان المخي الخلفي (PCA) - المزود الرئيسي للسطح الإنسي والسفلي (الشريان المهمازي)",
        "الشريان المخي الأوسط (MCA) - يزود قطب القذال الجانبي ويوفر تروية مساندة لمركز الإبصار",
      ],
      strokeManifestationEn:
        "Thrombus of the calcarine branch of PCA produces classical contralateral homonymous hemianopia with macular sparing.",
      strokeManifestationAr:
        "خثار الشريان المهمازي المتفرع من PCA يسبب عمى نصفياً مماثلاً معاكساً مع احتفاظ البقعة الصفراء بالرؤية.",
    },
  },
  {
    id: "cerebellum",
    nameEn: "Cerebellum",
    nameAr: "المخيخ",
    latinName: "Cerebellum ('Little Brain')",
    category: "hindbrain",
    categoryLabelEn: "Hindbrain Structures",
    categoryLabelAr: "بنى الدماغ الخلفي",
    position: [0.43, -0.8, -0.44],
    cameraPosition: [1.8, -1.2, -2.4],
    cameraTarget: [0.35, -0.65, -0.3],
    color: "#10b981", // Emerald
    overview: {
      summaryEn:
        "Occupying the posterior cranial fossa beneath the tentorium, containing more than 50% of the brain's total neurons. It functions as the master comparator and real-time error corrector for posture, balance, and motor coordination.",
      summaryAr:
        "يحتل الحفرة القحفية الخلفية أسفل خيمة المخيخ، ويحتوي على أكثر من 50% من مجموع الخلايا العصبية في الدماغ بأكمله! يعمل كجهاز مقارنة متطور ومصحح فوري لأخطاء الحركة، التوازن، وتنسيق المهارات الدقيقة.",
      locationEn:
        "Infratentorial space within the posterior cranial fossa, dorsal to the pons and medulla oblongata.",
      locationAr: "الحفرة القحفية الخلفية خلف الجسر والبصلة السيسائية، تحت خيمة المخيخ.",
      keyLandmarks: [
        "Cerebellar Hemispheres (Lateral motor planning & fine distal limb coordination)",
        "Vermis (Axial motor trunk control, gait stability, and eye movements)",
        "Flocculonodular Lobe (Vestibulocerebellum - balance & vestibular ocular reflex)",
        "Deep Nuclei: Dentate, Emboliform, Globose, Fastigial ('Don't Eat Greasy Food')",
      ],
    },
    functions: {
      en: [
        "Feed-forward predictive motor error correction and coordination of complex agonist/antagonist sequences",
        "Maintenance of axial equilibrium and postural tone via vestibulospinal circuits",
        "Motor memory storage and procedural skill automation (riding a bicycle, instrument playing)",
        "Gaze stabilization via the vestibulo-ocular reflex (VOR)",
        "Cognitive and linguistic modulation via cerebro-cerebellar loops with prefrontal cortex",
      ],
      ar: [
        "التصحيح التنبؤي لأخطاء الحركة في الوقت الفعلي وتنسيق تتابع العضلات المتضادة",
        "الحفاظ على توازن الجذع والتوتر العضلي الوضعي عبر المسارات الدهليزية الشوكية",
        "تخزين الذاكرة الحركية وأتمتة المهارات الإجرائية (ركوب الدراجة، العزف)",
        "تثبيت النظر أثناء حركة الرأس عبر المنعكس الدهليزي العيني (VOR)",
        "ضبط وتيرة المعالجة اللغوية والمعرفية عبر الحلقات الواصلة بالقشرة الجبهية",
      ],
    },
    clinical: {
      syndromesEn: [
        "Cerebellar Hemisphere Syndrome (Ipsilateral appendicular ataxia)",
        "Midline Vermian Syndrome (Truncal ataxia, wide-based drunkard gait)",
        "Vestibulocerebellar / Flocculonodular Syndrome (Severe vertigo and nystagmus)",
        "Charcot's Triad (Scanning speech, intention tremor, nystagmus)",
      ],
      syndromesAr: [
        "متلازمة نصفي المخيخ (رنح أطرافي في نفس الجانب)",
        "متلازمة الخط الناصف الدودية (رنح الجذع ومشية ترنحية واسعة)",
        "متلازمة الفص الندفي العقيدي (دوار شديد ورأرأة عينية)",
        "ثالوث شاركو (كلام مقطع، رعاش قصدي، ورأرأة)",
      ],
      symptomsEn: [
        "Dysmetria (past-pointing on finger-to-nose testing) and Intention Tremor",
        "Dysdiadochokinesia (inability to execute rapid alternating movements)",
        "Dysarthria with scanned, explosive, or staccato speech patterns",
        "Pendular deep tendon reflexes and muscular hypotonia",
      ],
      symptomsAr: [
        "خلل القياس الحركي (تجاوز الهدف باختبار الإصبع للأنف) والرعاش القصدي عند الاقتراب من الهدف",
        "تعذر تعاقب الحركات السريعة التبادلية (Dysdiadochokinesia)",
        "رتة كلامية متقطعة وانفجارية (Scanned speech)",
        "منعكسات وترية بندولية مترددة ونقص في المقوية العضلية",
      ],
      classicCaseEn:
        "A 24-year-old college student develops a high-amplitude kinetic tremor that worsens as his finger approaches his nose, accompanied by clumsy heel-shin sliding and nystagmus on lateral gaze.",
      classicCaseAr:
        "شاب يبلغ 24 عاماً يعاني من رعاش تزداد شدته كلما اقتربت إصبعه من أنفه، مع عجز عن تمرير كعب قدمه باستقامة على عظم ساقه ورأرأة عند النظر جانباً.",
    },
    vascularSupply: {
      arteriesEn: [
        "Superior Cerebellar Artery (SCA) - Upper cerebellum and superior cerebellar peduncle",
        "Anterior Inferior Cerebellar Artery (AICA) - Anterior-inferior surface, middle peduncle, labyrinthine artery",
        "Posterior Inferior Cerebellar Artery (PICA) - Inferior vermis, tonsils, inferior cerebellar hemisphere",
      ],
      arteriesAr: [
        "الشريان المخيخي العلوي (SCA) - السطح العلوي وسويقة المخيخ العلوية",
        "الشريان المخيخي الأمامي السفلي (AICA) - السطح السفلي الأمامي والسويقة المتوسطة والشريان التيهي",
        "الشريان المخيخي الخلفي السفلي (PICA) - الدودة السفلية، اللوزات المخيخية، ونصف الكرة السفلي",
      ],
      strokeManifestationEn:
        "PICA occlusion causes Wallenberg lateral medullary syndrome with cerebellar ataxia; AICA occlusion causes ipsilateral facial palsy, deafness, and cerebellar signs.",
      strokeManifestationAr:
        "انسداد PICA يسبب متلازمة فالنبرغ في النخاع المستطيل مع رنح مخيخي، بينما انسداد AICA يسبب شللاً وجهياً وصمماً ورنحاً في نفس الجانب.",
    },
  },
  {
    id: "brainstem",
    nameEn: "Brainstem",
    nameAr: "جذع الدماغ",
    latinName: "Truncus encephali",
    category: "hindbrain",
    categoryLabelEn: "Hindbrain Structures",
    categoryLabelAr: "بنى الدماغ الخلفي",
    position: [0.1, -1.11, 0.05],
    cameraPosition: [0.3, -2.1, 2.0],
    cameraTarget: [0.05, -1.1, 0.0],
    color: "#f59e0b", // Amber
    overview: {
      summaryEn:
        "The vital stalk connecting the cerebrum to the spinal cord, composed of the Midbrain, Pons, and Medulla Oblongata. It regulates all autonomic vital reflexes (respiration, cardiac rhythm, blood pressure) and anchors cranial nerve nuclei III through XII.",
      summaryAr:
        "الجذع الحيوي الذي يربط نصفي الكرة المخية بالحبل الشوكي، ويتألف من الدماغ المتوسط، الجسر، والبصلة السيسائية. يتحكم بجميع المنعكسات الحيوية التلقائية (التنفس، ضربات القلب، ضغط الدم) وتخرج منه نوى الأعصاب القحفية من 3 إلى 12.",
      locationEn:
        "Infratentorial midline skull base, lying on the clivus and passing through the foramen magnum.",
      locationAr:
        "قاعدة الجمجمة تحت الخيمة، مستنداً على المنحدر العظمي (Clivus) وعابراً الثقبة العظمى.",
      keyLandmarks: [
        "Midbrain (Mesencephalon - Cerebral Peduncles, Superior & Inferior Colliculi, Substantia Nigra)",
        "Pons (Basilar groove, Middle Cerebellar Peduncles, Pontine nuclei)",
        "Medulla Oblongata (Pyramids with motor decussation, Olives, 4th Ventricle Floor)",
        "Reticular Activating System (Ascending Reticular Activating System - ARAS)",
      ],
    },
    functions: {
      en: [
        "Autonomic life support: Cardiac pacemaking, vasomotor tone, and autonomous respiratory rhythmogenesis",
        "Conduit for all ascending sensory tracks (medial lemniscus, spinothalamic) and descending motor tracts (corticospinal)",
        "Consciousness, arousal, alertness, and sleep-wake transition controlled by the ARAS",
        "Cranial nerve integration: Ocular motility (CN III, IV, VI), facial sensation/expression (CN V, VII), swallowing/cough (CN IX, X, XII)",
        "Protective reflexes: Gag, cough, corneal, and pupillary light reflexes",
      ],
      ar: [
        "الإنعاش الذاتي للحياة: تنظيم ضربات القلب، التوتر الوعائي، وضبط وتيرة التنفس التلقائي",
        "معبر رئيسي لجميع المسارات الصاعدة الحسية (الشوكية التلامية) والهابطة الحركية (القشرية الشوكية)",
        "اليقظة، الوعي، والانتقال بين النوم والاستيقاظ عبر الشبكة المنشطة الصاعدة (ARAS)",
        "تنسيق نوى الأعصاب القحفية: حركات العين، حس الوجه وتعبيراته، والبلع واللسان",
        "المنعكسات الوقائية الحيوية: منعكس التقيؤ، السعال، المنعكس القرني، وتضيق الحدقة بالضوء",
      ],
    },
    clinical: {
      syndromesEn: [
        "Brainstem Stroke / Crossed Syndromes (Ipsilateral cranial nerve palsy with contralateral hemiplegia)",
        "Locked-in Syndrome (Ventral pontine basilar artery thrombosis)",
        "Wallenberg Syndrome (Lateral medullary infarction via PICA)",
        "Weber & Benedikt Syndromes (Midbrain stroke)",
      ],
      syndromesAr: [
        "جلطات جذع الدماغ / المتلازمات المتصالبة (شلل عصب قحفي في جانب وشلل نصفي في الجانب المعاكس)",
        "متلازمة الانحباس (Locked-in Syndrome - خثار الشريان القاعدي الجسري)",
        "متلازمة فالنبرغ (احتشاء النخاع المستطيل الوحشي عبر انسداد PICA)",
        "متلازمة فيبر وبينديكت (احتشاء الدماغ المتوسط)",
      ],
      symptomsEn: [
        "Locked-in: Total quadriplegia and aphonia with preserved consciousness and only vertical eye blinking",
        "Wallenberg: Loss of pain/temp on ipsilateral face and contralateral body, dysphagia, Horner syndrome, and vertigo",
        "Coma or irreversible brain death when ARAS or central respiratory centers are crushed by tonsillar herniation",
        "Diplopia, vertigo, intractable hiccup, and crossed sensory deficits",
      ],
      symptomsAr: [
        "متلازمة الانحباس: شلل رباعي وفقدان تام للنطق مع وعي كامل وبقاء القدرة على فتح الجفون عمودياً فقط",
        "متلازمة فالنبرغ: فقدان حس الألم والحرارة في نصف الوجه ونصف الجسم المعاكس، عسر بلع، متلازمة هورنر، ودوار",
        "غيبوبة أو موت دماغي حتمي عند انضغاط الشبكة الصاعدة أو مراكز التنفس بانفتاق اللوزات المخيخية",
        "ازدواج الرؤية، الفواق المستعصي، واضطرابات حسية متصالبة",
      ],
      classicCaseEn:
        "A 58-year-old collapses and is completely paralyzed in all four limbs and unable to speak, yet communicates by blinking vertically in response to yes/no questions due to a ventral pontine infarct.",
      classicCaseAr:
        "مريض يبلغ 58 عاماً يسقط فجأة بشلل رباعي كامل وعجز عن الكلام، لكنه يستطيع الإجابة على الأسئلة برمش عينيه عمودياً إثر احتشاء في بطن الجسر الدماغي.",
    },
    vascularSupply: {
      arteriesEn: [
        "Vertebrobasilar System: Vertebral arteries, Basilar artery, Pontine perforating branches",
        "SCA, AICA, and PICA branching off the basilar and vertebral arteries",
      ],
      arteriesAr: [
        "الجملة الفقرية القاعدية: الشريانان الفقريان، الشريان القاعدي، والفروع الجسرية الثاقبة",
        "شرايين المخيخ (SCA, AICA, PICA) المتفرعة من القاعدي والفقري",
      ],
      strokeManifestationEn:
        "Basilar artery occlusion carries catastrophically high mortality unless revascularized, causing bilateral pontine necrosis, locked-in syndrome, or decerebrate coma.",
      strokeManifestationAr:
        "انسداد الشريان القاعدي يحمل نسبة وفيات كارثية ما لم يعاد فتحه فوراً، ويؤدي إلى نخر جسري ثنائي أو غيبوبة انفصال الدماغ.",
    },
  },
  {
    id: "brocas-area",
    nameEn: "Broca's Area",
    nameAr: "منطقة بروكا",
    latinName: "Area Broca (Brodmann 44 & 45)",
    category: "language",
    categoryLabelEn: "Language Centers",
    categoryLabelAr: "مراكز اللغة والتواصل",
    position: [-1.17, 0.39, 0.43],
    cameraPosition: [-2.6, 0.9, 1.2],
    cameraTarget: [-0.95, 0.25, 0.25],
    color: "#a855f7", // Bright Violet
    overview: {
      summaryEn:
        "Located in the triangular and opercular parts of the inferior frontal gyrus in the dominant (usually left) hemisphere. It is the principal motor-expressive engine for converting linguistic thoughts into fluent motor speech output.",
      summaryAr:
        "تقع في التلفيف الجبهي السفلي (الجزئين المثلثي والغطائي) في نصف الكرة المخية السائد (الأيسر في 95% من البشر). تعد المحرك الحركي التنفيذي الأساسي لتحويل الأفكار اللغوية إلى نطق صوتي متسق ومنظم.",
      locationEn:
        "Pars triangularis (Brodmann 45) and pars opercularis (Brodmann 44) of the dominant inferior frontal gyrus.",
      locationAr:
        "الجزء المثلثي (باحة برودمان 45) والجزء الغطائي (باحة 44) من التلفيف الجبهي السفلي الأيسر.",
      keyLandmarks: [
        "Pars Opercularis (Brodmann Area 44 - posterior part, motor phonetics coordination)",
        "Pars Triangularis (Brodmann Area 45 - anterior part, semantic sentence syntax planning)",
        "Adjacent Primary Motor Cortex face and laryngeal homunculus strip",
        "Connected via Arcuate Fasciculus to Wernicke's Area",
      ],
    },
    functions: {
      en: [
        "Motor programming for vocal articulation: coordinating larynx, tongue, lips, and palate",
        "Grammatical and syntactic architecture assembly during expressive speech",
        "Inner mental monologue and silent verbal rehearsal",
        "Sign language grammatical production in deaf signers",
        "Gestural communication synthesis coupled with speech cadence",
      ],
      ar: [
        "البرمجة الحركية للنطق: التنسيق العصبي بين الحنجرة واللسان والشفاه وسقف الحلق",
        "بناء التراكيب النحوية وقواعد الجمل أثناء الكلام التعبيري",
        "الحوار الذهني الداخلي والتسميع اللفظي الصامت",
        "صياغة قواعد لغة الإشارة وإخراجها لدى الصم",
        "تنسيق الإيماءات الحركية المرافقة لإيقاع الحديث ونبرته",
      ],
    },
    clinical: {
      syndromesEn: [
        "Broca's Aphasia (Expressive / Motor / Non-fluent Aphasia)",
        "Apraxia of Speech (Verbal apraxia)",
        "Dysprosody (Loss of melodic speech contour)",
      ],
      syndromesAr: [
        "حبسة بروكا (الحبسة التعبيرية / الحركية / غير الطليقة)",
        "تعذر الأداء النطقي (خلل تخطيط حركات مخارج الحروف)",
        "فقدان النبرة اللحنية في الحديث (Dysprosody)",
      ],
      symptomsEn: [
        "Effortful, halting, slow telegraphic speech with severe agrammatism ('Boy... fall... cookie')",
        "Preserved auditory and reading comprehension with profound awareness of their deficit (leading to intense frustration and depression)",
        "Impaired repetition of phrases ('No ifs, ands, or buts')",
        "Frequent co-occurring right faciobrachial hemiparesis due to proximity to the primary motor strip",
      ],
      symptomsAr: [
        "كلام بطيء ومجهد ومتقطع، يشبه نمط البرقية مع غياب حروف الجر والضمائر ('ولد... سقط... كعكة')",
        "فهم ممتاز للغة المقروءة والمسموعة مع إدراك مؤلم لعجزهم مما يسبب إحباطاً واكتئاباً شديدين",
        "فشل تام في تكرار الجمل البسيطة ('لا لكن ولا إذا')",
        "غالباً ما يترافق بضعف في عضلات النصف الأيمن للوجه واليد لقربها الشديد من القشرة الحركية",
      ],
      classicCaseEn:
        "A 52-year-old woman understands all instructions nod-for-nod, but can only squeeze out isolated single words with heavy sweating and frustration when asked to describe her family.",
      classicCaseAr:
        "سيدة تبلغ 52 عاماً تفهم كل ما يقال لها وتومئ إيجاباً، لكنها تعجز عن تكوين جملة وتخرج كلمات مفردة بصعوبة بالغة وعرق غزير عندما يُطلب منها وصف عائلتها.",
    },
    vascularSupply: {
      arteriesEn: [
        "Middle Cerebral Artery (MCA) - Superior division (frontoparietal cortical branches)",
      ],
      arteriesAr: ["الشريان المخي الأوسط (MCA) - الفرع العلوي (الفروع القشرية الجبهية)"],
      strokeManifestationEn:
        "Left superior division MCA ischemic stroke is the prototypical etiology of Broca's aphasia accompanied by right hemiparesis.",
      strokeManifestationAr:
        "احتشاء الفرع العلوي للشريان المخي الأوسط الأيسر هو السبب النموذجي لحبسة بروكا المترافقة بضعف نصفي أيمن.",
    },
  },
  {
    id: "wernickes-area",
    nameEn: "Wernicke's Area",
    nameAr: "منطقة فيرنيكه",
    latinName: "Area Wernicke (Brodmann 22)",
    category: "language",
    categoryLabelEn: "Language Centers",
    categoryLabelAr: "مراكز اللغة والتواصل",
    position: [-1.22, 0.44, -0.22],
    cameraPosition: [-2.7, 1.0, -0.8],
    cameraTarget: [-0.95, 0.28, -0.15],
    color: "#06b6d4", // Electric Cyan
    overview: {
      summaryEn:
        "Situated in the posterior aspect of the superior temporal gyrus of the dominant hemisphere, encircling the primary auditory cortex. It is the premier biological decoding machine for semantic language comprehension and auditory lexicon retrieval.",
      summaryAr:
        "تقع في الجزء الخلفي من التلفيف الصدغي العلوي في نصف الكرة السائد، وتحيط بالقشرة السمعية الأولية. تمثل المحرك المركزي لفك الشفرات الدلالية للغة وفهم معاني الكلمات والجمل المنطوقة.",
      locationEn:
        "Posterior section of superior temporal gyrus (Brodmann 22), wrapping around the posterior Sylvian fissure.",
      locationAr:
        "القسم الخلفي من التلفيف الصدغي العلوي (باحة 22)، ملتفاً حول النهاية الخلفية لشق سيلفيوس.",
      keyLandmarks: [
        "Posterior Superior Temporal Gyrus (Brodmann Area 22)",
        "Planum Temporale (Markedly asymmetric, larger in left hemisphere)",
        "Adjoining Supramarginal Gyrus (Brodmann 40) and Angular Gyrus (Brodmann 39)",
        "Arcuate Fasciculus fibers routing forward toward Broca's area",
      ],
    },
    functions: {
      en: [
        "Phonological decoding and transformation of auditory speech vibrations into lexical-semantic concepts",
        "Cross-modal semantic access linking heard words with visual images and abstract definitions",
        "Self-monitoring of ongoing expressive speech for linguistic coherence and correctness",
        "Reading comprehension and written symbol phonetic decoding",
        "Comprehension of tone nuances and lexical semantics",
      ],
      ar: [
        "فك التشفير الفونولوجي وتحويل الترددات السمعية إلى مفاهيم دلالية ولغوية مفهومة",
        "الربط الدلالي التكاملي بين الكلمات المسموعة والصور الذهنية والتعريفات التجريدية",
        "المراقبة الذاتية الفورية للكلام المنطوق لضمان اتساقه وصحته اللغوية",
        "فهم اللغة المكتوبة والربط بين الرمز المكتوب وصوته الصوتي",
        "استيعاب الفروق الدلالية الدقيقة في نبرات الحديث",
      ],
    },
    clinical: {
      syndromesEn: [
        "Wernicke's Aphasia (Receptive / Sensory / Fluent Aphasia)",
        "Word Deafness (Pure word deafness when subcortical fibers lesion)",
        "Conduction Aphasia (When Arcuate Fasciculus tract is severed)",
      ],
      syndromesAr: [
        "حبسة فيرنيكه (الحبسة الحسية / الاستقبالية / الطليقة)",
        "الصمم اللفظي الخالص (عند انقطاع الألياف تحت القشرية)",
        "الحبسة التوصيلية (عند انقطاع الحزمة القوسية الرابطة)",
      ],
      symptomsEn: [
        "Fluent, rapid, effortless speech output that is completely nonsensical ('Word Salad' / Neologisms)",
        "Severe, profound deficit in auditory and reading comprehension",
        "Paraphasic errors: Semantic substitutions ('chair' for 'table') and phonemic distortions",
        "Anosognosia: Total lack of awareness of their deficit—patients are completely oblivious to their unintelligible speech and puzzled by others' confusion",
      ],
      symptomsAr: [
        "كلام سريع وطليق وبدون أي مجهود لكنه خالٍ تماماً من المعنى ('سلطة كلمات' وابتكار كلمات خيالية لا وجود لها)",
        "عجز شديد وفادح في فهم الكلمات المسموعة والمقروءة",
        "أخطاء لفظية استبدالية: استبدال دلالي (مثل 'كرسي' بدلاً من 'طاولة') وتشويه صوتي للحروف",
        "عمه إدراك المرض (Anosognosia): عدم وعي المريض البتة بمرضه، ويتعجب مستغرباً من عدم فهم الناس لكلامه!",
      ],
      classicCaseEn:
        "A 67-year-old stroke patient talks animatedly with perfect syntax and inflections: 'The glibber spoon danced along the purple wind of tree!', but looks utterly bewildered and cannot follow a simple instruction to close his eyes.",
      classicCaseAr:
        "مريض يبلغ 67 عاماً يتحدث بطلاقة ونبرة واثقة: 'الملعقة البنفسجية طارت مع شجرة الرياح السعيدة!'، ولكنه يعجز تماماً عن فهم طلب الطبيب البسيط بإغماض عينيه.",
    },
    vascularSupply: {
      arteriesEn: ["Middle Cerebral Artery (MCA) - Inferior division (temporal cortical branches)"],
      arteriesAr: ["الشريان المخي الأوسط (MCA) - الفرع السفلي (الفروع الصدغية القشرية)"],
      strokeManifestationEn:
        "Embolism to the inferior division of the left MCA triggers classical Wernicke's aphasia, often with right superior quadrantanopia ('pie in the sky') from Meyer loop involvement.",
      strokeManifestationAr:
        "صمة في الفرع السفلي للـ MCA الأيسر تؤدي إلى حبسة فيرنيكه النموذجية، غالباً مع عمى ربعي علوي أيمن لتضرر حلقة ماير البصرية.",
    },
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    type: "clinical",
    promptEn:
      "A 62-year-old patient suffers an acute stroke. They speak with effortless fluency and normal melody, but their speech is entirely incomprehensible ('word salad'). They cannot understand simple spoken commands. Which brain area is injured?",
    promptAr:
      "مريض يبلغ 62 عاماً أصيب بجلطة دماغية. يتحدث بطلاقة وسرعة وبنبرة طبيعية، ولكن كلامه غير مفهوم إطلاقاً وعبارة عن 'سلطة كلمات'، كما يعجز تماماً عن فهم الأوامر الصوتية البسيطة. ما هي المنطقة المصابة؟",
    clinicalScenarioEn:
      "Fluent expressive output with catastrophic receptive comprehension deficit and anosognosia (unawareness of impairment).",
    clinicalScenarioAr: "كلام طليق مع فقدان تام لفهم المسموع وعمه إدراك الخلل اللغوي.",
    targetRegionId: "wernickes-area",
    hintEn:
      "Think of the receptive language center located in the posterior superior temporal gyrus.",
    hintAr: "ابحث عن مركز فهم اللغة الاستقبالي الواقع في مؤخرة التلفيف الصدغي العلوي.",
    explanationEn:
      "Wernicke's Area (Brodmann area 22) is dedicated to semantic decoding of language. Damage yields fluent, effortless, yet nonsensical output with severe comprehension impairment.",
    explanationAr:
      "منطقة فيرنيكه مسؤولة عن فك الشفرة الدلالية للغة. تلفها يسبب كلاماً طليقاً ولكنه عديم المعنى مع عجز شديد في فهم اللغة المسموعة والمقروءة.",
  },
  {
    id: "q2",
    type: "clinical",
    promptEn:
      "A 55-year-old professor understands everything said to him, but struggles intensely to articulate words. He can only utter slow, halting words ('Want... water...') with great effort and frustration. Identify the affected region.",
    promptAr:
      "أستاذ جامعي يبلغ 55 عاماً يفهم كل ما يوجه إليه، ولكنه يعاني بشدة لنطق الكلمات. لا يستطيع سوى إخراج كلمات بطيئة ومتقطعة بمشقة بالغة وإحباط واضح ('أريد... ماء...'). حدد المنطقة المصابة.",
    clinicalScenarioEn:
      "Non-fluent, halting, telegraphic speech with fully preserved comprehension and severe frustration.",
    clinicalScenarioAr: "كلام مجهد وبطيء وغير طليق مع فهم سليم للغة وإحباط نفسي كبير.",
    targetRegionId: "brocas-area",
    hintEn: "Located in the dominant inferior frontal gyrus (pars triangularis & opercularis).",
    hintAr: "تقع في التلفيف الجبهي السفلي لنصف الكرة المخية السائد.",
    explanationEn:
      "Broca's Area (Brodmann areas 44 & 45) programs motor speech articulation. Lesions cause motor/expressive aphasia with halting telegraphic speech.",
    explanationAr:
      "منطقة بروكا مسؤولة عن البرمجة الحركية للنطق. تلفها يسبب حبسة تعبيرية حركية مع كلام برقي مجهد رغم سلامة الفهم.",
  },
  {
    id: "q3",
    type: "anatomical",
    promptEn:
      "Locate the primary cortical hub for visual processing and striate cortex (Calcarine sulcus).",
    promptAr: "حدد المركز القشري الأساسي لمعالجة الرؤية والإبصار والقشرة المخططة (التلم المهمازي).",
    targetRegionId: "occipital-lobe",
    hintEn: "The most posterior lobe of the cerebral cortex.",
    hintAr: "أكثر فصوص الدماغ وجوداً في المؤخرة فوق خيمة المخيخ.",
    explanationEn:
      "The Occipital Lobe houses the primary visual cortex (Brodmann Area 17) along the calcarine sulcus, responsible for retinotopic visual decoding.",
    explanationAr:
      "الفص القذالي يضم القشرة البصرية الأولية على طول التلم المهمازي، وهو المسؤول عن فك تشفير وتكوين الصور المرئية.",
  },
  {
    id: "q4",
    type: "clinical",
    promptEn:
      "A patient presents with intention tremor, dysmetria on the finger-to-nose test, scanning speech, and a wide-based uncoordinated gait. Click the coordinator structure responsible.",
    promptAr:
      "مريض يعاني من رعاش قصدي يزداد عند الاقتراب من الهدف، خلل في قياس المسافات باختبار الإصبع والأنف، كلام متقطع، ومشية غير متزنة واسعة القاعدة. انقر على البنية المسؤولة عن تنسيق الحركة.",
    clinicalScenarioEn:
      "Classical triad of cerebellar signs: dysmetria, intention tremor, and truncal ataxia.",
    clinicalScenarioAr: "علامات الرنح النموذجية: خلل قياس المسافة، الرعاش القصدي، واضطراب المشي.",
    targetRegionId: "cerebellum",
    hintEn:
      "Located in the posterior cranial fossa beneath the tentorium cerebelli; often called the 'little brain'.",
    hintAr: "يقع في الحفرة القحفية الخلفية أسفل الخيمة، ويلقب بـ 'المخ الصغير'.",
    explanationEn:
      "The Cerebellum acts as the real-time comparator and coordinator of voluntary movements. Lesions produce ipsilateral ataxia, intention tremor, and dysmetria.",
    explanationAr:
      "المخيخ هو منسق الحركة الإرادية ومصحح أخطائها في الوقت الفعلي. تلفه يؤدي للرنح والرعاش القصدي وخلل التوازن.",
  },
  {
    id: "q5",
    type: "clinical",
    promptEn:
      "A 35-year-old undergoes severe personality change after trauma: he becomes impulsive, irritable, makes crude jokes, and exhibits loss of executive planning and social inhibitions. Which lobe is damaged?",
    promptAr:
      "شاب تعرض لإصابة دماغية أحدثت تغيراً جذرياً في شخصيته: أصبح متهوراً وسريع الغضب، يطلق نكاتاً غير لائقة، وفقد القدرة على التخطيط التنفيذي وضبط النفس. أي فص تضرر؟",
    clinicalScenarioEn:
      "Frontal lobe syndrome (Phineas Gage phenotype) characterized by disinhibition and executive dysfunction.",
    clinicalScenarioAr:
      "متلازمة الفص الجبهي المتميزة بفقدان الكبح الاجتماعي وتدهور الوظائف التنفيذية.",
    targetRegionId: "frontal-lobe",
    hintEn:
      "The largest anterior lobe responsible for personality, motor planning, and social restraint.",
    hintAr: "أكبر فصوص الدماغ ويقع في مقدمة القحف، مسؤول عن الشخصية والتخطيط والتحكم بالسلوك.",
    explanationEn:
      "The Frontal Lobe, particularly the prefrontal cortex, orchestrates executive functions, social propriety, impulse inhibition, and abstract judgment.",
    explanationAr:
      "الفص الجبهي، وبخاصة القشرة أمام الجبهية، هو المسؤول عن الوظائف التنفيذية والشخصية والتحكم بالدوافع والانضباط الاجتماعي.",
  },
  {
    id: "q6",
    type: "clinical",
    promptEn:
      "Following a basilar artery occlusion, a patient is awake and conscious but completely paralyzed in all four limbs and face, unable to move except for vertical eye movements and blinking. What structure is infarcted?",
    promptAr:
      "إثر انسداد في الشريان القاعدي، استعاد المريض وعيه التام ولكنه مشلول شللاً رباعياً كاملاً في أطرافه الأربعة ووجهه، ولا يستطيع الحركة باستثناء حركة الجفون العمودية ورمش العين. ما هو التركيب المصاب؟",
    clinicalScenarioEn:
      "Locked-in Syndrome: bilateral ventral pontine disruption preserving the reticular activating system and oculomotor pathways.",
    clinicalScenarioAr:
      "متلازمة الانحباس: نخر جسري بطني ثنائي يعزل المسارات الحركية مع بقاء الوعي ورمش العين.",
    targetRegionId: "brainstem",
    hintEn:
      "The vital stalk connecting cerebrum to spinal cord, containing the pons and vital autonomic nuclei.",
    hintAr: "الجذع الحيوي الرابط بين المخ والنخاع الشوكي ويضم الجسر والمراكز الحيوية التلقائية.",
    explanationEn:
      "Ventral pontine infarction of the Brainstem severs descending corticospinal and corticobulbar tracts, causing Locked-in Syndrome while ascending consciousness pathways stay intact.",
    explanationAr:
      "احتشاء بطن الجسر في جذع الدماغ يقطع المسارات الحركية النازلة مسبباً متلازمة الانحباس، مع بقاء مسارات الوعي الصاعدة والأعصاب القحفية العلوية سليمة.",
  },
  {
    id: "q7",
    type: "clinical",
    promptEn:
      "A patient exhibits severe contralateral hemispatial neglect: they ignore the entire left half of their body, groom only the right side, and collide with doors on their left. Which cortical lobe is affected?",
    promptAr:
      "مريض يظهر إهمالاً مكانياً نصفياً شديداً: يتجاهل النصف الأيسر من جسده تماماً، يحلق الجانب الأيمن فقط من وجهه، ويصطدم بالأشياء الواقعة على يساره. أي فص أصيب؟",
    clinicalScenarioEn:
      "Hemispatial neglect caused by damage to the non-dominant (right) spatial attentional network.",
    clinicalScenarioAr:
      "متلازمة الإهمال المكاني النصفي الناتجة عن تلف شبكة الانتباه المكاني في الفص غير السائد (الأيمن).",
    targetRegionId: "parietal-lobe",
    hintEn:
      "Located superior to the lateral sulcus and posterior to the central sulcus, mapping body schema and spatial awareness.",
    hintAr: "يقع خلف التلم المركزي وفوق الشق الجانبي، ويرسم خريطة الجسد والوعي بالمجال المكاني.",
    explanationEn:
      "The right (non-dominant) Parietal Lobe maintains a comprehensive bilateral spatial map. Damage produces catastrophic left-sided hemispatial neglect and extinction.",
    explanationAr:
      "الفص الجداري الأيمن (غير السائد) يوجه الانتباه المكاني للجانبين. إصابته تؤدي إلى إهمال نصفي حاد للجانب الأيسر من المحيط والجسد.",
  },
  {
    id: "q8",
    type: "clinical",
    promptEn:
      "A young adult with herpes simplex encephalitis suffers bilateral destruction of the medial structures of this lobe, resulting in total inability to form new long-term memories (anterograde amnesia). Identify this lobe.",
    promptAr:
      "شاب أصيب بالتهاب الدماغ الفيروسي بالهربس نتج عنه نخر ثنائي في التراكيب الإنسية لهذا الفص، مما أدى لعجز تام عن تشكيل ذكريات طويلة الأمد جديدة (فقد ذاكرة تقدمي). حدد هذا الفص.",
    clinicalScenarioEn:
      "Anterograde amnesia resulting from bilateral necrosis of the hippocampus and parahippocampal structures.",
    clinicalScenarioAr:
      "فقد الذاكرة التقدمي الناتج عن تضرر الحصين والتراكيب الحوفية الإنسية في هذا الفص.",
    targetRegionId: "temporal-lobe",
    hintEn:
      "Houses the hippocampal formation and amygdala in its medial aspect, resting in the middle cranial fossa.",
    hintAr: "يحتضن الحصين واللوزة في جانبه الإنسي، ويستقر في الحفرة القحفية المتوسطة.",
    explanationEn:
      "The medial Temporal Lobe houses the hippocampus, essential for the consolidation of short-term into long-term declarative episodic memories.",
    explanationAr:
      "الوجه الإنسي للفص الصدغي يضم الحصين (Hippocampus) الضروري لترسيخ الذكريات العرضية وتحويلها إلى ذاكرة طويلة الأمد.",
  },
];
