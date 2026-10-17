export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  isFlagship?: boolean;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "fullstack-web",
    icon: "💻",
    title: "Full-Stack Web & SaaS Engineering",
    tagline: "End-to-end web architectures with clean backend patterns and responsive UI",
    description:
      "Engineering robust database-backed web applications and multi-tenant platforms from schema design to reactive interfaces. Built using modern PHP/Laravel, Node.js, and modern frontend tools.",
    deliverables: [
      "Modular MVC applications, client dashboards & admin consoles",
      "Relational & document database schemas with strict integrity",
      "Responsive, accessible interfaces optimized across all viewports",
    ],
    techStack: ["Laravel", "Node.js", "Express", "MySQL", "MongoDB"],
    isFlagship: true,
  },
  {
    id: "rest-apis",
    icon: "🔌",
    title: "REST API Architecture & Integrations",
    tagline: "Secure, decoupled backend endpoints and third-party API bridges",
    description:
      "Designing standardized RESTful APIs with stateless JWT bearer authentication, role guards, consistent error handling envelopes, and external webhook integrations.",
    deliverables: [
      "Standardized REST endpoints with predictable HTTP semantics",
      "Stateless JWT auth & role-based middleware access guards",
      "Third-party webhook ingestion & Postman API validation",
    ],
    techStack: ["Express.js", "Laravel", "JWT", "REST", "Postman"],
  },
  {
    id: "database-systems",
    icon: "🗄️",
    title: "Database Modeling & Data Integrity",
    tagline: "Relational normalization, NoSQL document design & Row Level Security",
    description:
      "Designing durable persistence layers. From normalized MySQL/PostgreSQL relational schemas with foreign key constraints to scalable MongoDB document collections and RLS access rules.",
    deliverables: [
      "Relational schema normalization, indexes & migration pipelines",
      "MongoDB document modeling & Mongoose schema validation",
      "PostgreSQL Row Level Security (RLS) data isolation",
    ],
    techStack: ["MySQL", "MongoDB", "PostgreSQL", "Mongoose", "Supabase"],
  },
  {
    id: "automation",
    icon: "⚡",
    title: "Workflow Automation & AI Pipelines",
    tagline: "Event-driven pipelines, webhook processing & automated business routines",
    description:
      "Connecting disparate tools and eliminating repetitive manual workflows. Leveraging n8n multi-node automations, webhook triggers, and AI APIs to extract, format, and synchronize business data.",
    deliverables: [
      "Custom n8n workflows connecting webhooks, forms & databases",
      "AI-assisted text extraction, JSON parsing & data enrichment",
      "Automated notification pipelines & scheduled routines",
    ],
    techStack: ["n8n", "Webhooks", "OpenAI API", "REST APIs"],
  },
  {
    id: "ecommerce",
    icon: "🛍️",
    title: "E-Commerce & Digital Commerce Solutions",
    tagline: "Conversion-ready storefronts, persistent carts & checkout flows",
    description:
      "Building practical online stores with structured product catalogs, persistent shopping carts, and regional checkout adaptations (including WhatsApp and Cash on Delivery).",
    deliverables: [
      "Structured product catalogs with variant & inventory tracking",
      "Client-side cart state hydration & checkout pipelines",
      "Merchant administrative panels for stock & order intake",
    ],
    techStack: ["Laravel", "Vue / React", "MySQL", "WhatsApp Checkout"],
  },
];
