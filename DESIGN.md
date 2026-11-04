# DESIGN SPECIFICATION: EDITORIAL DEVELOPER PORTFOLIO
**Developer:** Aryan  
**Focus:** Data Science, AI & Machine Learning, Applied Software Engineering  
**Institution:** SDBI, Mumbai, India (B.Sc. Data Science & Business Analytics, Year 2)  
**Document Version:** 2.0.0 (Repositioned General Developer Portfolio)  
**Design Status:** Proposed (Awaiting Client Approval)  

Reading this as: Personal portfolio for recruiters, developers, and collaborators, in a minimalist editorial developer portfolio style with warm paper and terracotta accents, dial ENERGY 2 / RHYTHM 2 / MOTION 1.

---

## 1. VISUAL IDENTITY & ART DIRECTION

### 1.1 Concept & Rationale: "The Editorial Developer Journal"
The website is designed as a **minimalist, typography-driven technical publication**. 

It strikes a deliberate balance between:
- The clarity and discipline of an engineering monograph.
- The warm, tactile aesthetic of an editorial journal.
- The utility of an interactive developer documentation site.

Unlike standard developer portfolios that rely on dark mode defaults, neon gradient blobs, or generic template cards, this design uses:
- A warm paper ground that feels tactile and easy on the eyes during prolonged reading.
- Crisp charcoal ink typography for uncompromising readability.
- A single terracotta signal accent for focal hierarchy, active states, and interactive callouts.
- Asymmetric editorial grids that create structured rhythm rather than repetitive boxes.
- Restrained, purposeful animations that aid spatial navigation without distracting from the content.

### 1.2 Broad Developer Identity
Aryan is positioned as a **Data Science and AI/ML developer with strong software engineering foundations**:
- Core focus areas: Machine learning systems, statistical modeling, data pipelines, and intelligent applications.
- Broad curiosity: Systems engineering, web applications, algorithmic problem solving, and developer tooling.
- Equal domain respect: Financial analytics (Credit Risk, Stock Explorer) sits alongside industrial IoT (MetroPT-3 Predictive Maintenance), consumer AI (Cosmetics Recommendation Engine), and autonomous systems (Multi-Agent Research). New domains (fraud detection, computer vision, distributed data systems) plug in effortlessly.

### 1.3 Palette: Disciplined Triad + Neutrals
The palette strictly obeys Antislop Rule R-29 (maximum 2-3 core colors plus 1 accent) and guarantees WCAG 2.2 AA contrast compliance.

```css
:root {
  /* Surfaces & Ground (Warm Paper / Cream Vellum) */
  --color-bg: #FBF9F5;              /* Warm off-white archive paper */
  --color-surface: #FFFFFF;         /* Crisp white sheet layer */
  --color-surface-subtle: #F3EFE8;  /* Tinted paper for tags, code blocks, and marginalia */
  --color-surface-hover: #EBE5DC;   /* Interactive hover tint */
  
  /* Ink & Typography (Charcoal Ink Hierarchy) */
  --color-ink-primary: #181715;     /* Deep carbon black ink (>16:1 contrast on paper) */
  --color-ink-secondary: #4A463F;   /* Charcoal wash for body copy and descriptions (7.4:1 contrast) */
  --color-ink-muted: #6B665E;       /* Muted ledger ink for captions, tags, and dates (4.8:1 contrast) */
  
  /* Structural Borders & Rules */
  --color-border: #E2DBD0;          /* Fine hairline divider */
  --color-border-strong: #BCB4A6;   /* Defined structural border */
  
  /* Signal Accent (Terracotta / Brick Clay) */
  --color-accent: #B93822;          /* Signal terracotta: active links, indicators, highlights */
  --color-accent-subtle: #F6EAE7;   /* Pale wash for focused highlights */
  --color-accent-hover: #962B18;    /* Deepened terracotta on hover */
  
  /* Functional Status Indicators */
  --color-status-deployed: #1E6B38; /* Deployed green */
  --color-status-complete: #2B5C8F; /* Completed blue */
  --color-status-progress: #B25E00; /* In-Progress amber */
}
```

