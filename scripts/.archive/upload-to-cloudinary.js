const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const FormData = require('form-data');

// Cloudinary credentials
const CLOUD_NAME = 'dtes5pcfm';
const API_KEY = '279415635918263';
const API_SECRET = 'kTnO17uuq2PrP4FHSSnQ0J-dCBM';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// Product images from Figma MCP (localhost:3845)
const figmaProducts = [
  { id: 100, name: "Cryptic Hacker", figmaAsset: "http://localhost:3845/assets/c987db946c7e77771722c6c59b09744d3fff06cb.png" },
  { id: 101, name: "Frosty Snow Queen", figmaAsset: "http://localhost:3845/assets/ee52308bbb2c32d8a9942d54af7717bb7e18d9c6.png" },
  { id: 102, name: "Spooky Halloween Ghost", figmaAsset: "http://localhost:3845/assets/0f2daaf2aa723b94de74dad7e6b075f378de559b.png" },
  { id: 103, name: "Lunar Moon Queen", figmaAsset: "http://localhost:3845/assets/6d722229f92ffdf624ecfff9e515b231c1fb2e8d.png" },
  { id: 104, name: "Jolly Christmas Elf", figmaAsset: "http://localhost:3845/assets/58776648d5abc13c417fd265af54d20ae4d392bb.png" },
  { id: 105, name: "Galactic Astronaut", figmaAsset: "http://localhost:3845/assets/4c1f83bad53e5978f4861f85a6b6c3959c9f2815.png" },
  { id: 106, name: "Rustic Farmer", figmaAsset: "http://localhost:3845/assets/b134bb2ee7e89e265a2eb1a6d37aa98f1d0cecb5.png" },
  { id: 107, name: "Athletic Tennis Girl", figmaAsset: "http://localhost:3845/assets/37a7357ac53524e79dcd89ce8218d54170cad85c.png" },
  { id: 108, name: "Grapevine Wine Monster", figmaAsset: "http://localhost:3845/assets/2621022b0f530014cccaaa39d6534856dd0520ba.png" },
  { id: 109, name: "Regal Rose Lord", figmaAsset: "http://localhost:3845/assets/30c5563b90999cf5b74d07ca4ad94d6d29d0ae5a.png" },
  { id: 110, name: "Skateboard Boy", figmaAsset: "http://localhost:3845/assets/c0c4c4641a0b870a6b7760943d53193dbd6de3cc.png" },
  { id: 111, name: "Oceanic Sea Princess", figmaAsset: "http://localhost:3845/assets/293c52ea58913b9dd758a6b241c74c704cbedccb.png" },
  { id: 113, name: "Joyful Ice Cream Lover", figmaAsset: "http://localhost:3845/assets/86bd2e87408c7138be942a547412321f5f9d7902.png" },
  { id: 114, name: "Daring Pilot Captain", figmaAsset: "http://localhost:3845/assets/a92c3069e4103814fbc229a6f2cb05ef442d5cbd.png" },
  { id: 115, name: "Charming Valentine Cupid", figmaAsset: "http://localhost:3845/assets/77e7ffc4c61442dc6e6663b4ac0db32e4cef1d13.png" },
  { id: 116, name: "Santa Claus is coming", figmaAsset: "http://localhost:3845/assets/85df4efda123d9bb49ed7e6856f6ce67323d5fb9.png" },
  { id: 117, name: "Peter Pan", figmaAsset: "http://localhost:3845/assets/6f447d58bc12110ba576f5b027dccb25ed236f7e.png" },
  { id: 118, name: "Santa claus", figmaAsset: "http://localhost:3845/assets/9bf5b1d0ffea87ed913a50a6b8778c0632d4d108.png" },
  { id: 119, name: "Sound of love", figmaAsset: "http://localhost:3845/assets/5c4ebb9f25ee25cc94ff0ad36ee41574c4203e06.png" },
  { id: 120, name: "Baby Angel", figmaAsset: "http://localhost:3845/assets/a9cedf2ba82cccd2bfe52e2ebb95c1c891bfc6e3.png" },
  { id: 121, name: "King", figmaAsset: "http://localhost:3845/assets/e554e7bd5ad2aae1f3739cb91ef3fa3ab20a6b6c.png" },
  { id: 122, name: "Little Red Riding Hood", figmaAsset: "http://localhost:3845/assets/2034dea609b2d15f2dc8dc871ac6d06f447c6767.png" },
  { id: 123, name: "Friends Forever", figmaAsset: "http://localhost:3845/assets/6ee750f9701ffc2a37c2fd8d08db5f37f04e4693.png" },
];

// Helper: Download file from URL
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(outputPath);
    
    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

// Helper: Upload to Cloudinary
function uploadToCloudinary(filePath, publicId) {
  return new Promise((resolve, reject) => {
    const crypto = require('crypto');
    const timestamp = Math.floor(Date.now() / 1000);
    
    // Generate signature - parameters must be in alphabetical order
    const signatureString = `folder=skullcandy-products&public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');
    
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('api_key', API_KEY);
    form.append('timestamp', timestamp);
    form.append('public_id', publicId);
    form.append('folder', 'skullcandy-products');
    form.append('signature', signature);

    form.submit(CLOUDINARY_UPLOAD_URL, (err, res) => {
      if (err) return reject(err);
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.error) {
            reject(new Error(result.error.message));
          } else {
            resolve(result.secure_url);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  });
}

// Main process
async function uploadAllProducts() {
  console.log('🚀 Starting Cloudinary upload process...\n');
  
  const tempDir = path.join(__dirname, 'temp-images');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const results = [];
  
  for (const product of figmaProducts) {
    try {
      console.log(`📦 Processing: ${product.name} (ID: ${product.id})`);
      
      // 1. Download from Figma MCP
      const tempPath = path.join(tempDir, `product-${product.id}.png`);
      console.log(`   ⬇️  Downloading from Figma...`);
      await downloadFile(product.figmaAsset, tempPath);
      
      // 2. Upload to Cloudinary
      console.log(`   ⬆️  Uploading to Cloudinary...`);
      const publicId = `product-${product.id}`;
      const cloudinaryUrl = await uploadToCloudinary(tempPath, publicId);
      
      console.log(`   ✅ Success: ${cloudinaryUrl}\n`);
      
      results.push({
        id: product.id,
        name: product.name,
        cloudinaryUrl,
      });
      
      // Clean up temp file
      fs.unlinkSync(tempPath);
      
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}\n`);
      results.push({
        id: product.id,
        name: product.name,
        error: error.message,
      });
    }
  }

  // Clean up temp directory
  fs.rmdirSync(tempDir);

  // Save results
  const outputFile = path.join(__dirname, 'cloudinary-upload-results.json');
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  
  console.log('\n✨ Upload process complete!');
  console.log(`📊 Results saved to: ${outputFile}`);
  console.log(`✅ Successful: ${results.filter(r => !r.error).length}/${results.length}`);
  
  return results;
}

// Run
uploadAllProducts().catch(console.error);
