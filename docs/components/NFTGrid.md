# NFTGrid

| Property       | Value                                                   |
| -------------- | ------------------------------------------------------- |
| **Last Updated** | 2025-10-16                                            |
| **Status**       | ✅ Implemented                                          |
| **Figma**        | [Link to Figma node](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6103) |
| **Node ID**      | 121:6103                                               |

## Table of Contents
1. [Overview](#1-overview)
2. [Specs](#2-specs)
3. [Variants](#3-variants)
4. [Typography](#4-typography)
5. [Colors](#5-colors)
6. [Spacing](#6-spacing)
7. [Effects](#7-effects)
8. [Layout](#8-layout)
9. [Responsive](#9-responsive)
10. [States](#10-states)
11. [Accessibility](#11-accessibility)
12. [Props API](#12-props-api)
13. [Usage](#13-usage)
14. [Examples](#14-examples)
15. [API Integration](#15-api-integration)
16. [Edge Cases](#16-edge-cases)
17. [Performance](#17-performance)
18. [References](#18-references)

---

## 1. Overview

The NFTGrid component is a responsive flexbox-based grid container specifically designed for displaying NFT cards. It features a flexible wrap layout with asymmetric gaps (24px horizontal, 96px vertical) and integrates optional header content including section heading and search functionality.

The component is optimized for displaying API-fetched product data from the DevDay API endpoint and provides a consistent, responsive layout across all screen sizes.

---

## 2. Specs

| Property        | Value       | Token                |
| --------------- | ----------- | -------------------- |
| Layout          | Flex wrap   | `flex flex-wrap`     |
| Horizontal Gap  | 24px        | `gap-x-6`            |
| Vertical Gap    | 96px        | `gap-y-24`           |
| Padding X       | 32px        | `px-8`               |
| Padding Y       | 64px        | `py-16`              |
| Min Card Width  | 314px       | `min-w-[314px]`      |
| Max Card Width  | 432px       | `max-w-[432px]`      |
| Card Growth     | Flexible    | `basis-0 grow`       |

**Figma Measurements:**
- Container gap (Figma): 24px
- Vertical spacing (Custom): 96px (4× horizontal gap)
- Padding: 32px × 64px

---

## 3. Variants

**1 Variant:** Default grid layout

| Variant Name | Description                     | Props                   | Figma Node |
| ------------ | ------------------------------- | ----------------------- | ---------- |
| Default      | Grid with optional header + search | All props optional except children | 121:6103 |

**Future Variants:**
- Compact: Smaller gaps (12px × 48px)
- Dense: No vertical spacing between rows
- Masonry: Staggered card heights

---

## 4. Typography

Typography is inherited from child components (SectionHeading, SearchBar, NFTCard).

**Component Dependencies:**
- **SectionHeading**: Orbitron title (38px), Outfit description (20px)
- **SearchBar**: Outfit placeholder (20px)
- **NFTCard**: See NFTCard.md for typography specs

---

## 5. Colors

Colors are inherited from child components. The grid container itself has no background color, allowing the page gradient to show through.

**Visual Context:**
- Transparent background
- Child components use glass morphism effects
- Works on gradient backgrounds

---

## 6. Spacing

| Property       | Value | Token        | Usage |
| -------------- | ----- | ------------ | ----- |
| Horizontal Gap | 24px  | `gap-x-6`    | Space between cards horizontally |
| Vertical Gap   | 96px  | `gap-y-24`   | Space between card rows |
| Padding X      | 32px  | `px-8`       | Left/right container padding |
| Padding Y      | 64px  | `py-16`      | Top/bottom container padding |
| Header Gap     | 80px  | `gap-20`     | Between heading and search |
| Section Gap    | 80px  | `gap-20`     | Between header and grid |

**Spacing Hierarchy:**
```
Container (px-8 py-16)
├─ Header Section (gap-20)
│  ├─ SectionHeading
│  └─ SearchBar (if showSearch)
├─ Gap (gap-20)
└─ Grid (flex-wrap gap-x-6 gap-y-24)
   ├─ Card (24px horizontal gap) →
   ├─ Card (24px horizontal gap) →
   ├─ Card (wraps to new row)
   ↓
   96px vertical gap
   ↓
   ├─ Card (next row) →
```

---

## 7. Effects

No direct effects on the grid container. Effects are applied to child components:
- NFTCard: Glass morphism, backdrop blur
- SearchBar: Glass background
- SectionHeading: None (text only)

---

## 8. Layout

```tsx
// Structure
<div className="flex flex-col gap-20">
  {/* Optional Header */}
  {(title || description) && (
    <div className="flex flex-col gap-20">
      <SectionHeading title={title} description={description} alignment="center" />
      
      {showSearch && (
        <div className="flex justify-center">
          <SearchBar size="L" placeholder={searchPlaceholder} onSearch={onSearch} />
        </div>
      )}
    </div>
  )}

  {/* Grid Container */}
  <div className="flex flex-wrap gap-x-6 gap-y-24 px-8 py-16">
    {children}
  </div>
</div>
```

**Layout Classes:**
- Outer container: `flex flex-col gap-20`
- Header wrapper: `flex flex-col gap-20`
- Search wrapper: `flex justify-center`
- Grid container: `flex flex-wrap gap-x-6 gap-y-24 px-8 py-16`

**Card Constraints (Applied by Parent):**
```tsx
<div className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]">
  <NFTCard {...props} />
</div>
```

---

## 9. Responsive

| Breakpoint | Cards per Row | Behavior |
| ---------- | ------------- | -------- |
| Mobile (< 640px) | 1 | Single column, full width |
| Tablet (640-1024px) | 2 | Two columns |
| Desktop (1024-1280px) | 3 | Three columns |
| Large (> 1280px) | 3-4 | Three to four columns |

**Responsive Logic:**
- Cards have `min-w-[314px]` - ensures minimum size
- Cards have `max-w-[432px]` - prevents oversized cards
- Cards use `basis-0 grow` - fills available space
- `flex-wrap` - automatically wraps to new rows
- Gap remains consistent at all breakpoints (24px × 96px)

**Grid Adaptation:**
```
Mobile:    [Card 1]
           [Card 2]
           [Card 3]

Tablet:    [Card 1] [Card 2]
           [Card 3] [Card 4]

Desktop:   [Card 1] [Card 2] [Card 3]
           [Card 4] [Card 5] [Card 6]
```

---

## 10. States

| State    | Behavior/Class                 | Visual Effect |
| -------- | ------------------------------ | ------------- |
| Default  | Standard grid layout           | Cards displayed in rows |
| Loading  | Show skeleton cards            | Placeholder cards |
| Empty    | Show empty state message       | "No NFTs found" |
| Error    | Show error message             | "Failed to load NFTs" |
| Filtered | Subset of cards displayed      | Reduced card count |

**State Management:**
```tsx
// Loading state
{isLoading && (
  <NFTGrid>
    {[...Array(6)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </NFTGrid>
)}

// Empty state
{!isLoading && products.length === 0 && (
  <div className="text-center py-20">
    <p>No NFTs found</p>
  </div>
)}

// Error state
{error && (
  <div className="text-center py-20 text-red-500">
    <p>Failed to load NFTs. Please try again.</p>
  </div>
)}
```

---

## 11. Accessibility

**Semantic HTML:**
- Grid uses semantic `<div>` with proper ARIA roles
- Cards should use `<article>` for semantic structure
- Search should use `<form>` with proper labels

**Keyboard Navigation:**
- Tab through cards naturally
- Search input accessible via Tab
- Card buttons accessible via Tab
- Enter/Space to activate buttons

**Screen Reader:**
- Announce grid as "NFT collection with X items"
- Each card announces as separate article
- Search input has proper label
- Loading/error states announced

**Focus Management:**
- Focus visible on all interactive elements
- Focus order: Header → Search → Cards (left to right, top to bottom)
- Skip link option for large grids

**ARIA Attributes:**
```tsx
<div 
  role="region" 
  aria-label={`${title} NFT collection`}
  className="flex flex-wrap gap-x-6 gap-y-24 px-8 py-16"
>
  {children}
</div>
```

**Best Practices:**
- Provide meaningful title/description
- Ensure card content is accessible (see NFTCard.md)
- Handle loading/error states with proper announcements

---

## 12. Props API

```ts
export interface NFTGridProps {
  /**
   * Optional section title
   * Passed to SectionHeading component
   */
  title?: string;
  
  /**
   * Optional section description
   * Passed to SectionHeading component
   */
  description?: string;
  
  /**
   * Show search bar above grid
   * @default false
   */
  showSearch?: boolean;
  
  /**
   * Search input placeholder text
   * @default "Search NFTs..."
   */
  searchPlaceholder?: string;
  
  /**
   * Search handler callback
   * Called when user submits search
   */
  onSearch?: (query: string) => void;
  
  /**
   * NFTCard children to display in grid
   * Should wrap each card with constraints:
   * <div className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]">
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
```

---

## 13. Usage

```tsx
import { NFTGrid } from '@/components/nft-grid';
import { NFTCard } from '@/components/nft-card';

// Basic usage (no header)
<NFTGrid>
  <div className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]">
    <NFTCard {...nftData1} />
  </div>
  <div className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]">
    <NFTCard {...nftData2} />
  </div>
</NFTGrid>

// With header
<NFTGrid
  title="Hot Bids"
  description="Browse the hottest NFTs from top creators"
>
  {products.map((product) => (
    <div 
      key={product.id} 
      className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]"
    >
      <NFTCard
        image={product.image}
        title={product.name}
        author={product.creator}
        price={product.priceEth}
        countdown={product.countdown}
      />
    </div>
  ))}
</NFTGrid>

// With search
<NFTGrid
  title="Explore NFTs"
  description="Search and discover unique digital art"
  showSearch={true}
  searchPlaceholder="Search by name or creator..."
  onSearch={handleSearch}
>
  {filteredProducts.map((product) => (
    <div 
      key={product.id} 
      className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]"
    >
      <NFTCard {...product} />
    </div>
  ))}
</NFTGrid>
```

---

## 14. Examples

### Complete API Integration Example
```tsx
'use client';

import { useState, useEffect } from 'react';
import { NFTGrid } from '@/components/nft-grid';
import { NFTCard } from '@/components/nft-card';

export function HotBidsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://devday-aavn-d5284e914439.herokuapp.com/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <NFTGrid title="Hot Bids" description="Loading...">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]">
            <div className="animate-pulse bg-glass-light rounded-card h-[380px]" />
          </div>
        ))}
      </NFTGrid>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <NFTGrid
      title="Hot Bids"
      description="Browse the hottest NFTs in today's marketplace"
      showSearch={true}
      searchPlaceholder="Search NFTs..."
      onSearch={(query) => console.log('Search:', query)}
    >
      {products.map((product) => (
        <div 
          key={product.id} 
          className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]"
        >
          <NFTCard
            image={product.image}
            title={product.name}
            author={product.creator}
            price={product.priceEth}
            countdown={product.auctionEnd}
            buttonText="Bid now"
            onButtonClick={() => console.log('Bid on', product.id)}
          />
        </div>
      ))}
    </NFTGrid>
  );
}
```

### With Search Filtering
```tsx
const [searchQuery, setSearchQuery] = useState('');

const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.creator.toLowerCase().includes(searchQuery.toLowerCase())
);

<NFTGrid
  title="Search Results"
  description={`Found ${filteredProducts.length} NFTs`}
  showSearch={true}
  onSearch={setSearchQuery}
>
  {filteredProducts.map((product) => (
    <div 
      key={product.id} 
      className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]"
    >
      <NFTCard {...product} />
    </div>
  ))}
</NFTGrid>
```

### Pagination Example
```tsx
const [page, setPage] = useState(1);
const itemsPerPage = 12;

const paginatedProducts = products.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);

<>
  <NFTGrid title="All NFTs" description={`Page ${page}`}>
    {paginatedProducts.map((product) => (
      <div 
        key={product.id} 
        className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]"
      >
        <NFTCard {...product} />
      </div>
    ))}
  </NFTGrid>
  
  <div className="flex justify-center gap-4 mt-8">
    <button onClick={() => setPage(p => Math.max(1, p - 1))}>
      Previous
    </button>
    <span>Page {page}</span>
    <button onClick={() => setPage(p => p + 1)}>
      Next
    </button>
  </div>
</>
```

---

## 15. API Integration

### Endpoint Details

**API URL:**
```
https://devday-aavn-d5284e914439.herokuapp.com/api/products
```

**Method:** GET  
**Response Type:** JSON Array  
**Total Products:** 23 items

### Response Structure

```json
[
  {
    "id": 1,
    "name": "Cryptic Hacker",
    "creator": "CodeMaster",
    "image": "https://api.example.com/images/nft-1.png",
    "priceEth": "3.75",
    "auctionEnd": "2025-10-16T18:30:00Z",
    "category": "Digital Art",
    "verified": true
  },
  // ... 22 more products
]
```

### Data Transformation

**API Field → Component Prop Mapping:**

| API Field | NFTCard Prop | Transformation |
|-----------|--------------|----------------|
| `id` | `key` | Used as React key |
| `name` | `title` | Direct mapping |
| `creator` | `author` | Direct mapping |
| `image` | `image` | Direct URL |
| `priceEth` | `price` | String format |
| `auctionEnd` | `countdown` | Parse ISO date → countdown object |
| `verified` | `verified` | Boolean |

**Countdown Transformation:**
```tsx
function parseCountdown(isoDate: string) {
  const now = new Date();
  const end = new Date(isoDate);
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) return null;
  
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
```

### Implementation Pattern

```tsx
// Fetch and transform data
useEffect(() => {
  async function fetchProducts() {
    try {
      const response = await fetch(
        'https://devday-aavn-d5284e914439.herokuapp.com/api/products'
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform API data to component props
      const transformedProducts = data.map(product => ({
        id: product.id,
        image: product.image,
        imageAlt: `${product.name} NFT artwork`,
        title: product.name,
        author: product.creator,
        verified: product.verified || false,
        countdown: product.auctionEnd 
          ? parseCountdown(product.auctionEnd)
          : null,
        price: product.priceEth,
        currency: 'ETH',
        buttonText: 'Bid now',
      }));
      
      setProducts(transformedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  fetchProducts();
}, []);
```

### Error Handling

**Network Errors:**
```tsx
try {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Network response was not ok');
  // ...
} catch (error) {
  setError('Failed to load NFTs. Please try again later.');
  console.error('API Error:', error);
}
```

**Empty Response:**
```tsx
const data = await response.json();
if (!data || data.length === 0) {
  setProducts([]);
  // Show empty state
}
```

**Timeout Handling:**
```tsx
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

try {
  const response = await fetch(API_URL, { signal: controller.signal });
  clearTimeout(timeoutId);
  // ...
} catch (error) {
  if (error.name === 'AbortError') {
    setError('Request timed out. Please try again.');
  }
}
```

### Loading States

**Skeleton Loading:**
```tsx
{isLoading && (
  <NFTGrid title="Hot Bids" description="Loading NFTs...">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]">
        <div className="animate-pulse bg-glass-light rounded-card p-4">
          <div className="w-[240px] h-[240px] bg-glass-dark rounded-lg mb-4" />
          <div className="h-4 bg-glass-dark rounded w-3/4 mb-2" />
          <div className="h-3 bg-glass-dark rounded w-1/2" />
        </div>
      </div>
    ))}
  </NFTGrid>
)}
```

### Caching Strategy

**Local Storage Cache:**
```tsx
const CACHE_KEY = 'nft-products-cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Check cache first
const cached = localStorage.getItem(CACHE_KEY);
if (cached) {
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp < CACHE_DURATION) {
    setProducts(data);
    setLoading(false);
    return;
  }
}

// Fetch and cache
const data = await response.json();
localStorage.setItem(CACHE_KEY, JSON.stringify({
  data,
  timestamp: Date.now(),
}));
```

### Mock Data (Development)

See `src/lib/mockData.ts` for development mock data structure:

```tsx
export const mockProducts = [
  {
    id: 1,
    name: 'Cryptic Hacker',
    creator: 'CodeMaster',
    image: '/images/nft-1.png',
    priceEth: '3.75',
    countdown: { hours: 4, minutes: 12, seconds: 34 },
  },
  // ... more mock data
];
```

---

## 16. Edge Cases

### No Cards
```tsx
// Empty grid
<NFTGrid title="Collection">
  {/* No children */}
</NFTGrid>

// Shows: Empty container with header only
```

**Solution:** Add empty state message
```tsx
{products.length === 0 && (
  <div className="text-center py-20">
    <p className="text-white text-xl">No NFTs found</p>
  </div>
)}
```

### Single Card
```tsx
// One card in grid
<NFTGrid>
  <div className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]">
    <NFTCard {...nft} />
  </div>
</NFTGrid>

// Behavior: Card respects max-width (432px), centers if space available
```

### Very Long Titles/Descriptions
```tsx
// Titles wrap naturally in SectionHeading
<NFTGrid
  title="This is a very long title that might wrap to multiple lines on mobile devices"
  description="An equally long description that provides context..."
>
```

**Recommendation:** Keep titles concise (2-5 words), descriptions under 100 characters

### Missing API Data
```tsx
// Handle missing fields gracefully
{products.map((product) => (
  <div key={product.id} className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]">
    <NFTCard
      image={product.image || '/placeholder-nft.png'}
      title={product.name || 'Untitled'}
      author={product.creator || 'Unknown'}
      price={product.priceEth || '0.00'}
      countdown={product.auctionEnd ? parseCountdown(product.auctionEnd) : null}
    />
  </div>
))}
```

### Overflow on Small Screens
```tsx
// Cards will wrap to single column on mobile
// Ensure container has proper padding
<NFTGrid className="px-4 sm:px-8">
```

### API Rate Limiting
```tsx
// Implement exponential backoff
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  try {
    return await fetch(url);
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithRetry(url, retries - 1, delay * 2);
  }
}
```

---

## 17. Performance

### Optimizations

**React.memo for Cards:**
```tsx
const MemoizedNFTCard = React.memo(NFTCard);

<NFTGrid>
  {products.map((product) => (
    <div key={product.id} className="basis-0 grow shrink-0 min-w-[314px] max-w-[432px]">
      <MemoizedNFTCard {...product} />
    </div>
  ))}
</NFTGrid>
```

**Virtualization (for large lists):**
```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

// For 100+ cards, consider virtualization
const rowVirtualizer = useVirtualizer({
  count: Math.ceil(products.length / 3),
  getScrollElement: () => parentRef.current,
  estimateSize: () => 500, // Estimated row height
});
```

**Lazy Loading Images:**
```tsx
// Next.js Image component handles this automatically
<Image
  src={product.image}
  loading="lazy"
  placeholder="blur"
  blurDataURL={generateBlurDataURL(product.image)}
/>
```

**Pagination vs Infinite Scroll:**
```tsx
// Pagination: Better for SEO, explicit navigation
const [page, setPage] = useState(1);
const itemsPerPage = 12;
const paginatedProducts = products.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);

// Infinite Scroll: Better UX for browsing
const { ref, inView } = useInView();
useEffect(() => {
  if (inView && hasMore) loadMore();
}, [inView]);
```

### Bundle Size
- Core component: ~2KB (gzipped)
- Dependencies: SectionHeading (~2KB), SearchBar (~3KB), NFTCard (~3KB)
- Total with dependencies: ~10KB (gzipped)

### Rendering Performance
- No inline styles (CSS classes only)
- Flexbox layout is GPU-accelerated
- Gap properties are performant
- No JavaScript layout calculations

### API Performance
- Cache API responses (5-minute TTL)
- Use SWR or React Query for data fetching
- Implement request deduplication
- Consider CDN for images

**SWR Example:**
```tsx
import useSWR from 'swr';

const { data: products, error, isLoading } = useSWR(
  'https://devday-aavn-d5284e914439.herokuapp.com/api/products',
  fetcher,
  { revalidateOnFocus: false, dedupingInterval: 5000 }
);
```

---

## 18. References

**Documentation:**
- Mapping: [`docs/mapping/nft-grid.md`](../mapping/nft-grid.md)
- Component Patterns: [`.github/instructions/component-patterns.instructions.md`](../../.github/instructions/component-patterns.instructions.md)
- Figma MCP: [`.github/instructions/figma-mcp.instructions.md`](../../.github/instructions/figma-mcp.instructions.md)

**Code:**
- Component: [`src/components/nft-grid/NFTGrid.tsx`](../../src/components/nft-grid/NFTGrid.tsx)
- Types: [`src/components/nft-grid/NFTGrid.types.ts`](../../src/components/nft-grid/NFTGrid.types.ts)
- Mock Data: [`src/lib/mockData.ts`](../../src/lib/mockData.ts)

**Design System:**
- Tokens: [`src/styles/tokens.css`](../../src/styles/tokens.css)
- Tailwind Config: [`tailwind.config.ts`](../../tailwind.config.ts)

**Figma:**
- Main Component: [Figma Frame 121:6103](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6103)
- Design File: [SkullCandy Design System](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy)

**Related Components:**
- NFTCard: [`docs/components/NFTCard.md`](./NFTCard.md) - Individual card component
- SectionHeading: [`docs/components/SectionHeading.md`](./SectionHeading.md) - Optional header
- SearchBar: [`docs/components/SearchBar.md`](./SearchBar.md) - Optional search functionality

**API:**
- Products Endpoint: `https://devday-aavn-d5284e914439.herokuapp.com/api/products`
- Response Format: JSON array with 23 product objects
- Integration: See [API Integration](#15-api-integration) section above

**External Resources:**
- Flexbox Guide: [CSS-Tricks Complete Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- Gap Property: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)
- React Performance: [React Docs](https://react.dev/learn/render-and-commit)
