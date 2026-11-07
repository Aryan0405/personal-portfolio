export interface Metric {
  label: string;
  value: string;
  context: string;
}

export interface CaseStudySection {
  title: string;
  id: string;
  content: string;
  highlight?: string;
}

export interface Project {
  slug: string;
  title: string;
  domain: string;
  status: 'Deployed' | 'Completed' | 'In Progress';
  featured: boolean;
  order: number;
  oneLiner: string;
  problemStatement: string;
  summary: string;
  technologies: string[];
  metrics: Metric[];
  repoUrl: string;
  liveUrl?: string;
  hasInteractiveExhibit?: boolean;
  exhibitType?: 'beauty-advisor' | 'ks-scorecard' | 'fraud-metrics' | 'stock-explorer' | 'metro-clusters';
  caseStudy: {
    overview: string;
    sections: CaseStudySection[];
    whatWouldDoDifferently: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'ai-beauty-advisor',
    title: 'AI Beauty Advisor',
    domain: 'Semantic Search & Skincare AI',
    status: 'Completed',
    featured: true,
    order: 3,
    oneLiner: 'Semantic-search skincare recommendation engine combining FAISS vector similarity, hybrid ranking, and Gemini structured explanations.',
    problemStatement: 'Matching skincare products to symptom-based queries when customers don\'t know ingredient names.',
    summary: 'A complete end-to-end recommendation system built on a 1,472-item cosmetics dataset. Users describe skin concerns in plain language; the FastAPI backend embeds queries, performs cosine search in FAISS IndexFlatIP, applies hybrid re-ranking, looks up pre-mined Apriori routine bundles, and generates grounded per-product explanations using Gemini 2.5 Flash Lite in a single structured call.',
    technologies: ['FastAPI', 'React', 'FAISS', 'Gemini', 'Apriori', 'Redis', 'SQLite', 'Docker'],
    metrics: [
      { label: 'P95 LATENCY (MS)', value: '13.0', context: 'P50 9.5 ms vs 150 ms target, warm cache' },
      { label: 'PRECISION@5', value: '66.0%', context: 'Category and skin type, 20 test queries' },
      { label: 'CATALOG ITEMS', value: '1,472', context: 'Skincare formulations with embeddings' }
    ],
    repoUrl: 'https://github.com/Aryan0405/ai-beauty-advisor',
    hasInteractiveExhibit: true,
    exhibitType: 'beauty-advisor',
    caseStudy: {
      overview: 'Finding skincare products through keyword search often fails because consumer queries focus on symptom descriptions rather than specific chemical ingredient names. AI Beauty Advisor implements a production semantic retrieval pipeline with hybrid re-ranking, Apriori routine bundling, and structured generative explanations.',
      sections: [
        {
          id: 'architecture',
          title: 'System Architecture & Hybrid Re-Ranking',
          content: 'The search pipeline balances semantic vector matching with exact keyword and filter signals. Candidate products retrieved via FAISS IndexFlatIP are scored using a linear combination: 0.90 * similarity + 0.075 * keyword + 0.025 * filter. This prevents pure embedding drift while preserving semantic discovery.',
          highlight: 'Hybrid scoring formula: Ensures high-similarity matches align with user category constraints.'
        },
        {
          id: 'apriori-bundling',
          title: 'Routine Bundles via Association Rule Mining',
          content: 'To recommend complementary routine items (such as pairings between cleansers and moisturizers), an offline Apriori algorithm mines category association rules filtered for lift > 1.2. The engine attaches up to two real complementary products to each card, degrading gracefully to an empty array when no valid rule matches.',
          highlight: 'Rule-based cross-selling: Recommends realistic skincare routines based on mined category co-occurrence.'
        },
        {
          id: 'performance-eval',
          title: 'Latency Benchmarking & Precision Evaluation',
          content: 'Automated evaluation scripts test retrieval speed and relevance. Retrieval-only latency achieves a P50 of 9.5 ms and P95 of 13.0 ms against an SLA budget of 150 ms. Relevance evaluation across 20 curated category and skin-type queries achieves 66.0% precision at rank 5.',
          highlight: 'P95 latency of 13.0 ms: Sub-15 ms vector retrieval enabled by in-memory FAISS and Redis caching.'
        }
      ],
      whatWouldDoDifferently: 'If expanding this project, I would implement human relevance grading rather than heuristic category intersection for evaluation, and fine-tune an embedding model directly on skincare user query pairs.'
    }
  },
  {
    slug: 'credit-risk-scorecard',
    title: 'Credit Risk Scorecard',
    domain: 'Quantitative Risk & Model Governance',
    status: 'Completed',
    featured: true,
    order: 2,
    oneLiner: 'Regulatory-compliant credit scoring engine built on Home Credit data, evaluating a Logistic Regression scorecard against XGBoost challengers.',
    problemStatement: 'Choosing between an explainable WoE scorecard and opaque XGBoost challengers for regulated lending decisions.',
    summary: 'A production credit risk analysis evaluating regulatory trade-offs between an explainable Weight of Evidence (WoE) Logistic Regression scorecard and non-linear XGBoost challengers. Demonstrates why marginal AUC lifts (+0.0106) do not justify secondary pipeline complexity in regulated banking, and uncovers the WoE risk ceiling for high-risk applicants using SHAP.',
    technologies: ['Python', 'WoE', 'Logistic Regression', 'XGBoost', 'SHAP', 'OptBinning', 'Scikit-learn'],
    metrics: [
      { label: 'SCORECARD AUC', value: '0.72', context: '5-feature WoE logistic regression baseline' },
      { label: 'ALGORITHMIC LIFT', value: '+0.01', context: 'Tree model, same 5 features (0.7282 AUC)' },
      { label: 'BUREAU REDUNDANCY', value: '±0.001', context: 'Negligible gain from 7 external bureau features' }
    ],
    repoUrl: 'https://github.com/Aryan0405/credit_scorecard',
    hasInteractiveExhibit: true,
    exhibitType: 'ks-scorecard',
    caseStudy: {
      overview: 'In commercial lending, choosing a model is not simply an AUC competition. This project implements a full production scorecard on the Kaggle Home Credit Default Risk dataset and contrasts it against XGBoost challengers, documenting the exact trade-offs between mathematical explainability, regulatory compliance, and raw predictive power.',
      sections: [
        {
          id: 'scorecard-vs-challenger',
          title: 'Scorecard Baseline vs. Algorithmic Challengers',
          content: 'A baseline production scorecard was built using 5 Weight of Evidence (WoE) transformed features, achieving a 0.7188 AUC and scaled to standard points (PDO = 20). Two XGBoost challengers were built to measure lift: Challenger A tested the pure algorithmic boost on the same 5 features (0.7282 AUC), while Challenger B added 7 credit bureau features (0.7294 AUC).',
          highlight: 'Governance trade-off: The marginal +0.0106 AUC lift of XGBoost was rejected in favor of the transparent scorecard.'
        },
        {
          id: 'the-woe-ceiling',
          title: 'The WoE Risk Ceiling & Outlier Blindness',
          content: 'A critical finding surfaced: binning continuous variables caps a linear model default probability at approximately 55% for the highest-risk applicants because they land in the same worst-case WoE bin. Operating on unbinned features, XGBoost correctly flagged these same individuals at ~92% risk.',
          highlight: 'WoE blind spot: Extreme risk profiles are compressed by monotonic binning intervals.'
        },
        {
          id: 'shap-bureau-redundancy',
          title: 'SHAP Analysis & External Feature Redundancy',
          content: 'SHAP values revealed that external credit bureau features added virtually no independent information (+0.0012 AUC). Two application features (EXT_SOURCE_2 and EXT_SOURCE_3) accounted for over 60% of all decision weight, acting as near-perfect proxies for historical bureau creditworthiness.',
          highlight: 'Information bottleneck: External credit records were redundant given normalized application scores.'
        }
      ],
      whatWouldDoDifferently: 'In future iterations, I would implement reject inference techniques to correct for survivorship bias in approved versus rejected loan populations.'
    }
  },
  {
    slug: 'credit-card-fraud-detection',
    title: 'Credit Card Fraud Detection',
    domain: 'Imbalanced Classification & Failure Analysis',
    status: 'Deployed',
    featured: true,
    order: 1,
    oneLiner: 'End-to-end fraud detection MVP on 284,807 transactions with XGBoost, SHAP explainability, and failure mode analysis.',
    problemStatement: 'Detecting fraudulent transactions amid extreme class imbalance (0.17% fraud rate) without generating synthetic data artifacts.',
    summary: 'A fraud detection system addressing extreme class imbalance (0.17% fraud) on the Kaggle ULB dataset. Uses scale_pos_weight class weighting instead of synthetic SMOTE sampling, benchmarks against FLAML AutoML, explains individual predictions with SHAP TreeExplainer, and categorizes false predictions into threshold-sensitive versus unseparable cases in an interactive Streamlit app.',
    technologies: ['Python', 'XGBoost', 'Logistic Regression', 'SHAP', 'Streamlit', 'FLAML', 'Scikit-learn'],
    metrics: [
      { label: 'XGBOOST PR-AUC', value: '0.79', context: 'Precision 0.80, recall 0.76 on 56,746 test rows' },
      { label: 'FLAML PR-AUC', value: '0.82', context: 'AutoML benchmark, precision 0.96, recall 0.77' },
      { label: 'FALSE ALARM RATE', value: '0.03%', context: '18 false positives in 56,746 tests' }
    ],
    repoUrl: 'https://github.com/Aryan0405/credit-card-fraud-detection',
    liveUrl: 'https://credit-card-fraud-detection-aryan0405.streamlit.app/',
    hasInteractiveExhibit: true,
    exhibitType: 'fraud-metrics',
    caseStudy: {
      overview: 'Detecting credit card fraud requires navigating extreme class imbalance (only 473 fraud cases across 283,726 deduplicated transactions). This project develops a production-grade XGBoost pipeline, demonstrates why class weighting outperforms SMOTE, and performs structured failure analysis using SHAP values.',
      sections: [
        {
          id: 'imbalance-strategy',
          title: 'Class Imbalance & Weight Selection over SMOTE',
          content: 'Instead of generating synthetic fraud points with SMOTE (which often invents unrealistic transaction feature combinations in high-dimensional space), the model uses scale_pos_weight. The optimal weight (24) was selected via 5-fold stratified cross-validation on the training set only, achieving a 0.848 CV PR-AUC.',
          highlight: 'Methodology decision: Native class weighting avoids synthetic boundary artifacts introduced by SMOTE.'
        },
        {
          id: 'failure-analysis',
          title: 'SHAP-Driven Failure Mode Analysis',
          content: 'Analyzing the 18 false alarms and 23 missed frauds revealed two distinct failure types: borderline cases near the 0.5 decision boundary that are easily tuned via threshold sliders, and confident misses where anonymized PCA features overlap entirely with legitimate transactions.',
          highlight: 'Dual failure taxonomy: Separates threshold-addressable errors from fundamental feature blindness.'
        },
        {
          id: 'interactive-comparison',
          title: 'Interactive Streamlit Comparison Application',
          content: 'The deployed Streamlit app allows users to inspect caught frauds, false alarms, and missed transactions side by side between the main XGBoost model and a FLAML-tuned benchmark, with real-time SHAP waterfall attribution plots.',
          highlight: 'Live model exploration: Inspect individual transaction feature attributions in real time.'
        }
      ],
      whatWouldDoDifferently: 'I would incorporate a custom monetary cost matrix into the objective function so that the decision threshold directly minimizes expected financial loss rather than maximizing generic F1 score.'
    }
  },
  {
    slug: 'nse-stock-explorer',
    title: 'NSE Stock Explorer',
    domain: 'Financial Data Systems & Quantitative Analytics',
    status: 'Deployed',
    featured: true,
    order: 4,
    oneLiner: 'Interactive market dashboard analyzing six calendar years of daily data across 10 NSE blue-chip stocks to evaluate tail risk and drawdowns.',
    problemStatement: 'Evaluating tail risk and drawdowns beyond simple cumulative returns for equity allocation.',
    summary: 'A deployed Streamlit application evaluating 1,480 trading days (2019-2024) of daily OHLCV data for 10 diversified National Stock Exchange equities against the NIFTY50 benchmark. Generates log returns distributions, rolling 21-day annualized volatility, peak-to-trough drawdowns, 63-day rolling Sharpe ratios, and stock correlation matrices.',
    technologies: ['Python', 'Streamlit', 'Pandas', 'YFinance', 'Plotly'],
    metrics: [
      { label: 'DAYS OF DATA', value: '1,480', context: '2019 to 2024, 10 stocks plus NIFTY50' },
      { label: 'PEAK KURTOSIS', value: '20.29', context: 'ADANIENT, skew -1.14, -77% drawdown' },
      { label: 'SUNPHARMA RANK', value: '#1', context: 'Best Sharpe, shallowest drawdown' }
    ],
    repoUrl: 'https://github.com/Aryan0405/nse-stock-explorer',
    liveUrl: 'https://nse-stock-explorer.streamlit.app/',
    hasInteractiveExhibit: true,
    exhibitType: 'stock-explorer',
    caseStudy: {
      overview: 'Long-term equity allocation requires looking beyond simple cumulative returns to understand interim drawdowns and tail risk. NSE Stock Explorer evaluates 10 major NSE blue-chip stocks spanning energy, banking, IT, auto, pharma, NBFC, and consumer sectors to determine which holdings provide true risk-adjusted performance.',
      sections: [
        {
          id: 'data-pipeline',
          title: 'Data Ingestion & Hygiene via YFinance',
          content: 'Daily adjusted OHLCV bars were extracted for 10 representative tickers and the NIFTY50 benchmark (^NSEI). Stocks with >5% missing data were excluded, remaining gaps forward-filled, and log returns computed to ensure temporal additivity across multi-year holding windows.',
          highlight: 'Data pipeline: 1,480 trading days cleaned, forward-filled, and verified against benchmark dates.'
        },
        {
          id: 'tail-risk-findings',
          title: 'Empirical Findings: Tail Risk vs. Consistency',
          content: 'ADANIENT generated ~15x cumulative growth over the 2019–2024 period but exhibited a kurtosis of 20.29 and skewness of -1.14 with a -77% maximum drawdown. Conversely, SUNPHARMA emerged as the strongest risk-adjusted candidate with low volatility, shallow drawdowns, and weak correlation with the rest of the basket.',
          highlight: 'Empirical lesson: Outstanding long-term cumulative returns often mask catastrophic interim drawdown risk.'
        },
        {
          id: 'analytics-views',
          title: 'Six Interactive Risk & Performance Views',
          content: 'The Streamlit application provides six dynamic views: Log Returns Distribution with normal overlay, Normalized Growth vs. NIFTY50, Rolling 21-Day Volatility, Peak-to-Trough Drawdown, 63-Day Rolling Sharpe (7% risk-free rate), and Correlation Heatmaps.',
          highlight: 'Interactive exploration: Filter any combination of stocks across arbitrary historical sub-windows.'
        }
      ],
      whatWouldDoDifferently: 'I would replace the static 7% risk-free rate assumption with a dynamic 10-year Indian Government Bond (G-Sec) yield curve, and add automated Value at Risk (VaR) calculations.'
    }
  },
  {
    slug: 'metropt3-clustering',
    title: 'MetroPT3 Clustering',
    domain: 'Industrial IoT & Unsupervised Learning',
    status: 'Deployed',
    featured: true,
    order: 5,
    oneLiner: 'Unsupervised sensor clustering on 1.5M readings from urban train air compressors, mapping 99.3% of failure events to a single operating state.',
    problemStatement: 'Identifying where compressor failures occur when supervised prediction is statistically impossible with only four failures.',
    summary: 'An unsupervised investigation into where air compressor failures occur on a Metro do Porto train. Evaluates 1.5 million readings from 15 sensors across 7 months (February to August 2020), slicing data into 50,513 five-minute feature windows. Unsupervised K-Means clustering (K=3, Silhouette 0.43) proved that 985 of 992 failure windows (99.3%) concentrate into a single "Sustained High Load" operating mode.',
    technologies: ['Python', 'K-Means', 'Unsupervised Learning', 'PCA', 'Power BI', 'Streamlit'],
    metrics: [
      { label: 'FAILURE SHARE', value: '99.3%', context: '985 of 992 failure windows in one mode' },
      { label: 'HIGH LOAD SHARE', value: '6.05%', context: 'Of 50,513 total windows' },
      { label: 'SILHOUETTE SCORE', value: '0.43', context: 'K=3: Idle, Cycling, High Load' }
    ],
    repoUrl: 'https://github.com/Aryan0405/MetroPT3-Clustering',
    liveUrl: 'https://metropt3-clustering.streamlit.app/',
    hasInteractiveExhibit: true,
    exhibitType: 'metro-clusters',
    caseStudy: {
      overview: 'With only four recorded compressor failures across seven months on a Lisbon Metro train, training a supervised failure predictor was statistically impossible. Instead, this project uses unsupervised clustering to group 1.5 million sensor readings by operational behavior, discovering that failure events concentrate almost exclusively in one rare operating mode.',
      sections: [
        {
          id: 'windowing-methodology',
          title: '5-Minute Feature Windowing & Cleaning',
          content: 'Telemetry from 15 sensors, about 1.5 million readings at roughly 10-second intervals, was segmented into 5-minute windows described by 36 summary features: mean, standard deviation, minimum and maximum for 7 continuous sensors, plus the mean of 8 binary signals. Windows with fewer than half the expected readings were dropped, leaving 50,513.',
          highlight: 'Feature engineering: 1.5 million raw readings condensed into 50,513 multivariate statistical windows.'
        },
        {
          id: 'unsupervised-clustering',
          title: 'K-Means Clustering Without Failure Labels',
          content: 'K-Means (K=3, Silhouette 0.43) was fitted on scaled features without ever seeing failure records. The clusters naturally mapped to three physical operating modes: Idle (67.5% of windows), Start/Stop Cycling (26.45%), and Sustained High Load (6.05%).',
          highlight: 'Unsupervised separation: Physical compressor states emerged naturally from telemetry distributions.'
        },
        {
          id: 'failure-overlap',
          title: 'Failure Overlap & Operational Reality',
          content: 'Cross-referencing clusters against maintenance records revealed that 985 of the 992 failure windows (99.3%) fell into the Sustained High Load mode. However, only 32.2% of windows in that mode represent active failures, meaning high load describes where failures occur rather than serving as an actionable alarm.',
          highlight: 'Honest conclusion: Demonstrates what happened without claiming an unearned predictive capability.'
        }
      ],
      whatWouldDoDifferently: 'To build a true predictive maintenance model, I would collect sensor data from a larger fleet of compressors and construct survival models tracking degradation over time leading up to failure.'
    }
  }
];

