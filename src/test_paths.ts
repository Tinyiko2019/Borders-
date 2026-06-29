import path from 'path';
import fs from 'fs';

console.log('CWD:', process.cwd());
console.log('__dirname:', __dirname);
console.log('public exists in CWD?', fs.existsSync(path.join(process.cwd(), 'public')));
console.log('public files:', fs.readdirSync(path.join(process.cwd(), 'public')));
