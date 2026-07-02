import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

async function generateFavicon() {
  try {
    const logoPath = path.join(process.cwd(), 'public', 'cbb_logo.jpg');
    console.log('Loading logo from:', logoPath);
    const logo = await Jimp.read(logoPath);

    // Resize to 32x32 for standard favicon
    console.log('Resizing logo to 32x32...');
    const favicon32 = logo.clone().resize({ w: 32, h: 32 });

    // Get PNG buffer of the 32x32 image
    console.log('Generating PNG buffer...');
    const pngBuffer = await favicon32.getBuffer('image/png');

    // Create a valid ICO file containing this single PNG image
    // ICO Header (6 bytes):
    // - 2 bytes: reserved (0)
    // - 2 bytes: image type (1 for ico)
    // - 2 bytes: number of images (1)
    const icoHeader = Buffer.alloc(6);
    icoHeader.writeUInt16LE(0, 0); // Reserved
    icoHeader.writeUInt16LE(1, 2); // Image type (1 = ICO)
    icoHeader.writeUInt16LE(1, 4); // Number of images

    // Directory entry (16 bytes):
    // - 1 byte: width (32, 0 means 256)
    // - 1 byte: height (32, 0 means 256)
    // - 1 byte: color count (0 if >= 8bpp)
    // - 1 byte: reserved (0)
    // - 2 bytes: color planes (1)
    // - 2 bytes: bits per pixel (32)
    // - 4 bytes: size of image data
    // - 4 bytes: offset of image data from beginning of file (6 + 16 = 22)
    const icoDirEntry = Buffer.alloc(16);
    icoDirEntry.writeUInt8(32, 0); // Width
    icoDirEntry.writeUInt8(32, 1); // Height
    icoDirEntry.writeUInt8(0, 2); // Color palette (0 = no palette)
    icoDirEntry.writeUInt8(0, 3); // Reserved
    icoDirEntry.writeUInt16LE(1, 4); // Color planes
    icoDirEntry.writeUInt16LE(32, 6); // Bits per pixel (32-bit RGBA)
    icoDirEntry.writeUInt32LE(pngBuffer.length, 8); // Size of PNG data
    icoDirEntry.writeUInt32LE(22, 12); // Offset to PNG data

    // Combine header, directory entry, and PNG buffer
    const icoBuffer = Buffer.concat([icoHeader, icoDirEntry, pngBuffer]);

    // Save to public directory
    const icoDest = path.join(process.cwd(), 'public', 'favicon.ico');
    const pngDest = path.join(process.cwd(), 'public', 'favicon.png');
    const png32Dest = path.join(process.cwd(), 'public', 'favicon-32x32.png');

    console.log('Writing public/favicon.ico...');
    fs.writeFileSync(icoDest, icoBuffer);

    console.log('Writing public/favicon.png...');
    fs.writeFileSync(pngDest, pngBuffer);

    console.log('Writing public/favicon-32x32.png...');
    fs.writeFileSync(png32Dest, pngBuffer);

    console.log('Also copying favicons to src/assets/images directory for consistency...');
    const srcDir = path.join(process.cwd(), 'src', 'assets', 'images');
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }
    fs.writeFileSync(path.join(srcDir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.join(srcDir, 'favicon.png'), pngBuffer);
    fs.writeFileSync(path.join(srcDir, 'favicon-32x32.png'), pngBuffer);

    console.log('✅ Favicon generation completed successfully!');
  } catch (error) {
    console.error('❌ Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon();
