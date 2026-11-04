# Aryan Ashok: Personal Developer Portfolio

> Personal portfolio website positioning my work across Data Science, AI/ML Engineering, and Applied Software Systems.

Built with **Astro**, **TypeScript**, **Plain CSS**, and **Observable Plot/SVG**. Designed with a warm editorial paper aesthetic, charcoal typography, terracotta accents, and responsive layout.

---

## Featured Projects

1. **AI Beauty Advisor**
   - Semantic skincare search using FAISS vector indexing, hybrid linear re-ranking, and Gemini 2.5 Flash Lite structured explanations.
   - [Repository](https://github.com/Aryan0405/ai-beauty-advisor)

2. **Credit Risk Scorecard**
   - Production credit scoring engine on Kaggle Home Credit data, evaluating a regulatory-compliant WoE Logistic Regression scorecard against XGBoost challengers.
   - [Repository](https://github.com/Aryan0405/credit_scorecard)

3. **Credit Card Fraud Detection**
   - Imbalanced fraud classification on 284,807 transactions using XGBoost with class weighting, SHAP explainability, and failure mode analysis.
   - [Repository](https://github.com/Aryan0405/credit-card-fraud-detection) | [Live Demo](https://credit-card-fraud-detection-aryan0405.streamlit.app/)

4. **NSE Stock Explorer**
   - Market analytics dashboard evaluating 5 years of daily data across 10 NSE blue-chip stocks to analyze tail risk, rolling Sharpe ratios, and drawdowns.
   - [Repository](https://github.com/Aryan0405/nse-stock-explorer) | [Live Demo](https://nse-stock-explorer.streamlit.app/)

5. **MetroPT3 Clustering**
   - Unsupervised sensor clustering on 1.5M readings from urban train air compressors, mapping 99.3% of failure events to a single operating state.
   - [Repository](https://github.com/Aryan0405/MetroPT3-Clustering) | [Live Demo](https://metropt3-clustering.streamlit.app/)

---

## Architecture & Tech Stack

- **Framework:** Astro (Static Site Generation)
- **Language:** TypeScript
- **Styling:** Plain CSS with custom properties (zero UI kits or external component bloat)
- **Visualizations:** Pure responsive vector SVGs and Observable Plot
- **Accessibility:** WCAG 2.2 AA compliant, full keyboard navigation, skip link, and reduced motion killswitch
- **Command Palette:** Keyboard-accessible modal menu (`Cmd+K` / `Ctrl+K`)
- **Theme:** Dual paper light mode and obsidian dark mode with persistent user preference

---

## Local Development

### Prerequisites
- Node.js 18+ (tested on Node.js v24.15.0)
- npm

### Installation
```bash
git clone https://github.com/Aryan0405/personal-portfolio.git
cd personal-portfolio
npm install
```

### Run Locally
```bash
npm run dev
```
Open `http://localhost:4321` in your browser.

### Build Production Bundle
```bash
npm run build
```
Compiled static assets are generated in `dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## Project Structure

```
├── astro.config.mjs          # Astro site configuration
├── package.json              # Project dependencies & npm scripts
├── tsconfig.json             # TypeScript configuration
├── DESIGN.md                 # Design system specification
├── public/
│   ├── favicon.svg           # Monogram favicon
│   └── og-image.svg          # Open Graph share card
└── src/
    ├── data/
    │   ├── projects.ts       # Central source of truth for projects & profile
    │   └── github-cache.json # Build-time metadata cache
    ├── components/           # Header, footer, cards, exhibits, command menu
    ├── layouts/              # Base shell and case-study memo layouts
    ├── pages/                # Homepage, dynamic case-study routes, sitemap, robots
    └── styles/
        └── global.css        # Global CSS variables, reset, typography, and theme
```

---

## Author

- **Aryan Ashok**
- Email: [aryan.ashok0405@gmail.com](mailto:aryan.ashok0405@gmail.com)
- GitHub: [@Aryan0405](https://github.com/Aryan0405/)
- LinkedIn: [aryan-ashok](https://www.linkedin.com/in/aryan-ashok/)
