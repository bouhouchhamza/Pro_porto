const fs = require('fs');

let css = fs.readFileSync('src/app/globals.css', 'utf8');

// 1. Update --section-rhythm
css = css.replace(/--section-rhythm:\s*96px;/g, '--section-rhythm: 60px;');

// 2. Update .portfolio-section padding: 5rem 0 -> 3.5rem 0
css = css.replace(/padding:\s*5rem\s+0\s*!important;/g, 'padding: 3.5rem 0 !important;');

// 3. Natural flowing portfolio sections
css = css.replace(
  /\.hero-section \+ \.projects-section,/g,
  '.hero-section + .about-section,\n.hero-section + .projects-section,'
);

// 4. Quote thread canvas height: 520px -> 440px
css = css.replace(/height:\s*520px;/g, 'height: 440px;');

fs.writeFileSync('src/app/globals.css', css, 'utf8');
console.log('globals.css spacing optimized successfully');
