import { Project, ProjectCategory } from "@/types/project";

export const PROJECT_CATEGORIES: { id: ProjectCategory | "All"; label: string }[] = [
  { id: "All", label: "All Projects" },
  { id: "SaaS", label: "SaaS" },
  { id: "Full Stack", label: "Full Stack" },
  { id: "Backend API", label: "Backend API" },
  { id: "AI Automation", label: "AI & Automation" },
  { id: "E-Commerce", label: "E-Commerce" },
  { id: "Desktop Software", label: "Desktop Software" },
  { id: "IoT & Embedded", label: "IoT & Embedded" },
];

/**
 * 1. The 15 Existing Projects (Preserved verbatim from ProjectsSection.tsx)
 * All titles, descriptions, tech stacks, images, and functional links are maintained.
 */
export const existingProjects: Project[] = [
  {
    id: "financial-risk-simulation",
    slug: "financial-risk-simulation-platform",
    title: "Financial Risk Simulation Platform",
    subtitle: "Laravel Fintech Transaction Simulator & Risk Assessment Engine",
    summary:
      "Laravel fintech platform for transaction simulation, risk scoring, fraud signals, and admin review workflows.",
    category: "Full Stack",
    categoryLabel: "Fintech & Full Stack",
    status: "completed",
    isFeatured: true,
    displayPriority: 1,
    role: "Full-Stack Developer",
    projectContext: "Independent Fintech Engineering Project",
    techStack: ["Laravel", "PHP", "JavaScript", "MySQL"],
    structuredStack: {
      core: ["Laravel", "PHP", "JavaScript", "MySQL"],
      backend: ["Laravel", "Eloquent ORM", "REST API"],
      frontend: ["Blade", "JavaScript", "CSS"],
      database: ["MySQL"],
    },
    keyFeatures: [
      "Simulated transaction ingestion with parameterized volume and amount thresholds",
      "Rule-based risk scoring pipeline flagging suspicious transaction patterns",
      "Administrative audit dashboard for reviewing and adjudicating flagged operations",
    ],
    architecturalDetails:
      "Laravel MVC architecture with dedicated service classes isolating transaction simulation logic from database persistence.",
    caseStudy: {
      isFullCaseStudy: true,
      targetAudience: "Fintech engineers, compliance officers, and risk management teams",
      theChallenge:
        "Evaluating fraud detection algorithms and risk assessment pipelines in production fintech systems carries high financial and operational risks. Teams need an isolated, reproducible simulation environment where high-velocity transaction batches can be dynamically injected, stress-tested, and audited under configurable risk rules without risking live capital or corrupting production ledgers.",
      architecture: {
        frontend:
          "Server-rendered Laravel Blade views with modern CSS and vanilla JavaScript for interactive chart updates and tabular batch inspection without heavy SPA overhead.",
        backend:
          "Laravel framework structured with modular Service-Repository architecture. Domain logic is strictly separated from HTTP controllers via dedicated TransactionSimulatorService and RiskEvaluationService classes.",
        database:
          "Relational MySQL schema utilizing Eloquent ORM with indexed foreign keys across transactions, account entities, simulation batches, and immutable audit logs.",
        apiStructure:
          "RESTful endpoints for triggering parameterized transaction batches, polling simulation progress, and retrieving paginated audit records with status filters.",
        authAndSecurity:
          "Session-based administrative authentication with CSRF protection, input sanitization via Form Request validation classes, and immutable transaction audit trails.",
        infrastructure:
          "Standard PHP/Laravel runtime with Composer dependency management, MySQL database engine, and environment-based configuration (.env).",
        diagram: `+-----------------------------------------------------------------------------+
|                         ADMINISTRATIVE DASHBOARD                            |
|  Laravel Blade Views + JavaScript Tabular Stream Monitor                    |
|  - Batch Configuration Form   - Real-Time Risk Gauges   - Adjudication Desk |
+--------------------------------------|--------------------------------------+
                                       | HTTP POST / GET (JSON & Form Requests)
                                       v
+-----------------------------------------------------------------------------+
|                         LARAVEL ROUTING & CONTROL                           |
|  SimulationController & RiskAdjudicationController                          |
|  - FormRequest Validation (Parameter Bounds)   - CSRF & Session Security    |
+--------------------------------------|--------------------------------------+
                                       | DTO Hand-off
                                       v
+-----------------------------------------------------------------------------+
|                           DOMAIN SERVICE LAYER                              |
|  TransactionSimulatorService         RiskEvaluationService                  |
|  - Synthetic Velocity Generator      - Velocity Spike Evaluator             |
|  - Amount Range & Deviation Math     - Off-Hours & Geographic Flag Rules    |
+--------------------------------------|--------------------------------------+
                                       | Chunked Batch Inserts (500 rows/chunk)
                                       v
+-----------------------------------------------------------------------------+
|                           MYSQL RELATIONAL LEDGER                           |
|  Indexed Transactions Schema         Tamper-Evident Audit Logs              |
|  (sender_id, amount, status, score)  (actor_id, decision, reason, timestamp)|
+-----------------------------------------------------------------------------+`,
      },
      technicalDecisions: [
        {
          decision: "Service-Repository Separation vs Fat Laravel Controllers",
          rationale: "Extracted transaction simulation math and fraud scoring rules into dedicated TransactionSimulatorService and RiskEvaluationService classes, keeping controllers focused solely on HTTP request/response lifecycles.",
          tradeOff: "Introduces additional service classes and dependency injection setup for straightforward database operations.",
        },
        {
          decision: "Chunked Batch Inserts vs Single-Row Eloquent Loops",
          rationale: "Synthetic transaction batches (hundreds to thousands of rows) are chunked and inserted in unified batch statements rather than saving models in sequential foreach loops.",
          tradeOff: "Bypasses standard Eloquent model lifecycle hooks and model event listeners for synthetic batch records.",
        },
        {
          decision: "Immutable Audit Trails vs In-Place Flag Overwrites",
          rationale: "Logged every administrative adjudication action (Approved, Rejected, Escalated) as an immutable record in audit_logs rather than merely overwriting a status enum column on the transaction row.",
          tradeOff: "Consumes additional database storage over extended simulation test runs.",
        },
      ],
      testingAndValidation: {
        strategy: "Algorithmic risk rule validation and batch ingestion stress testing in the Laravel environment.",
        verifiedScenarios: [
          "Synthetic transaction generation within strict configured monetary boundaries and distribution spreads.",
          "Multi-rule risk scoring pipeline correctly tagging off-hours transaction bursts and abnormal velocity spikes.",
          "Database transaction integrity: confirming rollback of entire batches if database constraints fail during ingestion.",
          "Administrative adjudication state machine ensuring transactions cannot be approved without recorded reviewer credentials.",
        ],
      },
      keyFeaturesDetailed: [
        {
          title: "Parameterized Batch Ingestion",
          description:
            "Configurable generation of synthetic transaction streams with customizable velocity, currency types, sender/receiver profiles, and deviation ranges.",
          tag: "Simulation Engine",
        },
        {
          title: "Multi-Rule Risk Evaluation Pipeline",
          description:
            "Sequential evaluation filters assessing anomalous velocity spikes, off-hours transaction bursts, and high-value deviation thresholds to assign composite risk scores.",
          tag: "Rule Engine",
        },
        {
          title: "Administrative Adjudication Dashboard",
          description:
            "Interactive operational interface allowing risk officers to filter suspicious activities, inspect granular risk indicators, and adjudicate flags (Approve, Reject, Escalate).",
          tag: "Operations UI",
        },
        {
          title: "Tamper-Evident Audit Trails",
          description:
            "Structured activity logging capturing actor identity, timestamp, initial score, adjudication decision, and administrative commentary for compliance verification.",
          tag: "Compliance & Audit",
        },
      ],
      engineeringChallenges: [
        {
          title: "Decoupling Simulation State from Persistence",
          problem:
            "Generating thousands of high-velocity synthetic transactions in real-time could cause database bottlenecks and lockups if persisted sequentially through traditional ORM loops.",
          solution:
            "Engineered chunked batch inserts and encapsulated simulation math inside dedicated service classes, minimizing database roundtrips and keeping controller memory footprints low.",
        },
        {
          title: "Extensible Rule Registry",
          problem:
            "Hardcoding risk criteria inside controllers made adding new fraud detection signals fragile and difficult to test in isolation.",
          solution:
            "Designed a modular rule evaluator pattern where each risk indicator implements a common evaluation interface, allowing new criteria to be registered cleanly without modifying ingestion code.",
        },
      ],
      resultsAndLearnings: {
        implementedOutcomes: [
          "Delivered a fully functional, self-contained transaction simulation and risk evaluation platform in Laravel and MySQL.",
          "Verified end-to-end workflow from batch generation to scoring, flag trigger, and administrative review.",
          "Source code publicly documented and available on GitHub.",
        ],
        technicalTakeaways: [
          "Service layer encapsulation is essential in Laravel applications handling complex analytical workflows.",
          "Immutable audit logs must be designed at the database schema level from day one to guarantee compliance integrity.",
        ],
      },
    },
    media: {
      thumbnail: "/cover-finrisk.svg",
      badgeIcon: "🛡️",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/Financial_Risk_Simulation_Platform",
      caseStudyUrl: "/projects/financial-risk-simulation-platform",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via public GitHub repository bouhouchhamza/Financial_Risk_Simulation_Platform.",
  },
  {
    id: "ai-automation-systems",
    slug: "ai-automation-systems",
    title: "AI Automation Systems",
    subtitle: "Business Process Automation & Tool Integration",
    summary:
      "Workflow automations that connect business tools, process data, and reduce repetitive manual work.",
    category: "AI Automation",
    categoryLabel: "AI & Workflow Automation",
    status: "completed",
    isFeatured: true,
    displayPriority: 2,
    role: "AI Automation Engineer",
    projectContext: "Business Operations & Automation Solutions",
    techStack: ["n8n", "OpenAI", "Node.js", "APIs"],
    structuredStack: {
      core: ["n8n", "OpenAI API", "Node.js", "APIs"],
      tools: ["Webhooks", "JSON Schema", "Postman"],
    },
    keyFeatures: [
      "Event-driven webhooks connecting customer channels to internal tools",
      "OpenAI prompt workflows formatting inbound data and generating structured outputs",
      "Automated cross-platform synchronization eliminating manual spreadsheet entry",
    ],
    architecturalDetails:
      "Modular n8n nodes executing sequential conditional logic with automated error reporting branches.",
    media: {
      thumbnail: "/project-ai.svg",
      badgeIcon: "🤖",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza",
      caseStudyUrl: "/projects/ai-automation-systems",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via developer portfolio workflow implementations.",
  },
  {
    id: "pet-journey",
    slug: "pet-journey",
    title: "Pet Journey",
    subtitle: "Decoupled Pet Care & Health Journey Web Application",
    summary:
      "Full-stack pet care web application with separated frontend and backend for service and journey management.",
    category: "Full Stack",
    categoryLabel: "Full Stack Web App",
    status: "completed",
    isFeatured: false,
    displayPriority: 3,
    role: "Full-Stack Developer",
    projectContext: "Full-Stack Web Engineering Project",
    techStack: ["JavaScript", "Frontend", "Backend", "Vercel"],
    structuredStack: {
      core: ["JavaScript", "Node.js", "HTML5", "CSS3"],
      tools: ["Vercel", "Git"],
    },
    keyFeatures: [
      "Decoupled client-server architecture serving pet profile data via REST",
      "Pet care timeline tracking for medical milestones and routines",
      "Responsive user interface deployed on Vercel infrastructure",
    ],
    media: {
      thumbnail: "/project-social.svg",
      badgeIcon: "🐾",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/petJourney",
      caseStudyUrl: "/projects/pet-journey",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via public GitHub repository bouhouchhamza/petJourney.",
  },
  {
    id: "shophub-ecommerce",
    slug: "shophub-ecommerce",
    title: "ShopHub E-Commerce",
    subtitle: "Client-Side Storefront with Local Storage Cart Persistence",
    summary:
      "Responsive storefront with search, filtering, sorting, wishlist, cart persistence, and checkout flow.",
    category: "E-Commerce",
    categoryLabel: "E-Commerce Storefront",
    status: "completed",
    isFeatured: false,
    displayPriority: 4,
    role: "Frontend Developer",
    projectContext: "E-Commerce Storefront Engineering",
    techStack: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    structuredStack: {
      core: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
    },
    keyFeatures: [
      "Client-side product search, price range filtering, and category sorting",
      "Cart and wishlist state persistence across browser sessions using LocalStorage",
      "Responsive checkout view with dynamic subtotal and quantity calculation",
    ],
    media: {
      thumbnail: "/project-ecommerce.svg",
      badgeIcon: "🛍️",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/ecommerce_exemple",
      caseStudyUrl: "/projects/shophub-ecommerce",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via public GitHub repository bouhouchhamza/ecommerce_exemple.",
  },
  {
    id: "easycoloc",
    slug: "easycoloc",
    title: "EasyColoc",
    subtitle: "Laravel Shared Housing & Colocation Management Platform",
    summary:
      "Laravel colocation management application focused on roommate, housing, owner, and invitation workflows.",
    category: "Full Stack",
    categoryLabel: "Laravel Web Application",
    status: "completed",
    isFeatured: false,
    displayPriority: 5,
    role: "Full-Stack Developer",
    projectContext: "Housing Management Web Application",
    techStack: ["Laravel", "PHP", "Blade", "MySQL"],
    structuredStack: {
      core: ["Laravel", "PHP", "Blade", "MySQL"],
      database: ["MySQL"],
    },
    keyFeatures: [
      "Apartment profile listings detailing amenities, rent breakdown, and rules",
      "Roommate invitation workflow linking co-tenants to specific property units",
      "Role-based authentication distinguishing property managers and tenants",
    ],
    media: {
      thumbnail: "/project-realestate.svg",
      badgeIcon: "🏠",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/easycoloc",
      caseStudyUrl: "/projects/easycoloc",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via public GitHub repository bouhouchhamza/easycoloc.",
  },
  {
    id: "habit-tracker",
    slug: "habit-tracker",
    title: "Habit Tracker",
    subtitle: "Personal Goal Routine & Habit Monitoring Platform",
    summary:
      "Productivity web app for tracking habits, monitoring consistency, and organizing personal routines.",
    category: "SaaS",
    categoryLabel: "Productivity Web App",
    status: "completed",
    isFeatured: false,
    displayPriority: 6,
    role: "Full-Stack Developer",
    projectContext: "Personal Productivity Application",
    techStack: ["Laravel", "PHP", "Blade", "MySQL"],
    structuredStack: {
      core: ["Laravel", "PHP", "Blade", "MySQL"],
    },
    keyFeatures: [
      "Daily habit completion checklist with automated status toggles",
      "Consistency streak calculation tracking consecutive completion days",
      "Category grouping for organizing health, learning, and daily routines",
    ],
    media: {
      thumbnail: "/project-weather.svg",
      badgeIcon: "📈",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/habit_tracker",
      caseStudyUrl: "/projects/habit-tracker",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via public GitHub repository bouhouchhamza/habit_tracker.",
  },
  {
    id: "supabase-commerce",
    slug: "supabase-commerce-website",
    title: "Supabase Commerce Website",
    subtitle: "Cloud-Backed React Storefront Powered by Supabase",
    summary:
      "Modern store experience with product content, responsive browsing, and a clean conversion-focused interface.",
    category: "E-Commerce",
    categoryLabel: "Modern E-Commerce",
    status: "completed",
    isFeatured: false,
    displayPriority: 7,
    role: "Frontend Developer",
    projectContext: "Cloud-Backed Storefront Interface",
    techStack: ["Supabase", "React", "CSS", "APIs"],
    structuredStack: {
      core: ["Supabase", "React", "CSS3", "REST APIs"],
      database: ["PostgreSQL via Supabase"],
    },
    keyFeatures: [
      "Dynamic catalog querying directly from Supabase PostgreSQL tables",
      "Responsive product browsing layout with category separation",
      "Cloud-synchronized item records and detailed view cards",
    ],
    media: {
      thumbnail: "/project-ecommerce.svg",
      badgeIcon: "⚡",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza",
      caseStudyUrl: "/projects/supabase-commerce-website",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via developer portfolio profile.",
  },
  {
    id: "eau-tracker",
    slug: "eau-tracker",
    title: "EAU Tracker",
    subtitle: "IoT Water Telemetry & Hardware Monitoring Dashboard",
    summary:
      "IoT water monitoring interface for collecting and presenting device data in a practical web dashboard.",
    category: "IoT & Embedded",
    categoryLabel: "IoT & Telemetry",
    status: "completed",
    isFeatured: false,
    displayPriority: 8,
    role: "IoT & Software Developer",
    projectContext: "IoT Telemetry Hardware Project",
    techStack: ["Arduino", "PHP", "JavaScript", "CSS"],
    structuredStack: {
      core: ["Arduino", "PHP", "JavaScript", "CSS3"],
      backend: ["PHP Sensor Ingestion"],
    },
    keyFeatures: [
      "Microcontroller sensor pulse ingestion for volumetric water flow tracking",
      "Real-time web dashboard visualizing current flow rate and cumulative use",
      "Anomaly threshold monitoring indicating continuous flow or potential leaks",
    ],
    media: {
      thumbnail: "/project-dashboard.svg",
      badgeIcon: "💧",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/EAU_TRACKER",
      caseStudyUrl: "/projects/eau-tracker",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via public GitHub repository bouhouchhamza/EAU_TRACKER.",
  },
  {
    id: "shop-project",
    slug: "shop-project",
    title: "Shop Project",
    subtitle: "Semantic HTML & Responsive CSS Storefront Concept",
    summary:
      "Compact storefront concept built to present products and basic commercial content with a simple layout.",
    category: "E-Commerce",
    categoryLabel: "Frontend Concept",
    status: "completed",
    isFeatured: false,
    displayPriority: 9,
    role: "Frontend Developer",
    projectContext: "UI Layout Practice",
    techStack: ["HTML", "CSS", "UI"],
    structuredStack: {
      core: ["HTML5", "CSS3", "JavaScript"],
    },
    keyFeatures: [
      "Semantic HTML5 product card architecture with accessible element structure",
      "Responsive grid reflow accommodating mobile and desktop viewports",
      "Lightweight styling without external CSS framework dependencies",
    ],
    media: {
      thumbnail: "/project-social.svg",
      badgeIcon: "🛒",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/shop_project",
      caseStudyUrl: "/projects/shop-project",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via public GitHub repository bouhouchhamza/shop_project.",
  },
  {
    id: "workflows",
    slug: "workflows",
    title: "Workflows",
    subtitle: "Reusable n8n Automation Workflows Library",
    summary:
      "Collection of automation workflows for connecting tools, reducing manual tasks, and improving business operations.",
    category: "AI Automation",
    categoryLabel: "Workflow Infrastructure",
    status: "completed",
    isFeatured: false,
    displayPriority: 10,
    role: "Automation Engineer",
    projectContext: "Automation Utility Library",
    techStack: ["n8n", "Automation", "APIs", "Workflows"],
    structuredStack: {
      core: ["n8n", "JSON", "Webhooks", "REST APIs"],
    },
    keyFeatures: [
      "Configurable webhook ingestion nodes parsing incoming JSON payloads",
      "Data sanitation and mapping nodes connecting third-party platforms",
      "Automated notification triggers routing alerts to messaging channels",
    ],
    media: {
      thumbnail: "/project-ai.svg",
      badgeIcon: "⚡",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/workflows",
      caseStudyUrl: "/projects/workflows",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via public GitHub repository bouhouchhamza/workflows.",
  },
  {
    id: "sahrwi-travaux",
    slug: "sahrwi-travaux",
    title: "Sahrwi Travaux",
    subtitle: "Commercial Showcase Website for Moroccan Construction Firm",
    summary:
      "Modern service website built to present construction and travaux offerings with a clean conversion-focused interface.",
    category: "Full Stack",
    categoryLabel: "Commercial Showcase",
    status: "live",
    isFeatured: true,
    displayPriority: 11,
    role: "Frontend Engineer",
    projectContext: "Commercial Client Web Build",
    techStack: ["Next.js", "React", "Vercel", "UI"],
    structuredStack: {
      core: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    },
    keyFeatures: [
      "Responsive portfolio showcase highlighting completed construction works",
      "Direct consultation and quote request contact sections",
      "Fast production deployment hosted on Vercel global edge network",
    ],
    media: {
      thumbnail: "/project-realestate.svg",
      badgeIcon: "🏗️",
    },
    links: {
      liveUrl: "https://sahrwi-traveux.vercel.app/",
      caseStudyUrl: "/projects/sahrwi-travaux",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via active live deployment at sahrwi-traveux.vercel.app.",
  },
  {
    id: "serv-booking",
    slug: "serv-booking",
    title: "Serv Booking",
    subtitle: "Online Appointment Booking & Scheduling Experience",
    summary:
      "Booking experience for service businesses, focused on clear scheduling, customer flow, and practical operations.",
    category: "SaaS",
    categoryLabel: "SaaS & Booking",
    status: "live",
    isFeatured: true,
    displayPriority: 12,
    role: "Frontend & Full-Stack Developer",
    projectContext: "Service Booking Web Application",
    techStack: ["Next.js", "Booking", "SaaS", "Vercel"],
    structuredStack: {
      core: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    keyFeatures: [
      "Interactive appointment date and time slot selection interface",
      "Streamlined customer booking flow with form validation",
      "Sub-second page transitions powered by Next.js App Router on Vercel",
    ],
    media: {
      thumbnail: "/project-dashboard.svg",
      badgeIcon: "📅",
    },
    links: {
      liveUrl: "https://serv-eta.vercel.app/",
      caseStudyUrl: "/projects/serv-booking",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via active live deployment at serv-eta.vercel.app.",
  },
  {
    id: "ai-video-automation",
    slug: "ai-video-automation",
    title: "AI Video Automation",
    subtitle: "Programmatic Script & Video Rendering Pipeline",
    summary:
      "AI-powered automation project for generating and processing video content through repeatable workflow systems.",
    category: "AI Automation",
    categoryLabel: "Media Automation",
    status: "completed",
    isFeatured: false,
    displayPriority: 13,
    role: "Automation Developer",
    projectContext: "Video Processing Automation",
    techStack: ["AI", "Automation", "Python", "APIs"],
    structuredStack: {
      core: ["Python", "AI APIs", "Video Processing", "FFmpeg"],
    },
    keyFeatures: [
      "Script ingestion pipeline coordinating text-to-speech generation",
      "Automated video asset positioning and subtitle alignment",
      "Batch execution rendering social video clips programmatically",
    ],
    media: {
      thumbnail: "/project-ai.svg",
      badgeIcon: "🎬",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/ai_video_automation",
      caseStudyUrl: "/projects/ai-video-automation",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via public GitHub repository bouhouchhamza/ai_video_automation.",
  },
  {
    id: "content-writer-automation",
    slug: "content-writer-automation",
    title: "Content Writer Automation",
    subtitle: "AI-Assisted Writing & Content Generation Tool",
    summary:
      "Automation tool for writing and structuring content faster with practical AI-assisted generation workflows.",
    category: "AI Automation",
    categoryLabel: "AI Content Tool",
    status: "completed",
    isFeatured: false,
    displayPriority: 14,
    role: "Automation Developer",
    projectContext: "AI Writing Utility",
    techStack: ["AI", "Content", "Automation", "Node.js"],
    structuredStack: {
      core: ["Node.js", "OpenAI API", "JavaScript", "JSON"],
    },
    keyFeatures: [
      "Sequential prompt chaining structuring topic outlines into draft articles",
      "JSON formatted output facilitating integration into headless CMS systems",
      "Keyword parameter injection tailored for target SEO terminology",
    ],
    media: {
      thumbnail: "/project-social.svg",
      badgeIcon: "✍️",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/content_writer",
      caseStudyUrl: "/projects/content-writer-automation",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via public GitHub repository bouhouchhamza/content_writer.",
  },
  {
    id: "b-plan-portfolio",
    slug: "b-plan-portfolio",
    title: "B_Plan Portfolio",
    subtitle: "Responsive Portfolio Showcase for Digital Professionals",
    summary:
      "Premium personal portfolio website designed for clear presentation, responsive browsing, and professional branding.",
    category: "Full Stack",
    categoryLabel: "Portfolio Design",
    status: "live",
    isFeatured: false,
    displayPriority: 15,
    role: "Frontend Engineer",
    projectContext: "Professional Portfolio Build",
    techStack: ["React", "Portfolio", "Vercel", "Design"],
    structuredStack: {
      core: ["React", "CSS3", "JavaScript", "Vercel"],
    },
    keyFeatures: [
      "Clean visual showcase displaying developer projects and technical skills",
      "Fluid responsive layout adapting across mobile, tablet, and desktop",
      "Live deployment on Vercel ensuring fast worldwide delivery",
    ],
    media: {
      thumbnail: "/project-ecommerce.svg",
      badgeIcon: "💼",
    },
    links: {
      liveUrl: "https://arjdal-portfolio.vercel.app/",
      caseStudyUrl: "/projects/b-plan-portfolio",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes: "Verified via active live deployment at arjdal-portfolio.vercel.app.",
  },
];

/**
 * 2. The 7 New Verified Projects (Detailed technical profiles)
 * Verified against available repositories, live sites, and documentation.
 */
export const newVerifiedProjects: Project[] = [
  {
    id: "corepos",
    slug: "corepos-desktop-pos",
    title: "CorePOS",
    subtitle: "Desktop Point of Sale & Inventory Management Software",
    summary:
      "A local-first desktop application designed for retail point-of-sale operations, inventory tracking, transaction receipts, feature gating, and data backup safeguards.",
    category: "Desktop Software",
    categoryLabel: "Desktop Software",
    status: "in-development",
    isFeatured: true,
    displayPriority: 1,
    bentoSpan: "col-span-2",
    role: "Desktop Software Architect",
    projectContext: "Commercial Desktop POS Software",
    techStack: ["Tauri", "Rust", "React", "TypeScript", "SQLite"],
    structuredStack: {
      core: ["Tauri 2", "Rust", "React 18", "TypeScript", "SQLite"],
      backend: ["Tauri Native Core", "Rust IPC Commands", "Argon2 Auth"],
      frontend: ["React 18 SPA", "TypeScript", "Keyboard-First POS UI"],
      database: ["SQLite Local Storage", "WAL Mode", "Atomic Transactions"],
      tools: ["Git", "Windows WebView2", "Build Tooling"],
    },
    keyFeatures: [
      "Local-first checkout and sales processing designed for offline resilience",
      "Real-time stock decrementing, catalog search, and low-inventory thresholds",
      "Role-based feature gating with automated backup and data synchronization safeguards",
    ],
    architecturalDetails:
      "Offline-first desktop software architecture prioritizing local persistence and data integrity without mandatory cloud dependency during transactions.",
    caseStudy: {
      isFullCaseStudy: true,
      targetAudience: "Retail store owners, stationery shops, and retail cashiers in emerging markets",
      theChallenge:
        "Retail stores, bookshops, and stationery businesses in emerging markets face frequent internet disruptions and power fluctuations. Conventional cloud-only POS systems freeze or drop carts during connectivity drops, causing customer queue delays, cash reconciliation errors, and inventory discrepancies. Small retail businesses require a zero-latency, local-first point of sale that operates completely offline while maintaining strict data integrity and hardware printing capabilities.",
      architecture: {
        frontend:
          "React 18 single-page application with TypeScript and modern CSS, delivering sub-15ms user interaction latency and responsive keyboard-first cashier shortcuts.",
        backend:
          "Tauri 2 desktop runtime with a native Rust core, bridging frontend commands to the operating system via safe, asynchronous inter-process communication (IPC).",
        database:
          "Embedded SQLite database running locally on the merchant's machine. All transactions (sales, stock adjustments, credit payments) execute in strict atomic ACID transactions (BEGIN TRANSACTION ... COMMIT) with WAL mode enabled.",
        authAndSecurity:
          "Local Argon2 password hashing and role-based access control (Cashier, Manager, Administrator) enforced natively on the Rust side before executing database operations.",
        infrastructure:
          "Self-contained Windows desktop application leveraging WebView2, eliminating bundled Chromium browser binaries and significantly reducing idle memory overhead compared to multi-process Electron runtimes.",
        diagram: `+-----------------------------------------------------------------------------+
|                          CLIENT PRESENTATION LAYER                          |
|  React 18 SPA (TypeScript) / Windows WebView2 Desktop Viewport              |
|  - Keyboard-First Cashier POS Grid   - Instant Barcode / SKU Scanner Engine |
|  - Cart Line-Item Computations       - Customer Credit & Settlement UI      |
+--------------------------------------|--------------------------------------+
                                       | Asynchronous IPC (JSON Commands)
                                       v
+-----------------------------------------------------------------------------+
|                           RUST DESKTOP RUNTIME                              |
|  Tauri 2 Core Architecture                                                  |
|  - Argon2 Password & Role RBAC       - Cash Drawer Session Reconciler       |
|  - Multi-Entity Checkout Safeguards  - Schema Migrator (PRAGMA user_version)|
+------------------|---------------------------------------|------------------+
                   | Direct ESC/POS Driver Pipeline        | Local SQLite Engine
                   v                                       v
+------------------------------------+   +------------------------------------+
|          HARDWARE LAYER            |   |       LOCAL STORAGE ENGINE         |
|  Thermal Receipt & Invoice Printer |   |  Embedded SQLite (WAL Mode, ACID)  |
|  (Raw Socket / USB ESC/POS)        |   |  Transactions, Ledgers, Customers  |
+------------------------------------+   +------------------------------------+ `,
      },
      technicalDecisions: [
        {
          decision: "Tauri 2 + Rust Core vs Electron",
          rationale: "Selected Tauri 2 with a native Rust core to minimize background resource usage compared to Electron and enable direct, low-overhead OS hardware communication with thermal receipt printers.",
          tradeOff: "Required writing custom Rust IPC commands and data serializations instead of using existing Node.js npm packages directly.",
        },
        {
          decision: "Local SQLite with WAL Mode vs Embedded NoSQL",
          rationale: "Selected SQLite for strict ACID transactional guarantees, foreign key cascades, and atomic stock rollbacks under sudden power loss.",
          tradeOff: "Required building a custom DDL migration runner instead of using dynamic schema-free document insertion.",
        },
        {
          decision: "Local-First Architecture vs Cloud-Connected API",
          rationale: "Prioritized 100% offline autonomy for retail environments where power and internet connectivity fluctuate daily.",
          tradeOff: "Cloud backup and multi-device sync must be handled via scheduled asynchronous export rather than real-time WebSockets.",
        },
      ],
      testingAndValidation: {
        strategy: "Local automated SQLite transaction integrity testing and real hardware ESC/POS receipt generation validation.",
        verifiedScenarios: [
          "Simulated process-termination and transaction abort testing validating SQLite rollback integrity during multi-item checkouts.",
          "Idempotent schema migration validation from v1 schema to v2 without data loss using PRAGMA user_version.",
          "High-speed continuous barcode scanning buffer stress testing without dropped input events.",
          "Thermal receipt formatting and cash drawer kick pulse signaling over ESC/POS command sequences.",
        ],
      },
      keyFeaturesDetailed: [
        {
          title: "Local-First Offline Checkout Engine",
          description:
            "Instantaneous barcode scanning, item lookup, and cart calculations that process cash, customer credit, and partial payments with zero internet requirement.",
          tag: "Checkout & Sales",
        },
        {
          title: "Real-Time Stock Decrementing & Low-Stock Alerts",
          description:
            "Automatic inventory deductions upon sale confirmation, multi-unit packaging support, sequential barcode/SKU generation, and configurable low-inventory reorder thresholds.",
          tag: "Inventory Control",
        },
        {
          title: "Customer Credit Ledger & Debt Settlement",
          description:
            "Dedicated credit tracking allowing trusted customers to buy on credit with partial payment logging, running balance summaries, and payment history receipts.",
          tag: "Credit Management",
        },
        {
          title: "Supplier Purchases & Multi-Line Expense Logging",
          description:
            "Structured tracking of inbound stock purchase orders, supplier payments, and recurring business operating expenses recorded in transactional ledgers.",
          tag: "Procurement & Accounting",
        },
        {
          title: "Cash Drawer Session Management",
          description:
            "Shift opening and closing workflows with starting cash verification, expected vs actual cash counting, discrepancy flagging, and end-of-day reconciliation summaries.",
          tag: "Cashier Operations",
        },
        {
          title: "Hardware Thermal Receipt & Invoice Printing",
          description:
            "Direct ESC/POS and standard printer support via WebView printing pipelines, generating formatted receipts, customer invoices, and Z-reports.",
          tag: "Hardware Integration",
        },
      ],
      engineeringChallenges: [
        {
          title: "Atomic Multi-Entity Transaction Safeguards",
          problem:
            "A single checkout operation must decrement stock for multiple items, create line items, record customer credit, log payment method splits, and update register balances without risk of partial writes during sudden power loss.",
          solution:
            "Enforced strict SQLite transactions across all checkout commands in Rust. If any single constraint fails or an interruption occurs, SQLite rolls back the entire state to preserve ledger integrity.",
        },
        {
          title: "Idempotent Local Database Migration",
          problem:
            "Updating desktop applications on client machines must migrate existing local SQLite databases to new schema versions without losing historical transaction records or requiring manual DBA intervention.",
          solution:
            "Implemented an idempotent schema migration runner at application startup that checks PRAGMA user_version, executes non-destructive incremental DDL scripts, and creates automated pre-migration database backups.",
        },
      ],
      resultsAndLearnings: {
        implementedOutcomes: [
          "Developed and verified a robust local-first desktop POS operating completely offline with immediate, low-latency UI responsiveness.",
          "Validated sales, customer credit, supplier purchases, expense tracking, and thermal receipt formatting in simulated retail workstation testing.",
          "Commercial enterprise codebase maintained in private repository with proprietary business logic kept secure.",
        ],
        plannedImprovements: [
          "Background cloud backup synchronization and multi-terminal LAN replication while preserving the offline-first guarantee.",
          "Direct integration with wireless barcode scanners and ESC/POS raw socket printing.",
        ],
        technicalTakeaways: [
          "Tauri 2 + SQLite is a dramatically superior stack compared to Electron for local-first business software, providing a significantly leaner architecture than Chromium-bundled desktop frameworks.",
          "ACID compliance at the local database layer is the single most important reliability guarantee for offline retail software.",
        ],
      },
    },
    media: {
      thumbnail: "/cover-corepos.svg",
      badgeIcon: "🖥️",
    },
    links: {
      caseStudyUrl: "/projects/corepos-desktop-pos",
    },
    isPrivateRepo: true,
    isPublished: true,
    verificationNotes:
      "Verified as an active local-first desktop software project. Private repository; source code and proprietary client logic remain confidential.",
  },
  {
    id: "nuvomailo",
    slug: "nuvomailo-email-saas",
    title: "Nuvomailo",
    subtitle: "Multi-Tenant Email Hosting SaaS Platform",
    summary:
      "A multi-tenant email hosting platform in development, built with TypeScript, Express, React, PostgreSQL, and Docker Mailserver, structured around organization-scoped tenant isolation and domain administration.",
    category: "SaaS",
    categoryLabel: "Email Hosting SaaS",
    status: "in-development",
    isFeatured: true,
    displayPriority: 3,
    bentoSpan: "col-span-1",
    role: "Full-Stack & Systems Architect",
    projectContext: "Multi-Tenant Infrastructure Project (Private Pilot Target)",
    techStack: ["TypeScript", "Express", "React", "PostgreSQL", "Docker", "Docker Mailserver"],
    structuredStack: {
      core: ["TypeScript", "Express", "React", "Node.js"],
      backend: ["Express REST API", "Service Layer MVC"],
      frontend: ["React", "TypeScript Dashboard"],
      database: ["PostgreSQL"],
      tools: ["Docker", "Docker Compose", "Docker Mailserver", "Git"],
    },
    keyFeatures: [
      "Multi-tenant organization hierarchy with independently scoped domains and mailboxes",
      "TypeScript and Express service-layer architecture backed by PostgreSQL persistence",
      "Docker Mailserver containerization orchestrating SMTP and IMAP services",
    ],
    architecturalDetails:
      "Modular monolith separating web administration (React View + Express Service Layer) from underlying mail infrastructure (Docker Mailserver SMTP/IMAP).",
    caseStudy: {
      isFullCaseStudy: true,
      targetAudience: "Digital agencies, multi-brand companies, and IT infrastructure managers",
      theChallenge:
        "Agencies and growing businesses managing multiple client domains face exorbitant per-mailbox subscription fees from major email providers. Self-hosting email infrastructure is notoriously difficult due to complex Postfix/Dovecot configurations, DNS authentication requirements, and lack of multi-tenant administrative interfaces for provisioning client domains and storage quotas.",
      architecture: {
        frontend:
          "React single-page application built with TypeScript, featuring modular administration views for organization switching, domain management, mailbox quota graphs, and user provisioning.",
        backend:
          "TypeScript Express modular service-layer architecture providing RESTful endpoints, request validation, and decoupled service classes separating tenant logic from email daemons.",
        database:
          "Relational PostgreSQL database enforcing tenant isolation through strict organization_id scoping, foreign keys, and indexed domain/mailbox relationships.",
        infrastructure:
          "Docker and Docker Compose multi-container orchestration packaging the web application, PostgreSQL database, and Docker Mailserver (running Postfix, Dovecot, and SpamAssassin).",
        authAndSecurity:
          "JWT session authentication, bcrypt password hashing, and role-based permissions separating System Administrators from Organization Managers.",
        diagram: `+-----------------------------------------------------------------------------+
|                          ADMINISTRATION FRONTEND                            |
|  React 18 SPA (TypeScript)                                                  |
|  - Multi-Tenant Org Switcher         - Domain & Namespace Dashboard         |
|  - Mailbox Provisioning & Quotas     - DNS Configuration Guidance (SPF/DKIM)|
+--------------------------------------|--------------------------------------+
                                       | REST API (JSON / Bearer JWT)
                                       v
+-----------------------------------------------------------------------------+
|                        EXPRESS SERVICE MONOLITH                             |
|  Node.js / Express Service Layer                                            |
|  - Organization-Scoping Middleware   - Mailbox Provisioning Services        |
|  - Domain Management Controller      - Role-Based Access Control (RBAC)     |
+------------------|---------------------------------------|------------------+
                   | Relational Queries                    | Container Orchestration
                   v                                       v
+------------------------------------+   +------------------------------------+
|         DATABASE PERSISTENCE       |   |       CONTAINERIZED MAIL ENGINE    |
|  PostgreSQL Database               |   |  Docker Mailserver Suite           |
|  - Strict organization_id Scoping  |   |  - Postfix (SMTP Routing)          |
|  - Domains, Accounts, Quotas       |   |  - Dovecot (IMAP Retrieval)        |
+------------------------------------+   +------------------------------------+ `,
      },
      technicalDecisions: [
        {
          decision: "Containerized Docker Mailserver vs Bare-Metal Postfix/Dovecot",
          rationale: "Chose Docker Mailserver to encapsulate SMTP/IMAP/SpamAssassin daemons in isolated containers, enabling reproducible developer environments and eliminating brittle host OS configuration drift.",
          tradeOff: "Inter-container network routing and persistent volume permission management requires careful Docker Compose orchestration.",
        },
        {
          decision: "Service-Layer Monolith vs Microservices",
          rationale: "Maintained a modular Express service-layer architecture to keep tenant management and mailbox provisioning within a single predictable, easily auditable codebase.",
          tradeOff: "Background mail synchronization jobs share memory with the HTTP API server in early development.",
        },
        {
          decision: "Organization-Scoped Multi-Tenancy vs Database-Per-Tenant",
          rationale: "Implemented a shared PostgreSQL schema with strict organization_id foreign key isolation to minimize operational connection overhead while scaling across client domains.",
          tradeOff: "Mandatory scoping middleware is required on every single query to eliminate cross-tenant data leaks.",
        },
      ],
      testingAndValidation: {
        strategy: "Multi-tenant boundary verification and containerized SMTP/IMAP protocol connectivity tests.",
        verifiedScenarios: [
          "Tenant isolation tests confirming Organization A cannot query, update, or delete domains belonging to Organization B.",
          "Mailbox quota validation preventing mailbox provisioning when tenant quota limit is exceeded.",
          "Docker Mailserver container health checks and SMTP handshake tests via local Postman and nodemailer scripts.",
          "Password hash generation using bcrypt with verified authentication session tokens.",
        ],
      },
      keyFeaturesDetailed: [
        {
          title: "Multi-Tenant Organization Hierarchy",
          description:
            "Multi-tier tenant architecture allowing system administrators to manage multiple client organizations, each with isolated domain namespaces and mailboxes.",
          tag: "Multi-Tenancy",
        },
        {
          title: "Domain & Namespace Administration",
          description:
            "CRUD workflows for adding custom domains, setting default mailbox limits, and reviewing expected DNS configuration parameters.",
          tag: "Domain Management",
        },
        {
          title: "Mailbox Provisioning & Quota Allocation",
          description:
            "Creation of individual user mailboxes with customizable storage limits, forwarders, aliases, and automated password generation.",
          tag: "Mailbox Control",
        },
        {
          title: "Containerized Email Engine",
          description:
            "Docker Mailserver integration orchestrating Postfix for SMTP transmission and Dovecot for IMAP message retrieval within container networks.",
          tag: "Mail Infrastructure",
        },
      ],
      engineeringChallenges: [
        {
          title: "Strict Tenant Isolation in Shared Relational Schemas",
          problem:
            "In multi-tenant platforms, any leak of domain or mailbox data across client organizations presents critical security and privacy violations.",
          solution:
            "Implemented mandatory organization-scoping middleware on all Express routes and verified foreign key cascading rules in PostgreSQL to guarantee that requests can only access data belonging to the authenticated tenant.",
        },
        {
          title: "Decoupling Web Management from Low-Level Mail Daemons",
          problem:
            "Directly modifying Linux system configuration files (/etc/postfix, /etc/dovecot) from web controllers creates race conditions and security vulnerabilities.",
          solution:
            "Architected a decoupled service layer where web management communicates with mailbox databases through controlled database abstractions and structured state synchronization.",
        },
      ],
      resultsAndLearnings: {
        implementedOutcomes: [
          "Developed core multi-tenant backend service layer and React administration dashboard with verified PostgreSQL persistence.",
          "Configured containerized Docker Mailserver environment for local SMTP and IMAP service validation.",
          "Public GitHub repository available at bouhouchhamza/Nuvomailo_V1.",
        ],
        plannedImprovements: [
          "Automated DNS TXT record verification checking SPF, DKIM, and DMARC before mailbox activation.",
          "Daemon synchronization service automating Postfix virtual mailbox table updates on live Linux hosts.",
          "Production pilot testing with select beta client domains.",
        ],
        technicalTakeaways: [
          "Multi-tenant data isolation must be enforced systematically through middleware and database constraints, never left to ad-hoc controller queries.",
          "Containerizing complex mail suites with Docker Compose accelerates local integration testing and eliminates environment discrepancies.",
        ],
      },
    },
    media: {
      thumbnail: "/cover-nuvomailo.svg",
      badgeIcon: "✉️",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/Nuvomailo_V1",
      caseStudyUrl: "/projects/nuvomailo-email-saas",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes:
      "Verified via bouhouchhamza/Nuvomailo_V1. Development project targeting private pilot; planned automated DNS TXT verification and mailbox daemon are clearly distinguished from implemented core models.",
  },
  {
    id: "atlas-commerce",
    slug: "atlas-commerce-platform",
    title: "Atlas Commerce",
    subtitle: "Full-Stack E-Commerce Platform with Vue 3 & NestJS",
    summary:
      "A full-stack e-commerce system featuring a Vue 3 storefront and admin UI, Pinia state management with local cart persistence, a NestJS REST API with Prisma ORM, PostgreSQL database, and WhatsApp cash-on-delivery checkout.",
    category: "E-Commerce",
    categoryLabel: "Full-Stack E-Commerce",
    status: "completed",
    isFeatured: true,
    displayPriority: 4,
    bentoSpan: "col-span-2",
    role: "Full-Stack Developer",
    projectContext: "Full-Stack Enterprise E-Commerce Platform",
    techStack: ["Vue 3", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "Pinia", "Vite"],
    structuredStack: {
      core: ["Vue 3", "TypeScript", "NestJS", "Prisma", "PostgreSQL"],
      backend: ["NestJS REST API", "Prisma ORM", "JWT Authentication"],
      frontend: ["Vue 3", "Vite", "Pinia Store", "Responsive CSS"],
      database: ["PostgreSQL", "Prisma Migrations"],
      tools: ["Docker", "Postman", "Git"],
    },
    keyFeatures: [
      "Vue 3 & Vite storefront with Pinia-driven cart persistence and WhatsApp checkout",
      "NestJS modular backend with Prisma ORM migrations and PostgreSQL persistence",
      "Admin dashboard with JWT authentication for catalog and order management",
    ],
    architecturalDetails:
      "Decoupled architecture: /frontend (Vue 3, Pinia) communicating with /backend (NestJS REST API at /api) utilizing Prisma ORM on PostgreSQL.",
    caseStudy: {
      isFullCaseStudy: true,
      targetAudience: "E-commerce merchants, regional retail brands, and multi-channel sellers",
      theChallenge:
        "Regional e-commerce businesses need fast, mobile-first storefronts coupled with robust backend inventory control and regional checkout adaptations (such as WhatsApp ordering and Cash on Delivery). Off-the-shelf monolithic platforms often incur high recurring plugin fees, slow mobile loading speeds, and restrictive checkout workflows.",
      architecture: {
        frontend:
          "Vue 3 Composition API with Vite for sub-second build times, Pinia state management with LocalStorage cart persistence, and responsive mobile-first CSS.",
        backend:
          "NestJS enterprise REST API utilizing modular architecture (AuthModule, ProductsModule, OrdersModule, PrismaModule) with Class-Validator DTOs and dependency injection.",
        database:
          "PostgreSQL database managed through Prisma ORM with declarative schema migrations, automated foreign key constraints, and relational integrity.",
        authAndSecurity:
          "Passport JWT authentication guards protecting administrative routes, password hashing with bcrypt, and parameterized queries preventing SQL injection.",
        apiStructure:
          "Clean RESTful API exposing categorized catalog endpoints, administrative inventory CRUD, and order intake routes with typed DTO validation.",
        diagram: `+-----------------------------------------------------------------------------+
|                         STOREFRONT & ADMIN CLIENT                           |
|  Vue 3 (Composition API) + Vite + Pinia State Management                    |
|  - Category Catalog & Search         - Persistent Local Cart Store          |
|  - WhatsApp Checkout Dispatch        - JWT-Guarded Merchant Admin UI        |
+--------------------------------------|--------------------------------------+
                                       | REST API (/api/v1 - JSON Payloads)
                                       v
+-----------------------------------------------------------------------------+
|                        NESTJS ENTERPRISE BACKEND                            |
|  Modular Architecture (AuthModule, ProductsModule, OrdersModule)            |
|  - Class-Validator DTO Pipes         - Passport JWT Auth Guards             |
|  - Product & Order Services          - Dependency Injection Container       |
+--------------------------------------|--------------------------------------+
                                       | Type-Safe Prisma Queries
                                       v
+------------------------------------+   +------------------------------------+
|         DATABASE LAYER             |   |        ORDER DISPATCH SINK         |
|  PostgreSQL Database               |   |  WhatsApp Business Deep-Link       |
|  - Prisma Automated Migrations     |   |  - Pre-Formatted Markdown Order    |
|  - Categories, Products, Variants  |   |  - Cash on Delivery Coordination   |
+------------------------------------+   +------------------------------------+ `,
      },
      technicalDecisions: [
        {
          decision: "NestJS with Prisma ORM vs Express with Raw SQL",
          rationale: "Selected NestJS for enterprise modularity, dependency injection, and Prisma for type-safe database queries with declarative migrations and automated relational integrity.",
          tradeOff: "Higher initial boilerplate and stricter TypeScript compilation compared to minimal Express setups.",
        },
        {
          decision: "Pinia Store with LocalStorage Plugin vs Vuex",
          rationale: "Selected Pinia for Vue 3 Composition API ergonomics, smaller bundle footprint, and synchronous LocalStorage cart hydration.",
          tradeOff: "Required custom error boundary guards to catch corrupted client LocalStorage JSON payloads.",
        },
        {
          decision: "WhatsApp Checkout vs Mandatory Payment Gateway",
          rationale: "Adapted checkout to regional merchant patterns using direct WhatsApp order message composition alongside Cash on Delivery, significantly reducing cart abandonment.",
          tradeOff: "Order confirmation requires merchant-buyer chat confirmation rather than instantaneous automated credit card webhooks.",
        },
      ],
      testingAndValidation: {
        strategy: "DTO validation testing, Prisma schema migration verification, and cart state hydration tests.",
        verifiedScenarios: [
          "NestJS ValidationPipe rejecting invalid product/order payloads with structured 400 Bad Request responses.",
          "End-to-end cart state persistence across page refreshes and browser tab closures.",
          "Admin JWT guard verification ensuring unauthorized requests cannot mutate inventory or catalog data.",
          "Formatted WhatsApp checkout URI generation with URL-encoded order line items and pricing totals.",
        ],
      },
      keyFeaturesDetailed: [
        {
          title: "Decoupled Vue 3 & Vite Storefront",
          description:
            "Lightweight, snappy client interface featuring instant category filtering, full-text product search, and responsive mobile product cards.",
          tag: "Storefront UI",
        },
        {
          title: "Persistent Pinia Cart & WhatsApp Checkout",
          description:
            "Client-side cart state hydrated from LocalStorage, supporting quantity modifications, variant selections, and formatted one-click WhatsApp order dispatch.",
          tag: "Cart & Checkout",
        },
        {
          title: "Modular NestJS Backend & Prisma ORM",
          description:
            "Enterprise backend architecture with strict separation of controllers, services, and repositories, backed by Prisma migrations on PostgreSQL.",
          tag: "Backend & ORM",
        },
        {
          title: "Administrative Catalog & Order Management",
          description:
            "Secured admin dashboard for adding products, uploading media, updating stock quantities, and tracking incoming order statuses.",
          tag: "Merchant Admin",
        },
      ],
      engineeringChallenges: [
        {
          title: "Cross-Layer Type Safety and DTO Validation",
          problem:
            "Maintaining data consistency between incoming client payload shapes, NestJS backend services, and Prisma database models across decoupled repositories.",
          solution:
            "Defined shared TypeScript interfaces and leveraged NestJS ValidationPipes with Class-Validator decorators to reject malformed requests at the controller boundary before hitting the database.",
        },
        {
          title: "Cart State Hydration Without Flashing",
          problem:
            "Loading stored cart items from client LocalStorage during Vue 3 component mounting can cause visual layout shift and hydration mismatches.",
          solution:
            "Implemented Pinia store plugin architecture that reads and validates LocalStorage items synchronously during store initialization with fallback error guards.",
        },
      ],
      resultsAndLearnings: {
        implementedOutcomes: [
          "Delivered a complete full-stack e-commerce solution with decoupled Vue 3 frontend and NestJS backend.",
          "Verified database migrations, seed scripts, and admin authentication workflows.",
          "Open-source codebase available on GitHub at bouhouchhamza/atlas_ecom.",
        ],
        technicalTakeaways: [
          "NestJS combined with Prisma provides unparalleled developer velocity and architectural predictability for full-stack TypeScript systems.",
          "Adapting checkout methods to regional preferences (such as WhatsApp ordering) significantly reduces checkout friction compared to mandatory credit card walls.",
        ],
      },
    },
    media: {
      thumbnail: "/cover-atlas-commerce.svg",
      badgeIcon: "🛍️",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/atlas_ecom",
      caseStudyUrl: "/projects/atlas-commerce-platform",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes:
      "Verified directly via bouhouchhamza/atlas_ecom repository codebase, schema migrations, and documentation.",
  },
  {
    id: "taskflow",
    slug: "taskflow-cloud-task-manager",
    title: "TaskFlow",
    subtitle: "Cloud Task Management Application with Row Level Security",
    summary:
      "A cloud task management application built with React, Vite, and Supabase, providing multi-user authentication, cloud persistence in PostgreSQL, and database-level data isolation via Row Level Security (RLS).",
    category: "SaaS",
    categoryLabel: "Cloud Task SaaS MVP",
    status: "live",
    isFeatured: true,
    displayPriority: 2,
    bentoSpan: "col-span-1",
    role: "Full-Stack Developer",
    projectContext: "Multi-User Cloud Task Manager",
    techStack: ["React", "Vite", "Supabase", "PostgreSQL", "Row Level Security", "Vercel"],
    structuredStack: {
      core: ["React", "Vite", "Supabase", "PostgreSQL"],
      backend: ["Supabase Auth", "PostgreSQL RLS Policies"],
      frontend: ["React 18", "Tailwind CSS", "Vite"],
      database: ["PostgreSQL via Supabase"],
      tools: ["Vercel", "Git"],
    },
    keyFeatures: [
      "Multi-user task CRUD with priority tagging, deadlines, and completion states",
      "Persistent authentication session management via Supabase Auth",
      "Database-enforced Row Level Security (RLS) policies guaranteeing tenant isolation",
    ],
    architecturalDetails:
      "Serverless architecture: React client directly queries Supabase API where PostgreSQL RLS policies enforce security boundaries at the database layer.",
    caseStudy: {
      isFullCaseStudy: true,
      targetAudience: "Freelancers, developers, and remote professionals needing frictionless task organization",
      theChallenge:
        "Modern task management platforms have become bloated with complex hierarchy settings, forced subscription tiers, and heavy bundles that slow down simple daily task tracking. Users need an authenticated, zero-lag task manager that loads instantly, syncs across devices, and guarantees database-level privacy without unnecessary complexity.",
      architecture: {
        frontend:
          "React 18 single-page application built with Vite and Tailwind CSS, deployed to Vercel's global edge network for instant loading and sub-second navigation.",
        backend:
          "Serverless architecture powered by Supabase BaaS, utilizing PostgreSQL for persistence, automated session handling, and instant RESTful API generation.",
        database:
          "PostgreSQL database enforcing privacy through Row Level Security (RLS) policies directly inside the database engine: users can strictly read, write, and modify only rows where auth.uid() equals their own user_id.",
        authAndSecurity:
          "Supabase Auth handling JWT session tokens, email/password registration, password recovery, and secure cookie storage.",
        infrastructure:
          "Serverless edge hosting on Vercel with custom domain configuration and automated continuous integration deployments from GitHub.",
        diagram: `+-----------------------------------------------------------------------------+
|                           CLIENT APPLICATION                                |
|  React 18 SPA + Vite + Tailwind CSS                                         |
|  - Task Creation & Deadlines         - Priority Badges (Low, Med, High)     |
|  - Dynamic Status Filter Tabs        - Optimistic UI Completion Toggles     |
+--------------------------------------|--------------------------------------+
                                       | Supabase JS SDK (HTTPS / REST)
                                       v
+-----------------------------------------------------------------------------+
|                         SUPABASE MANAGED BACKEND                            |
|  Edge Authentication Service (GoTrue)                                       |
|  - JWT Session Token Lifecycle       - onAuthStateChange Background Listener|
+--------------------------------------|--------------------------------------+
                                       | Parameterized SQL Queries (Bearer JWT)
                                       v
+-----------------------------------------------------------------------------+
|                       POSTGRESQL ROW LEVEL SECURITY                         |
|  PostgreSQL Database Engine                                                 |
|  - RLS Policy: auth.uid() = user_id (SELECT, INSERT, UPDATE, DELETE)         |
|  - Foreign Key Constraints & Automated Indexed Timestamps                   |
+-----------------------------------------------------------------------------+`,
      },
      technicalDecisions: [
        {
          decision: "Supabase PostgreSQL with RLS vs Custom Node.js Auth Backend",
          rationale: "Enforced data access rules physically at the PostgreSQL database engine layer via Row Level Security, eliminating the need to maintain and patch a separate middle-tier API server for task CRUD.",
          tradeOff: "Complex custom business logic must be authored as SQL policies or Postgres functions rather than imperative JavaScript code.",
        },
        {
          decision: "Optimistic UI Updates vs Await-Before-Render",
          rationale: "Implemented optimistic state modification in React so task completion toggles and reordering feel instantaneous to the user.",
          tradeOff: "Requires maintaining an in-memory rollback cache if the network mutation fails.",
        },
        {
          decision: "Laser-Focused MVP vs Bloated Subscription SaaS",
          rationale: "Kept the product focused as a fast multi-user task management MVP with clean UX rather than bloating it with subscription billing, Stripe webhooks, or team workspace hierarchies.",
          tradeOff: "Multi-user collaboration features are reserved for future iterations.",
        },
      ],
      testingAndValidation: {
        strategy: "Live edge deployment testing, Supabase RLS security policy validation across multiple user accounts.",
        verifiedScenarios: [
          "Cross-user data isolation verification: Confirmed User A cannot read or modify User B's tasks through raw Supabase REST client queries.",
          "Token expiration and seamless session renewal using onAuthStateChange listeners.",
          "Form submission and validation safeguards preventing empty task creation.",
          "Real-world production availability and performance testing on Vercel's global edge network (https://tasksflow.space/).",
        ],
      },
      keyFeaturesDetailed: [
        {
          title: "Multi-User Task Management",
          description:
            "Fast task creation with priority levels (Low, Medium, High), due date scheduling, detailed notes, and completion toggle states.",
          tag: "Core Task CRUD",
        },
        {
          title: "Database-Enforced Row Level Security (RLS)",
          description:
            "Security policies written in PostgreSQL SQL ensuring that data isolation is physically guaranteed by the database engine rather than application code.",
          tag: "Data Privacy",
        },
        {
          title: "Optimistic State Management",
          description:
            "Immediate visual feedback on task status changes and deletions with automatic background rollback if network sync encounters errors.",
          tag: "User Experience",
        },
        {
          title: "Dynamic Filtering & Sorting",
          description:
            "Multi-criteria filtering by completion status, priority badges, and search queries with instant client-side responsiveness.",
          tag: "Productivity Tools",
        },
      ],
      engineeringChallenges: [
        {
          title: "Engineering Multi-Tenant Row Level Security Policies",
          problem:
            "In direct client-to-database architectures, missing or misconfigured RLS rules can expose every user's private tasks through API inspection.",
          solution:
            "Implemented granular RLS policies for each operation (SELECT, INSERT, UPDATE, DELETE) using auth.uid() checks, verified through automated API queries using different user tokens to confirm zero data leakage.",
        },
        {
          title: "Seamless Session Persistence and Token Refresh",
          problem:
            "Handling expired JWT authentication tokens during active task editing sessions without losing in-flight user input.",
          solution:
            "Integrated Supabase onAuthStateChange listener to automatically refresh tokens in the background and preserve active form states during renewal cycles.",
        },
      ],
      resultsAndLearnings: {
        implementedOutcomes: [
          "Successfully deployed and running live in production at tasksflow.space with stable availability on Vercel edge infrastructure.",
          "Delivered an authenticated task management MVP demonstrating clean serverless architecture and PostgreSQL RLS.",
          "Open-source codebase available on GitHub at bouhouchhamza/taskFlow.",
        ],
        technicalTakeaways: [
          "PostgreSQL Row Level Security allows developers to build secure, multi-tenant applications without writing custom middleware backends.",
          "Optimistic UI updates are essential for productivity applications to eliminate perceived network latency.",
        ],
      },
    },
    media: {
      thumbnail: "/cover-taskflow.svg",
      badgeIcon: "✅",
    },
    links: {
      liveUrl: "https://tasksflow.space/",
      sourceUrl: "https://github.com/bouhouchhamza/taskFlow",
      caseStudyUrl: "/projects/taskflow-cloud-task-manager",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes:
      "Verified directly via bouhouchhamza/taskFlow repository and live deployment at tasksflow.space. Confirmed as an authenticated multi-user task management MVP without subscription billing.",
  },
  {
    id: "youlearn-lms",
    slug: "youlearn-lms-api",
    title: "YouLearn",
    subtitle: "Learning Management System REST API with JWT Auth & Progress Tracking",
    summary:
      "A modular REST API for learning management systems built with Node.js, Express, MongoDB, and Mongoose. Implements course curricula, JWT authentication, role authorization, student enrollments, and lesson progression tracking with Docker Compose containerization.",
    category: "Backend API",
    categoryLabel: "Educational REST API",
    status: "completed",
    isFeatured: true,
    displayPriority: 5,
    bentoSpan: "col-span-1",
    role: "Backend API Engineer",
    projectContext: "Educational Learning Management API",
    techStack: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Docker"],
    structuredStack: {
      core: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Bcrypt"],
      backend: ["Express Controllers & Routes", "Mongoose ODM", "JWT Authentication", "Role Authorization"],
      database: ["MongoDB"],
      tools: ["Docker", "Docker Compose", "Postman", "Nodemon"],
    },
    keyFeatures: [
      "JWT authentication and role-based route authorization distinguishing learners and instructors",
      "Hierarchical learning curriculum data model (Course → Module → Resource)",
      "Student course enrollment lifecycle and granular lesson progress tracking endpoints",
      "Containerized MongoDB development environment with Docker Compose",
    ],
    architecturalDetails:
      "Express MVC architecture with Mongoose ODM modeling hierarchical curriculum entities, JWT authentication middleware, role-based access control, and centralized error handling.",
    caseStudy: {
      isFullCaseStudy: true,
      targetAudience: "EdTech platforms, online course creators, and educational application developers",
      theChallenge:
        "Building scalable educational platforms requires organizing complex hierarchical curricula — from courses and instructional modules down to multi-format learning resources. In addition to content delivery, platforms must securely authenticate users, enforce role-based access between instructors and students, manage course enrollments, and calculate lesson progression without introducing tight coupling between backend services and client interfaces.",
      architecture: {
        backend:
          "Node.js and Express.js REST API structured around the MVC controller pattern, providing standardized JSON responses, dedicated route modules, and clear separation of concerns.",
        database:
          "MongoDB document database utilizing Mongoose ODM to model hierarchical relationships between Users, Courses, Modules, Resources, Enrollments, and ResourceProgress records.",
        apiStructure:
          "Modular RESTful routing: /api/auth (/register, /login, /me), /api/courses (catalog, /:courseId/enroll, /:courseId/resume), /api/modules (curriculum hierarchies), /api/resources (/:resourceId/complete), and /api/progress (course progression calculation).",
        infrastructure:
          "Docker Compose orchestration packaging the Node.js API service and a MongoDB container with persistent named volumes for consistent local development and testing environments.",
        authAndSecurity:
          "JWT-based bearer token authentication (authMiddleware), bcrypt password hashing on user registration, role authorization guards (authorize('learner', 'instructor')), and centralized error handling middleware.",
        diagram: `+-----------------------------------------------------------------------------+
|                           CLIENT / API CONSUMER                             |
|  Web Applications, Mobile Frontends, or Postman API Clients                 |
+--------------------------------------|--------------------------------------+
                                       | HTTP + Bearer JWT Token
                                       v
+-----------------------------------------------------------------------------+
|                      EXPRESS ROUTING & AUTH MIDDLEWARE                      |
|  - authMiddleware (JWT Verification & User Context Extraction)              |
|  - authorize Middleware (Role Verification: Learner vs. Instructor)         |
|  - Global Error & Exception Normalizer (CastError, Duplicate Key 11000)     |
+--------------------------------------|--------------------------------------+
                                       | Validated Controller Routing
                                       v
+-----------------------------------------------------------------------------+
|                            CONTROLLER MODULES                               |
|  - authController        : register, login, me (bcrypt + jwt)               |
|  - courseController      : CRUD, category filters, keyword search           |
|  - moduleController      : module order and resource hierarchies            |
|  - enrollmentController  : enroll, cancelEnroll, student rosters            |
|  - progressController    : completeResource, calculateCourseProgress        |
+--------------------------------------|--------------------------------------+
                                       | Mongoose ODM Operations
                                       v
+-----------------------------------------------------------------------------+
|                          MONGODB DOCUMENT DATABASE                          |
|  - Users Collection       : Credentials, Hashed Passwords, Roles            |
|  - Courses & Modules      : Hierarchical Curriculum and Instructor Refs     |
|  - Enrollments & Progress : Learner Course Associations and Lesson Flags    |
+-----------------------------------------------------------------------------+`,
      },
      technicalDecisions: [
        {
          decision: "Stateless JWT Authentication with Role Middleware vs Session Cookies",
          rationale: "Used stateless JSON Web Tokens passed via Authorization Bearer headers with dedicated authMiddleware and authorize guards to decouple API authentication for potential multi-client (web and mobile) consumers.",
          tradeOff: "Requires token revocation strategies (such as short lifespans or token blacklists) if immediate session termination is needed.",
        },
        {
          decision: "Separate ResourceProgress & Enrollment Collections vs Giant User Subdocuments",
          rationale: "Isolated course enrollments and completed resource tracking into distinct collections with compound indices rather than embedding deep array trees into the User document, avoiding document growth bottlenecks.",
          tradeOff: "Requires aggregation or multi-query resolution when computing an all-courses progress summary.",
        },
        {
          decision: "Centralized Error Normalization Middleware vs Per-Route Try/Catch Blobs",
          rationale: "Built a global Express error-handling middleware that intercepts Mongoose validation errors, CastErrors, and duplicate keys into standardized JSON envelopes.",
          tradeOff: "Custom errors must be structured consistently with proper HTTP status codes.",
        },
      ],
      testingAndValidation: {
        strategy: "Manual integration testing and route verification using Postman API collections, environment token variables, and Docker Compose container isolation.",
        verifiedScenarios: [
          "Authentication flow verification: user registration with bcrypt password hashing, login token generation, and /api/auth/me token authorization.",
          "Role authorization verification: validating that student-only or instructor-only routes reject unauthorized roles with appropriate 403 Forbidden responses.",
          "Enrollment lifecycle: students successfully enrolling in courses, preventing duplicate enrollments, and updating course enrollment rosters.",
          "Lesson progress calculation: recording individual resource completion and retrieving aggregate course completion percentages.",
          "Docker Compose multi-container boot and MongoDB named volume persistence across container restarts.",
        ],
      },
      keyFeaturesDetailed: [
        {
          title: "JWT Authentication & Role Authorization",
          description:
            "Secure user registration with bcrypt password hashing, login issuing JSON Web Tokens, and middleware guards restricting endpoints by user roles (learner/instructor).",
          tag: "Security & Auth",
        },
        {
          title: "Hierarchical Curriculum Data Model",
          description:
            "Structured schema modeling Courses, instructional Modules, and multi-format Resources (video links, documents) with relational Mongoose references.",
          tag: "Curriculum Schema",
        },
        {
          title: "Enrollment & Progress Tracking Engine",
          description:
            "Dedicated endpoints allowing learners to enroll in courses, mark individual module resources as completed, and query current progress percentages.",
          tag: "Learner Lifecycle",
        },
        {
          title: "Docker Compose Development Workflow",
          description:
            "Containerized Node.js runtime and MongoDB service with persistent database volumes, providing reproducible local development environments.",
          tag: "DevOps & Docker",
        },
      ],
      engineeringChallenges: [
        {
          title: "Course Progress Aggregation",
          problem:
            "Accurately determining student progress percentage across courses with varying numbers of modules and variable resource counts per module.",
          solution:
            "Implemented progress calculation logic in progressController querying total resources within a course against completed ResourceProgress records for the authenticated learner.",
        },
        {
          title: "Role-Based Route Protection",
          problem:
            "Ensuring learner endpoints (such as course enrollment and progress tracking) and instructor management routes remain strictly segregated.",
          solution:
            "Created reusable authMiddleware and authorize(roles) higher-order middlewares to verify JWT tokens and evaluate user roles prior to reaching controller handlers.",
        },
      ],
      resultsAndLearnings: {
        implementedOutcomes: [
          "Engineered and wired a complete LMS backend covering curriculum catalog, module hierarchies, and educational resources.",
          "Implemented user authentication endpoints (/api/auth/register, /api/auth/login, /api/auth/me) with bcrypt password hashing and JWT issuance.",
          "Implemented learner enrollment logic (/api/courses/:courseId/enroll), resource progression tracking (/api/resources/:resourceId/complete), resume course pointer (/api/courses/:courseId/resume), and progress aggregation.",
          "Verified core endpoints via manual Postman collections and Docker Compose container isolation.",
        ],
        plannedImprovements: [
          "Automated unit and integration test suites using Jest and Supertest for CI/CD regression protection.",
          "Dedicated frontend SPA client (React/Next.js) consuming the LMS REST API.",
          "Payment gateway integration (Stripe) for commercial course monetization.",
        ],
        technicalTakeaways: [
          "Separating enrollment and progress records into dedicated collections prevents document size growth while maintaining clear auditability.",
          "Reusable middleware chains for authentication and role authorization simplify security enforcement across complex route hierarchies.",
        ],
      },
    },
    media: {
      thumbnail: "/cover-youlearn.svg",
      badgeIcon: "📚",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/LMS_YouLearn",
      caseStudyUrl: "/projects/youlearn-lms-api",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes:
      "Verified via bouhouchhamza/LMS_YouLearn repository on GitHub. Implemented and wired endpoints cover authentication with JWT, role-based authorization, course and module catalog management, learner enrollments, resource progress calculation, and Docker Compose orchestration. Validated via manual API requests; formal automated test suites and production frontend integration remain future roadmap goals.",
  },
  {
    id: "job-board",
    slug: "job-board-platform",
    title: "Job Board",
    subtitle: "Recruitment & Job Listing Application",
    summary:
      "A web platform for posting job vacancies, browsing career opportunities, and managing applications, built using Node.js, Express, MySQL, and server-rendered EJS templates.",
    category: "Full Stack",
    categoryLabel: "Recruitment Web Portal",
    status: "in-development",
    isFeatured: true,
    displayPriority: 6,
    bentoSpan: "col-span-1",
    role: "Backend & Full-Stack Developer",
    projectContext: "Recruitment Web Application",
    techStack: ["Node.js", "Express", "MySQL", "EJS", "JavaScript"],
    structuredStack: {
      core: ["Node.js", "Express", "MySQL", "EJS"],
      database: ["MySQL Relational Database"],
      frontend: ["EJS Server-Rendered Views", "CSS3"],
    },
    keyFeatures: [
      "Job vacancy creation, listing, and applicant submission workflows",
      "Relational database schema modeling employers, jobs, and candidates in MySQL",
      "Server-rendered user interface utilizing Express.js and EJS view templates",
    ],
    architecturalDetails:
      "Server-rendered MVC architecture: Express routes render EJS templates backed by MySQL relational tables modeling companies, listings, and applications.",
    caseStudy: {
      isFullCaseStudy: true,
      targetAudience: "Job seekers, recruitment agencies, and hiring organizations",
      theChallenge:
        "Modern recruitment portals often suffer from excessive client-side JavaScript, third-party trackers, and slow initial rendering times that frustrate applicants on mobile devices and degrade search engine indexing. Job boards require fast server-rendered pages, clear categorization, and reliable application intake pipelines.",
      architecture: {
        backend:
          "Node.js and Express.js server-side web application handling HTTP routing, session management, and template rendering.",
        database:
          "Relational MySQL database modeling companies, job categories, job listings, contract types, and applicant submissions with foreign key relationships.",
        frontend:
          "Server-rendered EJS view templates styled with responsive semantic HTML5 and vanilla CSS3, engineered for maximum accessibility and fast First Contentful Paint.",
        infrastructure:
          "Node.js runtime environment running on local Node/NPM servers with environment configuration for database credentials.",
        diagram: `+-----------------------------------------------------------------------------+
|                               WEB BROWSER                                   |
|  Responsive HTML5 / CSS3 Interface                                          |
|  - Job Search & Filtering Controls   - Application Form Submission          |
+--------------------------------------|--------------------------------------+
                                       | HTTP GET / POST Requests
                                       v
+-----------------------------------------------------------------------------+
|                         EXPRESS WEB APPLICATION                             |
|  Node.js + Express Server                                                   |
|  - Route Handlers (/jobs, /apply)    - Query Parameter Parser               |
|  - Form Upload Validation (Multer)   - Session State Management             |
+--------------------------------------|--------------------------------------+
                                       | Server-Side View Compilation
                                       v
+-----------------------------------------------------------------------------+
|                         EJS TEMPLATE ENGINE                                 |
|  Server-Side Rendered Views                                                 |
|  - Instant First Contentful Paint    - Clean SEO & Search Crawler Friendly  |
|  - Dynamic Conditional Components    - Flash Message Partials               |
+--------------------------------------|--------------------------------------+
                                       | Parameterized SQL Queries
                                       v
+-----------------------------------------------------------------------------+
|                         MYSQL RELATIONAL DATABASE                           |
|  Relational Recruitment Schema                                              |
|  - companies (id, name, logo, website)                                      |
|  - jobs (id, company_id, title, category, contract_type, is_active)         |
|  - applications (id, job_id, candidate_name, email, resume_path, created_at)|
+-----------------------------------------------------------------------------+`,
      },
      technicalDecisions: [
        {
          decision: "Server-Side Rendering (EJS) vs Client-Side SPA (React)",
          rationale: "Selected Express + EJS to maximize initial page loading speed, ensure search engine indexability through server-rendered HTML, and eliminate heavy JavaScript runtime bundles on mobile devices.",
          tradeOff: "Dynamic client interactions require full or partial page roundtrips.",
        },
        {
          decision: "Relational Database (MySQL) vs NoSQL",
          rationale: "Selected MySQL for strict relational integrity between employers, job vacancies, candidate applications, and contract types.",
          tradeOff: "Schema alterations require structured migration scripts.",
        },
        {
          decision: "Soft Deletions for Archived Listings vs Hard Deletes",
          rationale: "Maintained historical application audit records by soft-deleting expired jobs (is_active flag) rather than executing DELETE FROM jobs.",
          tradeOff: "All listing queries must include WHERE is_active = 1 filter guards.",
        },
      ],
      testingAndValidation: {
        strategy: "Responsive layout testing across mobile/desktop viewports and MySQL schema relational foreign key verification.",
        verifiedScenarios: [
          "Multi-parameter URL query filtering (category, contract type, search keywords) in Express route handlers.",
          "Candidate application form validation preventing submission without required resume files or valid contact details.",
          "Foreign key constraint checks ensuring orphan applications cannot be inserted without a valid job reference.",
          "View template rendering tests verifying semantic HTML5 tags and accessible form labels.",
        ],
      },
      keyFeaturesDetailed: [
        {
          title: "Job Vacancy Listings & Filtering",
          description:
            "Browse job postings with category filters, contract types (Full-Time, Remote, Part-Time, Contract), and location queries.",
          tag: "Job Discovery",
        },
        {
          title: "Structured Application Form Workflow",
          description:
            "Candidate application submission collecting resume attachments, cover letters, and contact information with server-side validation.",
          tag: "Application Intake",
        },
        {
          title: "Server-Side EJS Rendering",
          description:
            "Fast initial page load with pre-rendered HTML content, ensuring immediate readability and crawlability across all search engines.",
          tag: "Performance & SEO",
        },
        {
          title: "Relational Recruitment Schema",
          description:
            "MySQL tables establishing structured foreign key links between employers, posted positions, and applicant records.",
          tag: "Database Design",
        },
      ],
      engineeringChallenges: [
        {
          title: "Balancing Server-Rendered Simplicity with Dynamic Filtering",
          problem:
            "Enabling candidates to filter job listings without building a complex single-page application framework that adds bloat.",
          solution:
            "Utilized Express URL query parameters and clean EJS conditional rendering to deliver instantaneous filtered search results rendered entirely on the server.",
        },
        {
          title: "Relational Schema Design for Recruitment Lifecycle",
          problem:
            "Ensuring candidate submissions remain tied to specific job records even if a job listing is archived or updated by an employer.",
          solution:
            "Implemented soft-deletion patterns and relational integrity constraints in MySQL so historical application records remain permanently auditable.",
        },
      ],
      resultsAndLearnings: {
        implementedOutcomes: [
          "Developed responsive semantic HTML5/CSS3 frontend architecture and views.",
          "Designed MySQL relational database schema for recruitment workflow management.",
          "Public GitHub repository available at bouhouchhamza/Job-Board.",
        ],
        plannedImprovements: [
          "Completion of full administrative employer portal for posting and managing listings.",
          "Automated email notifications to applicants upon status updates.",
          "Resume parsing and search indexing for employer candidate matching.",
        ],
        technicalTakeaways: [
          "Server-side rendering with Express and EJS remains an extraordinarily fast and SEO-friendly approach for content-centric portals like job boards.",
          "Separating frontend UI development milestones from database integration allows rapid user testing of layout usability before locking backend schemas.",
        ],
      },
    },
    media: {
      thumbnail: "/cover-job-board.svg",
      badgeIcon: "💼",
    },
    links: {
      sourceUrl: "https://github.com/bouhouchhamza/Job-Board",
      caseStudyUrl: "/projects/job-board-platform",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes:
      "Verified via public GitHub repository bouhouchhamza/Job-Board. Contains responsive semantic HTML5/CSS3 frontend architecture (Brief 1) with Express, EJS, and MySQL backend integration in active progress (Brief 3).",
  },
  {
    id: "bankly-v2",
    slug: "bankly-v2-banking-app",
    title: "Bankly V2",
    subtitle: "Internal Retail Banking & Account Operations Platform",
    summary:
      "A PHP and MySQL web application designed for retail banking management, allowing authorized staff to manage customer records, open and update bank accounts, log deposit and withdrawal transactions, and review dashboard metrics.",
    category: "Full Stack",
    categoryLabel: "Internal Banking System",
    status: "live",
    isFeatured: false,
    displayPriority: 22,
    bentoSpan: "col-span-1",
    role: "Backend & Full-Stack Developer",
    projectContext: "Internal Banking Management Software",
    techStack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    structuredStack: {
      core: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
      database: ["MySQL with ERD Modeling"],
    },
    keyFeatures: [
      "Secure staff session authentication and access control",
      "Customer record administration with national CIN identification tracking",
      "Account management with deposit/withdrawal transaction logging and balance updates",
    ],
    architecturalDetails:
      "Procedural PHP with structured SQL schema derived from Entity-Relationship Diagram (ERD) with session-based route security.",
    media: {
      thumbnail: "/project-dashboard.svg",
      badgeIcon: "🏦",
    },
    links: {
      liveUrl: "https://bouhouchhamza.github.io/BANKLY_V2/",
      sourceUrl: "https://github.com/bouhouchhamza/BANKLY_V2",
      caseStudyUrl: "/projects/bankly-v2-banking-app",
    },
    isPrivateRepo: false,
    isPublished: true,
    verificationNotes:
      "Verified directly via default branch 'div' (commit 78a1eab) of public repository bouhouchhamza/BANKLY_V2. Contains PHP, MySQL with ERD modeling, transactional banking operations, and live deployment at bouhouchhamza.github.io/BANKLY_V2/.",
  },
];

/**
 * 3. Additional Projects Kept Pending Verification (Not published automatically)
 */
export const pendingProjects: Project[] = [
  {
    id: "nexora-shopify",
    slug: "nexora-shopify-3d",
    title: "NEXORA Shopify 3D",
    subtitle: "3D Interactive Shopify Experience",
    summary: "Pending verification: Interactive 3D product showcase concept for Shopify storefronts.",
    category: "E-Commerce",
    status: "pending-verification",
    isFeatured: false,
    displayPriority: 99,
    role: "Frontend Developer",
    projectContext: "Unverified Exploration",
    techStack: ["Shopify", "Liquid", "Three.js", "JavaScript"],
    keyFeatures: [
      "Interactive 3D product rendering prototype",
      "Shopify theme liquid template integration",
      "Custom product variant configuration",
    ],
    media: {
      thumbnail: "/project-ecommerce.svg",
    },
    links: {},
    isPrivateRepo: true,
    isPublished: false,
    verificationNotes: "Awaiting repository confirmation and source verification before publication.",
  },
  {
    id: "ai-hotel-receptionist",
    slug: "ai-hotel-receptionist",
    title: "AI Hotel Receptionist",
    subtitle: "Automated Hospitality Booking Assistant via WhatsApp",
    summary: "Pending verification: Dedicated standalone WhatsApp conversational booking concierge for hotels.",
    category: "AI Automation",
    status: "pending-verification",
    isFeatured: false,
    displayPriority: 99,
    role: "Automation Engineer",
    projectContext: "Unverified Standalone Service",
    techStack: ["WhatsApp API", "OpenAI", "n8n", "Node.js"],
    keyFeatures: [
      "WhatsApp conversational hotel booking interface",
      "Multi-lingual guest inquiry handling",
      "Booking database integration",
    ],
    media: {
      thumbnail: "/project-ai.svg",
    },
    links: {},
    isPrivateRepo: true,
    isPublished: false,
    verificationNotes:
      "Currently represented under general AI Automation Systems; standalone repository pending independent verification.",
  },
];

/**
 * 4. Consolidated Project Exports & Helper Queries
 */
export const allProjects: Project[] = [
  ...existingProjects,
  ...newVerifiedProjects,
  ...pendingProjects,
];

export const publishedProjects: Project[] = allProjects.filter((p) => p.isPublished);

/**
 * Main projectsData export for application consumption.
 * Includes the 15 preserved original projects plus the 7 verified additions (22 total).
 * Flagship projects (CorePOS, TaskFlow, Nuvomailo, Atlas Commerce, YouLearn LMS, Job Board,
 * and Financial Risk Platform) are prioritized at the top of the Bento Grid.
 */
const flagshipOrder = [
  "corepos",
  "taskflow",
  "nuvomailo",
  "atlas-commerce",
  "youlearn-lms",
  "job-board",
  "financial-risk-simulation",
];

export const projectsData: Project[] = [
  ...publishedProjects.filter((p) => flagshipOrder.includes(p.id)).sort(
    (a, b) => flagshipOrder.indexOf(a.id) - flagshipOrder.indexOf(b.id)
  ),
  ...publishedProjects.filter((p) => !flagshipOrder.includes(p.id)),
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
