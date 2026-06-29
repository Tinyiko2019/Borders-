import fs from 'fs';
import path from 'path';

function findImages(dir: string) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        findImages(fullPath);
      } else if (file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        console.log(`Image: ${fullPath} | Size: ${stats.size} | Mtime: ${stats.mtime.toISOString()}`);
      }
    }
  } catch (e: any) {
    console.error(`Error in ${dir}: ${e.message}`);
  }
}

console.log('Searching for images...');
findImages(process.cwd());
console.log('Search complete!');
