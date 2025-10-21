# Figma MCP API Documentation

**MCP Server**: `localhost:3845`  
**Design File**: [SkullCandy](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=0-1)  
**Last Updated**: 2025-10-20

---

## Table of Contents

1. [Overview](#overview)
2. [Available Methods](#available-methods)
3. [Node ID Reference](#node-id-reference)
4. [Asset Extraction](#asset-extraction)
5. [Usage Examples](#usage-examples)
6. [Best Practices](#best-practices)

---

## Overview

Figma MCP (Model Context Protocol) server provides direct access to Figma design data, including:
- Component code generation (React/Tailwind)
- Design tokens (colors, typography, spacing)
- Asset URLs (images, icons)
- Node metadata (structure, properties)
- Screenshots for visual reference

**Why MCP?**
- No manual exports needed
- Always synced with Figma
- Programmatic access to design data
- Supports batch operations

---

## Available Methods

### 1. get_design_context

**Purpose**: Extract complete component code and design specs

**Parameters**:
- `nodeId` (optional) - Figma node ID (e.g., "121:6103")
- `forceCode` (optional) - Always return code even if large
- `clientFrameworks` (optional) - Framework hint (e.g., "react,next.js")
- `clientLanguages` (optional) - Language hint (e.g., "typescript")

**Returns**:
- React component code with Tailwind CSS
- Image asset URLs (localhost:3845/assets/*)
- Complete component structure

**Example**:
```typescript
mcp_figma-mcp-ser_get_design_context({
  nodeId: "121:6103",
  forceCode: true,
  clientFrameworks: "react,next.js",
  clientLanguages: "typescript"
})
```

**Output**:
```javascript
const img = "http://localhost:3845/assets/c987db946c7e77771722c6c59b09744d3fff06cb.png";
const img2 = "http://localhost:3845/assets/ee52308bbb2c32d8a9942d54af7717bb7e18d9c6.png";

export default function ProductList() {
  return (
    <div className="flex flex-col gap-[80px]">
      <div data-name="Product 01" data-node-id="121:6104">
        <img src={img} alt="Cryptic Hacker" />
        <p className="text-[24px] font-bold">Cryptic Hacker</p>
        <p className="text-[16px]">By CodeMaster</p>
        <p className="text-[20px]">3.75 ETH</p>
      </div>
      {/* ... more products */}
    </div>
  );
}
```

---

### 2. get_variable_defs

**Purpose**: Extract design tokens (colors, fonts, spacing, blur)

**Parameters**:
- `nodeId` (optional) - Specific node to get variables from

**Returns**:
- Color variables with hex values
- Typography variables (font families)
- Spacing/sizing variables
- Effect variables (blur amounts)

**Example**:
```typescript
mcp_figma-mcp-ser_get_variable_defs({
  nodeId: "121:6103"
})
```

**Output**:
```json
{
  "font-family/title": "Orbitron",
  "font-family/body": "Outfit",
  "color/glass-light": "#ffffff1a",
  "color/glass-dark": "#0000001a",
  "blur/glass-amount": 200,
  "button/gradient": "linear-gradient(273deg, rgba(1,166,255,0.70) 2.08%, ...)"
}
```

---

### 3. get_screenshot

**Purpose**: Generate PNG screenshot of a Figma node

**Parameters**:
- `nodeId` (optional) - Node to capture (defaults to selection)

**Returns**:
- PNG image URL (localhost:3845/screenshots/*)

**Example**:
```typescript
mcp_figma-mcp-ser_get_screenshot({
  nodeId: "121:6103"
})
```

---

### 4. get_metadata

**Purpose**: Get node structure without full code (lightweight)

**Parameters**:
- `nodeId` (optional) - Root node to analyze

**Returns**:
- XML-like node hierarchy
- Node IDs, types, names, positions, sizes

**Example**:
```typescript
mcp_figma-mcp-ser_get_metadata({
  nodeId: "121:6103"
})
```

**Output**:
```xml
<Frame id="121:6103" name="Product List" width="1200" height="2400">
  <Frame id="121:6104" name="Product 01" x="0" y="0" width="400" height="500">
    <Image id="121:6105" name="Avatar" width="300" height="300" />
    <Text id="121:6106" name="Name" width="300" height="30" />
  </Frame>
  <!-- ... more products -->
</Frame>
```

---

### 5. get_code_connect_map

**Purpose**: Get Code Connect mappings (if configured)

**Parameters**:
- `nodeId` (optional)

**Returns**:
- Mapping of node IDs to code components
- Component names and file paths

---

## Node ID Reference

### Main Containers

| Node Name | Node ID | Description |
|-----------|---------|-------------|
| **Landing Page** | 0:1 | Root page |
| **Hero Section** | 121:5913 | Hero container |
| **Product List** | 121:6103 | All 24 products |
| **Featured Section** | - | Featured products grid |
| **Navbar** | - | Navigation bar |

### Individual Products

| Product | Node ID | DB ID | Name |
|---------|---------|-------|------|
| Product 01 | 121:6104 | 100 | Cryptic Hacker |
| Product 02 | 121:6106 | 101 | Frosty Snow Queen |
| Product 03 | 121:6107 | 102 | Spooky Halloween Ghost |
| Product 04 | 196:1830 | 103 | Lunar Moon Queen |
| Product 05 | 121:6108 | 104 | Jolly Christmas Elf |
| Product 06 | 121:6109 | 105 | Galactic Astronaut |
| Product 07 | 121:6105 | 106 | Rustic Farmer |
| Product 08 | 121:6110 | 107 | Athletic Tennis Girl |
| Product 09 | 121:6111 | 108 | Grapevine Wine Monster |
| Product 10 | 121:6112 | 109 | Regal Rose Lord |
| Product 11 | 121:6113 | 110 | Skateboard Boy |
| Product 12 | 121:6114 | 111 | Oceanic Sea Princess |
| Product 13 | 610:1959 | 113 | Mountain Angel Goat |
| Product 14 | 196:1831 | 114 | Joyful Ice Cream Lover |
| Product 15 | 610:1902 | 115 | Elegant White Swan |
| Product 16 | 121:6115 | 116 | Daring Pilot Captain |
| Product 17 | 610:1960 | 117 | Quick Brown Squirrel |
| Product 18 | 610:1903 | 118 | Cheerful Firefly Kid |
| Product 19 | 632:2008 | 119 | Adventure Camping Boy |
| Product 20 | 196:1832 | 120 | Charming Valentine Cupid |
| Product 21 | 610:1961 | 121 | Dreamy Purple Baby |
| Product 22 | 610:1904 | 122 | Wandering Butterfly |
| Product 23 | 632:2009 | 123 | Forever Young Peter Pan |

---

## Asset Extraction

### Image Assets

**Asset Server**: `http://localhost:3845/assets/{hash}.{ext}`

**Process**:
1. Call `get_design_context` to get asset URLs
2. Download from localhost:3845 using Node.js http module
3. Validate file size (>100 bytes = valid)
4. Save to local filesystem

**Example Asset URL**:
```
http://localhost:3845/assets/c987db946c7e77771722c6c59b09744d3fff06cb.png
```

**Download Script** (Node.js):
```javascript
const http = require('http');
const fs = require('fs');

function downloadAsset(assetUrl, outputPath) {
  return new Promise((resolve, reject) => {
    http.get(assetUrl, (response) => {
      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        const stats = fs.statSync(outputPath);
        
        if (stats.size < 100) {
          fs.unlinkSync(outputPath);
          reject(new Error('File too small - likely error'));
        } else {
          resolve({ size: stats.size });
        }
      });
    }).on('error', reject);
  });
}

// Usage
downloadAsset(
  'http://localhost:3845/assets/c987db946c7e77771722c6c59b09744d3fff06cb.png',
  'product-100.png'
);
```

---

## Usage Examples

### Sync Product Names and Prices

```javascript
// 1. Extract Figma data
const figmaData = await get_design_context({ nodeId: "121:6103" });

// 2. Parse product info from React code
const products = parseProducts(figmaData); // Custom parser

// 3. Update database
const updates = products.map(p => ({
  id: p.dbId,
  data: { name: p.name, price: p.price }
}));

await fetch('https://devday-aavn-d5284e914439.herokuapp.com/api/products/batch', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ updates })
});
```

### Download All Product Images

```javascript
// 1. Get Figma data with asset URLs
const figmaData = await get_design_context({ 
  nodeId: "121:6103",
  forceCode: true 
});

// 2. Extract asset URLs
const assets = extractAssetUrls(figmaData); // Returns array of {id, url}

// 3. Download each asset
for (const asset of assets) {
  await downloadAsset(asset.url, `product-${asset.id}.png`);
}
```

### Extract Design Tokens

```javascript
// 1. Get variable definitions
const tokens = await get_variable_defs({ nodeId: "121:6103" });

// 2. Generate CSS custom properties
const css = Object.entries(tokens).map(([name, value]) => {
  const cssVar = name.replace(/\//g, '-');
  return `--${cssVar}: ${value};`;
}).join('\n');

// 3. Write to tokens.css
fs.writeFileSync('src/styles/tokens.css', `:root {\n${css}\n}`);
```

---

## Best Practices

### 1. Always Use Node IDs

✅ **Specific node**:
```javascript
get_design_context({ nodeId: "121:6103" })
```

❌ **Current selection** (less predictable):
```javascript
get_design_context() // Uses selected node in Figma
```

### 2. Validate Asset Downloads

✅ **Check file size**:
```javascript
const stats = fs.statSync(filePath);
if (stats.size < 100) {
  throw new Error('Download failed - file too small');
}
```

### 3. Use forceCode for Large Components

✅ **For complete data**:
```javascript
get_design_context({ nodeId: "121:6103", forceCode: true })
```

### 4. Extract Metadata First for Large Nodes

✅ **Get structure, then details**:
```javascript
// Step 1: Get node structure
const metadata = await get_metadata({ nodeId: "121:6103" });

// Step 2: Get code for specific sub-nodes
for (const nodeId of childNodeIds) {
  const code = await get_design_context({ nodeId });
}
```

### 5. Convert Figma Values

**Blur** (divide by 2):
```javascript
const figmaBlur = 200; // Figma value
const cssBlur = figmaBlur / 2; // 100px for CSS
```

**Colors** (use tokens):
```javascript
// ❌ Hardcode
className="bg-[#ffffff1a]"

// ✅ Use token
className="bg-glass-light"
```

---

## Common Issues

### Asset URL Returns 19 Bytes

**Cause**: MCP server error or asset not available

**Solution**: 
1. Use `get_design_context` to get fresh URLs
2. Ensure Figma desktop app is running
3. Check MCP server logs

### Response Too Large

**Cause**: Node has too many children

**Solution**:
1. Use `get_metadata` to see structure
2. Call `get_design_context` on smaller sub-nodes
3. Use `forceCode: true` if you need complete code

### Node ID Not Found

**Cause**: Invalid node ID or node deleted in Figma

**Solution**:
1. Verify node ID in Figma URL: `?node-id=121-6103`
2. Convert hyphen to colon: `121-6103` → `121:6103`
3. Check if node exists in Figma

---

## Figma URL to Node ID Conversion

**Figma URL Format**:
```
https://www.figma.com/design/{fileKey}/{fileName}?node-id=121-6103
```

**Extract Node ID**:
```javascript
function urlToNodeId(url) {
  const match = url.match(/node-id=([0-9]+-[0-9]+)/);
  if (!match) return null;
  return match[1].replace('-', ':'); // "121-6103" → "121:6103"
}
```

**Example**:
```javascript
urlToNodeId('https://figma.com/design/abc?node-id=121-6103')
// Returns: "121:6103"
```

---

## Related Documentation

- [Backend API](./backend-api.md) - Product database
- [Cloudinary API](./cloudinary-api.md) - Image hosting
- [Component Patterns](../.github/instructions/component-patterns.instructions.md)
- [Figma MCP Instructions](../.github/instructions/figma-mcp.instructions.md)
