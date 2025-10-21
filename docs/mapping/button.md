# Component Mapping: button

| Property | Value |
|----------|-------|
| **Figma Node** | 4:1696 |
| **Component Path** | `src/components/button/` |
| **Last Synced** | 2025-10-16 |

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
Button (4:1696)
├─ Large (L) Variants
│  ├─ CTA (4:1693)
│  │  └─ Text: "Explore"
│  ├─ Neutral (4:1697)
│  │  └─ Text: "Explore"
│  └─ Stroke (4:1704)
│     └─ Text: "Explore"
├─ Medium (M) Variants
│  ├─ CTA (4:1708)
│  │  └─ Text: "Explore"
│  ├─ Neutral (4:1701)
│  │  └─ Text: "Explore"
│  └─ Stroke (4:1712)
│     └─ Text: "Explore"
└─ Small (S) Variants
   ├─ CTA (4:4509)
   │  └─ Text: "Explore"
   ├─ Neutral (4:4505)
   │  └─ Text: "Explore"
   └─ Stroke (4:4507)
      └─ Text: "Explore"
```

**Node Layout:**
- Display: Inline flex (`inline-flex`)
- Direction: Horizontal (row)
- Alignment: Center (`items-center justify-center`)
- Auto Layout: Enabled with horizontal direction, hug width, fixed height

---

## 2. Property Mapping

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Font Family** | Orbitron | `font-family-button` | `--font-family-button` |
| **Font Weight** | Bold (700) | `font-bold` | - |
| **Font Size (L)** | 24px | `text-[24px]` | - |
| **Font Size (M)** | 18px | `text-[18px]` | - |
| **Font Size (S)** | 14px | `text-[14px]` | - |
| **Text Color** | #ffffff | `text-white` | `--color-text` |
| **Border Radius** | 9999 | `rounded-[9999px]` | `--radius-pill` |
| **Padding H (L)** | 80px | `px-[80px]` | - |
| **Padding V (L)** | 18px | `py-[18px]` | - |
| **Padding H (M)** | 32px | `px-[32px]` | - |
| **Padding V (M)** | 12px | `py-[12px]` | - |
| **Padding H (S)** | 16px | `px-[16px]` | - |
| **Padding V (S)** | 12px | `py-[12px]` | - |
| **Gap (L)** | 10px | `gap-[10px]` | - |
| **Gap (M/S)** | 8px | `gap-[8px]` | - |
| **Background (CTA)** | Gradient | `[background:var(--button-gradient)]` | `--button-gradient` |
| **Background (Neutral)** | rgba(255,255,255,0.1) | `bg-glass-light` | `--glass-light` |
| **Background (Stroke)** | Transparent | `bg-transparent` | - |
| **Border (Stroke L)** | 2px solid rgba(255,255,255,0.9) | `border-2 border-[rgba(255,255,255,0.9)]` | `--glass-border-alpha` |
| **Border (Stroke M/S)** | 1px solid rgba(255,255,255,0.9) | `border border-[rgba(255,255,255,0.9)]` | `--glass-border-alpha` |
| **Border (Neutral)** | Gradient border | `.button-gradient-border` | `--gradient-border-main` |
| **Backdrop Blur (CTA/Neutral)** | 200 (Figma) = 100px (CSS) | `backdrop-blur-glass` | `--glass-blur` |
| **Backdrop Blur (Stroke)** | None | - | - |

**Critical Notes:**
- **Blur Conversion:** Figma `Glass Blur/Amount: 200` → CSS `100px` (divide by 2)
- **Width:** Auto (hug content) - grows with text
- **Height:** Fixed per size (L: 67px, M: 47px, S: 32px)

---

## 3. Token Extraction

**Extracted:** 2025-10-16 via Figma MCP `get_variable_defs()`

| Token Name | Figma Variable | Value | CSS Variable | Usage |
|------------|----------------|-------|--------------|-------|
| **Text Color** | Color/Text | `#ffffff` | `--color-text` | All text |
| **Font Family** | Font Family/ Button | `Orbitron` | `--font-family-button` | All variants |
| **Border Radius** | Radius/Button | `9999` | `--radius-pill` | Pill shape |
| **Glass Light** | Color/ Glass Light | `#ffffff1a` | `--glass-light` | Neutral background |
| **Glass Blur** | Glass Blur/Amount | `200` (Figma) / `100px` (CSS) | `--glass-blur` | CTA, Neutral blur |
| **Border Color** | Color/Border | `#ffffffe5` | `--glass-border-alpha` | Stroke borders |
| **Button Gradient** | Button Gradient | 4-stop gradient | `--button-gradient` | CTA background |
| **Gradient Border** | - | 3-stop gradient | `--gradient-border-main` | Neutral border |

