import fs from 'fs';
import path from 'path';

const srcImagesDir = path.join(process.cwd(), 'src', 'assets', 'images');
const publicDir = path.join(process.cwd(), 'public');

try {
  console.log('Scanning src/assets/images for user uploaded files...');
  const files = fs.readdirSync(srcImagesDir);

  files.forEach(file => {
    // Pattern: matches something like cbb_logo_1782871844138.jpg or background_hero_mobile_1782765124852.jpg
    const match = file.match(/^(.+)_(\d+)\.(jpg|jpeg|png|gif|webp|svg)$/i);
    if (match) {
      const baseName = match[1];
      const ext = match[3];
      const targetName = `${baseName}.${ext}`;
      
      const sourcePath = path.join(srcImagesDir, file);
      const destPublicPath = path.join(publicDir, targetName);
      const destSrcPath = path.join(srcImagesDir, targetName);
      
      console.log(`Found uploaded image: ${file}. Copying as: ${targetName}`);
      
      // Copy to public/
      fs.copyFileSync(sourcePath, destPublicPath);
      console.log(`  -> Copied to public: ${destPublicPath}`);
      
      // Copy to src/assets/images/
      fs.copyFileSync(sourcePath, destSrcPath);
      console.log(`  -> Copied to src/assets/images: ${destSrcPath}`);
    }
  });

  console.log('User image replacements completed successfully!');
} catch (error: any) {
  console.error('Error copying images:', error);
  process.exit(1);
}
