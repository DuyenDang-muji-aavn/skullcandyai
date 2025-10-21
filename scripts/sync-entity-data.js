/**
 * Sync Entity Data from Source
 * 
 * Generic data synchronization script that extracts entity data from a source
 * and updates the backend database to match.
 */

const https = require('https');

// Entity data to sync (as of Oct 20, 2025)
// Note: Product 112 in source maps to Product 122 in database
const entities = [
  { id: 100, name: 'Cryptic Hacker', creator: 'CodeMaster', price: 3.75 },
  { id: 101, name: 'Frosty Snow Queen', creator: 'WinterWhisper', price: 4.20 },
  { id: 102, name: 'Spooky Halloween Ghost', creator: 'PhantomArtist', price: 1.85 },
  { id: 103, name: 'Lunar Moon Queen', creator: 'CelestialDream', price: 2.90 },
  { id: 104, name: 'Jolly Christmas Elf', creator: 'HolidayJoy', price: 2.20 },
  { id: 105, name: 'Galactic Astronaut', creator: 'SpaceExplorer', price: 3.00 },
  { id: 106, name: 'Rustic Farmer', creator: 'EarthBound', price: 1.50 },
  { id: 107, name: 'Athletic Tennis Girl', creator: 'SportyStyle', price: 2.75 },
  { id: 108, name: 'Grapevine Wine Monster', creator: 'VinoVibes', price: 2.00 },
  { id: 109, name: 'Regal Rose Lord', creator: 'FloralMajesty', price: 3.50 },
  { id: 110, name: 'Skateboard Boy', creator: 'UrbanMotion', price: 1.95 },
  { id: 111, name: 'Oceanic Sea Princess', creator: 'AquaDreamer', price: 3.35 },
  { id: 113, name: 'Mountain Angel Goat', creator: 'DreamyAnimals', price: 4.00 },
  { id: 114, name: 'Joyful Ice Cream Lover', creator: 'SweetTreats', price: 2.99 },
  { id: 115, name: 'Elegant White Swan', creator: 'NatureArt', price: 3.50 },
  { id: 116, name: 'Daring Pilot Captain', creator: 'SkyNavigator', price: 4.00 },
  { id: 117, name: 'Quick Brown Squirrel', creator: 'ForestFriends', price: 2.50 },
  { id: 118, name: 'Cheerful Firefly Kid', creator: 'HappyKids', price: 2.20 },
  { id: 119, name: 'Adventure Camping Boy', creator: 'OutdoorExplorer', price: 2.85 },
  { id: 120, name: 'Charming Valentine Cupid', creator: 'LoveArtisan', price: 3.60 },
  { id: 121, name: 'Dreamy Purple Baby', creator: 'ChildOfImagination', price: 3.75 },
  { id: 122, name: 'Wandering Butterfly', creator: 'FlutterArt', price: 1.75 }, // Product 22 in Figma
  { id: 123, name: 'Forever Young Peter Pan', creator: 'TimelessTales', price: 3.60 },
];

// API Configuration
const API_BASE_URL = 'devday-aavn-d5284e914439.herokuapp.com';
const API_PATH = '/api/products/batch';

/**
 * Update entities in database via batch API
 */
function updateEntities() {
  const updates = entities.map(product => ({
    id: product.id,
    data: {
      name: product.name,
      price: product.price,
      creator: {
        name: product.creator
      }
    }
  }));

  const payload = JSON.stringify({ updates });

  const options = {
    hostname: API_BASE_URL,
    path: API_PATH,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  console.log('🔄 Syncing product names and creators from Figma...\n');
  console.log(`📊 Total products to update: ${updates.length}\n`);

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`📊 Response Status: ${res.statusCode}`);
      
      try {
        const response = JSON.parse(data);
        
        if (res.statusCode === 200) {
          console.log('\n✅ Batch update successful!\n');
          console.log('📋 Updated Products:');
          console.log('─'.repeat(80));
          console.log('ID  | Name                        | Creator              | Price');
          console.log('─'.repeat(80));
          
          figmaProducts.forEach(product => {
            const nameCol = product.name.padEnd(28);
            const creatorCol = product.creator.padEnd(20);
            const idCol = String(product.id).padStart(3);
            console.log(`${idCol} | ${nameCol} | ${creatorCol} | ${product.price} ETH`);
          });
          console.log('─'.repeat(80));
          console.log(`\n✅ Total: ${figmaProducts.length} products updated successfully`);
        } else {
          console.log('\n❌ Batch update failed!');
          console.log('Response:', JSON.stringify(response, null, 2));
        }
      } catch (error) {
        console.error('❌ Error parsing response:', error.message);
        console.log('Raw response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Request failed:', error.message);
  });

  req.write(payload);
  req.end();
}

// Run the update
updateEntities();