**Gradient Definitions:**

**Button Gradient (CTA):**
```css
linear-gradient(273deg, 
  rgba(1,166,255,0.70) 2.08%, 
  rgba(132,235,127,0.70) 46.22%, 
  rgba(140,226,59,0.70) 89.23%, 
  rgba(64,106,255,0.70) 108.56%)
```

**Gradient Border (Neutral):**
```css
linear-gradient(135deg, 
  rgba(255,255,255,0.90) 0%, 
  rgba(255,255,255,0.00) 50%, 
  rgba(255,255,255,0.90) 100%)
```

---

## 4. Layout Guide

### Auto Layout Properties

| Size | Direction | Padding (H×V) | Gap | Hug/Fixed |
|------|-----------|---------------|-----|-----------|
| **L** | Horizontal | 80px × 18px | 10px | Hug H, Fixed V (67px) |
| **M** | Horizontal | 32px × 12px | 8px | Hug H, Fixed V (47px) |
| **S** | Horizontal | 16px × 12px | 8px | Hug H, Fixed V (32px) |

### Flexbox Implementation

```tsx
// Base layout
<button className="inline-flex items-center justify-center">
  {children}
</button>
```

**Classes Breakdown:**
- `inline-flex` - Inline flex container
- `items-center` - Vertical centering
- `justify-center` - Horizontal centering
- `gap-[10px]` or `gap-[8px]` - Space between icon/text

### Constraints

| Property | L | M | S |
|----------|---|---|---|
| **Width** | Auto (hug) | Auto (hug) | Auto (hug) |
| **Height** | 67px (fixed) | 47px (fixed) | 32px (fixed) |
| **Min Width** | Content + 160px | Content + 64px | Content + 32px |

---

## 5. Variants Mapping

### 9 Total Variants (3 Sizes × 3 Styles)

| Size | Style | Node ID | Props | Padding | Text Size | Border | Blur |
|------|-------|---------|-------|---------|-----------|--------|------|
| **L** | CTA | 4:1693 | `size="L" style="CTA"` | 80×18px | 24px | None | 100px |
| **L** | Neutral | 4:1697 | `size="L" style="Neutral"` | 80×18px | 24px | Gradient | 100px |
| **L** | Stroke | 4:1704 | `size="L" style="Stroke"` | 80×18px | 24px | 2px solid | None |
| **M** | CTA | 4:1708 | `size="M" style="CTA"` | 32×12px | 18px | None | 100px |
| **M** | Neutral | 4:1701 | `size="M" style="Neutral"` | 32×12px | 18px | Gradient | 100px |
| **M** | Stroke | 4:1712 | `size="M" style="Stroke"` | 32×12px | 18px | 1px solid | None |
| **S** | CTA | 4:4509 | `size="S" style="CTA"` | 16×12px | 14px | None | 100px |
| **S** | Neutral | 4:4505 | `size="S" style="Neutral"` | 16×12px | 14px | Gradient | 100px |
| **S** | Stroke | 4:4507 | `size="S" style="Stroke"` | 16×12px | 14px | 1px solid | None |

### Style Variant Details

**CTA (Call-to-Action):**
- Background: 4-stop gradient (`--button-gradient`)
- Backdrop blur: 100px CSS (`backdrop-blur-glass`)
- No border
- Use case: Primary actions

**Neutral (Glass Morphism):**
- Background: rgba(255,255,255,0.1) (`bg-glass-light`)
- Backdrop blur: 100px CSS (`backdrop-blur-glass`)
- Gradient border: 1px gradient stroke (`.button-gradient-border`)
- Use case: Secondary actions

