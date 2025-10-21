/**
 * Download Assets from Source
 * Generic asset downloader that fetches assets from a remote source
 * and saves them locally with proper mapping
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Product mapping: Figma order → Database ID with correct names
// Extracted from Figma node 121:6103 on Oct 20, 2025
const productImages = [
  { dbId: 100, figmaProduct: 'Product 01', name: 'Cryptic Hacker', assetUrl: 'http://localhost:3845/assets/c987db946c7e77771722c6c59b09744d3fff06cb.png' },
  { dbId: 101, figmaProduct: 'Product 02', name: 'Frosty Snow Queen', assetUrl: 'http://localhost:3845/assets/ee52308bbb2c32d8a9942d54af7717bb7e18d9c6.png' },
  { dbId: 102, figmaProduct: 'Product 03', name: 'Spooky Halloween Ghost', assetUrl: 'http://localhost:3845/assets/0f2daaf2aa723b94de74dad7e6b075f378de559b.png' },
  { dbId: 103, figmaProduct: 'Product 04', name: 'Lunar Moon Queen', assetUrl: 'http://localhost:3845/assets/6d722229f92ffdf624ecfff9e515b231c1fb2e8d.png' },
  { dbId: 104, figmaProduct: 'Product 05', name: 'Jolly Christmas Elf', assetUrl: 'http://localhost:3845/assets/58776648d5abc13c417fd265af54d20ae4d392bb.png' },
  { dbId: 105, figmaProduct: 'Product 06', name: 'Galactic Astronaut', assetUrl: 'http://localhost:3845/assets/4c1f83bad53e5978f4861f85a6b6c3959c9f2815.png' },
  { dbId: 106, figmaProduct: 'Product 07', name: 'Rustic Farmer', assetUrl: 'http://localhost:3845/assets/b134bb2ee7e89e265a2eb1a6d37aa98f1d0cecb5.png' },
  { dbId: 107, figmaProduct: 'Product 08', name: 'Athletic Tennis Girl', assetUrl: 'http://localhost:3845/assets/37a7357ac53524e79dcd89ce8218d54170cad85c.png' },
  { dbId: 108, figmaProduct: 'Product 09', name: 'Grapevine Wine Monster', assetUrl: 'http://localhost:3845/assets/2621022b0f530014cccaaa39d6534856dd0520ba.png' },
  { dbId: 109, figmaProduct: 'Product 10', name: 'Regal Rose Lord', assetUrl: 'http://localhost:3845/assets/30c5563b90999cf5b74d07ca4ad94d6d29d0ae5a.png' },
  { dbId: 110, figmaProduct: 'Product 11', name: 'Skateboard Boy', assetUrl: 'http://localhost:3845/assets/c0c4c4641a0b870a6b7760943d53193dbd6de3cc.png' },
  { dbId: 111, figmaProduct: 'Product 12', name: 'Oceanic Sea Princess', assetUrl: 'http://localhost:3845/assets/293c52ea58913b9dd758a6b241c74c704cbedccb.png' },
  { dbId: 113, figmaProduct: 'Product 13', name: 'Mountain Angel Goat', assetUrl: 'http://localhost:3845/assets/db20583610f0682247cb51e3369f3894b68def27.png' },
  { dbId: 114, figmaProduct: 'Product 14', name: 'Joyful Ice Cream Lover', assetUrl: 'http://localhost:3845/assets/86bd2e87408c7138be942a547412321f5f9d7902.png' },
  { dbId: 115, figmaProduct: 'Product 15', name: 'Elegant White Swan', assetUrl: 'http://localhost:3845/assets/a92c3069e4103814fbc229a6f2cb05ef442d5cbd.png' },
  { dbId: 116, figmaProduct: 'Product 16', name: 'Daring Pilot Captain', assetUrl: 'http://localhost:3845/assets/77e7ffc4c61442dc6e6663b4ac0db32e4cef1d13.png' },
  { dbId: 117, figmaProduct: 'Product 17', name: 'Quick Brown Squirrel', assetUrl: 'http://localhost:3845/assets/85df4efda123d9bb49ed7e6856f6ce67323d5fb9.png' },
  { dbId: 118, figmaProduct: 'Product 18', name: 'Cheerful Firefly Kid', assetUrl: 'http://localhost:3845/assets/6f447d58bc12110ba576f5b027dccb25ed236f7e.png' },
  { dbId: 119, figmaProduct: 'Product 19', name: 'Adventure Camping Boy', assetUrl: 'http://localhost:3845/assets/9bf5b1d0ffea87ed913a50a6b8778c0632d4d108.png' },
  { dbId: 120, figmaProduct: 'Product 20', name: 'Charming Valentine Cupid', assetUrl: 'http://localhost:3845/assets/5c4ebb9f25ee25cc94ff0ad36ee41574c4203e06.png' },
  { dbId: 121, figmaProduct: 'Product 21', name: 'Dreamy Purple Baby', assetUrl: 'http://localhost:3845/assets/a9cedf2ba82cccd2bfe52e2ebb95c1c891bfc6e3.png' },
  { dbId: 122, figmaProduct: 'Product 22', name: 'Wandering Butterfly', assetUrl: 'http://localhost:3845/assets/e554e7bd5ad2aae1f3739cb91ef3fa3ab20a6b6c.png' },
  { dbId: 123, figmaProduct: 'Product 23', name: 'Forever Young Peter Pan', assetUrl: 'http://localhost:3845/assets/2034dea609b2d15f2dc8dc871ac6d06f447c6767.png' },
];

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'products');
const RESULTS_FILE = path.join(__dirname, 'download-results.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Download a single image from Figma MCP server
 */
