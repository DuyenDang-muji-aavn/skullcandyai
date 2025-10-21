# Database Schema Documentation

**Database**: SkullCandy Product Database  
**Backend**: Heroku (devday-aavn-d5284e914439)  
**Last Updated**: 2025-10-20

---

## Table of Contents

1. [Overview](#overview)
2. [Products Table](#products-table)
3. [Product IDs](#product-ids)
4. [Field Specifications](#field-specifications)
5. [Stock Management](#stock-management)
6. [Data Validation](#data-validation)
7. [Example Queries](#example-queries)

---

## Overview

The database stores NFT product information for the SkullCandy marketplace. Each product represents a unique digital collectible with associated metadata, pricing, and stock information.

**Total Products**: 23  
**ID Range**: 100-111, 113-123 (ID 112 missing)  
**Primary Key**: `id` (integer)

---

## Products Table

### Schema

| Field | Type | Nullable | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | integer | No | - | Unique product identifier |
| `name` | string | No | - | Product display name |
| `image` | string | No | - | Cloudinary image URL |
| `price` | decimal | No | - | Price in ETH |
| `tags` | array | Yes | `[]` | Product categories/tags |
| `rating` | decimal | Yes | `0` | Rating (0-5 scale) |
| `background` | string | Yes | `null` | Background color (hex) |
| `backgroundImg` | string | Yes | `null` | Background image URL |
| `stockQuantity` | integer | Yes | `0` | Available stock count |
| `stockStatus` | enum | Yes | `OUT_OF_STOCK` | Stock status indicator |
| `isAvailable` | boolean | Yes | `false` | Product availability flag |
| `isLowStock` | boolean | Yes | `false` | Low stock warning flag |
| `isOutOfStock` | boolean | Yes | `true` | Out of stock flag |

### Indexes

- **Primary Key**: `id`
- **Recommended Indexes**: `name`, `stockStatus`, `isAvailable`

---

## Product IDs

### Complete Product List

| ID | Name | Price (ETH) | Stock Status |
|----|------|-------------|--------------|
| 100 | Cryptic Hacker | 3.75 | IN_STOCK (145) |
| 101 | Frosty Snow Queen | 4.20 | IN_STOCK (132) |
| 102 | Spooky Halloween Ghost | 1.85 | IN_STOCK (178) |
| 103 | Lunar Moon Queen | 2.90 | IN_STOCK (98) |
| 104 | Jolly Christmas Elf | 2.20 | IN_STOCK (165) |
| 105 | Galactic Astronaut | 3.00 | IN_STOCK (87) |
| 106 | Rustic Farmer | 1.50 | IN_STOCK (200) |
| 107 | Athletic Tennis Girl | 2.75 | IN_STOCK (154) |
| 108 | Grapevine Wine Monster | 2.00 | IN_STOCK (119) |
| 109 | Regal Rose Lord | 3.50 | IN_STOCK (76) |
| 110 | Skateboard Boy | 1.95 | IN_STOCK (188) |
| 111 | Oceanic Sea Princess | 3.35 | IN_STOCK (142) |
| **112** | **MISSING** | - | - |
| 113 | Mountain Angel Goat | 4.00 | IN_STOCK (167) |
| 114 | Joyful Ice Cream Lover | 2.99 | IN_STOCK (91) |
| 115 | Elegant White Swan | 3.50 | IN_STOCK (112) |
| 116 | Daring Pilot Captain | 4.00 | IN_STOCK (164) |
| 117 | Quick Brown Squirrel | 2.50 | LOW_STOCK (17) |
| 118 | Cheerful Firefly Kid | 2.20 | IN_STOCK (167) |
| 119 | Adventure Camping Boy | 2.85 | OUT_OF_STOCK (0) |
| 120 | Charming Valentine Cupid | 3.60 | IN_STOCK (168) |
| 121 | Dreamy Purple Baby | 3.75 | IN_STOCK (167) |
| 122 | Wandering Butterfly | 1.75 | IN_STOCK (172) |
| 123 | Forever Young Peter Pan | 3.60 | IN_STOCK (172) |

**Note**: Product ID 112 does not exist in the database (gap in sequence)

---

## Field Specifications

### id (Primary Key)

**Type**: Integer  
**Range**: 100-123 (excluding 112)  
**Constraints**: 
- Unique
- Not null
- Auto-assigned (manual assignment in practice)

**Usage**:
```sql
SELECT * FROM products WHERE id = 100;
```

---

### name

**Type**: String (VARCHAR)  
**Max Length**: 255 characters  
**Constraints**: 
- Not null
- Unique recommended
- Synced from Figma design

**Naming Convention**: 
- Title Case
- Descriptive (3-5 words)
- No special characters

**Examples**:
- "Cryptic Hacker"
- "Frosty Snow Queen"
- "Spooky Halloween Ghost"

---

### image

**Type**: String (VARCHAR/TEXT)  
**Format**: HTTPS URL  
**Source**: Cloudinary CDN  
**Constraints**: 
- Not null
- Must be valid URL
- Must start with `https://`

**URL Structure**:
```
https://res.cloudinary.com/dtes5pcfm/image/upload/v{version}/skullcandy-products/product-{id}.png
```

**Example**:
```
https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png
```

---

### price

**Type**: Decimal  
**Precision**: 2 decimal places  
**Unit**: ETH (Ethereum)  
**Range**: 1.50 - 4.20 ETH  
**Constraints**: 
- Not null
- Must be positive
- Synced from Figma design

**Price Distribution**:
- Low (< 2.00 ETH): 6 products
- Medium (2.00 - 3.50 ETH): 11 products
- High (> 3.50 ETH): 6 products

---

### tags

**Type**: Array of Strings  
**Example**: `["tech", "cyber", "hacker", "digital"]`  
**Constraints**: 
- Nullable
- Default: `[]`
- Lowercase recommended

**Common Tags**:
- Seasonal: `"xmas"`, `"halloween"`, `"valentine"`
- Categories: `"sporty"`, `"tech"`, `"nature"`, `"fantasy"`
- Special: `"Season Choice"`

---

### rating

**Type**: Decimal  
**Scale**: 0.0 - 5.0  
**Precision**: 1 decimal place  
**Constraints**: 
- Nullable
- Default: 0
- Min: 0, Max: 5

**Rating Distribution**:
- 4.0 - 4.5: 15 products
- 4.6 - 4.9: 7 products
- 5.0: 1 product (ID 115, 123)

---

### background

**Type**: String  
**Format**: Hex color code  
**Example**: `"#49B649"`, `"#AF2A3A"`  
**Constraints**: 
- Nullable
- Must start with `#`
- 6-character hex code

**Usage**: Card background color for visual variety

---

### backgroundImg

**Type**: String (VARCHAR/TEXT)  
**Format**: URL  
**Source**: Cloudinary  
**Constraints**: 
- Nullable
- Can be different from main `image` field

**Purpose**: Alternative background image for product cards

---

### stockQuantity

**Type**: Integer  
**Range**: 0 - 200  
**Constraints**: 
- Nullable
- Default: 0
- Must be non-negative

**Stock Levels**:
- Low Stock: 1-20 (triggers warning)
- In Stock: 21+ (normal)
- Out of Stock: 0 (unavailable)

---

### stockStatus

**Type**: Enum  
**Allowed Values**: 
- `"IN_STOCK"` - Available for purchase
- `"LOW_STOCK"` - Limited availability
- `"OUT_OF_STOCK"` - Not available

**Auto-calculated based on `stockQuantity`**:
```
stockQuantity > 20  → IN_STOCK
0 < stockQuantity <= 20 → LOW_STOCK
stockQuantity === 0 → OUT_OF_STOCK
```

---

### isAvailable

**Type**: Boolean  
**Default**: `false`  
**Constraints**: Nullable

**Logic**:
```
isAvailable = (stockQuantity > 0)
```

---

### isLowStock

**Type**: Boolean  
**Default**: `false`  
**Constraints**: Nullable

**Logic**:
```
isLowStock = (stockQuantity > 0 && stockQuantity <= 20)
```

---

### isOutOfStock

**Type**: Boolean  
**Default**: `true`  
**Constraints**: Nullable

**Logic**:
```
isOutOfStock = (stockQuantity === 0)
```

---

## Stock Management

### Stock Status Rules

```javascript
function calculateStockStatus(quantity) {
  if (quantity === 0) {
    return {
      stockStatus: 'OUT_OF_STOCK',
      isAvailable: false,
      isLowStock: false,
      isOutOfStock: true
    };
  } else if (quantity <= 20) {
    return {
      stockStatus: 'LOW_STOCK',
      isAvailable: true,
      isLowStock: true,
      isOutOfStock: false
    };
  } else {
    return {
      stockStatus: 'IN_STOCK',
      isAvailable: true,
      isLowStock: false,
      isOutOfStock: false
    };
  }
}
```

### Current Stock Summary

**Total Products**: 23

| Status | Count | Product IDs |
|--------|-------|-------------|
| **IN_STOCK** | 21 | 100-116, 118, 120-123 |
| **LOW_STOCK** | 1 | 117 (17 units) |
| **OUT_OF_STOCK** | 1 | 119 (0 units) |

---

## Data Validation

### Required Fields Validation

```javascript
function validateProduct(product) {
  const errors = [];
  
  if (!product.id) errors.push('id is required');
  if (!product.name) errors.push('name is required');
  if (!product.image) errors.push('image is required');
  if (!product.price || product.price <= 0) errors.push('price must be positive');
  
  if (product.image && !product.image.startsWith('https://')) {
    errors.push('image must be HTTPS URL');
  }
  
  if (product.rating && (product.rating < 0 || product.rating > 5)) {
    errors.push('rating must be between 0 and 5');
  }
  
  if (product.stockQuantity && product.stockQuantity < 0) {
    errors.push('stockQuantity must be non-negative');
  }
  
  return errors;
}
```

---

## Example Queries

### Get All Products

```javascript
const response = await fetch('https://devday-aavn-d5284e914439.herokuapp.com/api/products');
const data = await response.json();
// Returns: { success: true, data: { products: [...], total: 23 } }
```

### Get Product by ID

```javascript
const response = await fetch('https://devday-aavn-d5284e914439.herokuapp.com/api/products/100');
const data = await response.json();
// Returns: { success: true, data: { id: 100, name: "Cryptic Hacker", ... } }
```

### Update Multiple Products

```javascript
const updates = [
  { id: 100, data: { price: 4.00 } },
  { id: 101, data: { stockQuantity: 150 } }
];

const response = await fetch('https://devday-aavn-d5284e914439.herokuapp.com/api/products/batch', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ updates })
});
```

### Filter by Stock Status

```javascript
const response = await fetch('https://devday-aavn-d5284e914439.herokuapp.com/api/products');
const { data } = await response.json();
const lowStockProducts = data.products.filter(p => p.isLowStock);
```

### Calculate Total Inventory Value

```javascript
const response = await fetch('https://devday-aavn-d5284e914439.herokuapp.com/api/products');
const { data } = await response.json();
const totalValue = data.products.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0);
console.log(`Total Inventory: ${totalValue.toFixed(2)} ETH`);
```

---

## Migration History

### Version 1.0 (Oct 2025)

**Initial Schema**:
- Basic product fields (id, name, price)
- Image URLs
- Tags support

### Version 1.1 (Oct 2025)

**Added**:
- Stock management fields
- Status indicators
- Background customization

**Current Version**: 1.1

---

## Related Documentation

- [Backend API](./backend-api.md) - API endpoints and usage
- [Cloudinary API](./cloudinary-api.md) - Image storage
- [Figma MCP](./figma-mcp.md) - Design data source

---

**Last Updated**: October 20, 2025  
**Maintained By**: GitHub Copilot Agent
