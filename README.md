<p align="center">
  <a href="https://github.com/Veriscribe-Team/VeriScribe">
    <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=800&size=50&pause=1000&color=2563EB&center=true&vCenter=true&width=800&height=120&lines=Veriscribe+HQ;Document+Intelligence;AI-Powered+Processing;Grammar+%26+Security+Suite" alt="Typing SVG" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_AI-1A73E8?style=for-the-badge&logo=google&logoColor=white" />
</p>

<p align="center">
  <em>A massive, multi-modal Document Intelligence & Processing Suite engineered for the future.<br>Seamlessly blending traditional file manipulation with state-of-the-art Artificial Intelligence.</em>
</p>

<br/>

## 🎯 The Architecture Dashboard 

<table align="center" width="100%">
  <tr>
    <td align="center" width="33%">
      <h3>✍️ Writing & Language</h3>
      <p>Bypass detectors, humanize text, and fix grammar on the fly with 8+ classification models.</p>
    </td>
    <td align="center" width="33%">
      <h3>📄 Document Creation</h3>
      <p>Voice-to-Doc generation, template engines, and dynamically adjusting adaptive reading levels.</p>
    </td>
    <td align="center" width="33%">
      <h3>🧠 AI Intelligence</h3>
      <p>Multi-source RAG, Exam Paper building, and real-time negotiation coaching simulations.</p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <h3>🗄️ File Processing</h3>
      <p>An absolute powerhouse: 49 unique sub-tool pipelines. Merge, split, OCR, coverts, and extract.</p>
    </td>
    <td align="center">
      <h3>🛡️ Security & Trust</h3>
      <p>Active YARA rules, Staleness monitoring, malware scanning, and AI confidence scoring.</p>
    </td>
    <td align="center">
      <h3>⚙️ Next-Gen Stack</h3>
      <p>Built exclusively on React 19, Vite, and GSAP. Powered by Gemini & Multi-modal models.</p>
    </td>
  </tr>
</table>

<br/>

## 🔍 Deep Dive: The 21-Tool Ecosystem

> Expand the toggles below to view the exhaustive tools available inside the Veriscribe platform.

<details>
<summary><b>💬 1. Writing & Language Tools (Click to expand)</b></summary>
<br>

- **🤖 AI Detector:** Scans text to identify AI vs. Human authorship with paragraph-level forensics across 8 detection models.
- **🧔‍♂️ Humanizer:** Bypasses AI detectors by rewriting text to mimic human tone, cadence, and voice.
- **✅ Grammar Fix & Readability:** Instantly enhances spelling, grammar, tone, flow, and structural integrity.
- **📝 AI Summarizer:** Condenses long documents or URLs into rapid, actionable insights.
- **🕵️‍♂️ Plagiarism Check:** Cross-references text against billions of web pages and academic databases.
- **📚 Citation Generator:** Auto-generates APA, MLA, Chicago, etc. from URLs, DOIs, or ISBNs.
</details>

<details>
<summary><b>📄 2. Document Creation (Click to expand)</b></summary>
<br>

- **✍️ Doc Editor & Studio:** A full rich-text editor supporting 40+ file types alongside AI-driven document scaffolding.
- **🎙️ Voice to Doc:** Converts voice transcripts directly into beautifully structured templates (SOPs, PRDs, MOMs).
- **💡 Smart Notes:** Auto-organizing, self-tagging notes via text, voice, or image capture.
- **📊 Adaptive Document:** Dynamically rewrites a master document into Expert, Executive, Student, or Beginner variants.
</details>

<details>
<summary><b>🧠 3. Intelligence & Research (Click to expand)</b></summary>
<br>

- **🔬 Multi-Source Intelligence:** Chat across PDFs, audio, video, and URLs together to compile contradictions.
- **🎓 Exam Paper Builder:** Generates comprehensive test papers (MCQs, Essays) and separate keys from uploaded syllabi.
- **📈 Narrative Report Writer:** Turns dry CSV/Excel data into formatted business reports with trend analysis.
- **🤝 Contract Coach:** Analyzes risk in legal clauses, predicts objections, and runs live conversational negotiation simulations.
</details>

<details>
<summary><b>🗄️ 4. Document Processing (Click to expand)</b></summary>
<br>

- **🔄 File Converter Suite:** 49 unique conversion pipelines (PDF manipulation, Office to PDF, Image/Audio processing, etc.).
- **📑 Smart Form Extractor:** OCR-powered extraction of fields and tabular data from scanned invoices and forms.
- **🔍 Version Reconciler:** Generates side-by-side diff views highlighting high-risk clause changes.
- **🦴 Document Archaeology:** Rebuilds complete histories and auto-completes abandoned drafts.
</details>

<details>
<summary><b>🛡️ 5. Monitoring & Security (Click to expand)</b></summary>
<br>

- **⏳ Staleness Monitor:** Connects to Drive/Notion and alerts when cited source documents become outdated.
- **👀 Document Analytics:** Tracks read times, drop-offs, and viewer engagement across shared files.
- **🔒 Trust Shield & Scorer:** Scores AI confidence and actively scans file uploads for malicious payloads.
- **🧑‍💼 Knowledge Interview Bot:** Actively interviews experts and drafts SOPs and manuals from spoken answers.
</details>

---

## 💻 Developer Workspace & Onboarding

> [!CAUTION]
> For the comprehensive git ruleset, deployment, and conflict resolution, please refer to the primary guide: [NEW_DEVELOPER_ONBOARDING.md](./MDs/NEW_DEVELOPER_ONBOARDING.md)

### Mount the UI Locally

```bash
# 1. Clone the core repository
git clone https://github.com/Veriscribe-Team/VeriScribe.git
cd VeriScribe

# 2. Sync the active integration network
git checkout develop
git pull origin develop

# 3. Mount UI and Launch Engine
cd frontend
npm install
npm run dev
```

> **Aesthetics:** The Frontend engine heavily prioritizes a premium experience leveraging `lenis` for smooth scrolling, `framer-motion` for mounting transitions, and `clsx` tailwind clustering.

### 🌿 Git Lifecycle Workflow

Veriscribe enforces absolute stability over speed.
1. `main` 🛑 - Production (Rigid lockdown. No direct pushes).
2. `develop` ⚠️ - Integration (Target for all Pull Requests).
3. `feature/name` ✅ - Working environment (Your isolated sandbox).

---

<p align="center">
  <b>&copy; 2026 Veriscribe Team. All rights reserved.</b><br>
  <br>
  <sup>This software and associated documentation files constitute the proprietary, confidential, and intellectual property of the Veriscribe Team. Unauthorized copying, distribution, modification, reverse engineering, or commercial use via any medium is strictly prohibited.</sup>
</p>
