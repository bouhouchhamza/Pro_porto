const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir);

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git' && file !== 'scratch') {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const sourceFiles = getAllFiles('src');
const sourceContents = sourceFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

const inventory = [];

for (const file of files) {
  const filePath = path.join(publicDir, file);
  const stats = fs.statSync(filePath);
  if (stats.isDirectory()) continue;
  
  const sizeBytes = stats.size;
  const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2);
  const sizeKB = (sizeBytes / 1024).toFixed(1);

  // Check if filename is mentioned in source files
  const isReferenced = sourceContents.includes(file);

  inventory.push({
    file,
    sizeBytes,
    formattedSize: sizeBytes > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`,
    isReferenced,
  });
}

// Sort by size descending
inventory.sort((a, b) => b.sizeBytes - a.sizeBytes);

console.log('PUBLIC ASSET INVENTORY (Sorted by size):');
inventory.forEach((item, idx) => {
  console.log(`${idx + 1}. [${item.formattedSize}] ${item.file} | Referenced in src: ${item.isReferenced}`);
});
