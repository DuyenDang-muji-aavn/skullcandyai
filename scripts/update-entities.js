const fs = require('fs');
const https = require('https');
const path = require('path');

// Read CDN URLs from upload results
const cdnResults = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'cdn-urls.json'), 'utf8')
);

// Backend API URL
const API_URL = 'https://devday-aavn-d5284e914439.herokuapp.com/api/products/batch';

// Build batch update payload
const updates = cdnResults.products.map((product) => ({
  id: product.id,
  data: {
    image: product.url,
  },
}));

console.log(`📦 Preparing to update ${updates.length} entities with CDN asset URLs\n`);

// Make the API request
const payload = JSON.stringify({ updates });

const options = {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  },
};

console.log('🚀 Sending batch update to backend...\n');

const req = https.request(API_URL, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`📊 Response Status: ${res.statusCode}\n`);
    
    if (res.statusCode === 200) {
      const response = JSON.parse(data);
      console.log('✅ Batch update successful!\n');
      console.log(`📝 Response:`, JSON.stringify(response, null, 2));
      
      // Save response
      fs.writeFileSync(
        path.join(__dirname, 'update-response.json'),
        JSON.stringify(response, null, 2)
      );
      console.log('\n💾 Response saved to: update-response.json');
    } else {
      console.log('❌ Batch update failed!\n');
      console.log(`📝 Response:`, data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
});

req.write(payload);
req.end();