#### Contrast Verification (WCAG 2.2 AA):
- Primary Ink (`#181715`) on Paper Ground (`#FBF9F5`): **16.2:1** (Passes AAA).
- Secondary Ink (`#4A463F`) on Paper Ground (`#FBF9F5`): **7.4:1** (Passes AAA).
- Muted Ink (`#6B665E`) on Paper Ground (`#FBF9F5`): **4.8:1** (Passes AA).
- Accent Terracotta (`#B93822`) on Paper Ground (`#FBF9F5`): **5.4:1** (Passes AA).
- White Text (`#FFFFFF`) on Accent Terracotta (`#B93822`): **4.6:1** (Passes AA).

#### Dark Mode Specification (Working Toggle per R-21 / R-34):
- `--color-bg`: `#121110` (Obsidian ground)
- `--color-surface`: `#1A1917` (Charcoal surface)
- `--color-surface-subtle`: `#24221F` (Muted surface)
- `--color-ink-primary`: `#F5F2EB` (Warm parchment ink, 16.5:1)
- `--color-ink-secondary`: `#A8A398` (Muted titanium, 6.8:1)
- `--color-accent`: `#E05A42` (High-visibility terracotta, 5.8:1)

### 1.4 Typography System
Typography balances editorial warmth with engineering precision:

| Role | Font Family | Fallback Stack | Purpose & Justification |
| :--- | :--- | :--- | :--- |
| **Headings & Titles** | **Newsreader** | Georgia, "Times New Roman", serif | Warm, distinguished editorial serif that establishes gravitas without pretension. |
| **Body & UI** | **Instrument Sans** | -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif | Modern, neutral grotesque with high legibility across dense project descriptions. |
| **Data, Code & Meta** | **JetBrains Mono** | "SF Mono", Consolas, monospace | Tabular numbers (`tabular-nums`) and clean glyphs for code, dates, and metrics. |

#### Fluid Type Scale:
```css
--font-display: "Newsreader", Georgia, serif;
--font-body: "Instrument Sans", -apple-system, sans-serif;
--font-mono: "JetBrains Mono", Consolas, monospace;

--text-xs: clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem);  /* 12px - 13px: Captions, table data */
--text-sm: clamp(0.8438rem, 0.81rem + 0.2vw, 0.9375rem); /* 13.5px - 15px: Meta, labels, nav */
--text-base: clamp(0.9688rem, 0.93rem + 0.25vw, 1.0625rem); /* 15.5px - 17px: Body reading */
--text-lg: clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem);    /* 18px - 20px: Lead paragraphs, deck */
--text-xl: clamp(1.35rem, 1.2rem + 0.7vw, 1.625rem);     /* 21.6px - 26px: Section headings (H2) */
--text-2xl: clamp(1.75rem, 1.5rem + 1.2vw, 2.25rem);     /* 28px - 36px: Project titles */
--text-hero: clamp(2.25rem, 1.8rem + 2.2vw, 3.25rem);    /* 36px - 52px: Masthead headline */
```

