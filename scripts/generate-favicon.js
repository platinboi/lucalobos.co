const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '../public');
const SVG_PATH = path.join(PUBLIC_DIR, 'favicon.svg');

// Sizes for favicon
const sizes = [16, 32, 48, 64, 128, 192, 256, 512];

async function generateFavicons() {
  try {
    // Check if SVG exists
    if (!fs.existsSync(SVG_PATH)) {
      console.error('favicon.svg not found in public directory');
      process.exit(1);
    }

    // Read the SVG file
    const svgBuffer = fs.readFileSync(SVG_PATH);

    // Generate favicon.ico (multi-size icon)
    const icoSizes = [16, 32, 48, 64];
    const icoBuffers = await Promise.all(
      icoSizes.map(size => 
        sharp(svgBuffer)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    // Write favicon.ico using sharp
    await sharp(icoBuffers[1]) // Use 32x32 for favicon.ico
      .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
    
    // Generate PNG favicons for different sizes
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`));
    }

    // Generate apple-touch-icon.png (192x192)
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));

    console.log('Favicon files generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons(); 