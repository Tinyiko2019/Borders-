import fs from 'fs';
import path from 'path';

const checkFile = (p: string) => {
  if (fs.existsSync(p)) {
    const stats = fs.statSync(p);
    console.log(`${p}: size = ${stats.size} bytes, mtime = ${stats.mtime}`);
  } else {
    console.log(`${p}: DOES NOT EXIST`);
  }
};

console.log('--- LOGO ---');
checkFile(path.join(process.cwd(), 'src', 'assets', 'images', 'cbb_logo_1782871844138.jpg'));
checkFile(path.join(process.cwd(), 'src', 'assets', 'images', 'cbb_logo.jpg'));
checkFile(path.join(process.cwd(), 'public', 'cbb_logo.jpg'));
checkFile(path.join(process.cwd(), 'dist', 'cbb_logo.jpg'));

console.log('--- HERO ---');
checkFile(path.join(process.cwd(), 'src', 'assets', 'images', 'background_hero_1782765107708.jpg'));
checkFile(path.join(process.cwd(), 'src', 'assets', 'images', 'background_hero.jpg'));
checkFile(path.join(process.cwd(), 'public', 'background_hero.jpg'));
checkFile(path.join(process.cwd(), 'dist', 'background_hero.jpg'));
