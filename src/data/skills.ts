export interface SkillItem {
  name: string;
  level: "core" | "practiced" | "exploring";
  levelLabel: string;
  description: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  summary: string;
  skills: SkillItem[];
}

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    id: "backend",
    title: "Core Backend & APIs",
    icon: "⚙️",
    summary: "Production-ready server-side architecture, MVC frameworks, and secure RESTful APIs.",
    skills: [
      {
        name: "PHP",
        level: "core",
        levelLabel: "Core Stack",
        description: "Object-oriented programming, modern PHP 8+, clean architectural patterns.",
        highlight: true,
      },
      {
        name: "Laravel",
        level: "core",
        levelLabel: "Core Framework",
        description: "Eloquent ORM, Blade, migrations, middleware, and full MVC REST APIs.",
        highlight: true,
      },
      {
        name: "Node.js",
        level: "core",
        levelLabel: "Core Runtime",
        description: "Asynchronous I/O, event-driven backends, and modular micro-services.",
        highlight: true,
      },
      {
        name: "Express.js",
        level: "core",
        levelLabel: "Core Framework",
        description: "RESTful routing, custom middleware pipelines, and centralized error handling.",
        highlight: true,
      },
      {
        name: "REST API Development",
        level: "core",
        levelLabel: "Core Architecture",
        description: "Standardized JSON contracts, HTTP semantics, pagination, and status codes.",
      },
      {
        name: "JWT Authentication",
        level: "core",
        levelLabel: "Core Security",
        description: "Stateless bearer token issuance, signature verification, and sessionless auth.",
      },
      {
        name: "Role-Based Authorization",
        level: "core",
        levelLabel: "Core Security",
        description: "Granular access-control middleware distinguishing user roles and privileges.",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Web Interfaces",
    icon: "🎨",
    summary: "Responsive, accessible user interfaces built with semantic web foundations and modern frameworks.",
    skills: [
      {
        name: "HTML5 & Modern CSS3",
        level: "core",
        levelLabel: "Core Foundation",
        description: "Semantic layouts, Flexbox, CSS Grid, custom properties, and responsive design.",
        highlight: true,
      },
      {
        name: "JavaScript (ES6+)",
        level: "core",
        levelLabel: "Core Foundation",
        description: "DOM manipulation, asynchronous fetch APIs, promises, and modular logic.",
        highlight: true,
      },
      {
        name: "EJS Templates",
        level: "practiced",
        levelLabel: "Practiced",
        description: "Server-rendered dynamic templates with Express backends.",
      },
      {
        name: "React",
        level: "practiced",
        levelLabel: "Learning & Project-Applied",
        description: "Component architecture, hooks, and state flow applied in project frontends while continuing active learning.",
        highlight: false,
      },
      {
        name: "Next.js",
        level: "practiced",
        levelLabel: "Learning & Project-Applied",
        description: "App Router conventions, server/client components, and static generation applied in web applications.",
      },
      {
        name: "TypeScript",
        level: "practiced",
        levelLabel: "Practiced & Ongoing",
        description: "Type safety, typed interfaces, API response contracts, and component props.",
      },
      {
        name: "Vue.js",
        level: "exploring",
        levelLabel: "Assisted / Exploring",
        description: "Basic component reactivity, template syntax, and exploratory project work.",
      },
    ],
  },
  {
    id: "databases",
    title: "Databases & Persistence",
    icon: "🗄️",
    summary: "Relational and document database design, schema integrity, and query optimization.",
    skills: [
      {
        name: "MySQL",
        level: "core",
        levelLabel: "Core Relational",
        description: "Schema design, relational constraints, joins, indices, and Eloquent integration.",
        highlight: true,
      },
      {
        name: "MongoDB & Mongoose",
        level: "core",
        levelLabel: "Core Document",
        description: "Document modeling, schema validation, population, and collection aggregation.",
        highlight: true,
      },
      {
        name: "PostgreSQL",
        level: "practiced",
        levelLabel: "Practiced",
        description: "Relational queries, ACID transactions, and Supabase cloud hosting.",
      },
      {
        name: "Supabase",
        level: "practiced",
        levelLabel: "Practiced",
        description: "Cloud PostgreSQL backend, managed auth integration, and real-time data sync.",
      },
      {
        name: "Row Level Security (RLS)",
        level: "practiced",
        levelLabel: "Practiced",
        description: "Tenant isolation policies guarding database tables directly at the engine level.",
      },
      {
        name: "Prisma ORM",
        level: "practiced",
        levelLabel: "Practiced",
        description: "Type-safe database client generation, migrations, and declarative schemas.",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Developer Tools",
    icon: "🚀",
    summary: "Containerization, version control, API testing, and reliable deployment workflows.",
    skills: [
      {
        name: "Git & GitHub",
        level: "core",
        levelLabel: "Core Workflow",
        description: "Feature branches, conventional commits, pull requests, and peer reviews.",
        highlight: true,
      },
      {
        name: "Docker & Docker Compose",
        level: "core",
        levelLabel: "Core Workflow",
        description: "Multi-container local services, isolated MongoDB/MySQL runtimes, volumes.",
        highlight: true,
      },
      {
        name: "Linux / Ubuntu VPS",
        level: "practiced",
        levelLabel: "Practiced",
        description: "Command-line administration, basic server configuration, permissions, SSH.",
      },
      {
        name: "Vercel Edge Platform",
        level: "practiced",
        levelLabel: "Practiced",
        description: "Frontend deployments, environment variable management, and edge routing.",
      },
      {
        name: "API Testing (Postman)",
        level: "practiced",
        levelLabel: "Practiced",
        description: "Collection creation, parameterized environment variables, request validation.",
      },
      {
        name: "DNS & Deployment Basics",
        level: "practiced",
        levelLabel: "Practiced",
        description: "Custom domain records, CNAME/A configuration, and SSL certificate management.",
      },
    ],
  },
  {
    id: "automation",
    title: "Automation & API Workflows",
    icon: "⚡",
    summary: "Connecting software services and automating business workflows with webhooks and AI tooling.",
    skills: [
      {
        name: "n8n Workflow Automation",
        level: "core",
        levelLabel: "Core Automation",
        description: "Multi-step automated workflows, custom webhook triggers, and data transforms.",
        highlight: true,
      },
      {
        name: "REST API Integrations",
        level: "core",
        levelLabel: "Core Integration",
        description: "Connecting third-party webhooks, payment notifications, and external APIs.",
        highlight: true,
      },
      {
        name: "AI-Assisted Workflows",
        level: "practiced",
        levelLabel: "Practiced",
        description: "Integrating LLM APIs for structured data extraction and content formatting.",
      },
      {
        name: "OpenAI API",
        level: "practiced",
        levelLabel: "Practiced",
        description: "Programmatic text generation, function calling payloads, and assistant prompts.",
      },
    ],
  },
  {
    id: "methods",
    title: "Professional Methods & Collaboration",
    icon: "🤝",
    summary: "Collaborative engineering methodologies, structured communication, and technical rigor.",
    skills: [
      {
        name: "Agile / Scrum Methodologies",
        level: "core",
        levelLabel: "Core Practice",
        description: "Sprint planning, daily standups, backlog refinement practiced at YouCode.",
        highlight: true,
      },
      {
        name: "Team Collaboration",
        level: "core",
        levelLabel: "Core Practice",
        description: "Pair programming, cross-functional project teamwork, clear task delegation.",
      },
      {
        name: "Problem Solving & Debugging",
        level: "core",
        levelLabel: "Core Practice",
        description: "Systematic root-cause diagnosis, server logs, network payload inspection.",
      },
      {
        name: "Technical Documentation",
        level: "core",
        levelLabel: "Core Practice",
        description: "Architectural decision logs, setup guides, and comprehensive API documentation.",
      },
      {
        name: "CI/CD & Automated Testing",
        level: "exploring",
        levelLabel: "Introductory / Learning",
        description: "Foundational knowledge of automated GitHub Actions and test suite concepts.",
      },
    ],
  },
];
