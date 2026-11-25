# Brain-project (NeuroAtlas 3D)

A production-ready **Interactive 3D Neuroanatomy & Brain Study Web Application** built with **Next.js (App Router), TypeScript, Tailwind CSS, Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`, and Zustand**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.170-black?style=for-the-badge&logo=threedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Biome](https://img.shields.io/badge/Biome-Formatted-60a5fa?style=for-the-badge&logo=biome)

---

## ✨ Features

- 🧠 **High-Resolution 3D Human Brain Canvas (`100vw` × `100vh`):**
  - Smooth OrbitControls with damping, min/max limits, and auto-centering.
  - Multi-point studio lighting highlighting gyri and sulci surface topography.
  - Smooth cinematic camera fly-to animations (`lerp`) when focusing on any region.

- 📍 **Smart 3D Hotspot Pin System:**
  - Interactive anatomical pins anchored to surface coordinates for all 8 key regions:
    - **Cerebral Lobes:** Frontal Lobe, Parietal Lobe, Temporal Lobe, Occipital Lobe.
    - **Hindbrain:** Cerebellum, Brainstem.
    - **Language Centers:** Broca's Area, Wernicke's Area.
  - Camera-facing occlusion handling so front-facing pins shine bright without obscuring cortical folds.
  - **Developer Coordinate Picker Mode:** Click on any surface point (or `Shift + Click`) to log and copy exact 3D coordinates.

- 🔬 **Surface Cross-Section Slicer:**
  - Local GPU clipping planes (`gl.localClippingEnabled = true`).
  - Slices across **Sagittal (X)**, **Axial (Y)**, and **Coronal (Z)** planes with interactive depth slider.

- 🌌 **Realistic PBR ⟷ Hologram / X-Ray Mode:**
  - Toggle between realistic anatomical cortical tissue shading and a translucent purple/cyan neon wireframe with Fresnel glow.

- 📖 **Right Sliding Anatomy Inspector:**
  - Detailed bilingual (English & Arabic) medical encyclopedia with structured tabs:
    - **Overview:** Summary, cranial location, and key neuroanatomical landmarks.
    - **Functions:** Physiological and cognitive functions.
    - **Clinical (Lesions):** Pathologies, syndromes, symptoms, and clinical case vignettes.
    - **Vascular Supply:** Arterial perfusion territories and stroke syndromes.

- 🎓 **Interactive Clinical & Practical Quiz Mode:**
  - Clinical case vignettes and anatomical identification challenges.
  - Dynamic score and streak tracking with emerald correct / crimson incorrect feedback.
  - Confetti celebration upon completion.

- 🌐 **Full Bilingual Support:** Instant toggle between English and Arabic (`عربي`).

---

## Learning workspace

The top navigation provides six bilingual study modes:

- **Anatomy:** the existing eight-region atlas and practical quiz, with topic references in the inspector.
- **Pathways:** selectable arcuate fasciculus, corticospinal tract and optic radiation schematics, connection steps and clinical correlations.
- **Sections:** sagittal, coronal and axial surface cuts, aligned camera presets, model-axis labels and a position slider.
- **Cases:** three fictional cases with locked first answers, explanations, source links, a score and answer review.
- **Vessels:** selectable ACA, MCA and PCA schematics with supplied regions and clinical correlations.
- **References:** the bibliography used by the new teaching content.

`src/data/studyData.ts` contains bilingual content, source IDs and hand-authored curve coordinates. `src/store/useStudyStore.ts` manages study modes and camera presets. Study geometry is rendered by `StudyLayers.tsx`; its resources are owned and disposed by React Three Fiber. The canvas renders on demand and camera transitions respect reduced motion.

### Scope of anatomical accuracy

The curves are approximate educational schematics, not patient tractography or segmented vessels. They do not reproduce all branches, fiber populations or anatomical variants. The existing GLB is a surface mesh: clipping exposes an open surface, **not MRI tissue or internal nuclei**. Axis labels describe model coordinates, not a validated radiological orientation.

New explanations include topic sources. References added to legacy region descriptions are further reading, not a completed claim-by-claim clinical audit. The material has not received independent clinical review. A volumetric atlas or appropriately licensed imaging dataset is required for true tissue cross sections.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- `pnpm` (recommended), `npm`, or `bun`

### Installation

```bash
# Clone the repository
git clone https://github.com/muhammadsaid16/Brain-project.git
cd Brain-project

# Install dependencies
pnpm install
```

### Running Development Server

```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
pnpm start -p 3000
```

---

## 🛠️ Code Quality

Formatted according to **Biome** strict conventions:

```bash
pnpm lint
# or
npx biome check src
```

---

## 📄 License

MIT License. Designed and developed with ❤️ for medical students, neuroscientists, and 3D web enthusiasts.