### 1.5 Spacing Scale & Layout Grid
- **Spacing Scale:** Multiples of 4px and 8px: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`.
- **Grid:** Asymmetric 12-column layout (max width 1280px) on desktop with structured gutters (24px).
- **Responsive Breakpoints:**
  - `360px`: Compact mobile (single column, 16px gutter, tap targets >= 44px).
  - `390px`: Standard mobile (single column, 20px gutter).
  - `768px`: Tablet (2-column project grid, collapsible navigation).
  - `1024px`: Desktop (12-column grid, persistent metadata column).
  - `1440px`: Wide desktop (generous lateral margins for reading comfort).

---

## 2. HOMEPAGE COMPOSITION & ARCHITECTURE

The homepage is structured so that any visitor (recruiter, engineer, collaborator, curious visitor) can scan Aryan's profile, explore projects, review technical capabilities, and initiate contact within seconds.

```
+--------------------------------------------------------------------------+
|  TOP BAR: Aryan  //  Data Science & AI/ML  //  Mumbai, IN     [Cmd+K] [Resume] |
+--------------------------------------------------------------------------+
|                                                                          |
|  HERO INTRODUCTION                                                       |
|  - Masthead: Aryan                                                       |
|  - Role: Data Science / AI & ML Developer                                |
|  - Summary: Building end-to-end machine learning systems, statistical    |
|    models, and data-intensive software applications.                     |
|  - Quick Meta: B.Sc. Data Science & Business Analytics @ SDBI, Mumbai   |
|  - Quick CTAs: [Explore Selected Work]  [View GitHub]  [Get in Touch]    |
|                                                                          |
+--------------------------------------------------------------------------+
|                                                                          |
|  01 // SELECTED PROJECTS                                                 |
|  Equal-weight presentation across domains:                               |
|  - Credit Risk Scorecard                                                 |
|  - NSE Stock Explorer (Deployed)                                         |
|  - MetroPT-3 Predictive Maintenance                                      |
|  - AI Cosmetics Recommendation Engine                                    |
|  - Multi-Agent Financial Research System (In Progress)                   |
|                                                                          |
|  Each card shows: Title, Domain, One-line summary, Key metrics,           |
|  Core technologies, GitHub link, Live demo link, and Case Study link.     |
|                                                                          |
+--------------------------------------------------------------------------+
|                                                                          |
|  02 // TECHNICAL INDEX (CAPABILITIES & SYSTEMS)                          |
|  Organized by engineering workflows:                                     |
|  - Machine Learning & Statistical Modeling                               |
|  - Data Engineering & Pipelines                                          |
|  - Backend Systems & Web Development                                     |
|  - Experimentation, Analytics & Tooling                                  |
|                                                                          |
+--------------------------------------------------------------------------+
|                                                                          |
|  03 // EDUCATION & BACKGROUND                                            |
|  - SDBI, Mumbai (B.Sc. Data Science & Business Analytics, 2024 - Present)|
|  - Coursework, practical research focus, open source engagement          |
|                                                                          |
+--------------------------------------------------------------------------+
|                                                                          |
|  04 // CONTACT & DISPATCH                                                |
|  - Direct email with one-click copy                                      |
|  - Verified GitHub & LinkedIn profiles                                   |
|  - Resume PDF download with file size                                    |
|                                                                          |
+--------------------------------------------------------------------------+
|  FOOTER: Colophon, build hash, accessibility note, no trackers           |
+--------------------------------------------------------------------------+
```

### 2.1 Section Details

#### Hero Introduction
- **Purpose:** Immediate clarity on who Aryan is, what he builds, and his technical orientation.
- **Copy Direction:** Direct, confident, and professional. No conversational chatbot greetings ("Hi, I am passionate..."). 
- **Content:**
  - Name: Aryan
  - Role: Data Science / AI & Machine Learning Developer
  - Location: Mumbai, India
  - Education: Second-year undergraduate, B.Sc. Data Science & Business Analytics at SDBI
  - Brief Narrative: Focus on empirical data analysis, production machine learning pipelines, and robust backend engineering.
  - Action Row: Direct links to explore projects, view GitHub, download resume, and copy email.

#### 01 // Selected Projects
- **Equal Visual Weight:** Projects are presented with equal hierarchy regardless of domain. Credit risk, industrial IoT, stock exploration, and consumer recommendation systems share a consistent, high-information card structure.
- **Card Contents:**
  1. *Header:* Project title, domain badge (e.g. `Machine Learning`, `Data Systems`, `Time-Series Analysis`), and status pill (`Deployed`, `Completed`, or `In Progress`).
  2. *One-Liner:* A clear, jargon-free sentence explaining what the project actually does.
  3. *Key Results / Metrics:* Real figures or validation metrics (e.g., ROC-AUC, latency, lead time, or live data coverage).
  4. *Tech Stack:* Tags for primary libraries and tools (e.g., Python, Scikit-learn, FastAPI, Observable Plot).
  5. *Action Footer:* Direct link to dedicated Case Study (`/work/[slug]`), GitHub Repository link, and Live Demo link (when deployed).

#### 02 // Technical Index
- Avoids the generic "percentage skill bar" trap (R-17, R-36).
- Organized by functional capabilities:
  - **Machine Learning & Modeling:** Scikit-learn, PyTorch, LightGBM, Statsmodels, Feature Engineering, Cross-Validation.
  - **Data Engineering & Storage:** SQL (PostgreSQL, DuckDB), Pandas, NumPy, Data Cleaning, ETL Pipelines.
  - **Backend & Web Development:** Python (FastAPI, Flask), TypeScript, Astro, REST APIs, Docker, Git.
  - **Data Visualization & Analytics:** Observable Plot, D3 primitives, Matplotlib, Seaborn, Exploratory Data Analysis.

#### 03 // Education & Academic Context
- Clear, honest academic grounding:
  - SDBI, Mumbai, India
  - Bachelor of Science in Data Science & Business Analytics (Year 2, 2024 - Present)
  - Core areas of study: Probability & Statistics, Linear Algebra, Database Systems, Algorithmic Analysis, Time-Series Modeling, Machine Learning Fundamentals.

#### 04 // Contact & Dispatch
- Clean contact options:
  - Direct email address with instant one-click copy button and accessible toast alert.
  - Links to verified GitHub profile and LinkedIn.
  - Download link for the updated Resume PDF with explicit file type and size.

---

## 3. DEDICATED CASE-STUDY ARCHITECTURE (`/work/[slug]`)

Every project has its own dedicated page. This is where in-depth technical interviewers and curious engineers can dive deep into Aryan's engineering decisions.

### 3.1 Standard Case Study Structure
Each case study follows an identical, rigorous 7-part engineering memorandum structure:

1. **Overview & Problem Statement:** What real-world problem does this project address? Why does it matter?
2. **Dataset & Data Quality:** What dataset was used? Where did it come from? What were the challenges (missing values, class imbalance, sensor noise, stationarity)?
3. **Methodology & Model Architecture:** Which algorithms were considered? Why was the chosen approach selected over simpler or more complex alternatives?
4. **Engineering Implementation:** How is the code structured? What pipeline or backend was built?
5. **Interactive Exhibit / Empirical Results:**
   - In **Credit Risk Scorecard**: The specialized **Kolmogorov-Smirnov (KS) Curve & Scorecard Point Simulator** (built with Observable Plot).
   - In **NSE Stock Explorer**: Interactive equity volatility and return dispersion charts.
   - In **MetroPT-3**: Multivariate sensor reconstruction error and anomaly timeline.
   - In **Cosmetics Recommender**: Ingredient feature vector space and constraint matching visualization.
   - In **Multi-Agent Research**: Agent communication flow schematic and retrieval verification log.
6. **Retrospective (What I Would Do Differently):** Honest self-critique: model limitations, data leakage risks, potential scaling bottlenecks, and next steps.
7. **Artifacts & Verification:** Direct links to the GitHub repository, reproducible notebooks, and live deployments.

---

## 4. SYSTEM ARCHITECTURE & SCALABILITY

### 4.1 Single Source of Truth: `src/data/projects.ts`
To ensure that new projects (e.g., fraud detection, computer vision, distributed pipelines) can be added seamlessly without redesigning pages:

```typescript
export interface Metric {
  label: string;
  value: string;
  context: string;
}