export const technicalSkills = [
  {
    category: 'Machine Learning & Statistical Modeling',
    description: 'Developing predictive algorithms, feature transformations, and rigorous validation frameworks.',
    skills: ['Scikit-learn', 'XGBoost', 'Logistic Regression', 'Weight of Evidence (WoE)', 'SHAP Explainability', 'K-Means Clustering', 'OptBinning']
  },
  {
    category: 'Data Engineering & Vector Systems',
    description: 'Constructing high-throughput processing pipelines, vector search, and structured storage.',
    skills: ['Python', 'Pandas', 'NumPy', 'FAISS Vector Search', 'Redis Caching', 'SQLite', 'YFinance']
  },
  {
    category: 'Backend & Intelligent Systems',
    description: 'Building reliable API services, agentic workflows, and web applications.',
    skills: ['FastAPI', 'React', 'Streamlit', 'Gemini API', 'Apriori Algorithm', 'Docker', 'RESTful APIs', 'Git & GitHub']
  },
  {
    category: 'Exploratory Analytics & Visualization',
    description: 'Creating accessible, publication-grade analytical graphics and interactive dashboards.',
    skills: ['Plotly', 'Power BI', 'Matplotlib & Seaborn', 'PCA Analysis', 'Jupyter Lab']
  }
];

