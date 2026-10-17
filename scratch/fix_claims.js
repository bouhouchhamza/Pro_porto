const fs = require('fs');

let content = fs.readFileSync('src/data/projects.ts', 'utf8');

const replacements = [
  // CorePOS
  {
    target: 'Self-contained Windows desktop application leveraging WebView2, eliminating heavy Chromium bundling and reducing idle memory consumption to under 80MB RAM.',
    repl: 'Self-contained Windows desktop application leveraging WebView2, eliminating bundled Chromium browser binaries and significantly reducing idle memory overhead compared to multi-process Electron runtimes.'
  },
  {
    target: 'Selected Tauri 2 with a native Rust core to minimize idle memory (<80MB RAM vs 450MB+ in Electron) and enable low-overhead OS hardware communication with thermal receipt printers.',
    repl: 'Selected Tauri 2 with a native Rust core to minimize background resource usage compared to Electron and enable direct, low-overhead OS hardware communication with thermal receipt printers.'
  },
  {
    target: '"Power-cut and sudden process termination during multi-item checkout rollback testing."',
    repl: '"Simulated process-termination and transaction abort testing validating SQLite rollback integrity during multi-item checkouts."'
  },
  {
    target: 'operating completely offline with sub-15ms interface response times.',
    repl: 'operating completely offline with immediate, low-latency UI responsiveness.'
  },
  {
    target: 'expense tracking, and thermal receipt printing in pilot store testing.',
    repl: 'expense tracking, and thermal receipt formatting in simulated retail workstation testing.'
  },
  {
    target: 'reducing memory footprint by >75%.',
    repl: 'providing a significantly leaner architecture than Chromium-bundled desktop frameworks.'
  },
  // TaskFlow
  {
    target: 'title: "Formulating Fail-Safe Row Level Security Policies"',
    repl: 'title: "Engineering Multi-Tenant Row Level Security Policies"'
  },
  {
    target: 'running live in production at tasksflow.space with 100% uptime.',
    repl: 'running live in production at tasksflow.space with stable availability on Vercel edge infrastructure.'
  },
  // Job Board
  {
    target: '- 100% SEO & Crawler Friendly          |',
    repl: '- Clean SEO & Search Crawler Friendly  |'
  },
  {
    target: 'ensure 100% search engine indexability,',
    repl: 'ensure search engine indexability through server-rendered HTML,'
  },
  // YouLearn verification notes
  {
    target: 'Endpoints implemented for course catalog, modules, and resources; user authentication and role gating are designated for subsequent iterations.',
    repl: 'Implemented endpoints cover the curriculum catalog, modules, resources, and Docker Compose orchestration. User JWT authentication, role-based authorization guards, student enrollments, and lesson progression tracking are explicitly cataloged as planned roadmap milestones, not present in the current curriculum foundation branch.'
  }
];

let applied = 0;
replacements.forEach((r, i) => {
  if (content.includes(r.target)) {
    content = content.replace(r.target, r.repl);
    applied++;
    console.log(`[OK] Replacement ${i + 1} applied.`);
  } else {
    console.log(`[WARN] Target ${i + 1} not found!`);
  }
});

fs.writeFileSync('src/data/projects.ts', content, 'utf8');
console.log(`Finished: ${applied}/${replacements.length} replacements applied to projects.ts`);
