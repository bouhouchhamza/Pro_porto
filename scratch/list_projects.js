const fs = require('fs');

// We can compile TypeScript on the fly using esbuild-register or tsx, or just parse ts file using a simple AST / evaluation
// Or we can import since tsx or ts-node might be installed, or we can use regex to extract project objects.

const content = fs.readFileSync('src/data/projects.ts', 'utf8');

// Let's find projects by matching { id: "...", ... }
const projectChunks = content.split(/\{\s*id:\s*"/g).slice(1);

const projects = [];
for (const chunk of projectChunks) {
  const idMatch = chunk.match(/^([^"]+)"/);
  if (!idMatch) continue;
  const id = idMatch[1];
  if (['All', 'SaaS', 'Full Stack', 'Backend API', 'AI Automation', 'E-Commerce', 'Desktop Software', 'IoT & Embedded'].includes(id)) continue;
  
  const titleMatch = chunk.match(/title:\s*"([^"]+)"/);
  const slugMatch = chunk.match(/slug:\s*"([^"]+)"/);
  const categoryMatch = chunk.match(/category:\s*"([^"]+)"/);
  const isFeaturedMatch = chunk.match(/isFeatured:\s*(true|false)/);
  const isPublishedMatch = chunk.match(/isPublished:\s*(true|false)/);
  const thumbMatch = chunk.match(/thumbnail:\s*"([^"]+)"/);
  const isPrivateRepoMatch = chunk.match(/isPrivateRepo:\s*(true|false)/);
  
  projects.push({
    id,
    slug: slugMatch ? slugMatch[1] : '',
    title: titleMatch ? titleMatch[1] : '',
    category: categoryMatch ? categoryMatch[1] : '',
    isFeatured: isFeaturedMatch ? isFeaturedMatch[1] === 'true' : false,
    isPublished: isPublishedMatch ? isPublishedMatch[1] === 'true' : false,
    thumbnail: thumbMatch ? thumbMatch[1] : '',
    isPrivateRepo: isPrivateRepoMatch ? isPrivateRepoMatch[1] === 'true' : false,
  });
}

console.log('Total extracted projects:', projects.length);
console.log('\nFEATURED PROJECTS:');
projects.filter(p => p.isFeatured).forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] "${p.title}" | isPublished: ${p.isPublished} | thumb: ${p.thumbnail}`);
});

console.log('\nALL PUBLISHED PROJECTS (isPublished !== false):');
const published = projects.filter(p => p.isPublished);
console.log('Count:', published.length);
published.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] "${p.title}" (${p.category}) -> ${p.thumbnail}`);
});
