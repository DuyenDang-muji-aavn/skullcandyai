# API & Database Reference Index

**Quick Reference Guide for GitHub Copilot Agent**  
**Last Updated**: 2025-10-20

---

## 🔗 Quick Links

| Resource | Location | Purpose |
|----------|----------|---------|
| **Backend API** | [backend-api.md](./backend-api.md) | REST API endpoints, requests, responses |
| **Cloudinary CDN** | [cloudinary-api.md](./cloudinary-api.md) | Image storage, upload, transformations |
| **Figma MCP** | [figma-mcp.md](./figma-mcp.md) | Design data extraction, node IDs |
| **Database Schema** | [database-schema.md](./database-schema.md) | Table structure, fields, validation |

---

## 🎯 Common Tasks

### Sync Products from Source

**Scripts**: `scripts/download-assets.js` → `upload-to-cdn.sh` → `update-entities.js`

**API Endpoints**:
- Extract: Figma MCP `get_design_context(nodeId: "121:6103")`
- Update: `PATCH https://devday-aavn-d5284e914439.herokuapp.com/api/products/batch`

**Reference**: 
- [Figma MCP - Usage Examples](./figma-mcp.md#usage-examples)
- [Backend API - Batch Update](./backend-api.md#batch-update-products)

---

### Upload Product Images

**Workflow**:
1. Download from Figma MCP: `localhost:3845/assets/{hash}.png`
2. Upload to Cloudinary: `api.cloudinary.com/v1_1/dtes5pcfm/image/upload`
3. Update database: `PATCH /products/batch`

**Reference**:
- [Cloudinary API - Upload](./cloudinary-api.md#upload-api)
- [Scripts Guide](../scripts/README.md)

---

### Get Product Data

**Fetch All**:
```bash
curl https://devday-aavn-d5284e914439.herokuapp.com/api/products
```

**Fetch One**:
```bash
curl https://devday-aavn-d5284e914439.herokuapp.com/api/products/100
```

**Reference**: [Backend API - Get All Products](./backend-api.md#get-all-products)

---

## 📊 Key Information

### Product Database

- **Total Products**: 23
- **ID Range**: 100-111, 113-123 (ID 112 missing)
- **Backend**: https://devday-aavn-d5284e914439.herokuapp.com/api
- **Reference**: [Database Schema - Product IDs](./database-schema.md#product-ids)

---

### Image Storage

- **CDN**: Cloudinary (dtes5pcfm)
- **Folder**: skullcandy-products
- **URL Pattern**: `https://res.cloudinary.com/dtes5pcfm/image/upload/v{version}/skullcandy-products/product-{id}.png`
- **Reference**: [Cloudinary API - Image URLs](./cloudinary-api.md#image-urls)

---

### Figma Integration

- **MCP Server**: localhost:3845
- **Design File**: [SkullCandy](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy)
- **Product List Node**: 121:6103
- **Reference**: [Figma MCP - Node ID Reference](./figma-mcp.md#node-id-reference)

---

## 🔍 Field Reference

### Product Fields (Database)

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `id` | integer | Yes | 100 |
| `name` | string | Yes | "Cryptic Hacker" |
| `image` | string (URL) | Yes | "https://res.cloudinary.com/..." |
| `price` | decimal | Yes | 3.75 |
| `tags` | array | No | ["tech", "cyber"] |
| `rating` | decimal | No | 4.5 |
| `stockQuantity` | integer | No | 145 |
| `stockStatus` | enum | No | "IN_STOCK" |

**Full Reference**: [Database Schema - Field Specifications](./database-schema.md#field-specifications)

---

## 🛠️ API Endpoints

### Backend API

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get single product |
| PATCH | `/products/batch` | Update multiple products |

**Base URL**: `https://devday-aavn-d5284e914439.herokuapp.com/api`

**Full Reference**: [Backend API - Products API](./backend-api.md#products-api)

---

### Cloudinary API

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/v1_1/dtes5pcfm/image/upload` | Upload image |

**Authentication**: SHA1 signature required

**Full Reference**: [Cloudinary API - Upload API](./cloudinary-api.md#upload-api)

---

### Figma MCP Methods

| Method | Purpose |
|--------|---------|
| `get_design_context` | Extract component code |
| `get_variable_defs` | Get design tokens |
| `get_screenshot` | Generate screenshot |
| `get_metadata` | Get node structure |

**Server**: `localhost:3845`

**Full Reference**: [Figma MCP - Available Methods](./figma-mcp.md#available-methods)

---

## 📝 Example Payloads

### Update Product (Backend API)

```json
{
  "updates": [
    {
      "id": 100,
      "data": {
        "name": "Cryptic Hacker",
        "price": 3.75,
        "image": "https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png"
      }
    }
  ]
}
```

**Reference**: [Backend API - Batch Update](./backend-api.md#batch-update-products)

---

### Upload Image (Cloudinary)

```bash
curl -X POST "https://api.cloudinary.com/v1_1/dtes5pcfm/image/upload" \
  -F "file=@product-100.png" \
  -F "api_key=279415635918263" \
  -F "timestamp=1760931715" \
  -F "signature={sha1_hash}" \
  -F "folder=skullcandy-products"
```

**Reference**: [Cloudinary API - Upload with SHA1](./cloudinary-api.md#upload-with-sha1-signature-recommended)

---

## 🗺️ Product Mapping

### Figma → Database IDs

| Figma Product | Node ID | DB ID | Name |
|---------------|---------|-------|------|
| Product 01 | 121:6104 | 100 | Cryptic Hacker |
| Product 02 | 121:6106 | 101 | Frosty Snow Queen |
| Product 03 | 121:6107 | 102 | Spooky Halloween Ghost |
| ... | ... | ... | ... |
| Product 22 | 610:1904 | 122 | Wandering Butterfly |
| Product 23 | 632:2009 | 123 | Forever Young Peter Pan |

**Full Mapping**: [Figma MCP - Node ID Reference](./figma-mcp.md#node-id-reference)

---

## 🚨 Important Notes

### API Limitations

- ❌ **Creator field**: Accepted but not persisted by backend
- ✅ **Supported fields**: name, price, image, tags, rating, background, backgroundImg, stockQuantity

**Reference**: [Backend API - Supported Fields](./backend-api.md#supported-fields-in-data-object)

---

### Figma MCP Best Practices

- ✅ Always use specific node IDs (not current selection)
- ✅ Validate downloaded images (size >100 bytes)
- ✅ Convert blur values (Figma ÷ 2 = CSS)

**Reference**: [Figma MCP - Best Practices](./figma-mcp.md#best-practices)

---

### Cloudinary Best Practices

- ✅ Use HTTPS URLs (not HTTP)
- ✅ Include version numbers for cache busting
- ✅ Use `q_auto,f_auto` for optimization

**Reference**: [Cloudinary API - Best Practices](./cloudinary-api.md#best-practices)

---

## 📚 Related Documentation

- [Backend API Documentation](./backend-api.md)
- [Cloudinary API Documentation](./cloudinary-api.md)
- [Figma MCP Documentation](./figma-mcp.md)
- [Database Schema Documentation](./database-schema.md)
- [Scripts Documentation](../scripts/README.md)
- [Implementation Timeline](../.private/IMPLEMENTATION_TIMELINE.md)
- [Agent Memory](../.github/.agent-memory.md)

---

**Last Updated**: October 20, 2025  
**Maintained By**: GitHub Copilot Agent
