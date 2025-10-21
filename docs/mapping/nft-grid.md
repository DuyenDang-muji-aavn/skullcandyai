# NFTGrid Mapping

| Property         | Value                                                   |
| ---------------- | ------------------------------------------------------- |
| **Last Updated** | 2025-10-16                                             |
| **Component**    | NFTGrid                                                |
| **Figma Node**   | 121:6103 (Product List)                                |
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
Frame: Product List (121:6103)
├── Container Properties
│   ├── Layout: Flex
│   ├── Direction: Horizontal
│   ├── Wrap: Wrap
│   ├── Gap: 24px (Figma) → gap-x-6 (horizontal), gap-y-24 (vertical, custom)
│   ├── Padding: 32px × 64px
│   ├── Alignment: Center content
│   └── Justify: Center items
│
└── Children: 15 NFTCard instances (121:6104-6115, 196:1830-1832)
    ├── Card 1 (121:6104) - "Cryptic Hacker" by CodeMaster
    ├── Card 2 (121:6106) - "Frosty Snow Queen" by WinterWhisper
    ├── Card 3 (121:6107) - "Spooky Halloween Ghost" by PhantomArtist
    ├── Card 4 (196:1830) - "Lunar Moon Queen" by CelestialDream
    ├── Card 5 (121:6108) - "Jolly Christmas Elf" by HolidayJoy
    ├── Card 6 (121:6109) - "Galactic Astronaut" by SpaceExplorer
    ├── Card 7 (121:6105) - "Rustic Farmer" by EarthBound
    ├── Card 8 (121:6110) - "Athletic Tennis Girl" by SportyStyle
    ├── Card 9 (121:6111) - "Grapevine Wine Monster" by VinoVibes
    ├── Card 10 (121:6112) - "Regal Rose Lord" by FloralMajesty
    ├── Card 11 (121:6113) - "Skateboard Boy" by UrbanMotion
    ├── Card 12 (121:6114) - "Oceanic Sea Princess" by AquaDreamer
    ├── Card 13 (196:1831) - "Joyful Ice Cream Lover" by SweetTreats
    ├── Card 14 (121:6115) - "Daring Pilot Captain" by SkyNavigator
    └── Card 15 (196:1832) - "Charming Valentine Cupid" by LoveArtisan
```

**Key Nodes:**
- Main Container: `121:6103`
- Cards: Individual NFTCard component instances
- API Integration: Annotation on first card (121:6104)

---

## 2. Property Mapping

### Container (121:6103)
| Figma Property       | Value              | Code Implementation     | Token |
| -------------------- | ------------------ | ----------------------- | ----- |
| Layout               | Flex               | `flex`                  | - |
| Direction            | Horizontal         | (row is default)        | - |
| Wrap                 | Wrap               | `flex-wrap`             | - |
| Gap                  | 24px               | `gap-x-6` (horizontal)  | - |
| Gap (Custom)         | 96px               | `gap-y-24` (vertical)   | - |
| Padding X            | 32px               | `px-8`                  | - |
| Padding Y            | 64px               | `py-16`                 | - |
| Align Items          | Center             | `items-center`          | - |
| Justify Content      | Center             | `content-center`        | - |
| Width                | 100%               | `size-full`             | - |
| Height               | Auto               | `size-full`             | - |

### Card Constraints (Applied to wrapper div)
| Figma Property       | Value              | Code Implementation     | Token |
| -------------------- | ------------------ | ----------------------- | ----- |
| Min Width            | 314px              | `min-w-[314px]`         | - |
| Max Width            | 432px              | `max-w-[432px]`         | - |
| Flex Basis           | 0                  | `basis-0`               | - |
| Flex Grow            | 1                  | `grow`                  | - |
| Flex Shrink          | 0                  | `shrink-0`              | - |

### Figma vs Implementation Differences

| Aspect | Figma | Implementation | Reason |
|--------|-------|----------------|--------|
| Vertical Gap | 24px | 96px (gap-y-24) | User requirement: 4× horizontal gap for better row separation |
| Card Constraints | Implicit | Explicit wrapper div | Flex-wrap needs explicit constraints for proper responsive behavior |
| API Integration | Annotation only | Full implementation | Figma annotation points to actual API, implemented in code |

---

## 3. Token Extraction

### Design Variables from Figma
```json
{
  "↔️ grid negative/060000 (-48)": "-48",
  "↔️ grid negative/030000 (-24)": "-24",
  "Color/Text": "#ffffff",
  "Font Family/Title": "Orbitron",
  "Font Weight/Body": "Regular",
  "Font Family/Body": "Outfit",
  "Color/ Glass Dark": "#0000001a",
  "Font Family/ Button": "Orbitron",
  "Radius/Button": "9999",
  "Color/ Glass Light": "#ffffff1a",
  "Glass Blur/Amount": "200",
  "Radius/Card": "24"
}
```

### Token Mapping

**Spacing Tokens:**
- Figma gap: 24px → `gap-x-6` (6 × 4px = 24px)
- Custom vertical gap: 96px → `gap-y-24` (24 × 4px = 96px)
- Padding X: 32px → `px-8` (8 × 4px = 32px)
- Padding Y: 64px → `py-16` (16 × 4px = 64px)

**Negative Margin Tokens (Not Currently Used):**
- `↔️ grid negative/060000 (-48)`: -48px (potential future use for overlapping layouts)
- `↔️ grid negative/030000 (-24)`: -24px (potential future use for overlapping layouts)

**Child Component Tokens:**
All other tokens (colors, typography, effects) are applied to child components:
- NFTCard: Uses glass morphism tokens
- SectionHeading: Uses typography tokens
- SearchBar: Uses glass and typography tokens

---

## 4. Layout Guide

### Flexbox Wrap Layout

```tsx
// Container structure
<div className="flex flex-wrap gap-x-6 gap-y-24 px-8 py-16">
  {/* Cards auto-wrap based on available width */}
  
  {/* Row 1 */}
  <Card /> {/* 24px gap → */} <Card /> {/* 24px gap → */} <Card />
  
  {/* 96px vertical gap */}
  
  {/* Row 2 */}
  <Card /> {/* 24px gap → */} <Card /> {/* 24px gap → */} <Card />
