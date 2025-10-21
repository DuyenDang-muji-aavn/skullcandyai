const fs = require('fs');
const path = require('path');
const http = require('http');

// Product image mappings from Figma
const productImages = [
  { id: 100, name: 'Cryptic Hacker', nodeId: '121:6104', assetUrl: 'http://localhost:3845/assets/c987db946c7e77771722c6c59b09744d3fff06cb.png' },
  { id: 101, name: 'Frosty Snow Queen', nodeId: '121:6106', assetUrl: 'http://localhost:3845/assets/ee52308bbb2c32d8a9942d54af7717bb7e18d9c6.png' },
  { id: 102, name: 'Spooky Halloween Ghost', nodeId: '121:6107', assetUrl: 'http://localhost:3845/assets/0f2daaf2aa723b94de74dad7e6b075f378de559b.png' },
  { id: 103, name: 'Lunar Moon Queen', nodeId: '196:1830', assetUrl: 'http://localhost:3845/assets/6d722229f92ffdf624ecfff9e515b231c1fb2e8d.png' },
  { id: 104, name: 'Jolly Christmas Elf', nodeId: '121:6108', assetUrl: 'http://localhost:3845/assets/58776648d5abc13c417fd265af54d20ae4d392bb.png' },
  { id: 105, name: 'Galactic Astronaut', nodeId: '121:6109', assetUrl: 'http://localhost:3845/assets/4c1f83bad53e5978f4861f85a6b6c3959c9f2815.png' },
  { id: 106, name: 'Rustic Farmer', nodeId: '121:6105', assetUrl: 'http://localhost:3845/assets/b134bb2ee7e89e265a2eb1a6d37aa98f1d0cecb5.png' },
  { id: 107, name: 'Athletic Tennis Girl', nodeId: '121:6110', assetUrl: 'http://localhost:3845/assets/37a7357ac53524e79dcd89ce8218d54170cad85c.png' },
  { id: 108, name: 'Grapevine Wine Monster', nodeId: '121:6111', assetUrl: 'http://localhost:3845/assets/2621022b0f530014cccaaa39d6534856dd0520ba.png' },
  { id: 109, name: 'Regal Rose Lord', nodeId: '121:6112', assetUrl: 'http://localhost:3845/assets/30c5563b90999cf5b74d07ca4ad94d6d29d0ae5a.png' },
  { id: 110, name: 'Skateboard Boy', nodeId: '121:6113', assetUrl: 'http://localhost:3845/assets/c0c4c4641a0b870a6b7760943d53193dbd6de3cc.png' },
  { id: 111, name: 'Oceanic Sea Princess', nodeId: '121:6114', assetUrl: 'http://localhost:3845/assets/293c52ea58913b9dd758a6b241c74c704cbedccb.png' },
  { id: 116, name: 'Mountain Angel Goat', nodeId: '610:1959', assetUrl: 'http://localhost:3845/assets/db20583610f0682247cb51e3369f3894b68def27.png' },
  { id: 113, name: 'Joyful Ice Cream Lover', nodeId: '196:1831', assetUrl: 'http://localhost:3845/assets/86bd2e87408c7138be942a547412321f5f9d7902.png' },
  { id: 118, name: 'Elegant White Swan', nodeId: '610:1902', assetUrl: 'http://localhost:3845/assets/a92c3069e4103814fbc229a6f2cb05ef442d5cbd.png' },
  { id: 114, name: 'Daring Pilot Captain', nodeId: '121:6115', assetUrl: 'http://localhost:3845/assets/77e7ffc4c61442dc6e6663b4ac0db32e4cef1d13.png' },
  { id: 119, name: 'Quick Brown Squirrel', nodeId: '610:1960', assetUrl: 'http://localhost:3845/assets/85df4efda123d9bb49ed7e6856f6ce67323d5fb9.png' },
  { id: 120, name: 'Cheerful Firefly Kid', nodeId: '610:1903', assetUrl: 'http://localhost:3845/assets/6f447d58bc12110ba576f5b027dccb25ed236f7e.png' },
  { id: 121, name: 'Adventure Camping Boy', nodeId: '632:2008', assetUrl: 'http://localhost:3845/assets/9bf5b1d0ffea87ed913a50a6b8778c0632d4d108.png' },
  { id: 115, name: 'Charming Valentine Cupid', nodeId: '196:1832', assetUrl: 'http://localhost:3845/assets/5c4ebb9f25ee25cc94ff0ad36ee41574c4203e06.png' },
  { id: 122, name: 'Dreamy Purple Baby', nodeId: '610:1961', assetUrl: 'http://localhost:3845/assets/a9cedf2ba82cccd2bfe52e2ebb95c1c891bfc6e3.png' },
  { id: 112, name: 'Wandering Butterfly', nodeId: '610:1904', assetUrl: 'http://localhost:3845/assets/e554e7bd5ad2aae1f3739cb91ef3fa3ab20a6b6c.png' },
  { id: 117, name: 'Forever Young Peter Pan', nodeId: '632:2009', assetUrl: 'http://localhost:3845/assets/2034dea609b2d15f2dc8dc871ac6d06f447c6767.png' },
  { id: 123, name: 'Welcome to Vietnam Adventure', nodeId: '632:2010', assetUrl: 'http://localhost:3845/assets/6ee750f9701ffc2a37c2fd8d08db5f37f04e4693.png' },
];

// Create directory for images
const outputDir = path.join(__dirname, '../public/assets/products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Download function
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    http.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete partial file
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

// Download all images
async function downloadAll() {
  console.log(`📥 Downloading ${productImages.length} product images from Figma MCP...\n`);
  
  const results = {
    success: [],
    failed: []
  };
  
  for (const product of productImages) {
    const filename = `product-${product.id}.png`;
    const filepath = path.join(outputDir, filename);
    
    try {
      console.log(`⏳ Downloading: ${product.name} (ID: ${product.id})...`);
      await downloadImage(product.assetUrl, filepath);
      
      // Check file size
      const stats = fs.statSync(filepath);
      if (stats.size < 100) {
        // File too small, likely an error
        const content = fs.readFileSync(filepath, 'utf8');
        throw new Error(`File too small (${stats.size} bytes): ${content}`);
      }
      
      console.log(`   ✅ Saved to: ${filename} (${Math.round(stats.size / 1024)}KB)\n`);
      results.success.push({ ...product, filename, size: stats.size });
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
      results.failed.push({ ...product, error: error.message });
    }
  }
  
  // Save results
  const resultsFile = path.join(__dirname, 'downloaded-images.json');
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 DOWNLOAD SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${results.success.length}/${productImages.length}`);
  console.log(`❌ Failed: ${results.failed.length}/${productImages.length}`);
  console.log(`\n📄 Results saved to: ${resultsFile}`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ Failed downloads:');
    results.failed.forEach(({ id, name, error }) => {
      console.log(`   - ID ${id} (${name}): ${error}`);
    });
  }
}

// Run
downloadAll().catch(console.error);
