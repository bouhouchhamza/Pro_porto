const fs = require('fs');

const content = fs.readFileSync('src/data/projects.ts', 'utf8');

const targetIds = [
  'corepos',
  'nuvomailo',
  'atlas-commerce',
  'taskflow',
  'youlearn-lms',
  'job-board',
  'financial-risk-simulation'
];

targetIds.forEach(id => {
  const regex = new RegExp(`id:\\s*["']${id}["'][\\s\\S]*?(?=id:\\s*["']|$)`);
  const match = content.match(regex);
  if (!match) {
    console.log(`=== ${id} NOT FOUND ===`);
    return;
  }
  const block = match[0];
  const titleMatch = block.match(/title:\s*["']([^"']+)["']/);
  const techStackMatch = block.match(/techStack:\s*\[([^\]]+)\]/);
  const summaryMatch = block.match(/summary:\s*["']([^"']+)["']/);
  const roleMatch = block.match(/role:\s*["']([^"']+)["']/);

  console.log(`\n========================================`);
  console.log(`ID: ${id}`);
  console.log(`Title: ${titleMatch ? titleMatch[1] : ''}`);
  console.log(`TechStack: ${techStackMatch ? techStackMatch[1].replace(/\s+/g, ' ').trim() : ''}`);
  console.log(`Summary: ${summaryMatch ? summaryMatch[1] : ''}`);
  console.log(`Role: ${roleMatch ? roleMatch[1] : ''}`);

  // check backend / database in structuredStack
  const structMatch = block.match(/structuredStack:\s*\{([\s\S]*?)\},/);
  if (structMatch) {
    console.log(`StructuredStack:\n${structMatch[1].trim()}`);
  }
});