</div>
```

### Responsive Behavior

**Breakpoint Calculations:**

| Viewport Width | Container Width | Card Width Range | Cards per Row |
|----------------|-----------------|------------------|---------------|
| 320px (Mobile) | 320px - 64px = 256px | 256px (full width) | 1 |
| 768px (Tablet) | 768px - 64px = 704px | (704 - 24) / 2 = 340px | 2 |
| 1024px (Desktop) | 1024px - 64px = 960px | (960 - 48) / 3 = 304px → 314px min | 3 |
| 1280px (Large) | 1280px - 64px = 1216px | (1216 - 48) / 3 = 389px | 3 |
| 1440px (XL) | 1440px - 64px = 1376px | (1376 - 72) / 4 = 326px | 4 |

**Formula:**
```
Available Width = Viewport Width - (Padding X × 2)
Card Width = (Available Width - (Gap × (Cards - 1))) / Cards per Row

Card width constrained by: 314px ≤ width ≤ 432px
```

### Z-Index Layering
No z-index on grid container. Z-index handled by child NFTCard components (image layer z-[2], info layer z-[1]).

---

## 5. Variants Mapping

### Variant 1: Default Grid (Node 121:6103)

**Figma Properties:**
- Property: "Product List"
- Contains: 15 NFTCard instances
- Layout: Flex wrap with 24px gap

**Code Implementation:**
```tsx
<NFTGrid
  title="Hot Bids"
  description="Browse trending NFTs"
  showSearch={true}
>
  {products.map((product) => (
    <div 
      key={product.id}
      className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]"
    >
      <NFTCard {...product} />
    </div>
  ))}
