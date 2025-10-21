# SearchBar Mapping

| Property         | Value                                                   |
| ---------------- | ------------------------------------------------------- |
| **Last Updated** | 2025-10-16                                             |
| **Component**    | SearchBar                                              |
| **Figma Node**   | 5:1711 (Search Field)                                  |
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
Frame: Search Field (5:1711)
├── Container Properties
│   ├── Layout: Flex (Horizontal)
│   ├── Alignment: Center
│   ├── Gap: 8px
│   ├── Padding: 24px horizontal
│   ├── Width: 420px
│   ├── Height: 56px
│   ├── Border Radius: 9999px (pill)
│   ├── Background: Glass Dark (rgba(0,0,0,0.1))
│   └── Backdrop Blur: 100px (Figma: 200)
│
└── Children
    ├── Icon (SVG)
    │   ├── Size: 24×24px
    │   ├── Stroke: White
    │   └── Stroke Width: 2px
    │
    └── Text Input
        ├── Flex: 1 (fill remaining space)
        ├── Font: Outfit Regular 20px
        ├── Color: White
        └── Placeholder: White 50% opacity
```

**Key Nodes:**
- Main Container: `5:1711`
- Single variant (no size variations in Figma)
- Simple two-child structure: Icon + Input

---

## 2. Property Mapping

### Container (5:1711)
| Figma Property       | Value              | Code Implementation     | Token |
| -------------------- | ------------------ | ----------------------- | ----- |
| Width                | 420px              | `w-[420px]`             | - |
| Height               | 56px               | `h-[56px]`              | - |
| Border Radius        | 9999px             | `rounded-full`          | - |
| Padding X            | 24px               | `px-[24px]`             | - |
| Gap                  | 8px                | `gap-[8px]`             | `--grid-010000` |
| Background           | rgba(0,0,0,0.1)    | `bg-glass-dark`         | `--glass-dark` |
| Backdrop Blur        | 200 (Figma)        | `backdrop-blur-glass`   | `--glass-blur: 100px` |
| Layout               | Flex               | `flex`                  | - |
| Align Items          | Center             | `items-center`          | - |

### Icon
| Figma Property       | Value              | Code Implementation     | Token |
| -------------------- | ------------------ | ----------------------- | ----- |
| Width                | 24px               | `width="24"`            | - |
| Height               | 24px               | `height="24"`           | - |
| Stroke Color         | #ffffff            | `stroke="white"`        | - |
| Stroke Width         | 2px                | `strokeWidth="2"`       | - |
| Flex Shrink          | 0                  | `shrink-0`              | - |

### Input Text
| Figma Property       | Value              | Code Implementation     | Token |
| -------------------- | ------------------ | ----------------------- | ----- |
| Font Family          | Outfit             | `font-family-body`      | `--font-family-body` |
| Font Size            | 20px               | `text-[20px]`           | - |
| Font Weight          | Regular (400)      | `font-normal`           | - |
| Text Color           | #ffffff            | `text-white`            | `--color-text` |
| Placeholder Color    | #ffffff 50%        | `placeholder:text-white/50` | - |
| Flex                 | 1                  | `flex-1`                | - |

### Figma vs Implementation Differences

| Aspect | Figma | Implementation | Reason |
|--------|-------|----------------|--------|
| Backdrop Blur | 200 | 100px | Figma uses 2× CSS values (standard conversion) |
| Size Variants | Single (420×56) | Single only | Removed M/L variants to match Figma |
| Border Style | None visible | glass-border-gradient removed | Simplified to match Figma exactly |
| Placeholder Text | N/A | "Search by topics or collections" | Default text from usage context |

---

## 3. Token Extraction

### Design Variables from Figma
```json
{
  "Color/Text": "#ffffff",
  "Font Weight/Body": "Regular",
  "Font Family/Body": "Outfit",
  "↔️ grid/010000 (8)": "8",
  "Color/ Glass Dark": "#0000001a"
}
```

### Token Mapping

**Color Tokens:**
- `Color/Text` (#ffffff) → `--color-text` → `text-white`
- `Color/ Glass Dark` (#0000001a) → `--glass-dark` → `bg-glass-dark`

**Typography Tokens:**
- `Font Family/Body` (Outfit) → `--font-family-body` → `font-family-body`
- `Font Weight/Body` (Regular) → 400 → `font-normal`

**Spacing Tokens:**
- `↔️ grid/010000 (8)` → 8px → `gap-[8px]`
- Padding: 24px (not in variables, hardcoded)

**Effect Tokens:**
- Backdrop Blur: 200 (Figma) → 100px (CSS) → `--glass-blur` → `backdrop-blur-glass`
- Border Radius: 9999px → `rounded-full`

---

## 4. Layout Guide

### Flexbox Structure

```tsx
// Container with fixed dimensions and pill shape
<form>
  <div className="flex items-center gap-[8px] w-[420px] h-[56px] px-[24px] rounded-full">
    
    {/* Icon: Fixed 24×24px, does not shrink */}
    <svg width="24" height="24" className="shrink-0">
      {/* Search icon paths */}
    </svg>
    
    {/* Input: Fills remaining space */}
    <input className="flex-1" />
    
  </div>
