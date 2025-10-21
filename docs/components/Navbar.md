# Navbar Component

| Property | Value |
|----------|-------|
| **Last Updated** | 2025-10-17 |
| **Status** | ✅ Implemented |
| **Figma** | [Navbar Design](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=133-2226) |
| **Node ID** | 133:2226 |

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

Top navigation bar component with logo, navigation links, and glass morphism effect. Sticky by default to remain visible when scrolling.

**Key Features:**
- Logo with icon and text
- 3 navigation items (Market, Features, Community)
- Glass morphism backdrop blur effect
- Sticky positioning (default)
- Responsive layout

## 2. Specs

### Header Container (Node 133:2226)

| Property | Value | Token |
|----------|-------|-------|
| **Width** | 1366px (full viewport) | `w-full` |
| **Height** | 91px | Auto (content-based) |
| **Padding Horizontal** | 40px | `px-[40px]` |
| **Padding Vertical** | 24px | `py-[24px]` |
| **Gap** | 8px | `gap-[8px]` |
| **Backdrop Blur** | 100px | `backdrop-blur-[100px]` |

### Logo (Node 121:6178)

| Property | Value | Token |
|----------|-------|-------|
| **Width** | 179px | Auto (content-based) |
| **Height** | 24px | Auto (icon + text) |
| **Icon Size** | 24×24px | `h-6 w-6` |
| **Gap** | 8px | `gap-[8px]` |

### Navigation (Node 121:6179)

| Property | Value | Token |
|----------|-------|-------|
| **Width** | 552px | `w-[552px]` |
| **Height** | 43px | Auto (padding + text) |
| **Padding Horizontal** | 16px | `px-[16px]` |
| **Padding Vertical** | 10px | `py-[10px]` |
| **Gap** | 16px | `gap-[16px]` |

## 3. Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| **Sticky (Default)** | Stays at top when scrolling | Standard behavior |
| **Non-Sticky** | Scrolls with page | Special cases (pass `sticky={false}`) |

## 4. Typography

### Logo Text

| Property | Value | Token |
|----------|-------|-------|
| **Font Family** | Orbitron | `font-orbitron` |
| **Font Weight** | Bold | `font-bold` |
| **Font Size** | 18px | `text-[18px]` |
| **Line Height** | Normal | `leading-normal` |
| **Color** | White | `text-white` |
| **Text Transform** | Uppercase (via content) | - |

### Navigation Links

| Property | Value | Token |
|----------|-------|-------|
| **Font Family** | Orbitron | `font-orbitron` |
| **Font Weight** | Bold | `font-bold` |
| **Font Size** | 18px | `text-[18px]` |
| **Line Height** | Normal | `leading-normal` |
| **Text Align** | Center | `text-center` |
| **Color** | White | `text-white` |

## 5. Colors

| Element | Color | Token |
|---------|-------|-------|
| **Logo Text** | #ffffff | `text-white` |
| **Nav Links** | #ffffff | `text-white` |
| **Nav Links Hover** | #ffffff (80% opacity) | `hover:opacity-80` |
| **Background** | Transparent with blur | - |

## 6. Spacing

### Container

| Property | Value | Token |
|----------|-------|-------|
| **Padding Horizontal** | 40px | `px-[40px]` |
| **Padding Vertical** | 24px | `py-[24px]` |
| **Gap (internal)** | 8px | `gap-[8px]` |

### Logo

| Property | Value | Token |
|----------|-------|-------|
| **Gap (icon to text)** | 8px | `gap-[8px]` |

### Navigation

| Property | Value | Token |
|----------|-------|-------|
| **Padding Horizontal** | 16px | `px-[16px]` |
| **Padding Vertical** | 10px | `py-[10px]` |
| **Gap (between links)** | 16px | `gap-[16px]` |

## 7. Effects

### Backdrop Blur

| Property | Value | Token |
|----------|-------|-------|
| **Blur Amount** | 100px | `backdrop-blur-[100px]` |
| **Backdrop Filter** | Required | `backdrop-filter` |
| **Figma Source** | 200 (÷2) | `--glass-blur-amount: 200` |

**Note:** Figma blur value (200) must be divided by 2 for CSS (100px).

### Sticky Positioning

| Property | Value | Token |
|----------|-------|-------|
| **Position** | Sticky | `sticky` |
| **Top** | 0 | `top-0` |
| **Z-Index** | 50 | `z-50` |

## 8. Layout

### Structure

```tsx
<header> (backdrop-blur, sticky)
  <div> (header inner, flex justify-between)
    <div> (logo, flex gap-2)
      <div> (icon, 24×24)
        <Image />
      </div>
      <p>SKULLCANDY</p>
    </div>
    <nav> (navigation, flex gap-4)
      <a>Market</a>
      <Link>Features</Link>
      <Link>Community</Link>
    </nav>
  </div>
</header>
```

### Flexbox Properties

| Element | Direction | Justify | Align | Gap |
|---------|-----------|---------|-------|-----|
| **Header Container** | column | - | flex-start | 8px |
| **Header Inner** | row | space-between | center | - |
| **Logo** | row | - | flex-start | 8px |
| **Navigation** | row | - | flex-start | 16px |

## 9. Responsive

| Breakpoint | Behavior |
|------------|----------|
| **Mobile (< 768px)** | Full width, stack on small screens |
| **Tablet (768px - 1024px)** | Full width, side-by-side layout |
| **Desktop (≥ 1024px)** | Full width (max 1366px), side-by-side layout |

