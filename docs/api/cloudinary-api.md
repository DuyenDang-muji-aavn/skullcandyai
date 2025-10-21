# Cloudinary API Documentation

**Cloud Name**: `dtes5pcfm`  
**API Key**: `279415635918263`  
**Folder**: `skullcandy-products`  
**Last Updated**: 2025-10-20

---

## Table of Contents

1. [Overview](#overview)
2. [Configuration](#configuration)
3. [Upload API](#upload-api)
4. [Image URLs](#image-urls)
5. [Transformations](#transformations)
6. [Best Practices](#best-practices)

---

## Overview

Cloudinary provides CDN-hosted image storage for all SkullCandy product images. Images are optimized, cached globally, and accessible via secure HTTPS URLs.

**Features**:
- Automatic image optimization
- Global CDN distribution
- On-the-fly transformations
- Version control with timestamps
- Secure HTTPS delivery

---

## Configuration

### Environment Variables

```bash
CLOUDINARY_CLOUD_NAME=dtes5pcfm
CLOUDINARY_API_KEY=279415635918263
CLOUDINARY_API_SECRET=<secret>  # Not stored in docs for security
```

### Upload Endpoint

```
POST https://api.cloudinary.com/v1_1/dtes5pcfm/image/upload
```

---

## Upload API

### Upload with SHA1 Signature (Recommended)

**Method**: `POST`  
**Content-Type**: `multipart/form-data`

**Required Parameters**:
- `file` - Image file (binary)
- `api_key` - API key (279415635918263)
- `timestamp` - Unix timestamp
- `signature` - SHA1 hash of parameters + API secret
- `folder` - Upload folder (skullcandy-products)

**Signature Generation**:
```bash
# Parameters to sign (alphabetically sorted, excluding file and api_key)
PARAMS="folder=skullcandy-products&timestamp=1760931715"

# Generate SHA1 signature
SIGNATURE=$(echo -n "${PARAMS}${API_SECRET}" | openssl dgst -sha1 | sed 's/^.* //')
```

**cURL Example**:
```bash
#!/bin/bash

IMAGE_FILE="product-100.png"
TIMESTAMP=$(date +%s)
FOLDER="skullcandy-products"
API_KEY="279415635918263"
API_SECRET="<your-secret>"

# Create signature
STRING_TO_SIGN="folder=${FOLDER}&timestamp=${TIMESTAMP}${API_SECRET}"
SIGNATURE=$(echo -n "$STRING_TO_SIGN" | openssl dgst -sha1 | sed 's/^.* //')

# Upload
curl -X POST "https://api.cloudinary.com/v1_1/dtes5pcfm/image/upload" \
  -F "file=@${IMAGE_FILE}" \
  -F "api_key=${API_KEY}" \
  -F "timestamp=${TIMESTAMP}" \
  -F "signature=${SIGNATURE}" \
  -F "folder=${FOLDER}"
```

**Response**: `200 OK`
```json
{
  "public_id": "skullcandy-products/product-100",
  "version": 1760931715,
  "signature": "...",
  "width": 1024,
  "height": 1024,
  "format": "png",
  "resource_type": "image",
  "created_at": "2025-10-20T12:15:15Z",
  "bytes": 1230679,
  "type": "upload",
  "url": "http://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png",
  "secure_url": "https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png"
}
```

---

## Image URLs

### URL Structure

```
https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{filename}
```

**Example**:
```
https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png
```

### URL Components

| Component | Value | Description |
|-----------|-------|-------------|
| **Base** | `https://res.cloudinary.com` | Cloudinary CDN |
| **Cloud Name** | `dtes5pcfm` | Our cloud account |
| **Asset Type** | `image/upload` | Image upload type |
| **Version** | `v1760931715` | Unix timestamp version |
| **Folder** | `skullcandy-products` | Organization folder |
| **Filename** | `product-100.png` | Original filename |

### Version Control

**Version Format**: `v{unix_timestamp}`

**Examples**:
- `v1760931715` - First upload (Oct 20, 2025 12:15:15)
- `v1760934869` - Re-upload (Oct 20, 2025 13:07:49)

**Why Versions?**
- Enables cache busting
- Tracks upload history
- Allows rollback to previous versions

---

## Transformations

Cloudinary supports on-the-fly image transformations via URL parameters.

### Common Transformations

**Resize**:
```
https://res.cloudinary.com/dtes5pcfm/image/upload/w_500,h_500,c_fill/v1760931715/skullcandy-products/product-100.png
```

**Quality Optimization**:
```
https://res.cloudinary.com/dtes5pcfm/image/upload/q_auto,f_auto/v1760931715/skullcandy-products/product-100.png
```

**Multiple Transformations**:
```
https://res.cloudinary.com/dtes5pcfm/image/upload/w_500,h_500,c_fill,q_auto,f_auto/v1760931715/skullcandy-products/product-100.png
```

### Transformation Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `w_` | Width in pixels | `w_500` |
| `h_` | Height in pixels | `h_500` |
| `c_` | Crop mode | `c_fill`, `c_fit`, `c_scale` |
| `q_` | Quality | `q_auto`, `q_80` |
| `f_` | Format | `f_auto`, `f_webp`, `f_jpg` |
| `dpr_` | Device pixel ratio | `dpr_2.0` |

### Next.js Image Optimization

Use Next.js `<Image>` component with Cloudinary loader:

```tsx
import Image from 'next/image';

<Image
  src="https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png"
  alt="Cryptic Hacker"
  width={400}
  height={400}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/png;base64,..."
/>
```

---

## Best Practices

### 1. Use Secure URLs (HTTPS)

✅ **ALWAYS**:
```
https://res.cloudinary.com/dtes5pcfm/image/upload/...
```

❌ **NEVER**:
```
http://res.cloudinary.com/dtes5pcfm/image/upload/...
```

### 2. Include Version Numbers

✅ **With version** (cache-busting):
```
/v1760931715/skullcandy-products/product-100.png
```

❌ **Without version** (cache issues):
```
/skullcandy-products/product-100.png
```

### 3. Optimize Images

Use `q_auto,f_auto` for automatic optimization:
```
https://res.cloudinary.com/dtes5pcfm/image/upload/q_auto,f_auto/v1760931715/skullcandy-products/product-100.png
```

### 4. Responsive Images

Use `w_auto,dpr_auto` for responsive delivery:
```
https://res.cloudinary.com/dtes5pcfm/image/upload/w_auto,dpr_auto,q_auto,f_auto/v1760931715/skullcandy-products/product-100.png
```

### 5. Folder Organization

Keep all product images in one folder:
```
skullcandy-products/
├── product-100.png
├── product-101.png
├── product-102.png
└── ...
```

---

## Current Product Images

### All Product Image URLs

| ID | Product Name | URL |
|----|--------------|-----|
| 100 | Cryptic Hacker | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png` |
| 101 | Frosty Snow Queen | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931718/skullcandy-products/product-101.png` |
| 102 | Spooky Halloween Ghost | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931722/skullcandy-products/product-102.png` |
| 103 | Lunar Moon Queen | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931727/skullcandy-products/product-103.png` |
| 104 | Jolly Christmas Elf | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931733/skullcandy-products/product-104.png` |
| 105 | Galactic Astronaut | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931738/skullcandy-products/product-105.png` |
| 106 | Rustic Farmer | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931742/skullcandy-products/product-106.png` |
| 107 | Athletic Tennis Girl | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931746/skullcandy-products/product-107.png` |
| 108 | Grapevine Wine Monster | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931757/skullcandy-products/product-108.png` |
| 109 | Regal Rose Lord | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931761/skullcandy-products/product-109.png` |
| 110 | Skateboard Boy | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931766/skullcandy-products/product-110.png` |
| 111 | Oceanic Sea Princess | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931770/skullcandy-products/product-111.png` |
| 113 | Mountain Angel Goat | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760934811/skullcandy-products/product-113.png` |
| 114 | Joyful Ice Cream Lover | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760934816/skullcandy-products/product-114.png` |
| 115 | Elegant White Swan | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760934819/skullcandy-products/product-115.png` |
| 116 | Daring Pilot Captain | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760934829/skullcandy-products/product-116.png` |
| 117 | Quick Brown Squirrel | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760934833/skullcandy-products/product-117.png` |
| 118 | Cheerful Firefly Kid | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760934837/skullcandy-products/product-118.png` |
| 119 | Adventure Camping Boy | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760934843/skullcandy-products/product-119.png` |
| 120 | Charming Valentine Cupid | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760934852/skullcandy-products/product-120.png` |
| 121 | Dreamy Purple Baby | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760934856/skullcandy-products/product-121.png` |
| 122 | Wandering Butterfly | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760934865/skullcandy-products/product-122.png` |
| 123 | Forever Young Peter Pan | `https://res.cloudinary.com/dtes5pcfm/image/upload/v1760934869/skullcandy-products/product-123.png` |

---

## Upload History

### Latest Upload Session (Oct 20, 2025)

**Script**: `scripts/upload-to-cdn.sh`  
**Total Uploads**: 23/23  
**Success Rate**: 100%  
**Version Range**: v1760931715 - v1760934869

**Process**:
1. Read assets from `public/assets/products/`
2. Generate SHA1 signature for each upload
3. Upload via cURL with multipart/form-data
4. Save Cloudinary URLs to `cloudinary-urls.json`
5. Update database via `/products/batch` API

---

## Troubleshooting

### Upload Fails with 401 Unauthorized

**Cause**: Invalid signature

**Solution**: Verify signature generation:
```bash
# Ensure API_SECRET is correct
# Ensure params are alphabetically sorted
# Ensure timestamp is current
```

### Image Not Loading

**Check**:
1. URL uses HTTPS (not HTTP)
2. Version number is included
3. File exists in Cloudinary dashboard
4. No CORS issues (images are public)

### Cache Not Updating

**Cause**: Browser caching old version

**Solution**: Update version number in URL:
```
# Old
/v1760931715/skullcandy-products/product-100.png

# New (after re-upload)
/v1760934869/skullcandy-products/product-100.png
```

---

## Related Documentation

- [Backend API](./backend-api.md) - Product database API
- [Figma MCP](./figma-mcp.md) - Design data extraction
- [Maintenance Scripts](../maintenance/scripts.md) - Upload utilities
