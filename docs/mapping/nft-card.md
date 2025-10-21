# NFTCard Mapping

| Property         | Value                                                   |
| ---------------- | ------------------------------------------------------- |
| **Last Updated** | 2025-10-16                                             |
| **Component**    | NFTCard                                                |
| **Figma Node**   | 5:1788 (Property 1=List)                               |
| **Status**       | ✅ Complete                                             |

## Table of Contents
1. [Node Structure](#1-node-structure)
2. [Property Mapping](#2-property-mapping)
3. [Token Extraction](#3-token-extraction)
4. [Layout Guide](#4-layout-guide)
5. [Variants Mapping](#5-variants-mapping)
6. [Assets](#6-assets)
7. [Implementation Notes](#7-implementation-notes)
8. [Update Log](#8-update-log)

---

## 1. Node Structure

```
Frame: LabubuNft (5:1788) - Property 1=List
├── Frame: Image Container (297:3977) - z-index: 2
│   └── Image: 240×240px (nft-labubu.png)
│       └── className: "rounded-lg"
│
└── Frame: Info Container (5:1770) - z-index: 1
    ├── Frame: Title Section
    │   ├── Frame: Title + Author (left)
    │   │   ├── Text: Title (297:4165) - "Baby boy"
    │   │   │   └── font-family-title font-bold text-card-title-nft text-white
    │   │   └── Text: Author (297:4166) - "Marc Acon..."
    │   │       └── font-family-body font-normal opacity-70 text-card-author text-white
    │   │
    │   └── Frame: Countdown (right) (297:4171)
    │       ├── SVG: Clock Icon (297:4172) - 18×18px
    │       └── Text: Time (297:4173) - "3:34:04"
    │           └── font-family-body font-bold text-card-badge text-white
    │
    └── Frame: Price Section
        ├── Frame: Price (left) (297:4175)
        │   ├── Image: Currency Icon (297:4176) - 32×32px (ethereum-icon.svg)
        │   └── Text: Price (297:4177) - "1.85 ETH"
        │       └── font-family-body font-bold text-card-price-nft text-white
        │
        └── Button: Action Button (right) (297:4183)
            └── size="M" style="Neutral" (143×47px)
```

**Key Nodes:**
- Main Frame: `5:1788` (LabubuNft)
- Image Container: `297:3977`
- Info Container: `5:1770`
- Title Text: `297:4165`
- Author Text: `297:4166`
- Countdown Container: `297:4171`
- Price Container: `297:4175`
- Button: `297:4183`

---

## 2. Property Mapping

### Container (5:1788)
| Figma Property                | Value                | Code Implementation        | Token |
| ----------------------------- | -------------------- | -------------------------- | ----- |
| Type                          | Auto Layout (Flex)   | `flex flex-col`            | - |
| Direction                     | Vertical             | `flex-col`                 | - |
| Alignment                     | Center               | `items-center`             | - |
| Padding                       | 16px                 | `p-4`                      | - |
| Gap                           | 0px (overlaps)       | Negative margins           | - |
| Background                    | rgba(0,0,0,0.1)      | `bg-glass-dark`            | `--glass-dark` |
| Backdrop Blur                 | 100px (Figma: 200)   | `backdrop-blur-glass`      | `--glass-blur` |
| Border Radius                 | 24px                 | `rounded-card`             | `--radius-card` |
| Width                         | Auto                 | `w-auto`                   | - |
| Height                        | Auto                 | `h-auto`                   | - |

### Image Container (297:3977)
| Figma Property                | Value                | Code Implementation        | Token |
| ----------------------------- | -------------------- | -------------------------- | ----- |
| Width                         | 240px                | `width={240}`              | - |
| Height                        | 240px                | `height={240}`             | - |
| Border Radius                 | 8px                  | `rounded-lg`               | - |
| Display                       | Flex                 | `flex`                     | - |
| Gap                           | 8px                  | `gap-2`                    | - |
| Z-index                       | 2                    | `z-[2]`                    | - |

### Info Container (5:1770)
| Figma Property                | Value                | Code Implementation        | Token |
| ----------------------------- | -------------------- | -------------------------- | ----- |
| Display                       | Flex Column          | `flex flex-col`            | - |
| Gap                           | 16px                 | `gap-4`                    | - |
| Background                    | rgba(0,0,0,0.1)      | `bg-glass-dark`            | `--glass-dark` |
| Backdrop Blur                 | 100px                | `backdrop-blur-glass`      | `--glass-blur` |
| Border Radius                 | 24px                 | `rounded-card`             | `--radius-card` |
| Padding                       | 16px                 | `p-4`                      | - |
| Width                         | 314px (Figma)        | `w-full`                   | - |
| Z-index                       | 1                    | `z-[1]`                    | - |

### Title Text (297:4165)
| Figma Property                | Value                | Code Implementation        | Token |
| ----------------------------- | -------------------- | -------------------------- | ----- |
| Font Family                   | Orbitron             | `font-family-title`        | `--font-family-title` |
| Font Size                     | 18px                 | `text-card-title-nft`      | `--text-card-title-nft` |
| Font Weight                   | 700 (Bold)           | `font-bold`                | - |
| Color                         | #ffffff              | `text-white`               | - |

### Author Text (297:4166)
| Figma Property                | Value                | Code Implementation        | Token |
| ----------------------------- | -------------------- | -------------------------- | ----- |
| Font Family                   | Outfit               | `font-family-body`         | `--font-family-body` |
| Font Size                     | 16px                 | `text-card-author`         | `--text-card-author` |
| Font Weight                   | 400 (Regular)        | `font-normal`              | - |
| Color                         | #ffffff              | `text-white`               | - |
| Opacity                       | 70%                  | `opacity-70`               | - |

### Countdown (297:4173)
| Figma Property                | Value                | Code Implementation        | Token |
| ----------------------------- | -------------------- | -------------------------- | ----- |
| Font Family                   | Outfit               | `font-family-body`         | `--font-family-body` |
| Font Size                     | 14.891px → 16px      | `text-card-badge`          | `--text-card-badge` |
| Font Weight                   | 700 (Bold)           | `font-bold`                | - |
| Color                         | #ffffff              | `text-white`               | - |

### Clock Icon (297:4172)
| Figma Property                | Value                | Code Implementation        | Token |
| ----------------------------- | -------------------- | -------------------------- | ----- |
| Width                         | 18px                 | SVG inline (18×18)         | - |
| Height                        | 18px                 | SVG inline (18×18)         | - |
| Stroke                        | #ffffff              | `stroke="currentColor"`    | - |

### Price Text (297:4177)
| Figma Property                | Value                | Code Implementation        | Token |
| ----------------------------- | -------------------- | -------------------------- | ----- |
| Font Family                   | Outfit               | `font-family-body`         | `--font-family-body` |
| Font Size                     | 18px                 | `text-card-price-nft`      | `--text-card-price-nft` |
| Font Weight                   | 700 (Bold)           | `font-bold`                | - |
| Color                         | #ffffff              | `text-white`               | - |

### Currency Icon (297:4176)
| Figma Property                | Value                | Code Implementation        | Token |
| ----------------------------- | -------------------- | -------------------------- | ----- |
| Width                         | 31.854px → 32px      | `w-8` (32px)               | - |
| Height                        | 31.854px → 32px      | `h-8` (32px)               | - |
| Source                        | ethereum-icon.svg    | `/ethereum-icon.svg`       | - |

### Button (297:4183)
| Figma Property                | Value                | Code Implementation        | Token |
| ----------------------------- | -------------------- | -------------------------- | ----- |
| Width                         | 143px                | Auto (Button component)    | - |
| Height                        | 47px                 | Auto (Button component)    | - |
| Variant                       | Medium Neutral       | `size="M" style="Neutral"` | Button tokens |
| Text                          | "Bid now"            | `{buttonText}`             | - |

---

## 3. Token Extraction

### Color Tokens
```json
{
  "Color/Text": "#ffffff",
  "Color/ Glass Dark": "#0000001a",
  "Color/ Glass Light": "#ffffff1a"
}
```

**Mapping:**
- `"Color/Text"` → `--text-primary: #ffffff` → `text-white`
- `"Color/ Glass Dark"` → `--glass-dark: rgba(0, 0, 0, 0.1)` → `bg-glass-dark`
- `"Color/ Glass Light"` → `--glass-light: rgba(255, 255, 255, 0.1)` → `bg-glass-light`

### Typography Tokens
```json
{
  "Font Family/Title": "Orbitron",
  "Font Family/Body": "Outfit",
  "Font Weight/Body": "Regular"
}
```

**Mapping:**
- `"Font Family/Title"` → `--font-family-title: 'Orbitron', sans-serif` → `font-family-title`
- `"Font Family/Body"` → `--font-family-body: 'Outfit', sans-serif` → `font-family-body`
- Title Size: 18px → `--text-card-title-nft: 18px` → `text-card-title-nft`
- Author Size: 16px → `--text-card-author: 16px` → `text-card-author`
- Countdown Size: 14.891px → `--text-card-badge: 16px` → `text-card-badge` (rounded)
- Price Size: 18px → `--text-card-price-nft: 18px` → `text-card-price-nft`

### Effect Tokens
```json
{
  "Glass Blur/Amount": "200",
  "Radius/Card": "24",
  "Radius/Button": "9999"
}
```

**Mapping:**
- `"Glass Blur/Amount"` → Figma 200 ÷ 2 = 100px → `--glass-blur: 100px` → `backdrop-blur-glass`
- `"Radius/Card"` → `--radius-card: 24px` → `rounded-card`
- `"Radius/Button"` → `--radius-pill: 9999px` → `rounded-pill` (Button component)

### Spacing Tokens
```json
{
  "↔️ grid negative/060000 (-48)": "-48",
  "↔️ grid negative/030000 (-24)": "-24"
}
```

**Mapping:**
- `-48px` → Top negative margin (overlapping layout pattern)
- `-24px` → Bottom negative margin (overlapping layout pattern)

**Note:** Negative margins are NOT currently implemented in NFTCard. The component uses standard flex layout with proper z-index stacking.

---

## 4. Layout Guide

### Z-Index Stacking
```tsx
// Image sits above info container
<div className="z-[2]">  {/* Image Container */}
  <Image />
</div>

<div className="z-[1]">  {/* Info Container */}
  {/* Title, author, countdown, price, button */}
</div>
```

### Flex Layout Structure
```tsx
// Outer container
<div className="flex flex-col items-center">
  
  {/* Image Container */}
  <div className="flex gap-2 items-center justify-center w-full z-[2]">
    <Image />
  </div>
  
  {/* Info Container */}
  <div className="flex flex-col gap-4 w-full z-[1]">
    
    {/* Title + Countdown Row */}
    <div className="flex items-end justify-between w-full">
      {/* Left: Title + Author */}
      <div className="flex flex-col gap-0.5">
        <h3>Title</h3>
        <p>Author</p>
      </div>
      
      {/* Right: Countdown */}
      <time>Countdown</time>
    </div>
    
    {/* Price + Button Row */}
    <div className="flex items-center justify-between w-full">
      {/* Left: Icon + Price */}
      <div className="flex gap-2 items-center">
        <Image />
        <div>Price</div>
      </div>
      
      {/* Right: Button */}
      <Button />
    </div>
  </div>
</div>
```

### Overlapping Pattern (Future Enhancement)
The Figma design shows negative margins for a more compact overlapping layout:
- Image extends beyond info container by -48px at top
- Info container extends beyond image by -24px at bottom

**Current Implementation:** Standard flex layout with z-index stacking
**Future Option:** Add negative margin classes for tighter layout

---

## 5. Variants Mapping

### Variant 1: List (Default) - Node 5:1788

**Figma Property 1:** `List`

**Props:**
```tsx
{
  image: "/images/nft-labubu.png",
  imageAlt: "Baby boy NFT artwork",
  title: "Baby boy",
  author: "Marc Acon",
  verified: false,
  countdown: { hours: 3, minutes: 34, seconds: 4 },
  price: "1.85",
  currency: "ETH",
  currencyIcon: "/ethereum-icon.svg",
  buttonText: "Bid now",
}
```

**Visual Characteristics:**
- Full metadata display (title, author, countdown, price)
- 240×240px image
- Glass-dark background with backdrop blur
- Medium Neutral button
- Clock icon for countdown
- Currency icon for price

**Usage Context:** Default display in NFT grids, marketplace listings, auction pages

---

## 6. Assets

### NFT Image Asset
- **Source:** `http://localhost:3845/assets/496684c005e417eee9d696746f1f56cb3eea3c7b.png`
- **Figma Export:** 240×240px PNG
- **Code Path:** `/images/nft-labubu.png` (or dynamic)
- **Next.js Image:**
  ```tsx
  <Image
    src={image}
    alt={imageAlt}
    width={240}
    height={240}
    className="rounded-lg"
    loading="lazy"
    placeholder="blur"
    blurDataURL={generateBlurDataURL(image)}
  />
  ```

### Currency Icon Asset
- **Source:** `http://localhost:3845/assets/fdcb603e59b8d19e51e9ac4bdda3aa022d634b8c.svg`
- **Figma Export:** 32×32px SVG (rounded from 31.854×31.854px)
- **Code Path:** `/ethereum-icon.svg`
- **Next.js Image:**
  ```tsx
  <Image
    src={currencyIcon}
    alt={currency}
    width={32}
    height={32}
    className="w-8 h-8"
  />
  ```

### Clock Icon
- **Type:** SVG (inline)
- **Dimensions:** 18×18px
- **Stroke:** `currentColor` (inherits text color)
- **Implementation:**
  ```tsx
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 5V9L12 11" stroke="currentColor" strokeWidth="2"/>
  </svg>
  ```

### Asset Optimization
- **NFT Images:**
  - Use Next.js Image component for automatic optimization
  - Enable lazy loading for below-the-fold cards
  - Provide blur-up placeholder for better UX
  - Serve from CDN in production
  
- **Icons:**
  - Currency icon: Cache as static asset
  - Clock icon: Inline SVG for best performance
  - Consider SVG sprites for multiple icons

---

## 7. Implementation Notes

### Key Design Decisions

**1. Border Radius Token**
- **Before:** Hardcoded `rounded-[24px]` in 2 locations
- **After:** Semantic token `rounded-card` using `--radius-card: 24px`
- **Why:** Enables consistent theming, easier maintenance, supports design system evolution

**2. Countdown Font Size**
- **Figma:** 14.891px (Outfit Bold)
- **Token:** `--text-card-badge: 16px`
- **Rounded:** From 14.891px to 16px for cleaner pixel values
- **Why:** Improves rendering, aligns with 8px grid system

**3. Icon Size Precision**
- **Figma:** 31.854×31.854px
- **Code:** `w-8 h-8` (32×32px)
- **Rounded:** From 31.854px to 32px
- **Why:** Tailwind's `w-8` (2rem = 32px) provides exact pixel value, better than fractional sizes

**4. Glass Dark Background**
- **Figma Variable:** `Color/ Glass Dark: #0000001a`
- **Token:** `--glass-dark: rgba(0, 0, 0, 0.1)`
- **Conversion:** Hex `#0000001a` = rgba(0, 0, 0, 0.1) (26/255 ≈ 0.1)
- **Why:** RGBA is more readable and easier to adjust opacity

**5. Backdrop Blur Conversion**
- **Figma:** `Glass Blur/Amount: 200`
- **CSS:** `--glass-blur: 100px` → `backdrop-blur-glass`
- **Formula:** Figma blur value ÷ 2 = CSS blur value
- **Why:** Figma and CSS use different blur scaling

### Component Architecture

**Server Component:**
```tsx
// NFTCard.tsx - Default export (Server Component)
export default function NFTCard(props: NFTCardProps) {
  return (
    <div className="backdrop-blur-glass bg-glass-dark rounded-card p-4">
      {/* Static markup */}
    </div>
  );
}
```

**Client Wrapper (for countdown):**
```tsx
// NFTCardClient.tsx - Client Component for live countdown
'use client';

export function NFTCardClient(props: NFTCardProps) {
  const [countdown, setCountdown] = useState(props.countdown);
  
  useEffect(() => {
    // Live countdown logic
  }, []);
  
  return <NFTCard {...props} countdown={countdown} />;
}
```

**Button Integration:**
The NFTCard uses the existing Button component with `size="M"` and `style="Neutral"` variant. No custom button styling—fully integrated with design system.

### Negative Margin Layout (Future Enhancement)

The Figma design uses negative margins for a tighter overlapping effect. This is NOT currently implemented but can be added:

```tsx
// Future implementation
<div className="backdrop-blur-glass bg-glass-dark rounded-card p-4">
  <div className="z-[2] -mt-12">  {/* -48px top margin */}
    <Image />
  </div>
  <div className="z-[1] -mb-6 pt-12">  {/* -24px bottom margin, compensate top */}
    {/* Info content */}
  </div>
</div>
```

**Tokens for negative margins:**
- `--spacing-overlap-top: -48px`
- `--spacing-overlap-bottom: -24px`

### Glass Morphism Effect

The glass effect is achieved by combining:
1. `bg-glass-dark` (rgba(0, 0, 0, 0.1)) - Semi-transparent background
2. `backdrop-blur-glass` (100px blur) - Blurs content behind card
3. `rounded-card` (24px radius) - Smooth corners
4. Subtle shadow on hover - Elevation effect

Works best on gradient backgrounds or over colorful content.

---

## 8. Update Log

### 2025-10-16 - Complete Design Update & Documentation Regeneration
**Changed:**
- Added `--radius-card: 24px` token to `src/styles/tokens.css`
- Added `--glass-dark: rgba(0, 0, 0, 0.1)` token to `src/styles/tokens.css`
- Updated `--text-card-badge` from 15px to 16px (Figma 14.891px rounded)
- Updated `tailwind.config.ts` with `'glass-dark'` backgroundColor and `'card'` borderRadius
- Updated `src/components/nft-card/NFTCard.tsx`:
  - Line 69: Changed `rounded-[24px]` → `rounded-card` (outer container)
  - Line 108: Changed `rounded-[24px]` → `rounded-card` (info container)
- Verified existing implementations:
  - ✅ Already using `bg-glass-dark`
  - ✅ Already using `backdrop-blur-glass`
  - ✅ Icon size already 32px (`w-8 h-8`)
- Completely regenerated `docs/components/NFTCard.md` with 18-section template structure
- Completely regenerated `docs/mapping/nft-card.md` with 8-section template structure

**Figma Extraction:**
- Node: 5:1788 (LabubuNft, Property 1=List)
- Design variables: 11 tokens extracted (colors, typography, effects, spacing)
- Assets identified: NFT image (240×240px), currency icon (32×32px)
- Screenshot captured for visual reference

**Why:** 
- Standardize border radius using semantic token instead of hardcoded values
- Round fractional Figma measurements (14.891px → 16px, 31.854px → 32px) to cleaner pixel values
- Establish consistent documentation structure matching Button.md (18+8 sections)
- Complete design-to-code parity with Figma Node 5:1788
- First component to go through complete component-design-update workflow

**Files Modified:**
1. `src/styles/tokens.css` (3 token additions/updates)
2. `tailwind.config.ts` (2 config additions)
3. `src/components/nft-card/NFTCard.tsx` (2 className updates)
4. `docs/components/NFTCard.md` (complete regeneration, 18 sections)
5. `docs/mapping/nft-card.md` (complete regeneration, 8 sections)

---

### Previous Updates

See component file history for earlier changes.