</form>
```

**Layout Calculations:**
```
Total Width: 420px
- Padding Left: 24px
- Icon Width: 24px
- Gap: 8px
- Input Width: (420 - 24 - 24 - 24 - 8) = 340px
- Padding Right: 24px
= 420px total
```

**Vertical Alignment:**
```
Height: 56px
- Items aligned center (flex items-center)
- Icon: 24px (centered vertically)
- Input: Full height, text centered
```

---

## 5. Variants Mapping

### Single Variant: Default (Node 5:1711)

**Figma Properties:**
- Name: "Search Field"
- Size: 420×56px (no variants)
- Style: Glass morphism with dark background

**Code Implementation:**
```tsx
<SearchBar
  placeholder="Search by topics or collections"
  onChange={handleChange}
  onSearch={handleSearch}
/>
```

**No Size Variants:**
Previous implementation had M (420px) and L (560px) variants, but Figma design shows only one size. Updated to match design system exactly.

**Removed from Code:**
```tsx
// ❌ REMOVED - Not in Figma
size?: 'M' | 'L';

// ❌ REMOVED - Single size only
const sizeClasses = {
  M: 'w-[420px]',
  L: 'w-[560px]',
};
```

---

## 6. Assets

### Icon (Embedded SVG)

**Search Icon:**
- Type: SVG (inline, not external asset)
- Size: 24×24px
- Viewbox: 0 0 24 24
- Stroke: White (#ffffff)
- Stroke Width: 2px
- Components:
  - Circle: cx=11, cy=11, r=7 (magnifying glass lens)
  - Path: M20 20L17 17 (handle line)

**SVG Code:**
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" strokeLinecap="round" />
  <path d="M20 20L17 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
</svg>
```

**No External Assets:**
All visual elements are CSS/SVG-based. No image files required.

---

## 7. Implementation Notes

### Key Design Decisions

**1. Single Size Variant**
- **Figma:** Shows only 420×56px
- **Previous:** Had M (420px) and L (560px) variants
- **Current:** Single size only to match Figma exactly
- **Reason:** Simplify to match design system, avoid unused variants

**2. Simplified Structure**
- **Previous:** Multiple nested wrapper divs for complex layout
- **Current:** Single flex container with icon + input
- **Reason:** Match Figma's simple structure, reduce DOM complexity

**3. Pill Shape Border Radius**
- **Figma:** rounded-[24px] in previous version
- **Current:** rounded-full (9999px)
- **Reason:** Screenshot shows pill-shaped edges, not 24px radius

**4. Backdrop Blur Conversion**
- **Figma Value:** 200
- **CSS Value:** 100px
- **Rule:** Always divide Figma blur by 2
- **Token:** `--glass-blur: 100px` → `backdrop-blur-glass`

**5. Placeholder Text**
- **Default:** "Search by topics or collections"
- **Source:** Common usage pattern from NFTGrid context
- **Customizable:** Via `placeholder` prop

**6. Glass Morphism Stack**
```tsx
// Order matters for visual effect
bg-glass-dark           // Background color with 10% opacity
backdrop-blur-glass     // Blur effect (100px)
rounded-full            // Pill shape
```

### State Management

**Controlled vs Uncontrolled:**
```tsx
// Supports both patterns via internal state + props

// Uncontrolled (no value prop)
<SearchBar onSearch={handleSearch} />

// Controlled (with value prop)
<SearchBar value={query} onChange={setQuery} />
```

**Local State:**
- Component maintains internal `localValue` state
- Syncs with external `value` prop if provided
- Allows uncontrolled usage without external state

### Event Handling

**onChange:**
- Called on every keystroke
- Updates local state immediately
- Calls parent `onChange` handler if provided

**onSearch:**
- Called on form submit (Enter key)
- Called with current input value
- Use for search API calls

**Pattern:**
```tsx
const handleChange = (e) => {
  const newValue = e.target.value;
  setLocalValue(newValue);      // Update local state
  onChange?.(newValue);          // Notify parent
};

const handleSubmit = (e) => {
  e.preventDefault();
  onSearch?.(localValue);        // Submit with current value
};
```

---

## 8. Update Log

### 2025-10-16 - Complete Design Update & Simplification
**Changed:**
- Updated to single size variant (420×56px) to match Figma
- Removed M/L size variants (not in design system)
- Simplified DOM structure (removed nested wrapper divs)
- Changed border radius from rounded-[24px] to rounded-full (pill shape)
- Added backdrop-blur-glass effect
- Updated default placeholder to "Search by topics or collections"
- Removed glass-border-gradient (not in Figma)
- Updated hover state to use glass-light background
- Added focus-within ring (2px white 20% opacity)
- Updated icon to simpler SVG with proper sizing
- Updated text size from 17.231px to 20px

**Figma Extraction:**
- Node: 5:1711 (Search Field)
- Design variables: 5 tokens extracted
- Screenshot captured for visual reference
- Single size confirmed (no variants)

**Why:**
- Match Figma design exactly (420×56px pill shape)
- Simplify component API (remove unused size prop)
- Improve performance (fewer DOM nodes)
- Better glass morphism effect (backdrop-blur)
- Clearer focus indicators (ring on focus)
- More consistent with design system

**Files Modified:**
1. `src/components/search-bar/SearchBar.tsx` (complete rewrite)
2. `docs/components/SearchBar.md` (complete regeneration, 18 sections)
3. `docs/mapping/search-bar.md` (complete regeneration, 8 sections)

**Impact:**
- Breaking change: Removed `size` prop (use className for custom widths)
- Simpler API: Only essential props
- Better Figma parity: Pixel-perfect match
- Improved accessibility: Better focus management
- Cleaner code: Reduced complexity

---

### Previous Updates

No previous documented updates. This is the first complete documentation following the component-design-update workflow.
