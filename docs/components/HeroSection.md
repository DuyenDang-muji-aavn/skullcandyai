# HeroSection Component

| Property | Value |
|----------|-------|
| **Last Updated** | 2025-10-17 |
| **Status** | ✅ Implemented (Complete) |
| **Figma** | [Hero Section](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=465-1935) |
| **Node ID** | 465:1935 (Left), 124:6799 (Right) |

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
16. [References](#16-references)

## 1. Overview

Hero section component displaying the main landing page content with title, description, and CTA button. Left side contains text content, right side reserved for featured image/content.

**Key Features:**
- Large title with brand messaging
- Descriptive subtitle
- Primary CTA button
- Two-column layout (responsive)
- Featured content area

## 2. Specs

### Main Content (Left Side)

| Property | Value | Token |
|----------|-------|-------|
| **Width** | 644px (desktop) | - |
| **Min Height** | 1025px | - |
| **Padding Horizontal** | 40px | - |
| **Padding Top** | 176px | - |
| **Padding Bottom** | 64px | - |

### Intro Section

| Property | Value | Token |
|----------|-------|-------|
| **Gap** | 104px (to button) | - |
| **Title-Description Gap** | 32px | - |

### Featured Section (Right Side)

| Property | Value | Token |
|----------|-------|-------|
| **Width** | 793px | - |
| **Height** | 918px | - |
| **Implementation** | Interactive FeaturedSection component | - |
| **Components** | Decorative vectors, main image, 5 cards, countdown timer | - |
| **Status** | ✅ Implemented with 3D transforms and exact positioning | - |
| **Responsive** | Scales down on mobile (50%), tablet (60%), desktop (80-100%) | - |

### Featured Section Elements

| Element | Size | Position | Effects |
|---------|------|----------|---------|
| **Vector 5** | 243.82×484.80px | left: 392.99px, top: 191px | rotate(39.402deg) |
| **Vector 6** | 275.13×547.04px | left: -65px, top: 0 | rotate(39.402deg) |
| **Skull Image** | 517.45×548px | left: 94.87px, top: 72px | skew-x(-10.331deg), shadow |
| **HAPE Card** | 346.69×100.04px | left: 406px, top: 439.99px | glass border, blur 24.62px |
| **Latest Bid** | 344.04×105.62px | left: 35.63px, top: 559.89px | skew-x(-10.301deg) |
| **BID NOW!** | 201.36×73.99px | left: 501.51px, top: 60.72px | glass border, blur 13.38px |
| **Countdown** | 430×114.59px | left: 235px, top: 687.89px | 3 cards + separators |

## 3. Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| **Default** | Left content + placeholder right | Current implementation |
| **With Featured Content** | Left content + custom right content | Pass `featuredContent` prop |
| **With Background** | Custom background elements | Pass `background` prop |

## 4. Typography

### Title

| Property | Value | Token |
|----------|-------|-------|
| **Font Family** | Orbitron | `font-family-title` |
| **Font Weight** | Bold | `font-bold` |
| **Font Size** | 60px | `text-[60px]` |
| **Line Height** | 1.374 | `leading-[1.374]` |
| **Color** | White | `text-white` |

### Description

| Property | Value | Token |
|----------|-------|-------|
| **Font Family** | Outfit | `font-family-body` |
| **Font Weight** | Regular | `font-normal` |
| **Font Size** | 24px | `text-[24px]` |
| **Line Height** | 40px | `leading-[40px]` |
| **Color** | White | `text-white` |

## 5. Colors

| Element | Color | Token |
|---------|-------|-------|
| **Title Text** | #ffffff | `text-white` |
| **Description Text** | #ffffff | `text-white` |
| **Button Background** | Gradient | `--button-gradient` |
| **Button Text** | #ffffff | `text-white` |

## 6. Spacing

| Element | Property | Value |
|---------|----------|-------|
| **Container** | Horizontal Padding | 40px |
| **Container** | Top Padding | 176px |
| **Container** | Bottom Padding | 64px |
| **Intro Section** | Gap (Title → Description) | 32px |
| **Section Gap** | Intro → Button | 104px |
| **Button** | Horizontal Padding | 80px |
| **Button** | Vertical Padding | 18px |
| **Button** | Gap (internal) | 10px |

## 7. Effects

### Button

| Property | Value | Token |
|----------|-------|-------|
| **Backdrop Blur** | 100px | `backdrop-blur-glass` |
| **Border Radius** | 9999px | `rounded-[9999px]` |
| **Background** | Button Gradient | `--button-gradient` |

### Featured Section (Future)

| Property | Value | Token |
|----------|-------|-------|
| **Shadow** | Various cards | - |
| **Blur** | Glass morphism | - |
| **Transforms** | Skew, rotate | - |

## 8. Layout

### Desktop Structure

```tsx
<section> (flex, relative, min-h-[1025px])
  <div> (Left: 644px, padding: 40/176/64)
    <div> (Intro Section, gap: 32px)
      <h1>Title</h1>
      <p>Description</p>
    </div>
    <Button>CTA</Button>
  </div>
  <div> (Right: Featured content/placeholder)
    {featuredContent}
  </div>
</section>
```

### Flexbox Properties

| Element | Direction | Gap | Alignment |
|---------|-----------|-----|-----------|
| **Section** | row (lg), column (mobile) | - | - |
| **Left Content** | column | 104px | - |
| **Intro Section** | column | 32px | - |

## 9. Responsive

| Breakpoint | Behavior |
|------------|----------|
| **Mobile (< 1024px)** | Stack vertically, full width sections |
| **Desktop (≥ 1024px)** | Side-by-side layout, left: 644px, right: flex-1 |

**Classes:**
```
flex-col lg:flex-row
w-full lg:w-[644px]
```

## 10. States

### Button States

| State | Behavior |
|-------|----------|
| **Default** | Gradient background, white text |
| **Hover** | Brightness increase (via button component) |
| **Active** | Scale down (via button component) |
| **Focus** | Ring outline (via button component) |
| **Disabled** | Reduced opacity, no interaction |

## 11. Accessibility

### ARIA & Semantic HTML

- ✅ Uses semantic `<section>` element
- ✅ Proper heading hierarchy (`<h1>` for title)
- ✅ Descriptive button text
- ✅ Keyboard navigation (via Button component)
- ✅ Focus indicators on interactive elements

### Keyboard Navigation

| Key | Action |
|-----|--------|
| **Tab** | Focus on CTA button |
| **Enter/Space** | Activate button |
| **Shift+Tab** | Navigate backward |

### Screen Reader

- Title read as main heading (h1)
- Description provides context
- Button labeled clearly ("Explore")

## 12. Props API

```typescript
interface HeroSectionProps {
  /** Hero title text */
  title: string;
  
  /** Hero description text */
  description: string;
  
  /** Label for primary CTA button (default: "Explore") */
  ctaLabel?: string;
  
  /** Click handler for primary CTA */
  ctaOnClick?: () => void;
  
  /** Custom content for the featured area (right side) */
  featuredContent?: React.ReactNode;
  
  /** Background decorative elements */
  background?: React.ReactNode;
  
  /** Additional CSS classes */
  className?: string;
}
```

## 13. Usage

### Basic Usage

```tsx
import { HeroSection } from '@/components/hero-section';

function HomePage() {
  return (
    <HeroSection
      title="Discover, find, and sell Skull Candy NFT"
      description="The world's first and unlimited digital marketplace for Skull Candy tokens"
      ctaOnClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
    />
  );
}
```

### With Custom CTA Label

```tsx
<HeroSection
  title="Explore NFT Collections"
  description="Browse thousands of unique digital assets"
  ctaLabel="Get Started"
  ctaOnClick={handleGetStarted}
/>
```

### With Featured Content

```tsx
<HeroSection
  title="Discover, find, and sell Skull Candy NFT"
  description="The world's first and unlimited digital marketplace for Skull Candy tokens"
  featuredContent={
    <img 
      src="/featured-hero.png" 
      alt="Featured NFTs"
      className="w-full h-full object-contain"
    />
  }
/>
```

## 14. Examples

### Landing Page

```tsx
<HeroSection
  title="Discover, find, and sell Skull Candy NFT"
  description="The world's first and unlimited digital marketplace for Skull Candy tokens"
  ctaLabel="Explore"
  ctaOnClick={() => {
    document.getElementById('products')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }}
/>
```

### With Background Gradient

```tsx
<HeroSection
  title="Welcome to the Future"
  description="Experience the next generation of digital ownership"
  background={
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-50" />
  }
/>
```

## 15. Edge Cases

### Long Titles

- Title wraps naturally with line-height: 1.374
- Maximum 3-4 lines recommended
- Test with different viewport widths

### Long Descriptions

- Description wraps with line-height: 40px
- Keep under 2 lines for optimal readability
- Consider truncation for very long text

### Missing Props

- `ctaLabel` defaults to "Explore"
- `ctaOnClick` optional (button still renders)
- `featuredContent` shows placeholder if not provided

### Mobile Layout

- Sections stack vertically
- Full width on mobile
- Maintains padding proportions

## 16. References

**Related Components:**
- [Button](./Button.md) - CTA button component
- [Navbar](./Navbar.md) - Navigation above hero

**Related Docs:**
- [Component Patterns](../.github/instructions/component-patterns.instructions.md)
- [Figma MCP Rules](../.github/instructions/figma-mcp.instructions.md)

**Figma:**
- [Hero Section Design](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=465-1935)
- [Main Content Node: 121:6161](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6161)
- [Featured Section Node: 124:6799](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=124-6799)

**Code:**
- [`HeroSection.tsx`](../../src/components/hero-section/HeroSection.tsx)
- [`HeroSection.types.ts`](../../src/components/hero-section/HeroSection.types.ts)

---

**Implementation Notes:**
- ✅ Left side (Main Content) implemented with exact Figma specs
- 🚧 Right side (Featured Section) to be implemented as image
- Uses design tokens for typography and spacing
- Fully responsive with mobile-first approach
