# Backend API Documentation

**Base URL**: `https://devday-aavn-d5284e914439.herokuapp.com/api`  
**Last Updated**: 2025-10-20  
**Status**: ✅ Production

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Products API](#products-api)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)
6. [Rate Limits](#rate-limits)

---

## Overview

RESTful API for managing SkullCandy NFT products. Supports CRUD operations with batch update capabilities.

**Features**:
- Product listing and filtering
- Individual product retrieval
- Batch updates
- Stock management
- Availability tracking

---

## Authentication

**Current Status**: No authentication required  
**Future**: May require API keys for write operations

---

## Products API

### Get All Products

**Endpoint**: `GET /products`

**Description**: Retrieve all products in the database

**Request**:
```bash
curl https://devday-aavn-d5284e914439.herokuapp.com/api/products
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 100,
        "name": "Cryptic Hacker",
        "image": "https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png",
        "price": 3.75,
        "tags": ["tech", "cyber", "hacker", "digital"],
        "rating": 4.5,
        "background": "#49B649",
        "backgroundImg": "https://res.cloudinary.com/...",
        "stockQuantity": 145,
        "stockStatus": "IN_STOCK",
        "isAvailable": true,
        "isLowStock": false,
        "isOutOfStock": false
      }
      // ... more products
    ],
    "total": 23
  }
}
```

---

### Get Product by ID

**Endpoint**: `GET /products/:id`

**Description**: Retrieve a single product by ID

**Parameters**:
- `id` (path, integer, required) - Product ID

**Request**:
```bash
curl https://devday-aavn-d5284e914439.herokuapp.com/api/products/100
```

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 100,
    "name": "Cryptic Hacker",
    "image": "https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png",
    "price": 3.75,
    "tags": ["tech", "cyber", "hacker", "digital"],
    "rating": 4.5,
    "background": "#49B649",
    "backgroundImg": "https://res.cloudinary.com/...",
    "stockQuantity": 145,
    "stockStatus": "IN_STOCK",
    "isAvailable": true,
    "isLowStock": false,
    "isOutOfStock": false
  }
}
```

---

### Batch Update Products

**Endpoint**: `PATCH /products/batch`

**Description**: Update multiple products in a single request

**Content-Type**: `application/json`

**Request Body**:
```json
{
  "updates": [
    {
      "id": 100,
      "data": {
        "name": "Cryptic Hacker",
        "price": 3.75,
        "image": "https://res.cloudinary.com/..."
      }
    },
    {
      "id": 101,
      "data": {
        "name": "Frosty Snow Queen",
        "price": 4.20
      }
    }
  ]
}
```

**Supported Fields in `data` Object**:
- `name` (string) - Product name
- `price` (number) - Price in ETH
- `image` (string) - Cloudinary URL
- `tags` (array) - Product tags
- `rating` (number) - Product rating (0-5)
- `background` (string) - Background color hex
- `backgroundImg` (string) - Background image URL
- `stockQuantity` (integer) - Stock quantity

**Fields NOT Supported**:
- ❌ `creator` - Accepted but not stored/returned
- ❌ `description` - Not implemented in backend

**Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "products": [
      { "id": 100, "name": "Cryptic Hacker", ... },
      { "id": 101, "name": "Frosty Snow Queen", ... }
    ],
    "total": 2
  },
  "message": "Products updated successfully"
}
```

**Example Script**:
```javascript
const https = require('https');

const updates = [
  { id: 100, data: { name: "New Name", price: 5.00 } }
];

const data = JSON.stringify({ updates });

const options = {
  hostname: 'devday-aavn-d5284e914439.herokuapp.com',
  path: '/api/products/batch',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  res.on('data', (chunk) => responseData += chunk);
  res.on('end', () => console.log(JSON.parse(responseData)));
});

req.write(data);
req.end();
```

---

## Response Format

