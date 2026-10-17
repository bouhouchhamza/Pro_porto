const fs = require('fs');

const fileContent = fs.readFileSync('src/data/projects.ts', 'utf8');

const targetSlugs = [
  'corepos-desktop-pos',
  'nuvomailo-email-saas',
  'atlas-commerce-platform',
  'taskflow-cloud-task-manager',
  'youlearn-lms-api',
  'job-board-platform',
  'financial-risk-simulation-platform'
];

targetSlugs.forEach(slug => {
  console.log('='.repeat(80));
  console.log(`SLUG: ${slug}`);
  console.log('='.repeat(80));
  
  // Find project
  const slugIdx = fileContent.indexOf(`slug: "${slug}"`);
  if (slugIdx === -1) {
    console.log('NOT FOUND');
    return;
  }
  // Find surrounding project object
  const startIdx = fileContent.lastIndexOf('{', slugIdx);
  // Find where this project ends (next project or end)
  let endIdx = fileContent.indexOf('// ==========================================', slugIdx);
  if (endIdx === -1) {
    endIdx = fileContent.indexOf('export const projectsData', slugIdx);
  }
  if (endIdx === -1) endIdx = slugIdx + 4000;

  const text = fileContent.substring(startIdx, endIdx);

  // Extract key fields
  const getField = (regex) => {
    const m = text.match(regex);
    return m ? m[1].trim() : 'NOT SET';
  };

  console.log(`Title: ${getField(/title:\s*["']([^"']+)["']/)}`);
  console.log(`Subtitle: ${getField(/subtitle:\s*["']([^"']+)["']/)}`);
  console.log(`Role: ${getField(/role:\s*["']([^"']+)["']/)}`);
  console.log(`Context: ${getField(/projectContext:\s*["']([^"']+)["']/)}`);
  console.log(`Status: ${getField(/status:\s*["']([^"']+)["']/)}`);
  console.log(`IsPrivateRepo: ${getField(/isPrivateRepo:\s*(true|false)/)}`);
  console.log(`Summary:\n  ${getField(/summary:\s*["']([^"']+)["']/)}`);
  console.log(`The Challenge:\n  ${getField(/theChallenge:\s*["']([^"']+)["']/)}`);

  // Print architecture items
  console.log('\n--- ARCHITECTURE ---');
  ['frontend', 'backend', 'database', 'apiStructure', 'authAndSecurity', 'infrastructure'].forEach(a => {
    const reg = new RegExp(`${a}:\\s*["']([^"']+)["']`);
    const val = text.match(reg);
    console.log(`  ${a}: ${val ? val[1] : 'NONE'}`);
  });

  // Print challenges
  console.log('\n--- ENGINEERING CHALLENGES ---');
  const challengeMatches = [...text.matchAll(/title:\s*["']([^"']+)["'],\s*problem:\s*["']([^"']+)["'],\s*solution:\s*["']([^"']+)["']/g)];
  challengeMatches.forEach((cm, i) => {
    console.log(`  Challenge ${i+1}: ${cm[1]}`);
    console.log(`    Problem:  ${cm[2].substring(0, 100)}...`);
    console.log(`    Solution: ${cm[3].substring(0, 100)}...`);
  });

  // Print Results
  console.log('\n--- RESULTS & LEARNINGS ---');
  const outcomesMatch = text.match(/implementedOutcomes:\s*\[([\s\S]*?)\]/);
  if (outcomesMatch) {
    console.log(`  Implemented Outcomes: ${outcomesMatch[1].replace(/\n\s*/g, ' ').substring(0, 150)}...`);
  }
  const takeawaysMatch = text.match(/technicalTakeaways:\s*\[([\s\S]*?)\]/);
  if (takeawaysMatch) {
    console.log(`  Takeaways: ${takeawaysMatch[1].replace(/\n\s*/g, ' ').substring(0, 150)}...`);
  }
  const plannedMatch = text.match(/plannedImprovements:\s*\[([\s\S]*?)\]/);
  if (plannedMatch) {
    console.log(`  Planned Improvements: ${plannedMatch[1].replace(/\n\s*/g, ' ').substring(0, 150)}...`);
  }
  console.log('\n');
});
