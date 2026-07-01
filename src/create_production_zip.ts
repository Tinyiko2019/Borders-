import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

const distDir = path.join(process.cwd(), 'dist');
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Please run npm run build first.');
  process.exit(1);
}

console.log('Creating production ZIP from "dist" directory...');

const zip = new AdmZip();

// Read all items inside dist
const items = fs.readdirSync(distDir);
for (const item of items) {
  const itemPath = path.join(distDir, item);
  const stats = fs.statSync(itemPath);
  
  if (stats.isDirectory()) {
    zip.addLocalFolder(itemPath, item);
  } else {
    // Avoid putting any pre-existing zip or server files in the new zip
    if (item === 'dist.zip' || item === 'server.cjs' || item === 'server.cjs.map') continue;
    zip.addLocalFile(itemPath);
  }
}

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const publicZipPath = path.join(publicDir, 'dist.zip');
zip.writeZip(publicZipPath);
console.log(`Successfully created ZIP at public/dist.zip (${fs.statSync(publicZipPath).size} bytes)`);

const distZipPath = path.join(distDir, 'dist.zip');
zip.writeZip(distZipPath);
console.log(`Successfully created ZIP at dist/dist.zip (${fs.statSync(distZipPath).size} bytes)`);

console.log('Production package is ready!');
