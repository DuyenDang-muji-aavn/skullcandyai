const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Product node IDs from Figma (from the get_design_context response)
const figmaProductNodes = [
  { id: 100, nodeId: "121:6104", name: "Cryptic Hacker" },
  { id: 101, nodeId: "121:6106", name: "Frosty Snow Queen" },
  { id: 102, nodeId: "121:6107", name: "Spooky Halloween Ghost" },
  { id: 103, nodeId: "196:1830", name: "Lunar Moon Queen" },
  { id: 104, nodeId: "121:6108", name: "Jolly Christmas Elf" },
  { id: 105, nodeId: "121:6109", name: "Galactic Astronaut" },
  { id: 106, nodeId: "121:6105", name: "Rustic Farmer" },
  { id: 107, nodeId: "121:6110", name: "Athletic Tennis Girl" },
  { id: 108, nodeId: "121:6111", name: "Grapevine Wine Monster" },
  { id: 109, nodeId: "121:6112", name: "Regal Rose Lord" },
  { id: 110, nodeId: "121:6113", name: "Skateboard Boy" },
  { id: 111, nodeId: "121:6114", name: "Oceanic Sea Princess" },
  { id: 113, nodeId: "196:1831", name: "Joyful Ice Cream Lover" },
  { id: 114, nodeId: "121:6115", name: "Daring Pilot Captain" },
  { id: 115, nodeId: "196:1832", name: "Charming Valentine Cupid" },
  { id: 116, nodeId: "610:1959", name: "Mountain Angel Goat" },
  { id: 117, nodeId: "632:2009", name: "Forever Young Peter Pan" },
  { id: 118, nodeId: "610:1902", name: "Elegant White Swan" },
  { id: 119, nodeId: "610:1960", name: "Quick Brown Squirrel" },
  { id: 120, nodeId: "610:1903", name: "Cheerful Firefly Kid" },
  { id: 121, nodeId: "632:2008", name: "Adventure Camping Boy" },
  { id: 122, nodeId: "610:1961", name: "Dreamy Purple Baby" },
  { id: 123, nodeId: "632:2010", name: "Welcome to Vietnam Adventure" },
];

console.log('📋 Figma Node IDs for Product Screenshots:\n');
console.log('To get screenshots, use Figma MCP tool get_screenshot for each node:\n');

figmaProductNodes.forEach((product) => {
  console.log(`Product ${product.id} (${product.name}): Node ID = "${product.nodeId}"`);
});

console.log('\n✅ Use these node IDs with get_screenshot to capture individual product images');
console.log('   Then upload the screenshots to Cloudinary\n');

// Save as JSON for reference
const outputFile = path.join(__dirname, 'figma-product-nodes.json');
fs.writeFileSync(outputFile, JSON.stringify(figmaProductNodes, null, 2));
console.log(`📄 Node IDs saved to: ${outputFile}`);
