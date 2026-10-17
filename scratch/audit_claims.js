const fs = require('fs');

const content = fs.readFileSync('src/data/projects.ts', 'utf8');

const patterns = [
  /95%/,
  /75%/,
  /80MB/,
  /power-cut/i,
  /power loss/i,
  /fail-safe/i,
  /guarantee/i,
  /memory footprint/i,
  /pilot store testing/i,
  /sub-15ms/i,
  /100%/i
];

patterns.forEach(p => {
  const matches = [...content.matchAll(new RegExp(p, 'gi'))];
  console.log(`Pattern ${p}: ${matches.length} matches`);
  matches.forEach(m => {
    const idx = m.index;
    const start = Math.max(0, idx - 80);
    const end = Math.min(content.length, idx + 100);
    console.log(`  --> ...${content.substring(start, end).replace(/\n/g, ' ')}...`);
  });
});
