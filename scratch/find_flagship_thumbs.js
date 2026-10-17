const fs = require('fs');
const lines = fs.readFileSync('src/data/projects.ts', 'utf8').split('\n');
const flagshipIds = ['financial-risk-simulation', 'corepos', 'nuvomailo', 'atlas-commerce', 'taskflow', 'youlearn-lms', 'job-board'];

flagshipIds.forEach(id => {
  const lineIdx = lines.findIndex(l => l.includes(`id: "${id}"`));
  if (lineIdx === -1) {
    console.log(`Not found: ${id}`);
    return;
  }
  // Find thumbnail line after lineIdx
  for (let i = lineIdx; i < Math.min(lineIdx + 300, lines.length); i++) {
    if (lines[i].includes('thumbnail:')) {
      console.log(`${id}: found at line ${lineIdx + 1}, thumbnail at line ${i + 1}: ${lines[i].trim()}`);
      break;
    }
  }
});