**Current Implementation:**
- Logo and nav remain in row layout at all sizes
- Nav items use `flex-1` to distribute evenly
- Minimum width constraints prevent overcrowding

## 10. States

### Navigation Links

| State | Behavior | Classes |
|-------|----------|---------|
| **Default** | White text, 100% opacity | `text-white` |
| **Hover** | White text, 80% opacity | `hover:opacity-80` |
| **Active** | Same as hover | - |
| **Focus** | Browser default outline | - |
| **Visited** | Same as default | - |

### Sticky Behavior

| Scroll Position | Behavior |
|----------------|----------|
| **At Top** | Normal position, part of flow |
| **Scrolled** | Fixed at top, stays visible |

## 11. Accessibility

### ARIA & Semantic HTML

- ✅ Uses semantic `<header>` element
- ✅ Uses semantic `<nav>` element
- ✅ Logo text readable by screen readers
- ✅ Navigation links are native `<a>` and Next.js `<Link>`
- ✅ Alt text on logo icon
- ✅ Keyboard navigation supported

### Keyboard Navigation

| Key | Action |
|-----|--------|
| **Tab** | Focus next nav link |
| **Shift+Tab** | Focus previous nav link |
| **Enter** | Activate focused link |
| **Space** | Activate focused link |

### Screen Reader

- Header announced as landmark
- Navigation announced as navigation region
- Logo text: "SkullCandy Logo SKULLCANDY"
- Each link announced with text

### Color Contrast

- ✅ White text on gradient background meets WCAG AA
- ✅ Backdrop blur ensures readability
- ✅ Hover state (80% opacity) still readable

## 12. Props API

```typescript
interface NavbarProps {
  /** Whether the navbar should stick to top when scrolling (default: true) */
  sticky?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}
```

### Prop Details

#### `sticky` (optional)
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Controls sticky positioning behavior
- **Example:** `<Navbar sticky={false} />` for non-sticky

#### `className` (optional)
- **Type:** `string`
- **Default:** `''`
- **Description:** Additional Tailwind classes to apply
- **Example:** `<Navbar className="shadow-lg" />`

## 13. Usage

### Basic Usage

```tsx
import { Navbar } from '@/components/navbar';

function Layout() {
  return (
    <>
      <Navbar />
      {/* Page content */}
    </>
  );
}
```

### Non-Sticky Navbar

```tsx
<Navbar sticky={false} />
```

### With Additional Classes

```tsx
<Navbar className="shadow-xl" />
```

## 14. Examples

### Standard Page Layout

```tsx
import { Navbar } from '@/components/navbar';

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-600 to-purple-600" />
      
      {/* Navbar - Sticky by default */}
      <Navbar />
      
      {/* Content */}
      <main>
        {/* Your content here */}
      </main>
    </div>
  );
}
```

### With Scroll Handler

```tsx
'use client';

import { Navbar } from '@/components/navbar';
import { useEffect, useState } from 'react';

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <Navbar className={scrolled ? 'shadow-lg' : ''} />
      {/* Content */}
    </>
  );
}
```

### Navigation Link Behavior

**Market Link:**
- Scrolls to products section on same page
- Uses `href="#market"` with `scrollIntoView`

**Features Link:**
- Navigates to `/features` page
- Uses Next.js `<Link>` component

**Community Link:**
- Navigates to `/community` page
- Uses Next.js `<Link>` component

## 15. Edge Cases

### Parent Container Constraints

**Issue:** Sticky positioning requires proper parent structure

```tsx
// ❌ BAD - overflow-hidden blocks sticky
<div className="overflow-hidden">
  <Navbar />  {/* Won't stick! */}
</div>

// ✅ GOOD - No overflow constraint
<div className="relative">
  <Navbar />  {/* Will stick! */}
</div>
```

### Z-Index Conflicts

**Issue:** Other elements may cover navbar

**Solution:** Navbar uses `z-50`, ensure other sticky/fixed elements use lower z-index or are coordinated

### Long Logo Text

**Issue:** Logo text might wrap on narrow screens

**Solution:** Uses `whitespace-nowrap` to prevent wrapping, `text-nowrap` class

### Navigation Overflow

**Issue:** 3 links fit in 552px, but more links would overflow

**Solution:** Current design supports exactly 3 links, additional links would require redesign

## 16. References

**Related Components:**
- [HeroSection](./HeroSection.md) - Section below navbar
- [Button](./Button.md) - CTA buttons used in nav (future)

**Related Docs:**
- [Component Patterns](../.github/instructions/component-patterns.instructions.md)
- [Figma MCP Rules](../.github/instructions/figma-mcp.instructions.md)
- [Documentation Standards](../.github/instructions/documentation-standards.instructions.md)

**Figma:**
- [Navbar Design](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=133-2226)
- [Header Container: 133:2226](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=133-2226)
- [Header: 121:6177](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6177)
- [Logo: 121:6178](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6178)
- [Navigation: 121:6179](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6179)

**Code:**
- [`Navbar.tsx`](../../src/components/navbar/Navbar.tsx)
- [`Navbar.types.ts`](../../src/components/navbar/Navbar.types.ts)

**Assets:**
- Logo Icon: `http://localhost:3845/assets/6ad9cb58d31a676bc7d5f5fbc051e93c41e2e5b4.svg`

---

**Implementation Notes:**
- ✅ Sticky positioning by default
- ✅ Exact blur value (100px from Figma 200 ÷ 2)
- ✅ All spacing from Figma metadata
- ✅ Glass morphism effect with backdrop-filter
- ✅ Keyboard and screen reader accessible
- ✅ No `overflow-hidden` on parent (required for sticky)
