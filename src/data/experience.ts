export interface TimelineEntry {
  id: string;
  period: string;
  role: string;
  organization: string;
  location?: string;
  description: string;
  type?: "internship" | "independent" | "operations" | "training" | "degree";
}

/**
 * Factual professional experience verified from the latest CV (2026).
 */
export const WORK_EXPERIENCE: TimelineEntry[] = [
  {
    id: "motion-mosaic",
    period: "05.2026 – 07.2026",
    role: "Web Development & Automation Intern",
    organization: "Motion Mosaic",
    location: "Morocco",
    description: "Web development, REST API integrations, and workflow automation with n8n.",
    type: "internship",
  },
  {
    id: "ecommerce-digital",
    period: "2024 – 2025",
    role: "E-Commerce & Digital Storefronts",
    organization: "Independent",
    location: "Morocco",
    description: "E-commerce store management, Google Ads campaigns, and customer relationship follow-up.",
    type: "independent",
  },
  {
    id: "transport-logistics",
    period: "2021 – 2023",
    role: "Operational & Logistics Roles",
    organization: "Transport, Logistics & Industry",
    location: "Morocco",
    description: "Industrial distribution, warehouse logistics, and operational compliance (Coca-Cola partner, Cathedis).",
    type: "operations",
  },
];

/**
 * Factual academic and engineering education verified from the latest CV (2026).
 */
export const EDUCATION_HISTORY: TimelineEntry[] = [
  {
    id: "youcode-fullstack",
    period: "10.2025 – 03.2027",
    role: "Développement Full-Stack",
    organization: "YouCode (UM6P & Simplon Partner)",
    location: "Morocco",
    description: "Intensive full-stack web engineering training covering modern PHP, Laravel, Node.js, databases, and Agile sprints.",
    type: "training",
  },
  {
    id: "baccalaureat-razzi",
    period: "2020",
    role: "Baccalauréat Sciences Physiques",
    organization: "Lycée Razzi",
    location: "Morocco",
    description: "Secondary education diploma specializing in Physical Sciences and Mathematics.",
    type: "degree",
  },
];
