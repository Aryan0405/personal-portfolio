# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers evaluating a Data Science undergraduate for internships and full-time roles; the job is assessing technical competence, modelling judgment, and communication clarity. Secondary audience: developers and collaborators reviewing open-source work.

## Product Purpose

Aryan Ashok's personal portfolio. It showcases real Data Science, AI/ML, and applied software engineering work — with a focus on credit risk and explainable machine learning — shipping working demos and writing clearly about modelling trade-offs. One full-stack AI system has been built end to end. The site exists to convert visitor attention into credible evidence of skill for hiring decisions.

## Positioning

A Data Science undergraduate focused on credit risk and explainable ML, who ships working demos and writes clearly about modelling trade-offs; also built one full-stack AI system end to end. Presented through an editorial journal aesthetic rather than generic portfolio templates.

## Operating Context

Visitors arrive on desktop, tablet, and mobile, often on slow or metered connections. Projects are evaluated through case-study pages, metrics, repo links, and live demos. The portfolio is statically generated with Astro and deployed as static assets. Local dev runs `npm run dev` on `http://localhost:4321`; production builds run `npm run build` into `dist/` and are previewed with `npm run preview`.

## Capabilities and Constraints

Confirmed functionality:
- Case-study project pages with metrics, tech stacks, repo links, and live demos where available
- Interactive exhibits on select projects (beauty advisor, credit scorecard, fraud metrics, stock explorer, metro clusters)
- Command palette (Cmd+K / Ctrl+K) keyboard-accessible modal menu
- Dual paper light mode and obsidian dark mode with persistent user preference
- WCAG 2.2 AA compliance, full keyboard navigation, skip link, reduced-motion killswitch

Constraints:
- No new dependencies without explicit approval
- Preserve existing routes, content, and functionality
- Every project figure must match its repo README exactly
- Link each project to its repo and live demo where one exists
- Respect prefers-reduced-motion
- Keep pages fast on mobile (no heavy libraries, optimised images and fonts)
- React islands only where interactivity needs them
- Production build must pass after every change
- Plain CSS with custom properties; zero UI kits or external component bloat
- Astro + TypeScript stack; no fabricated metrics or testimonials

## Brand Commitments

Name: Aryan Ashok. Email: aryan.ashok0405@gmail.com. GitHub: @Aryan0405. LinkedIn: aryan-ashok. Site: https://aryan.dev.

## Evidence on Hand

Five featured projects with public repos and (where available) live demos:
- AI Beauty Advisor — semantic skincare search, FAISS vector indexing, Gemini explanations (github.com/Aryan0405/ai-beauty-advisor)
- Credit Risk Scorecard — WoE Logistic Regression scorecard vs XGBoost on Home Credit data (github.com/Aryan0405/credit_scorecard)
- Credit Card Fraud Detection — XGBoost fraud classification on 284,807 transactions with SHAP (github.com/Aryan0405/credit-card-fraud-detection; streamlit demo)
- NSE Stock Explorer — 5 years of daily data across 10 NSE blue-chip stocks (github.com/Aryan0405/nse-stock-explorer; streamlit demo)
- MetroPT3 Clustering — unsupervised sensor clustering on 1.5M compressor readings (github.com/Aryan0405/MetroPT3-Clustering; streamlit demo)

Detailed case studies with metrics live in src/data/projects.ts. No testimonials exist; none may be fabricated.

## Product Principles

1. Evidence over polish: every claim is backed by a repo, demo, or measurable metric.
2. Technical honesty: modelling trade-offs and limitations are stated plainly, not omitted.
3. Performance as a feature: mobile-first, fast loads, optimised assets, no heavy libraries.
4. Accessibility is non-negotiable: WCAG 2.2 AA, keyboard-first, reduced motion respected.
5. Editorial restraint: one signal accent, whitespace and typography carry hierarchy, no decorative noise.

## Accessibility & Inclusion

WCAG 2.2 AA compliant; full keyboard navigation; skip link; prefers-reduced-motion killswitch; dual light/dark theme with persistent preference.