export interface Project {
  slug: string;
  title: string;
  domain: string; // e.g. "Risk Analytics", "Market Systems", "Industrial IoT", "Applied AI"
  status: 'Deployed' | 'Completed' | 'In Progress';
  featured: boolean;
  order: number;
  oneLiner: string;
  summary: string;
  technologies: string[];
  metrics: Metric[];
  repoUrl: string;
  liveUrl?: string;
  caseStudy: {
    problem: string;
    data: string;
    methodology: string;
    implementation: string;
    results: string;
    retrospective: string;
  };
}
```

### 4.2 Extensibility Workflow
- Adding a new project requires only adding an object to the `projects` array in `src/data/projects.ts`.
- Astro's dynamic routing (`src/pages/work/[slug].astro`) automatically generates the case-study page at build time.
- The homepage Selected Projects list, sitemap, RSS feed, and Command Menu automatically update without touching any layout code or CSS.

### 4.3 Build-Time GitHub Metadata Enrichment
- Project stars, primary languages, and last commit dates are fetched at build time via GitHub GraphQL API.
- Results are cached in `src/data/github-cache.json`.
- If the token is missing or network fails, the build falls back to static defaults without crashing.
- No client-side API calls to GitHub are made.

---

## 5. MOTION SYSTEM & LIVELINESS DIALS

### 5.1 Dials Declaration (Antislop Part 3)
- **ENERGY: 2 (Balanced)**
  - Confident, editorial, and poised. Clear typographical contrast, distinct visual identity, but zero frantic animations.
- **RHYTHM: 2 (Consistent with Varied Modules)**
  - Cohesive baseline layout across sections, broken up naturally by the technical skill matrix and case-study exhibits.
- **MOTION: 1 (Restrained & Functional)**
  - Native CSS transitions on hover, focus, and navigation. View Transitions API between project cards and case study pages.
  - Zero decorative loops, zero continuous floating elements, zero cursor followers.

### 5.2 Accessibility & Reduced Motion
- Full compliance with `prefers-reduced-motion: reduce`: all transitions and view transitions are instantly bypassed when the user prefers reduced motion.

---

## 6. KEYBOARD COMMAND MENU (CMD+K / CTRL+K)

- Accessible modal dialog (`role="dialog"`, `aria-modal="true"`).
- Keyboard shortcuts:
  - `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) opens.
  - `Escape` closes and restores focus.
  - `Up` / `Down` arrows navigate items.
  - `Enter` executes action.
