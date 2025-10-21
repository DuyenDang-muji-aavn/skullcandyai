# NFTCard

| Property       | Value                                                   |
| -------------- | ------------------------------------------------------- |
| **Last Updated** | 2025-10-16                                            |
| **Status**       | ✅ Implemented                                          |
| **Figma**        | [Link to Figma node](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=5-1788) |
| **Node ID**      | 5:1788                                                 |

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
15. [Edge Cases](#15-edge-cases)
16. [Theming](#16-theming)
17. [Performance](#17-performance)
18. [References](#18-references)

---

## 1. Overview

The NFTCard component is a glass morphism-styled card that displays NFT artwork with metadata including title, author, countdown timer, price, and action button. It features a unique design where the 240×240px image sits at the top with a glass-dark info container below displaying all metadata and call-to-action.

The component uses the dark glass aesthetic with backdrop blur effects for a modern, semi-transparent look that works beautifully on gradient backgrounds.

---

## 2. Specs

| Property        | Value       | Token                |
| --------------- | ----------- | -------------------- |
| Width           | Auto (fills grid) | - |
| Height          | Auto (content-based) | - |
| Image Size      | 240×240px   | Fixed square |
| Border Radius   | 24px        | `rounded-card` |
| Backdrop Blur   | 100px       | `backdrop-blur-glass` (Figma 200 ÷ 2) |
| Container Background | rgba(0,0,0,0.1) | `bg-glass-dark` |
| Padding         | 16px        | `p-4` |

---

## 3. Variants

**1 Variant:** Property 1=List (default display mode)

| Variant Name | Description                     | Props                   | Figma Node |
| ------------ | ------------------------------- | ----------------------- | ---------- |
| List         | Standard card display with all metadata | Default props | 5:1788 |

**Note:** Future variants could include: Grid (compact), Featured (large), Minimal (image + title only)

---

## 4. Typography

| Element        | Font Family | Font Size | Font Weight | Token                 |
| -------------- | ----------- | --------- | ----------- | --------------------- |
| Title          | Orbitron    | 18px      | 700 (Bold)  | `font-family-title`, `text-card-title-nft`  |
| Author         | Outfit      | 16px      | 400 (Regular) | `font-family-body`, `text-card-author` |
| Countdown      | Outfit      | 16px      | 700 (Bold)  | `font-family-body`, `text-card-badge` |
| Price          | Outfit      | 18px      | 700 (Bold)  | `font-family-body`, `text-card-price-nft` |

**Classes:**
- Title: `font-family-title font-bold text-card-title-nft text-white`
- Author: `font-family-body font-normal opacity-70 text-card-author text-white`
- Countdown: `font-family-body font-bold text-card-badge text-white`
- Price: `font-family-body font-bold text-card-price-nft text-white`

---

## 5. Colors

| Element             | Color Token         | Value               | Usage |
| ------------------- | ------------------- | ------------------- | ----- |
| Container Background | `bg-glass-dark`     | rgba(0,0,0,0.1)     | Main card background |
| Text (all)          | `text-white`        | #ffffff             | All text content |
| Author (dimmed)     | `text-white opacity-70` | rgba(255,255,255,0.7) | Secondary text |
| Button (integrated) | Button component    | Uses Button tokens  | See Button component |

---

## 6. Spacing

| Property       | Value | Token        |
| -------------- | ----- | ------------ |
| Container Padding | 16px | `p-4`     |
| Container Gap  | 16px  | `gap-4`      |
| Image Gap      | 8px   | `gap-2`      |
| Title/Author Gap | 4px | `gap-0.5`  |
| Price/Button Gap | Space between | `justify-between` |
| Icon/Text Gap  | 8px   | `gap-2`      |

**Layout Spacing:**
- Image Container: `gap-2` between potential multiple images
- Info Container: `gap-4` between title section and price section
- Title Container: `gap-0.5` between title and author
- Price Container: `gap-2` between icon and price text

---

## 7. Effects

| Effect          | Class                  | Token                | Usage |
| --------------- | ---------------------- | -------------------- | ----- |
| Backdrop Blur   | `backdrop-blur-glass`  | `--glass-blur` (100px) | Info container |
| Background Tint | `bg-glass-dark`        | `--glass-dark`       | Dark glass effect |
| Image Rounding  | `rounded-lg`           | -                    | Image corners |
| Card Hover      | `hover:shadow-card-hover` | `--shadow-card-hover` | Subtle lift on hover |
| Transition      | `transition-all duration-300` | - | Smooth state changes |

**Note:** Figma Glass Blur/Amount: 200 → CSS 100px (divide by 2)

---

## 8. Layout

```tsx
// Structure
<div className="backdrop-blur-glass bg-glass-dark rounded-card p-4 flex flex-col items-center">
  {/* Image Container */}
  <div className="flex gap-2 items-center justify-center w-full z-[2]">
    <Image src={image} width={240} height={240} />
  </div>
  
  {/* Info Container */}
  <div className="flex flex-col gap-4 w-full">
    {/* Title + Author + Countdown */}
    <div className="flex items-end justify-between w-full">
      <div className="flex flex-col gap-0.5">
        <h3>Title</h3>
        <p>Author</p>
      </div>
      <time>Countdown</time>
    </div>
    
    {/* Price + Button */}
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-2 items-center">
        <Image src={icon} width={32} height={32} />
        <div>Price + Currency</div>
      </div>
      <Button />
    </div>
  </div>
</div>
```

**Layout Classes:**
- Display: `flex flex-col`
- Alignment: `items-center` (horizontally center content)
- Width: `w-full` for inner sections
- Z-index: Image container `z-[2]`, Info container `z-[1]`

---

## 9. Responsive

| Breakpoint | Behavior                        | Notes |
| ---------- | ------------------------------- | ----- |
| Mobile     | Single column grid              | 1 card per row |
| Tablet     | 2-column grid                   | 2 cards per row |
| Desktop    | 3-column grid                   | 3 cards per row |
| Wide       | 4-column grid (optional)        | 4 cards per row |

**Grid Integration:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <NFTCard />
  <NFTCard />
  <NFTCard />
</div>
```

**Card Dimensions:**
- Min width: 314px
- Max width: 432px
- Width: Auto-fits to grid container
- Height: Auto-adjusts to content

---

## 10. States

| State    | Behavior/Class                 | Visual Effect |
| -------- | ------------------------------ | ------------- |
| Default  | Base styles                    | Static card |
| Hover    | `hover:shadow-card-hover`      | Subtle shadow lift |
| Focus    | Button receives focus          | Button has focus ring |
| Loading  | Image lazy loading             | Blur-up placeholder |
| No Countdown | Countdown hidden            | More space for title/author |

**Implementation:**
```tsx
// Hover effect on card
<div className="group hover:shadow-card-hover transition-all duration-300">

// Button states
<Button size="M" style="Neutral" onClick={onButtonClick}>
  {buttonText}
</Button>

// Conditional countdown
{countdown && (
  <time>{countdownDisplay}</time>
)}
```

---

## 11. Accessibility

**ARIA Attributes:**
- Card container: `aria-label="NFT: {title} by {author}"`
- Countdown: `aria-label="Auction ends in {hours} hours, {minutes} minutes, {seconds} seconds"`
- Price: `aria-label="Price: {price} {currency}"`
- Image: `alt="{title} NFT artwork"`

**Keyboard Support:**
- `Tab`: Focus button
- `Enter/Space`: Activate button (handled by Button component)

**Screen Reader:**
- Card announces as article with descriptive label
- All text content is accessible
- Image has meaningful alt text
- Countdown provides context for auction end time

**Focus Management:**
- Button is the only focusable element
- Focus ring provided by Button component
- Tab order: natural flow through cards in grid

**Best Practices:**
```tsx
// ✅ Good - Descriptive labels
<NFTCard
  image="/nft.png"
  imageAlt="Colorful abstract digital artwork"
  title="Digital Dreams"
  author="ArtistName"
  price="3.75"
/>

// ❌ Bad - Missing alt text
<NFTCard image="/nft.png" title="NFT" author="Unknown" />
```

**Contrast:**
- White text on dark glass background: Meets WCAG AA
- Button contrast: Handled by Button component (WCAG AA compliant)

---

## 12. Props API

```ts
export interface NFTCardProps {
  /**
   * NFT image URL (required)
   */
  image: string;
  
  /**
   * Alt text for image
   * @default "{title} NFT artwork"
   */
  imageAlt?: string;
  
  /**
   * NFT title (required)
   */
  title: string;
  
  /**
   * Creator/author name (required)
   */
  author: string;
  
  /**
   * Show verified badge next to author
   * @default false
   */
  verified?: boolean;
  
  /**
   * Countdown timer for auction/sale end
   * Optional - hides countdown if not provided
   */
  countdown?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  
  /**
   * Current price (required)
   * @example "3.75"
   */
  price: string;
  
  /**
   * Currency code
   * @default "ETH"
   */
  currency?: string;
  
  /**
   * Currency icon URL
   * @default "/ethereum-icon.svg"
   */
  currencyIcon?: string;
  
  /**
   * Button text
   * @default "Bid now"
   */
  buttonText?: string;
  
  /**
   * Button click handler
   */
  onButtonClick?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
```

---

## 13. Usage

```tsx
import { NFTCard } from '@/components/nft-card';

// Basic usage
<NFTCard
  image="/images/nft-artwork.png"
  title="Cryptic Hacker"
  author="CodeMaster"
  price="3.75"
/>

// With countdown
<NFTCard
  image="/images/nft-artwork.png"
  title="Digital Dreams"
  author="ArtistName"
  countdown={{ hours: 4, minutes: 12, seconds: 34 }}
  price="5.50"
  onButtonClick={() => console.log('Bid clicked')}
/>

// With all props
<NFTCard
  image="/images/nft-artwork.png"
  imageAlt="Colorful abstract digital artwork"
  title="Cosmic Collection"
  author="SpaceArtist"
  verified={true}
  countdown={{ hours: 2, minutes: 30, seconds: 0 }}
  price="8.25"
  currency="ETH"
  currencyIcon="/ethereum-icon.svg"
  buttonText="Place Bid"
  onButtonClick={handleBidClick}
  className="custom-card-class"
/>
```

---

## 14. Examples

### Grid Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {nfts.map((nft) => (
    <NFTCard
      key={nft.id}
      image={nft.image}
      title={nft.name}
      author={nft.creator}
      countdown={parseCountdown(nft.auctionEnd)}
      price={nft.priceEth}
      onButtonClick={() => handleBid(nft.id)}
    />
  ))}
</div>
```

### With Live Countdown
```tsx
const [countdown, setCountdown] = useState({ hours: 5, minutes: 30, seconds: 0 });

useEffect(() => {
  const interval = setInterval(() => {
    setCountdown(prev => {
      const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
      if (totalSeconds <= 0) return { hours: 0, minutes: 0, seconds: 0 };
      
      return {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      };
    });
  }, 1000);
  
  return () => clearInterval(interval);
}, []);

<NFTCard
  image="/nft.png"
  title="Limited Edition"
  author="Artist"
  countdown={countdown}
  price="2.50"
/>
```

### No Countdown
```tsx
<NFTCard
  image="/nft.png"
  title="Permanent Collection"
  author="Museum"
  price="10.00"
  buttonText="Buy Now"
/>
```

### Verified Creator
```tsx
<NFTCard
  image="/nft.png"
  title="Verified Art"
  author="Famous Artist"
  verified={true}
  price="50.00"
/>
```

---

## 15. Edge Cases

### Long Titles
```tsx
// Title wraps naturally
<NFTCard
  title="This is a very long NFT title that might wrap to multiple lines"
  author="Artist"
  image="/nft.png"
  price="3.75"
/>
```

**Recommendation:** Keep titles concise (1-4 words). Consider truncating with ellipsis for very long titles.

### Missing Image
```tsx
// Provide fallback or placeholder
<NFTCard
  image={nft.image || '/placeholder-nft.png'}
  title={nft.title}
  author={nft.author}
  price={nft.price}
/>
```

### Zero Countdown
```tsx
// Component handles zero countdown gracefully
<NFTCard
  countdown={{ hours: 0, minutes: 0, seconds: 0 }}
  title="Auction Ended"
  author="Artist"
  image="/nft.png"
  price="3.75"
  buttonText="View Result"
/>
```

### No Countdown Data
```tsx
// Countdown section hides automatically
<NFTCard
  title="Fixed Price"
  author="Artist"
  image="/nft.png"
  price="3.75"
/>
```

### Very High Prices
```tsx
// Handle large numbers appropriately
<NFTCard
  price="1,234.56"
  title="Premium NFT"
  author="Artist"
  image="/nft.png"
/>
```

### Button Disabled State
```tsx
// Use Button component's disabled prop
<NFTCard
  title="Sold Out"
  author="Artist"
  image="/nft.png"
  price="3.75"
  buttonText="Sold"
  onButtonClick={undefined} // No handler = disabled appearance
/>
```

---

## 16. Theming

### Dark Mode Support
The NFTCard is designed for gradient backgrounds and uses dark glass aesthetic. It does not require separate dark mode variants.

### Custom Styling
```tsx
// Add custom classes via className prop
<NFTCard
  className="hover:scale-105 transition-transform"
  title="Animated Card"
  author="Artist"
  image="/nft.png"
  price="3.75"
/>
```

### Token Customization
Modify design tokens in `src/styles/tokens.css`:

```css
:root {
  --glass-dark: rgba(0, 0, 0, 0.15);     /* Darker glass */
  --glass-blur: 150px;                    /* More blur */
  --radius-card: 32px;                    /* Larger radius */
  --text-card-title-nft: 20px;           /* Larger title */
}
```

### Component Variants
Extend with new display modes:

```tsx
// Add compact variant (future)
<NFTCard
  variant="compact"
  image="/nft.png"
  title="Quick View"
  author="Artist"
  price="3.75"
/>

// Add featured variant (future)
<NFTCard
  variant="featured"
  image="/nft.png"
  title="Spotlight"
  author="Artist"
  price="3.75"
  description="Additional description for featured cards"
/>
```

---

## 17. Performance

### Optimizations
- **Next.js Image**: Automatic optimization, lazy loading, blur-up placeholder
- **Live Countdown**: Efficient useEffect with cleanup, pauses when unmounted
- **Static Props**: No unnecessary re-renders for static content
- **Memoization**: Countdown calculations cached until state changes

### Bundle Size
- Core component: ~3KB (gzipped)
- Dependencies: Button (~4KB), Next.js Image (included)
- Total: ~7KB (gzipped)

### Best Practices
```tsx
// ✅ Good - Memoize handlers
const handleBidClick = useCallback(() => {
  placeBid(nft.id);
}, [nft.id]);

<NFTCard
  image={nft.image}
  title={nft.title}
  author={nft.author}
  price={nft.price}
  onButtonClick={handleBidClick}
/>

// ✅ Good - Lazy load images
<NFTCard
  image="/large-nft.png"
  loading="lazy"
  title="NFT"
  author="Artist"
  price="3.75"
/>

// ❌ Avoid - Inline handlers cause re-renders
<NFTCard
  onButtonClick={() => console.log('clicked')}
  {...props}
/>
```

### Rendering Performance
- No inline styles (except margin overrides)
- CSS custom properties enable instant theme switching
- Backdrop blur is GPU-accelerated
- Image lazy loading reduces initial page load

### Countdown Timer
- Updates only once per second
- Cleanup on unmount prevents memory leaks
- Conditional rendering avoids unnecessary DOM updates

---

## 18. References

**Documentation:**
- Mapping: [`docs/mapping/nft-card.md`](../mapping/nft-card.md)
- Component Patterns: [`.github/instructions/component-patterns.instructions.md`](../../.github/instructions/component-patterns.instructions.md)
- Figma MCP: [`.github/instructions/figma-mcp.instructions.md`](../../.github/instructions/figma-mcp.instructions.md)

**Code:**
- Component: [`src/components/nft-card/NFTCard.tsx`](../../src/components/nft-card/NFTCard.tsx)
- Types: [`src/components/nft-card/NFTCard.types.ts`](../../src/components/nft-card/NFTCard.types.ts)
- Client Wrapper: [`src/components/nft-card-client/NFTCardClient.tsx`](../../src/components/nft-card-client/NFTCardClient.tsx)

**Design System:**
- Tokens: [`src/styles/tokens.css`](../../src/styles/tokens.css)
- Tailwind Config: [`tailwind.config.ts`](../../tailwind.config.ts)
- Global Styles: [`src/styles/globals.css`](../../src/styles/globals.css)

**Figma:**
- Main Component: [Figma Frame 5:1788](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=5-1788)
- Design File: [SkullCandy Design System](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy)
- Image Container: Node 297:3977
- Info Container: Node 5:1770

**Related Components:**
- Button: [`src/components/button/Button.tsx`](../../src/components/button/Button.tsx) - Integrated for action button
- NFTGrid: [`src/components/nft-grid/NFTGrid.tsx`](../../src/components/nft-grid/NFTGrid.tsx) - Grid container for cards
