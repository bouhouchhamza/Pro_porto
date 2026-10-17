const fs = require('fs');
let css = fs.readFileSync('src/app/components/Hero.css', 'utf8');

// Replace hero-title span 4 and buttons
const oldBlock = `.hero-title span:nth-child(4) {
  color: rgba(255, 255, 255, 0.68);
  font-size: inherit;
  font-weight: 400;
  line-height: inherit;
}

.hero-title span:nth-child(3) {
  white-space: nowrap;
}

.hero-description {
  max-width: 360px;
  margin: 42px 0 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px !important;
  line-height: 1.45 !important;
}

.hero-buttons {
  display: flex;
  flex-direction: row;
  gap: 14px;
  justify-content: flex-start;
  margin-top: 0;
  position: relative;
  z-index: 20;
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.hero-button-primary,
.hero-button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 36px;
  min-height: 36px;
  padding: 0 22px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.hero-button-primary {
  background: linear-gradient(90deg, var(--purple-500), var(--blue-500));
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 28px rgba(139, 92, 246, 0.34);
}

.hero-button-secondary {
  border: 1px solid rgba(139, 92, 246, 0.55);
  color: #dedede;
  background: rgba(20, 20, 35, 0.45);
}

.hero-button-primary:hover,
.hero-button-secondary:hover {
  transform: translateY(-3px);
  border-color: rgba(139, 92, 246, 0.85);
  box-shadow: 0 0 34px rgba(139, 92, 246, 0.34);
}`;

const newBlock = `.hero-title span:nth-child(3) {
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.88);
  font-size: inherit;
  font-weight: 400;
  line-height: inherit;
}

.hero-title span:nth-child(4),
.hero-supporting-domains {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.42em !important;
  font-weight: 400;
  line-height: 1.45 !important;
  margin-top: 8px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.hero-description {
  max-width: 380px;
  margin: 36px 0 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px !important;
  line-height: 1.5 !important;
}

.hero-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
  margin-top: 0;
  position: relative;
  z-index: 20;
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.hero-button-primary,
.hero-button-secondary,
.hero-button-tertiary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 36px;
  min-height: 36px;
  padding: 0 18px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease;
}

.hero-button-primary {
  background: linear-gradient(90deg, var(--purple-500), var(--blue-500));
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 28px rgba(139, 92, 246, 0.34);
}

.hero-button-secondary {
  border: 1px solid rgba(139, 92, 246, 0.55);
  color: #dedede;
  background: rgba(20, 20, 35, 0.45);
}

.hero-button-tertiary {
  border: 1px solid rgba(139, 92, 246, 0.35);
  color: #c4b5fd;
  background: rgba(20, 20, 35, 0.25);
}

.hero-button-primary:hover,
.hero-button-secondary:hover,
.hero-button-tertiary:hover {
  transform: translateY(-3px);
  border-color: rgba(139, 92, 246, 0.85);
  box-shadow: 0 0 34px rgba(139, 92, 246, 0.34);
}

.hero-button-tertiary:hover {
  background: rgba(139, 92, 246, 0.15);
  color: #ffffff;
}`;

// Normalize line endings for replacement
const normalizedCss = css.replace(/\r\n/g, '\n');
const normalizedOld = oldBlock.replace(/\r\n/g, '\n');
const normalizedNew = newBlock.replace(/\r\n/g, '\n');

if (!normalizedCss.includes(normalizedOld)) {
  console.error("Old block not found!");
  process.exit(1);
}

let updated = normalizedCss.replace(normalizedOld, normalizedNew);

// Add light theme rules if not present
const lightThemeAddition = `
[data-theme="light"] .hero-title span:nth-child(4),
[data-theme="light"] .hero-supporting-domains {
  color: #6366F1 !important;
  font-weight: 500 !important;
}

[data-theme="light"] .hero-button-tertiary {
  background: rgba(255, 255, 255, 0.75) !important;
  color: #334155 !important;
  border: 1px solid rgba(139, 92, 246, 0.35) !important;
}

[data-theme="light"] .hero-button-tertiary:hover {
  background: rgba(238, 242, 255, 0.95) !important;
  color: #4338CA !important;
  border-color: rgba(139, 92, 246, 0.75) !important;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15) !important;
}
`;

if (!updated.includes('.hero-button-tertiary')) {
  console.error("tertiary not found after replacement");
} else {
  updated += lightThemeAddition;
}

fs.writeFileSync('src/app/components/Hero.css', updated, 'utf8');
console.log("Successfully updated Hero.css");