function downloadImage(product) {
  return new Promise((resolve, reject) => {
    const url = new URL(product.assetUrl);
    const outputPath = path.join(OUTPUT_DIR, `product-${product.dbId}.png`);

    console.log(`⏳ Downloading: ${product.name} (DB ID: ${product.dbId}, Figma: ${product.figmaProduct})...`);

    http.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        
        // Validate file size (should be > 100 bytes for valid image)
        const stats = fs.statSync(outputPath);
        if (stats.size < 100) {
          fs.unlinkSync(outputPath);
          reject(new Error(`File too small (${stats.size} bytes) - likely error response`));
          return;
        }

        console.log(`✅ Saved to: product-${product.dbId}.png (${Math.round(stats.size / 1024)}KB)`);
        resolve({
          ...product,
          success: true,
          filePath: outputPath,
          fileSize: stats.size
        });
      });

      fileStream.on('error', (err) => {
        fs.unlinkSync(outputPath);
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Download all images sequentially
 */
async function downloadAllImages() {
  console.log('🔄 Re-syncing product images from Figma...\n');
  console.log(`📊 Total products: ${productImages.length}\n`);
  console.log('─'.repeat(80));

  const results = [];

  for (const product of productImages) {
    try {
      const result = await downloadImage(product);
      results.push(result);
    } catch (error) {
      console.error(`❌ Failed: ${product.name} (${error.message})`);
      results.push({
        ...product,
        success: false,
        error: error.message
      });
    }
  }

  console.log('─'.repeat(80));
  console.log('\n📊 Download Summary:');
  console.log(`✅ Successful: ${results.filter(r => r.success).length}/${productImages.length}`);
  console.log(`❌ Failed: ${results.filter(r => !r.success).length}/${productImages.length}`);

  // Save results
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to: ${path.basename(RESULTS_FILE)}`);

  // Display product mapping
  console.log('\n📋 Product Name Mapping:');
  console.log('─'.repeat(80));
  console.log('DB ID | Name                        | Figma       | Status');
  console.log('─'.repeat(80));
  results.forEach(r => {
    const nameCol = r.name.padEnd(28);
    const figmaCol = r.figmaProduct.padEnd(12);
    const status = r.success ? '✅' : '❌';
    console.log(`${String(r.dbId).padStart(5)} | ${nameCol} | ${figmaCol} | ${status}`);
  });
  console.log('─'.repeat(80));

  return results;
}

// Run the download
downloadAllImages().catch(console.error);