export const academicRecord = {
  institution: 'School of Data Science & Business Intelligence (SDBI)',
  location: 'Mumbai, India',
  degree: 'Bachelor of Science in Data Science & Business Analytics',
  period: '2025 - PRESENT (SY UNDERGRAD)',
  coursework: [
    'Probability & Statistical Inference',
    'Linear Algebra & Multivariable Calculus',
    'Database Management Systems & SQL',
    'Data Structures & Algorithms',
    'Applied Machine Learning',
    'Financial Accounting & Corporate Valuation'
  ],
  focus: 'Focusing on reproducible machine learning pipelines, quantitative modeling, and systems engineering.'
};

export const availabilityText = 'Available for Summer 2027 internships';

export const contactDetails = {
  name: 'Aryan Ashok',
  location: 'Mumbai, India (IST / UTC+5:30)',
  email: 'aryan.ashok0405@gmail.com',
  github: 'https://github.com/Aryan0405/',
  linkedin: 'https://www.linkedin.com/in/aryan-ashok/',
  status: availabilityText
};

export const aboutMe = {
  who: 'An SDBI undergraduate in Data Science & Business Analytics (Class of 2028), seeking internships to apply my academic foundation in practical settings. I am passionate about building robust data solutions.',
  what: 'I build practical machine learning applications, like credit risk scorecards and fraud detection models, with a strong focus on model interpretability (SHAP, Streamlit) and rigorous testing.',
  lookingFor: 'An internship where I can contribute to real-world projects, deepen my understanding of data science pipelines, and learn from experienced professionals.',
  philosophy: 'I believe in the synergy of practical projects, a solid grasp of the underlying mathematics, and clear communication to bridge the gap between technical analysis and business impact. I am always eager to learn and explore beyond the classroom.'
};