</NFTGrid>
```

**Usage Context:**
- Main landing page NFT showcase
- Collection pages
- Search results pages
- Marketplace listings

**Future Variants:**
- Compact Grid: Smaller gaps (gap-x-3 gap-y-12)
- Dense Grid: No vertical gap (gap-y-0)
- Masonry Grid: Variable card heights

---

## 6. Assets

### Card Images (15 total)

All images served via Figma MCP localhost server:

| Card | Image URL | Dimensions |
|------|-----------|------------|
| 1 | `http://localhost:3845/assets/c987db946c7e77771722c6c59b09744d3fff06cb.png` | 240×240px |
| 2 | `http://localhost:3845/assets/ee52308bbb2c32d8a9942d54af7717bb7e18d9c6.png` | 240×240px |
| 3 | `http://localhost:3845/assets/0f2daaf2aa723b94de74dad7e6b075f378de559b.png` | 240×240px |
| 4 | `http://localhost:3845/assets/6d722229f92ffdf624ecfff9e515b231c1fb2e8d.png` | 240×240px |
| 5 | `http://localhost:3845/assets/58776648d5abc13c417fd265af54d20ae4d392bb.png` | 240×240px |
| 6 | `http://localhost:3845/assets/4c1f83bad53e5978f4861f85a6b6c3959c9f2815.png` | 240×240px |
| 7 | `http://localhost:3845/assets/b134bb2ee7e89e265a2eb1a6d37aa98f1d0cecb5.png` | 240×240px |
| 8 | `http://localhost:3845/assets/37a7357ac53524e79dcd89ce8218d54170cad85c.png` | 240×240px |
| 9 | `http://localhost:3845/assets/2621022b0f530014cccaaa39d6534856dd0520ba.png` | 240×240px |
| 10 | `http://localhost:3845/assets/30c5563b90999cf5b74d07ca4ad94d6d29d0ae5a.png` | 240×240px |
| 11 | `http://localhost:3845/assets/c0c4c4641a0b870a6b7760943d53193dbd6de3cc.png` | 240×240px |
| 12 | `http://localhost:3845/assets/293c52ea58913b9dd758a6b241c74c704cbedccb.png` | 240×240px |
| 13 | `http://localhost:3845/assets/86bd2e87408c7138be942a547412321f5f9d7902.png` | 240×240px |
| 14 | `http://localhost:3845/assets/77e7ffc4c61442dc6e6663b4ac0db32e4cef1d13.png` | 240×240px |
| 15 | `http://localhost:3845/assets/5c4ebb9f25ee25cc94ff0ad36ee41574c4203e06.png` | 240×240px |

### Currency Icon (Shared)
- **URL:** `http://localhost:3845/assets/9ea3b777d40087da6a4f200826b2f3ca34a995f3.svg`
- **Dimensions:** 32×32px
- **Usage:** Ethereum icon for all cards

### Asset Optimization

**Production Implementation:**
1. Download all images from localhost
2. Save to `/public/images/nfts/` directory
3. Use Next.js Image component for optimization
4. Enable lazy loading and blur-up placeholders

**Example:**
```tsx
<Image
  src={`/images/nfts/${product.id}.png`}
  width={240}
  height={240}
  alt={`${product.name} NFT artwork`}
  loading="lazy"
  placeholder="blur"
  blurDataURL={generateBlurDataURL(product.image)}
/>
```

---

## 7. Implementation Notes

### Key Design Decisions

**1. Asymmetric Gaps**
- **Figma:** 24px gap (uniform)
- **Implementation:** gap-x-6 (24px horizontal), gap-y-24 (96px vertical)
- **Reason:** User requirement for better visual separation between rows (4× horizontal gap)
- **Benefit:** Clearer row grouping, easier scanning, more breathing room

**2. Explicit Card Constraints**
- **Figma:** Cards have implicit width constraints from flex-wrap
- **Implementation:** Wrapper div with `min-w-[314px] max-w-[432px] basis-0 grow shrink-0`
- **Reason:** Flex-wrap needs explicit constraints for predictable responsive behavior
- **Benefit:** Consistent card sizing across breakpoints, proper wrapping

**3. API Integration Pattern**
- **Figma Annotation:** "Component: src\\components\\nft\\NftCard\\NftCard.tsx with data from API https://devday-aavn-d5284e914439.herokuapp.com/api/products"
- **Implementation:** Fetch API data, transform to NFTCard props, render in grid
- **Current State:** Using mockData.ts for development, ready for API integration
- **Production:** Direct API fetch with error handling and caching

**4. Composition Pattern**
- **Pattern:** Container component (NFTGrid) + child components (NFTCard)
- **Benefits:** 
  - Flexible: Can render any children, not just NFTCard
  - Reusable: Grid layout decoupled from card implementation
  - Testable: Can test grid layout independently
  - Maintainable: Changes to card don't affect grid

**5. Optional Header Integration**
- **Components:** SectionHeading + SearchBar
- **Conditional:** Only renders if title/description provided
- **Spacing:** 80px gap between header sections and grid
- **Benefit:** Single component handles multiple use cases (with/without header)

