const fs = require('fs');

// We can require typescript and ts-node or just parse with basic JS
// Since projects.ts is TypeScript, let's write a small TS-compatible parser or compile on the fly using ts-node or esbuild or simple extraction.
const fileContent = fs.readFileSync('src/data/projects.ts', 'utf8');

// Let's inspect projects by regex or extracting objects
const projects = [];
const projectRegex = /{\s*id:\s*["']([^"']+)["'],\s*slug:\s*["']([^"']+)["'],\s*title:\s*["']([^"']+)["'],\s*subtitle:\s*["']([^"']+)["']/g;
let match;
while ((match = projectRegex.exec(fileContent)) !== null) {
  projects.push({
    id: match[1],
    slug: match[2],
    title: match[3],
    subtitle: match[4]
  });
}

console.log(`Found ${projects.length} projects in projects.ts:`);

// Check each project in detail
projects.forEach((p, i) => {
  const startIdx = fileContent.indexOf(`id: "${p.id}"`) !== -1 ? fileContent.indexOf(`id: "${p.id}"`) : fileContent.indexOf(`id: '${p.id}'`);
  // find next project id or end of array
  const nextStart = i < projects.length - 1 ? 
    (fileContent.indexOf(`id: "${projects[i+1].id}"`) !== -1 ? fileContent.indexOf(`id: "${projects[i+1].id}"`) : fileContent.indexOf(`id: '${projects[i+1].id}'`)) 
    : fileContent.length;
  const chunk = fileContent.substring(startIdx, nextStart);

  const isFullCaseStudy = chunk.includes('isFullCaseStudy: true');
  const isPrivate = chunk.includes('isPrivateRepo: true');
  const isPublished = chunk.includes('isPublished: true');
  
  const statusMatch = chunk.match(/status:\s*["']([^"']+)["']/);
  const status = statusMatch ? statusMatch[1] : 'unknown';

  const categoryMatch = chunk.match(/category:\s*["']([^"']+)["']/);
  const category = categoryMatch ? categoryMatch[1] : 'unknown';

  const liveUrlMatch = chunk.match(/liveUrl:\s*["']([^"']+)["']/);
  const sourceUrlMatch = chunk.match(/sourceUrl:\s*["']([^"']+)["']/);
  const caseStudyUrlMatch = chunk.match(/caseStudyUrl:\s*["']([^"']+)["']/);

  const hasArch = chunk.includes('architecture: {');
  const hasChallenges = chunk.includes('engineeringChallenges: [');
  const hasFeaturesDetailed = chunk.includes('keyFeaturesDetailed: [');
  const hasResults = chunk.includes('resultsAndLearnings: {');

  console.log(`[${i+1}] ID: ${p.id.padEnd(28)} | Slug: ${p.slug.padEnd(34)} | FullCase: ${isFullCaseStudy ? 'YES' : 'NO '} | Status: ${status.padEnd(14)} | Arch: ${hasArch ? 'Y' : 'N'} | Challenges: ${hasChallenges ? 'Y' : 'N'} | FeaturesDetailed: ${hasFeaturesDetailed ? 'Y' : 'N'} | Results: ${hasResults ? 'Y' : 'N'}`);
  console.log(`     Links: CaseStudy=${caseStudyUrlMatch ? caseStudyUrlMatch[1] : 'NONE'}, Live=${liveUrlMatch ? liveUrlMatch[1] : 'none'}, Source=${sourceUrlMatch ? sourceUrlMatch[1] : 'none'}, Private=${isPrivate}`);
});
