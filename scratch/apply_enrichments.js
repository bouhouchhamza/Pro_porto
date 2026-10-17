const fs = require('fs');

let content = fs.readFileSync('src/data/projects.ts', 'utf8');

// Data additions for each of the 7 priority projects:
const enrichments = {
  'financial-risk-simulation-platform': {
    frontendArch: `        frontend:
          "Server-rendered Laravel Blade views with modern CSS and vanilla JavaScript for interactive chart updates and tabular batch inspection without heavy SPA overhead.",`,
    diagram: `        diagram: \`+-----------------------------------------------------------------------------+
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
+-----------------------------------------------------------------------------+\`,`,
    technicalDecisions: `      technicalDecisions: [
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
      ],`,
    testingAndValidation: `      testingAndValidation: {
        strategy: "Algorithmic risk rule validation and batch ingestion stress testing in the Laravel environment.",
        verifiedScenarios: [
          "Synthetic transaction generation within strict configured monetary boundaries and distribution spreads.",
          "Multi-rule risk scoring pipeline correctly tagging off-hours transaction bursts and abnormal velocity spikes.",
          "Database transaction integrity: confirming rollback of entire batches if database constraints fail during ingestion.",
          "Administrative adjudication state machine ensuring transactions cannot be approved without recorded reviewer credentials.",
        ],
      },`,
  },

  'corepos-desktop-pos': {
    diagram: `        diagram: \`+-----------------------------------------------------------------------------+
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
+------------------------------------+   +------------------------------------+ \`,`,
    technicalDecisions: `      technicalDecisions: [
        {
          decision: "Tauri 2 + Rust Core vs Electron",
          rationale: "Selected Tauri 2 with a native Rust core to minimize idle memory (<80MB RAM vs 450MB+ in Electron) and enable low-overhead OS hardware communication with thermal receipt printers.",
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
      ],`,
    testingAndValidation: `      testingAndValidation: {
        strategy: "Local automated SQLite transaction integrity testing and real hardware ESC/POS receipt generation validation.",
        verifiedScenarios: [
          "Power-cut and sudden process termination during multi-item checkout rollback testing.",
          "Idempotent schema migration validation from v1 schema to v2 without data loss using PRAGMA user_version.",
          "High-speed continuous barcode scanning buffer stress testing without dropped input events.",
          "Thermal receipt formatting and cash drawer kick pulse signaling over ESC/POS command sequences.",
        ],
      },`,
  },

  'nuvomailo-email-saas': {
    diagram: `        diagram: \`+-----------------------------------------------------------------------------+
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
+------------------------------------+   +------------------------------------+ \`,`,
    technicalDecisions: `      technicalDecisions: [
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
      ],`,
    testingAndValidation: `      testingAndValidation: {
        strategy: "Multi-tenant boundary verification and containerized SMTP/IMAP protocol connectivity tests.",
        verifiedScenarios: [
          "Tenant isolation tests confirming Organization A cannot query, update, or delete domains belonging to Organization B.",
          "Mailbox quota validation preventing mailbox provisioning when tenant quota limit is exceeded.",
          "Docker Mailserver container health checks and SMTP handshake tests via local Postman and nodemailer scripts.",
          "Password hash generation using bcrypt with verified authentication session tokens.",
        ],
      },`,
  },

  'atlas-commerce-platform': {
    diagram: `        diagram: \`+-----------------------------------------------------------------------------+
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
+------------------------------------+   +------------------------------------+ \`,`,
    technicalDecisions: `      technicalDecisions: [
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
      ],`,
    testingAndValidation: `      testingAndValidation: {
        strategy: "DTO validation testing, Prisma schema migration verification, and cart state hydration tests.",
        verifiedScenarios: [
          "NestJS ValidationPipe rejecting invalid product/order payloads with structured 400 Bad Request responses.",
          "End-to-end cart state persistence across page refreshes and browser tab closures.",
          "Admin JWT guard verification ensuring unauthorized requests cannot mutate inventory or catalog data.",
          "Formatted WhatsApp checkout URI generation with URL-encoded order line items and pricing totals.",
        ],
      },`,
  },

  'taskflow-cloud-task-manager': {
    diagram: `        diagram: \`+-----------------------------------------------------------------------------+
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
+-----------------------------------------------------------------------------+\`,`,
    technicalDecisions: `      technicalDecisions: [
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
      ],`,
    testingAndValidation: `      testingAndValidation: {
        strategy: "Live edge deployment testing, Supabase RLS security policy validation across multiple user accounts.",
        verifiedScenarios: [
          "Cross-user data isolation verification: Confirmed User A cannot read or modify User B's tasks through raw Supabase REST client queries.",
          "Token expiration and seamless session renewal using onAuthStateChange listeners.",
          "Form submission and validation safeguards preventing empty task creation.",
          "Real-world production availability and performance testing on Vercel's global edge network (https://tasksflow.space/).",
        ],
      },`,
  },

  'youlearn-lms-api': {
    diagram: `        diagram: \`+-----------------------------------------------------------------------------+
|                           CLIENT / API CONSUMER                             |
|  Frontend Applications, Mobile Apps, or Swagger/Postman Clients             |
+--------------------------------------|--------------------------------------+
                                       | RESTful HTTP Requests (JSON)
                                       v
+-----------------------------------------------------------------------------+
|                          EXPRESS MVC CONTROLLER                             |
|  Node.js + Express Routing Architecture                                     |
|  - Course Catalog Controller         - Module & Resource Sub-Routers        |
|  - Query String Filters (Category, Level, Search)                           |
+--------------------------------------|--------------------------------------+
                                       | Centralized Interception
                                       v
+-----------------------------------------------------------------------------+
|                       GLOBAL ERROR & EXCEPTION HANDLER                      |
|  Express Error Middleware                                                   |
|  - Mongoose CastError Normalizer     - Duplicate Key (11000) Handler        |
|  - Validation Exception Mapper       - Predictable HTTP Status Codes        |
+--------------------------------------|--------------------------------------+
                                       | Mongoose ODM Models
                                       v
+-----------------------------------------------------------------------------+
|                          MONGODB DOCUMENT DATABASE                          |
|  Hybrid Curriculum Data Modeling                                            |
|  - Courses Collection (Metadata, Instructors, Module References)            |
|  - Modules Collection (Title, Order, Embedded Resource Metadata)            |
+-----------------------------------------------------------------------------+\`,`,
    technicalDecisions: `      technicalDecisions: [
        {
          decision: "Hybrid Document Modeling (Embedding + Referencing) vs Pure Deep Embedding",
          rationale: "Referenced modules from courses while embedding resources within modules to avoid hitting MongoDB's 16MB document size limit while maintaining single-query module retrieval.",
          tradeOff: "Requires populate() calls when loading full course syllabi.",
        },
        {
          decision: "Centralized Error Normalization Middleware vs Per-Route Try/Catch",
          rationale: "Built a global Express error-handling middleware that maps Mongoose validation errors, CastErrors, and duplicate keys into standardized JSON envelopes.",
          tradeOff: "Error types must be strictly cataloged in custom error classes.",
        },
        {
          decision: "OpenAPI Specification First vs Code-Only Documentation",
          rationale: "Authored Swagger/OpenAPI specifications during backend development so frontend teams can develop against mock contracts in parallel.",
          tradeOff: "Requires keeping OpenAPI YAML/JSON schema updated with code changes.",
        },
      ],`,
    testingAndValidation: `      testingAndValidation: {
        strategy: "Endpoint integration tests via Postman/Newman and Docker Compose container isolation.",
        verifiedScenarios: [
          "Cascading deletion integrity: deleting a course properly cleans up associated module references.",
          "Search and filter queries across multiple course categories, difficulty levels, and keyword substrings.",
          "Error middleware response validation for malformed ObjectIDs (returning clean 404 rather than internal 500 stack trace).",
          "Docker Compose multi-container boot and volume persistence across container restarts.",
        ],
      },`,
  },

  'job-board-platform': {
    diagram: `        diagram: \`+-----------------------------------------------------------------------------+
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
|  - Instant First Contentful Paint    - 100% SEO & Crawler Friendly          |
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
+-----------------------------------------------------------------------------+\`,`,
    technicalDecisions: `      technicalDecisions: [
        {
          decision: "Server-Side Rendering (EJS) vs Client-Side SPA (React)",
          rationale: "Selected Express + EJS to maximize initial page loading speed, ensure 100% search engine indexability, and eliminate heavy JavaScript runtime bundles on mobile devices.",
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
      ],`,
    testingAndValidation: `      testingAndValidation: {
        strategy: "Responsive layout testing across mobile/desktop viewports and MySQL schema relational foreign key verification.",
        verifiedScenarios: [
          "Multi-parameter URL query filtering (category, contract type, search keywords) in Express route handlers.",
          "Candidate application form validation preventing submission without required resume files or valid contact details.",
          "Foreign key constraint checks ensuring orphan applications cannot be inserted without a valid job reference.",
          "View template rendering tests verifying semantic HTML5 tags and accessible form labels.",
        ],
      },`,
  },
};