### API Integration Details

**Endpoint:**
```
https://devday-aavn-d5284e914439.herokuapp.com/api/products
```

**Data Flow:**
```
API Response (23 products)
    ↓
Transform to NFTCard props
    ↓
Map to grid children with constraints
    ↓
Render in flex-wrap grid
```

**Mock Data (Development):**
Located in `src/lib/mockData.ts`:
```tsx
export const mockProducts = [
  {
    id: 1,
    name: 'Cryptic Hacker',
    creator: 'CodeMaster',
    image: '/images/nft-labubu.png',
    priceEth: '3.75',
    countdown: { hours: 4, minutes: 12, seconds: 34 },
  },
  // ... 22 more products
];
```

**API Field Mapping:**
| API Field | Type | NFTCard Prop | Transform |
|-----------|------|--------------|-----------|
| `id` | number | key | Direct |
| `name` | string | title | Direct |
| `creator` | string | author | Direct |
| `image` | string (URL) | image | Direct |
| `priceEth` | string | price | Direct |
| `auctionEnd` | string (ISO date) | countdown | Parse → {hours, minutes, seconds} |
| `verified` | boolean | verified | Direct (optional) |

### Responsive Grid Behavior

**Mobile (< 640px):**
- 1 card per row
- Full width (minus padding)
- 96px vertical spacing

**Tablet (640-1024px):**
- 2 cards per row
- 24px horizontal gap
- 96px vertical spacing

**Desktop (1024px+):**
- 3 cards per row
- 24px horizontal gap
- 96px vertical spacing

**Large (1440px+):**
- 3-4 cards per row (depends on exact width)
- Cards respect max-width (432px)
- Centered if fewer than max cards per row

### Error Handling

**API Errors:**
```tsx
try {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Network error');
  const data = await response.json();
  setProducts(data);
} catch (error) {
  console.error('Failed to fetch products:', error);
  setError(error.message);
}
```

**Empty State:**
```tsx
{products.length === 0 && (
  <div className="text-center py-20">
    <p>No NFTs found</p>
  </div>
)}
```

**Loading State:**
```tsx
{isLoading && (
  <NFTGrid>
    {[...Array(6)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </NFTGrid>
)}
```

---

## 8. Update Log

### 2025-10-16 - Complete Design Update & Documentation Regeneration
**Changed:**
- Updated gap from uniform `gap-6` to asymmetric `gap-x-6 gap-y-24`
- Horizontal gap: 24px (gap-x-6)
- Vertical gap: 96px (gap-y-24) - User requirement for better row separation
- Added explicit card constraints: `min-w-[314px] max-w-[432px] basis-0 grow shrink-0`
- Completely regenerated `docs/components/NFTGrid.md` with 18-section template structure
- Added new **API Integration** section (#15) documenting:
  - API endpoint: `https://devday-aavn-d5284e914439.herokuapp.com/api/products`
  - Data structure and transformation
  - Error handling patterns
  - Loading states
  - Caching strategies
  - Mock data for development
- Completely regenerated `docs/mapping/nft-grid.md` with 8-section template structure

**Figma Extraction:**
- Node: 121:6103 (Product List)
- Design variables: 12 tokens extracted
- Assets identified: 15 NFT images (240×240px), 1 currency icon (32×32px)
- Screenshot captured for visual reference
- Annotation found: API integration directive

**Why:**
- Match Figma flex-wrap layout pattern
- Implement user requirement for larger vertical spacing (96px vs 24px)
- Establish responsive card constraints for predictable wrapping behavior
- Document complete API integration pattern with real endpoint
- Provide comprehensive examples for error handling and loading states
- Create reference documentation for API data transformation
- Second component (after NFTCard) to complete component-design-update workflow with API docs

**Files Modified:**
1. `src/components/nft-grid/NFTGrid.tsx` (gap update, card constraints)
2. `docs/components/NFTGrid.md` (complete regeneration, 18 sections with API Integration)
3. `docs/mapping/nft-grid.md` (complete regeneration, 8 sections with API details)

**Impact:**
- Better visual hierarchy with increased vertical spacing
- Predictable responsive behavior across breakpoints
- Complete documentation of API integration pattern
- Reusable example for future API-driven components
- Improved developer experience with comprehensive examples

---

### Previous Updates

See component file history for earlier changes.
