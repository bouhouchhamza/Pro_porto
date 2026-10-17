const fs = require('fs');
const content = fs.readFileSync('src/data/projects.ts', 'utf8');

// Let's inspect export const projectsData
// Since projectsData is in TypeScript, let's extract all project object blocks
const projects = [];
const blocks = content.split(/\{\s*id:\s*"/);

for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const id = block.split('"')[0];
  const slugMatch = block.match(/slug:\s*"([^"]+)"/);
  const titleMatch = block.match(/title:\s*"([^"]+)"/);
  const isPubMatch = block.match(/isPublished:\s*(true|false)/);
  const hasStudyMatch = block.match(/hasCaseStudy:\s*(true|false)/);
  const isFeatMatch = block.match(/isFeatured:\s*(true|false)/);
  const statusMatch = block.match(/status:\s*"([^"]+)"/);
  const categoryMatch = block.match(/category:\s*"([^"]+)"/);

  projects.push({
    id,
    slug: slugMatch ? slugMatch[1] : '',
    title: titleMatch ? titleMatch[1] : '',
    isPublished: isPubMatch ? isPubMatch[1] : 'unknown',
    hasCaseStudy: hasStudyMatch ? hasStudyMatch[1] : 'unknown',
    isFeatured: isFeatMatch ? isFeatMatch[1] : 'unknown',
    status: statusMatch ? statusMatch[1] : '',
    category: categoryMatch ? categoryMatch[1] : ''
  });
}

console.log('Total parsed blocks:', projects.length);
console.log('--- PUBLISHED PROJECTS ---');
const published = projects.filter(p => p.isPublished === 'true');
console.log(`Published count: ${published.length}`);
published.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] "${p.title}" (slug: ${p.slug}, hasCaseStudy: ${p.hasCaseStudy}, isFeatured: ${p.isFeatured})`);
});

console.log('--- UNPUBLISHED / PENDING PROJECTS ---');
const unpublished = projects.filter(p => p.isPublished !== 'true');
console.log(`Unpublished count: ${unpublished.length}`);
unpublished.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] "${p.title}" (slug: ${p.slug}, isPublished: ${p.isPublished})`);
});