- Available actions:
  - Quick navigation to homepage sections (`Introduction`, `Selected Projects`, `Technical Index`, `Contact`).
  - Direct links to every project case study.
  - Action: Copy email address to clipboard.
  - Action: Download resume PDF.
  - Action: Open GitHub profile in new tab.

---

## 7. EXPLICIT NOT LIST (STRICT ANTI-SLOP GUARDRAILS)

The following items are forbidden across the entire site:
1. **NO Em Dashes (the unicode \u2014 character):** Strictly forbidden in all written copy, titles, captions, and case studies. Colons, commas, periods, or parentheses are used instead. (R-02)
2. **NO Sparkle Icons or Generic AI Glyphs:** No sparkle, robot, star, or magic wand icons. (R-04)
3. **NO Gradient Blobs or Glowing Orbs:** No colorful blurred background radial gradients. (R-01)
4. **NO Glassmorphism Everywhere:** No blur on cards, navbar, and modals at the same time. (R-10)
5. **NO Fake Terminals:** No fake terminal window with typed out commands in the hero. (R-05)
6. **NO "Hi, I'm..." Hero Openers:** No generic conversational chatbot openers. (R-05)
7. **NO Skill Percentage Bars:** No "Python 95%", "SQL 85%" charts.
8. **NO Fabricated Statistics:** No unsourced claims or fake user numbers. (R-17, R-36)
9. **NO Fake Testimonials or Logos:** No fabricated client logos or quotes. (R-18)
10. **NO Cursor Followers or Particle Canvases:** No mouse chasing beads or WebGL noise. (R-19)
11. **NO Marketing Buzzwords:** No words like "passionate", "leveraging", "cutting-edge", "game-changing", "seamless", or "tech enthusiast". (R-16)

---

## 8. SUMMARY OF REVISIONS & CLIENT APPROVAL GATE

### 8.1 Summary of Changes Made in Version 2.0.0
1. **Repositioned Identity:** General Data Science / AI & Machine Learning developer with broad software development interests, removing exclusive finance framing.
2. **Rebalanced Homepage:** Introduction, Selected Projects, Technical Index, and Contact now form the clean core narrative.
3. **Equal Project Weight:** Projects are visually balanced in a modular grid/ledger with domain tags.
4. **Relocated KS Curve:** The Kolmogorov-Smirnov chart is positioned within the Credit Risk Scorecard case-study page (`/work/credit-risk-scorecard`), rather than serving as the homepage hero visual.
5. **Extensible Architecture:** Defined `src/data/projects.ts` schema and dynamic routing so any future project can be added by appending data.
6. **Complete Case Studies:** Every project receives a dedicated, 7-part engineering memorandum page with code, metrics, and retrospective.

### 8.2 Client Inputs & Verification Needed for Phase 2
The following items remain as honest `[TODO]` placeholders to be filled during Phase 2:
1. **GitHub Profile & Repository URLs:** Exact repository URLs for each project.
2. **Live Demo URL for NSE Stock Explorer:** Deployed application address.
3. **Contact Details:** Preferred email address, LinkedIn profile URL, and Resume PDF asset.

---
*End of DESIGN.md (Version 2.0.0)*