### Success Response Structure

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Optional success message"
}
```

### Error Response Structure

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

---

## Error Handling

| Status Code | Meaning | Common Causes |
|-------------|---------|---------------|
| 200 | Success | Request completed successfully |
| 400 | Bad Request | Invalid JSON, missing required fields |
| 404 | Not Found | Product ID doesn't exist |
| 500 | Server Error | Database error, internal server issue |

---

## Rate Limits

**Current**: No rate limits enforced  
**Recommendation**: Implement exponential backoff for batch operations

---

## Product Schema

### Product Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | integer | Yes | Unique product ID (100-111, 113-123) |
| `name` | string | Yes | Product name |
| `image` | string | Yes | Cloudinary image URL |
| `price` | number | Yes | Price in ETH |
| `tags` | array | No | Product tags/categories |
| `rating` | number | No | Rating (0-5) |
| `background` | string | No | Background color (hex) |
| `backgroundImg` | string | No | Background image URL |
| `stockQuantity` | integer | No | Available stock |
| `stockStatus` | string | No | `IN_STOCK`, `LOW_STOCK`, `OUT_OF_STOCK` |
| `isAvailable` | boolean | No | Product availability |
| `isLowStock` | boolean | No | Low stock flag |
| `isOutOfStock` | boolean | No | Out of stock flag |

### Stock Status Rules

- **IN_STOCK**: `stockQuantity > 20`
- **LOW_STOCK**: `0 < stockQuantity <= 20`
- **OUT_OF_STOCK**: `stockQuantity === 0`

---

## Database Info

**Product IDs**: 100-111, 113-123 (23 total products)  
**Missing ID**: 112 (gap in sequence)

**Current Products**:
- 100: Cryptic Hacker
- 101: Frosty Snow Queen
- 102: Spooky Halloween Ghost
- 103: Lunar Moon Queen
- 104: Jolly Christmas Elf
- 105: Galactic Astronaut
- 106: Rustic Farmer
- 107: Athletic Tennis Girl
- 108: Grapevine Wine Monster
- 109: Regal Rose Lord
- 110: Skateboard Boy
- 111: Oceanic Sea Princess
- 113: Mountain Angel Goat
- 114: Joyful Ice Cream Lover
- 115: Elegant White Swan
- 116: Daring Pilot Captain
- 117: Quick Brown Squirrel
- 118: Cheerful Firefly Kid
- 119: Adventure Camping Boy
- 120: Charming Valentine Cupid
- 121: Dreamy Purple Baby
- 122: Wandering Butterfly
- 123: Forever Young Peter Pan

---

## Usage Examples

### Fetch All Products

```bash
curl https://devday-aavn-d5284e914439.herokuapp.com/api/products
```

### Fetch Single Product

```bash
curl https://devday-aavn-d5284e914439.herokuapp.com/api/products/100
```

### Update Single Product

```bash
curl -X PATCH https://devday-aavn-d5284e914439.herokuapp.com/api/products/batch \
  -H "Content-Type: application/json" \
  -d '{
    "updates": [
      {
        "id": 100,
        "data": {
          "name": "Updated Name",
          "price": 5.00
        }
      }
    ]
  }'
```

### Update Multiple Products

```bash
curl -X PATCH https://devday-aavn-d5284e914439.herokuapp.com/api/products/batch \
  -H "Content-Type: application/json" \
  -d '{
    "updates": [
      {"id": 100, "data": {"price": 3.75}},
      {"id": 101, "data": {"price": 4.20}},
      {"id": 102, "data": {"price": 1.85}}
    ]
  }'
```

---

## Maintenance Scripts

See `scripts/` directory for maintenance utilities:

- `download-assets.js` - Download assets from source
- `update-entities.js` - Batch update entity data
- `sync-entity-data.js` - Sync data from source
- `upload-to-cdn.sh` - Upload assets to CDN

---

## Related Documentation

- [Cloudinary API](./cloudinary-api.md) - Image storage and CDN
- [Figma MCP](./figma-mcp.md) - Design data extraction
- [Database Schema](./database-schema.md) - Complete database reference
