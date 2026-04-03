const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, '../frontend/build');
const targetDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Build output not found at ${sourceDir}`);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Copied frontend build to ${targetDir}`);