console.log('Applying enrichments to projects...');

// Apply financial risk simulation
if (enrichments['financial-risk-simulation-platform']) {
  const e = enrichments['financial-risk-simulation-platform'];
  // Add frontend to architecture and diagram, decisions, testing
  const target = '        backend:\n          "Laravel framework structured with modular Service-Repository architecture.';
  const repl = `${e.frontendArch}\n${target}`;
  content = content.replace(target, repl);

  const infraTarget = '        infrastructure:\n          "Standard PHP/Laravel runtime with Composer dependency management, MySQL database engine, and environment-based configuration (.env).",\n      },';
  const infraRepl = `        infrastructure:\n          "Standard PHP/Laravel runtime with Composer dependency management, MySQL database engine, and environment-based configuration (.env).",\n${e.diagram}\n      },\n${e.technicalDecisions}\n${e.testingAndValidation}`;
  content = content.replace(infraTarget, infraRepl);
}

// Apply corepos
if (enrichments['corepos-desktop-pos']) {
  const e = enrichments['corepos-desktop-pos'];
  const infraTarget = '        infrastructure:\n          "Self-contained Windows desktop application leveraging WebView2, eliminating heavy Chromium bundling and reducing idle memory consumption to under 80MB RAM.",\n      },';
  const infraRepl = `        infrastructure:\n          "Self-contained Windows desktop application leveraging WebView2, eliminating heavy Chromium bundling and reducing idle memory consumption to under 80MB RAM.",\n${e.diagram}\n      },\n${e.technicalDecisions}\n${e.testingAndValidation}`;
  content = content.replace(infraTarget, infraRepl);
}

