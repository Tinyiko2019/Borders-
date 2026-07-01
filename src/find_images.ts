import fs from 'fs';
import path from 'path';

const searchDir = (dir: string, extPattern: RegExp, callback: (filePath: string, content: string) => void) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      searchDir(fullPath, extPattern, callback);
    } else if (file.match(extPattern)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      callback(fullPath, content);
    }
  }
};

const imagesReferenced = new Set<string>();

searchDir(path.join(process.cwd(), 'src'), /\.(tsx|ts|css)$/i, (filePath, content) => {
  // Simple regex to find quoted paths ending in image extensions
  const matches = content.match(/['"\/][a-zA-Z0-9_\-\.]+\.(jpg|jpeg|png|gif|webp|svg)/gi);
  if (matches) {
    matches.forEach(m => {
      // Clean up match
      const cleaned = m.replace(/['"\/]/g, '').trim();
      imagesReferenced.add(cleaned);
    });
  }
});

console.log('Images referenced in code:');
console.log(Array.from(imagesReferenced).sort());

console.log('\nFiles in src/assets/images:');
const srcImagesDir = path.join(process.cwd(), 'src', 'assets', 'images');
if (fs.existsSync(srcImagesDir)) {
  fs.readdirSync(srcImagesDir).forEach(file => {
    const stats = fs.statSync(path.join(srcImagesDir, file));
    console.log(`- ${file} (${stats.size} bytes)`);
  });
}
