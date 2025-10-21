# Section Heading Component - Updated Specification

| Property | Value |
|----------|-------|
| **Last Updated** | 2025-10-16 |
| **Status** | ✅ Implemented |
| **Figma** | [Header Node 121:6098](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6098) |
| **Node ID** | 121:6098 |

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
17. [Component Structure](#17-component-structure)
18. [Design Decisions](#18-design-decisions)

## 1. Overview

Section Heading component with integrated SearchBar. Displays a title, optional description, and search input in a centered vertical layout. Used as the header for main content sections.

## 2. Specs

| Property | Value | Token |
|----------|-------|-------|
| **Container Gap** | 80px | - |
| **Title Section Gap** | 16px | - |
| **Width** | 100% (full width) | - |
| **Alignment** | Center (default) | - |

### Title Specs

| Property | Value | Token |
|----------|-------|-------|
| **Font** | Orbitron Bold | `--font-family-title` |
| **Size** | 38px | - |
| **Letter Spacing** | 1.9px | - |
| **Transform** | Uppercase | - |
| **Color** | White (#ffffff) | `--color-text` |
| **Max Width** | 649px | - |
| **Line Height** | Normal | - |

### Description Specs

| Property | Value | Token |
|----------|-------|-------|
| **Font** | Outfit Regular | `--font-family-body` |
| **Size** | 20px | - |
| **Color** | White (#ffffff) | `--color-text` |
| **Opacity** | 70% | - |
| **Max Width** | 744px | - |
| **Line Height** | Normal | - |

### Search Bar Specs

| Property | Value | Token |
|----------|-------|-------|
| **Width** | 420px | - |
| **Height** | 56px | - |
| **Border Radius** | 24px | - |
| **Background** | rgba(0,0,0,0.1) | `--glass-dark` |
| **Border** | 1px solid white | - |

## 3. Variants

| Variant | Description | Usage |
|---------|-------------|-------|
| **Center** (default) | Title and description centered | Main sections |
| **Left** | Title and description left-aligned | Alternative layout |

## 4. Typography

| Element | Font Family | Size | Weight | Spacing | Transform |
|---------|-------------|------|--------|---------|-----------|
| **Title** | Orbitron | 38px | Bold | 1.9px | Uppercase |
| **Description** | Outfit | 20px | Regular | Normal | None |

## 5. Colors

| Element | Color | Token | Usage |
|---------|-------|-------|-------|
| **Title** | #ffffff | `--color-text` | Main text |
| **Description** | #ffffff @ 70% | `--color-text` | Secondary text |
| **Search Background** | #0000001a | `--glass-dark` | Glass effect |
| **Search Border** | #ffffff | - | Border |

## 6. Spacing

| Property | Value | Token |
|----------|-------|-------|
| **Container Gap** | 80px | - |
| **Title Section Gap** | 16px | - |

## 7. Effects

| Property | Value | Token |
|----------|-------|-------|
| **Search Background** | Glass morphism (rgba(0,0,0,0.1)) | `--glass-dark` |
| **Search Border** | 1px solid white | - |

## 8. Layout

```tsx
<div className="flex flex-col gap-[80px] w-full items-center">
  {/* Title Section */}
  <div className="flex flex-col gap-[16px] w-full text-center">
    <h2>Title</h2>
    <p>Description</p>
  </div>
  
  {/* Search Bar */}
  <SearchBar />
</div>
```

## 9. Responsive

| Breakpoint | Behavior |
|------------|----------|
| **Mobile** | Full width, centered, stack vertically |
| **Tablet** | Same as mobile |
| **Desktop** | Same as mobile |

## 10. States

| State | Behavior |
|-------|----------|
| **Default** | Title, description, and search visible |
| **No Description** | Title and search only |

## 11. Accessibility

- ✅ Semantic HTML: `<h2>` for title, `<p>` for description
- ✅ Proper heading hierarchy
- ✅ Search input accessible via SearchBar component
- ✅ Keyboard navigation supported
- ✅ Screen reader friendly
- ✅ Color contrast: White text on gradient background (WCAG AA)
- ✅ Multi-line description support

## 12. Props API

```typescript
export interface SectionHeadingProps {
  /** Main title text (displayed in Orbitron, 38px, uppercase) */
  title: string;
  
  /** Optional description text (supports multi-line, displayed in Outfit, 20px) */
  description?: string;
  
  /** Text alignment */
  align?: 'left' | 'center';
  
  /** Optional search placeholder text (default: "Search by topics or collections") */
  searchPlaceholder?: string;
  
  /** Additional CSS classes */
  className?: string;
}
```

## 13. Usage

```tsx
import { SectionHeading } from '@/components/section-heading';

// Basic usage
<SectionHeading
  title="MONTHLY SKULL CANDIES"
  description="Discover one of the most cutest NFT creations created for you."
/>

// With custom search placeholder
<SectionHeading
  title="TRENDING COLLECTIONS"
  description="Browse popular collections"
  searchPlaceholder="Search collections..."
/>

// Left-aligned
<SectionHeading
  title="LATEST DROPS"
  align="left"
/>
```

## 14. Examples

### Example 1: Main Section Header
```tsx
<SectionHeading
  title="MONTHLY SKULL CANDIES"
  description="Discover one of the most cutest NFT creations created for you. Place your bid
and be the first to have these treasures. All of the artworks are limited selections."
/>
```

### Example 2: Simple Header
```tsx
<SectionHeading
  title="EXPLORE COLLECTIONS"
/>
```

### Example 3: Custom Search Placeholder
```tsx
<SectionHeading
  title="FIND YOUR NFT"
  description="Search through thousands of unique artworks"
  searchPlaceholder="Enter NFT name or ID..."
/>
```

## 15. Edge Cases

- ✅ **No description**: Component renders title and search only
- ✅ **Long title**: Max width 649px with auto centering
- ✅ **Multi-line description**: Supports `\n` with `whitespace-pre-line`
- ✅ **Empty search**: SearchBar component handles validation
- ✅ **Custom alignment**: Left/center alignment supported

## 16. References

**Related Components:**
- [SearchBar](./SearchBar.md)
- [NFTGrid](./NFTGrid.md)

**Related Docs:**
- [Component Patterns](../.github/instructions/component-patterns.instructions.md)
- [Figma MCP](../.github/instructions/figma-mcp.instructions.md)

**Figma:**
- [Header Node](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6098)

**Code:**
- [`SectionHeading.tsx`](../../src/components/section-heading/SectionHeading.tsx)
- [`SectionHeading.types.ts`](../../src/components/section-heading/SectionHeading.types.ts)

## 17. Component Structure

```
section-heading/
├── SectionHeading.tsx       # Main component
├── SectionHeading.types.ts  # TypeScript interfaces
└── index.ts                 # Barrel export
```

## 18. Design Decisions

**Why integrate SearchBar?**
- Figma design shows search as part of section header
- Creates consistent header pattern
- Reduces layout complexity for consumers

**Why 80px gap?**
- Exact spacing from Figma metadata
- Provides visual separation between title and search

**Why center alignment default?**
- Matches Figma design
- Most common use case for main sections

**Why optional description?**
- Not all sections need descriptions
- Maintains flexibility

**Why custom search placeholder?**
- Different sections may need different search contexts
- Improves UX by providing relevant placeholder text