**Stroke (Outline):**
- Background: Transparent (`bg-transparent`)
- No backdrop blur
- Solid border: 2px (L) or 1px (M/S) rgba(255,255,255,0.9)
- Use case: Tertiary actions

---

## 6. Assets

**No external assets required.** Button component uses:
- CSS gradients (button background, border)
- Font: Orbitron (loaded via project font configuration)
- Colors: All from design tokens

**Visual Reference:**
- Screenshot captured 2025-10-16 showing all 9 variants in 3×3 grid
- All variants verified against Figma

---

## 7. Implementation Notes

### CVA Pattern

Component uses CVA (class-variance-authority) for variant management:

```tsx
const buttonVariants = cva(
  // Base styles - all buttons
  'inline-flex items-center justify-center font-family-button font-bold text-white transition-all',
  {
    variants: {
      style: {
        CTA: 'backdrop-blur-glass [background:var(--button-gradient)]',
        Neutral: 'backdrop-blur-glass bg-glass-light button-gradient-border',
        Stroke: 'bg-transparent border border-[rgba(255,255,255,0.9)]',
      },
      size: {
        L: 'text-[24px] px-[80px] py-[18px] gap-[10px] rounded-[9999px]',
        M: 'text-[18px] px-[32px] py-[12px] gap-[8px] rounded-[9999px]',
        S: 'text-[14px] px-[16px] py-[12px] gap-[8px] rounded-[9999px]',
      },
    },
    compoundVariants: [
      { style: 'Stroke', size: 'L', className: 'border-2' }
    ],
    defaultVariants: {
      style: 'CTA',
      size: 'M',
    },
  }
);
```

### Critical Translation Rules

**From Figma MCP Output:**

1. **Blur Conversion:** Figma `200` → CSS `100px` (always divide by 2)
2. **Font Family:** `font-['Orbitron:Bold']` → `font-family-button font-bold`
3. **Border (Stroke):** 
   - Large: Use `border-2` (2px)
   - Medium/Small: Use `border` (1px)
4. **Border (Neutral):** Use `.button-gradient-border` utility class
5. **Background (CTA):** Use `[background:var(--button-gradient)]` for CSS variable
6. **Width:** Always auto (hug content), ignore fixed width from Figma dimensions

### Gradient Border Technique

Neutral style uses CSS mask technique for gradient border:

```css
.button-gradient-border {
  position: relative;
  background: var(--glass-light);
}

.button-gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  padding: 1px; /* Border width */
  background: var(--gradient-border-main);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}
```

### Accessibility

- Native `<button>` element (implicit role)
- Keyboard: Enter/Space to activate
- Focus ring: `focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2`
- Disabled state: `disabled:opacity-50 disabled:pointer-events-none`
- White text on glass backgrounds meets WCAG AA contrast

### Testing

**Unit Tests (Button.test.tsx):**
- ✅ All 9 variants render correctly
- ✅ Props (size, style, disabled, onClick) work
- ✅ asChild polymorphism via Radix Slot
- ✅ Accessibility (keyboard, focus, ARIA)

**Storybook (Button.stories.tsx):**
- ✅ All 9 variant stories
- ✅ Playground story with controls
- ✅ Showcase story showing all variants

---

## 8. Update Log

| Date | Action | Details |
|------|--------|---------|
| 2025-10-16 | **Documentation Regeneration** | Complete restructure following `_template-mapping.md` with 8 canonical sections. Consolidated from 12 sections. Added comprehensive node structure, updated property mapping with all 9 variants, enhanced token extraction with gradient definitions, added layout guide with auto layout properties, detailed variants mapping table, clarified assets section, expanded implementation notes with CVA pattern and gradient border technique, created structured update log. |
| 2025-10-16 | **Design Validation** | Re-extracted design tokens via Figma MCP. Verified all 9 variants (L/M/S × CTA/Neutral/Stroke). Screenshot captured. Node IDs validated. Implementation matches Figma pixel-perfect. |
| 2025-10-15 | Implementation Update | Updated semantic tokens, border styles, blur values (200→100px CSS) |
| 2025-10-14 | Initial Documentation | Created mapping document with 12 sections |