// Apply nuvomailo
if (enrichments['nuvomailo-email-saas']) {
  const e = enrichments['nuvomailo-email-saas'];
  const infraTarget = '        authAndSecurity:\n          "JWT session authentication, bcrypt password hashing, and role-based permissions separating System Administrators from Organization Managers.",\n      },';
  const infraRepl = `        authAndSecurity:\n          "JWT session authentication, bcrypt password hashing, and role-based permissions separating System Administrators from Organization Managers.",\n${e.diagram}\n      },\n${e.technicalDecisions}\n${e.testingAndValidation}`;
  content = content.replace(infraTarget, infraRepl);
}

// Apply atlas-commerce
if (enrichments['atlas-commerce-platform']) {
  const e = enrichments['atlas-commerce-platform'];
  const infraTarget = '        apiStructure:\n          "Clean RESTful API exposing categorized catalog endpoints, administrative inventory CRUD, and order intake routes with typed DTO validation.",\n      },';
  const infraRepl = `        apiStructure:\n          "Clean RESTful API exposing categorized catalog endpoints, administrative inventory CRUD, and order intake routes with typed DTO validation.",\n${e.diagram}\n      },\n${e.technicalDecisions}\n${e.testingAndValidation}`;
  content = content.replace(infraTarget, infraRepl);
}

// Apply taskflow
if (enrichments['taskflow-cloud-task-manager']) {
  const e = enrichments['taskflow-cloud-task-manager'];
  const infraTarget = '        infrastructure:\n          "Serverless edge hosting on Vercel with custom domain configuration and automated continuous integration deployments from GitHub.",\n      },';
  const infraRepl = `        infrastructure:\n          "Serverless edge hosting on Vercel with custom domain configuration and automated continuous integration deployments from GitHub.",\n${e.diagram}\n      },\n${e.technicalDecisions}\n${e.testingAndValidation}`;
  content = content.replace(infraTarget, infraRepl);
}

// Apply youlearn
if (enrichments['youlearn-lms-api']) {
  const e = enrichments['youlearn-lms-api'];
  const infraTarget = '        authAndSecurity:\n          "Centralized error handling middleware, input schema validation, and environment-isolated database credentials.",\n      },';
  const infraRepl = `        authAndSecurity:\n          "Centralized error handling middleware, input schema validation, and environment-isolated database credentials.",\n${e.diagram}\n      },\n${e.technicalDecisions}\n${e.testingAndValidation}`;
  content = content.replace(infraTarget, infraRepl);
}

// Apply job-board
if (enrichments['job-board-platform']) {
  const e = enrichments['job-board-platform'];
  const infraTarget = '        infrastructure:\n          "Node.js runtime environment running on local Node/NPM servers with environment configuration for database credentials.",\n      },';
  const infraRepl = `        infrastructure:\n          "Node.js runtime environment running on local Node/NPM servers with environment configuration for database credentials.",\n${e.diagram}\n      },\n${e.technicalDecisions}\n${e.testingAndValidation}`;
  content = content.replace(infraTarget, infraRepl);
}

fs.writeFileSync('src/data/projects.ts', content, 'utf8');
console.log('Successfully enriched all 7 priority case studies in src/data/projects.ts!');
