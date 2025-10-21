# Navbar Mapping: navbar

| Property | Value |
|----------|-------|
| **Figma Node** | 133:2226 |
| **Component Path** | `src/components/navbar/` |
| **Last Synced** | 2025-10-17 |
| **Status** | ✅ Fully Implemented |

## Table of Contents

1. [Node Structure](#node-structure)
2. [Property Mapping](#property-mapping)
3. [Token Extraction](#token-extraction)
4. [Auto Layout](#auto-layout)
5. [Variants](#variants)
6. [Assets](#assets)
7. [Implementation Notes](#implementation-notes)
8. [Update Log](#update-log)

## Node Structure

```
Header Container (133:2226) - 1366×91px
└─ Header (121:6177) - 1286×43px (at 40,24)
   ├─ Logo (121:6178) - 179×24px
   │  ├─ Standard Collection 6 (2:9627) - Icon 24×24px
   │  └─ SKULLCANDY (2:9632) - Text 18px Orbitron Bold
   │
   ├─ Navigation (121:6179) - 552×43px (at 734,0)
   │  ├─ Market (2:9634) - Text 18px Orbitron Bold
   │  ├─ Features (2:9635) - Text 18px Orbitron Bold
   │  └─ Community (2:9636) - Text 18px Orbitron Bold
   │
   └─ Frame 707 (121:6180) - Hidden (basket/account icons)
```

## Property Mapping

### Header Container (133:2226)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Width** | 1366px | `w-full` | - |
| **Height** | 91px | Auto | - |
| **Padding Left** | 40px | `px-[40px]` | - |
| **Padding Right** | 40px | `px-[40px]` | - |
| **Padding Top** | 24px | `py-[24px]` | - |
| **Padding Bottom** | 24px | `py-[24px]` | - |
| **Gap** | 8px | `gap-[8px]` | - |
| **Backdrop Blur** | 100px | `backdrop-blur-[100px]` | `--glass-blur` |
| **Position** | Sticky (code) | `sticky top-0 z-50` | - |

### Header Inner (121:6177)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Width** | 1286px | `w-full` | - |
| **Height** | 43px | Auto | - |
| **Layout** | Horizontal | `flex` | - |
| **Justify** | Space Between | `justify-between` | - |
| **Align** | Center | `items-center` | - |

### Logo (121:6178)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Width** | 179px | Auto | - |
| **Height** | 24px | Auto | - |
| **Gap** | 8px | `gap-[8px]` | - |
| **Layout** | Horizontal | `flex` | - |
| **Align** | Flex Start | `items-start` | - |

### Logo Icon (2:9627)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Width** | 24px | `w-6` (24px) | - |
| **Height** | 24px | `h-6` (24px) | - |
| **Asset** | SVG | `Image` component | - |

### Logo Text (2:9632)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Font Family** | Orbitron | `font-orbitron` | `--font-family-title` |
| **Font Weight** | Bold | `font-bold` | - |
| **Font Size** | 18px | `text-[18px]` | - |
| **Line Height** | Normal | `leading-normal` | - |
| **Color** | #ffffff | `text-white` | `--color-text` |
| **Text** | SKULLCANDY | Content | - |

### Navigation Container (121:6179)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Width** | 552px | `w-[552px]` | - |
| **Height** | 43px | Auto | - |
| **Padding Left** | 16px | `px-[16px]` | - |
| **Padding Right** | 16px | `px-[16px]` | - |
| **Padding Top** | 10px | `py-[10px]` | - |
| **Padding Bottom** | 10px | `py-[10px]` | - |
| **Gap** | 16px | `gap-[16px]` | - |
| **Layout** | Horizontal | `flex` | - |

### Navigation Links (2:9634, 2:9635, 2:9636)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Font Family** | Orbitron | `font-orbitron` | `--font-family-title` |
| **Font Weight** | Bold | `font-bold` | - |
| **Font Size** | 18px | `text-[18px]` | - |
| **Text Align** | Center | `text-center` | - |
| **Color** | #ffffff | `text-white` | `--color-text` |
| **Flex** | Grow | `flex-1 min-w-0` | - |
| **Hover** | 80% opacity | `hover:opacity-80` | - |

## Token Extraction

### Design Tokens from Figma Variables

| Figma Variable | Figma Value | CSS Token | Tailwind Class |
|----------------|-------------|-----------|----------------|
| **Color/Text** | #ffffff | `--color-text` | `text-white` |
| **Font Family/Title** | Orbitron | `--font-family-title` | `font-orbitron` |
| **Glass Blur/Amount** | 200 | `--glass-blur: 100px` | `backdrop-blur-[100px]` |

### Calculated Values

| Element | Figma | CSS | Note |
|---------|-------|-----|------|
| **Backdrop Blur** | 200 | 100px | Divide by 2 |
| **Container Height** | - | 91px | 24 + 43 + 24 (padding + content) |

## Auto Layout

### Header Container (133:2226)

| Property | Value | Implementation |
|----------|-------|----------------|
| **Layout Mode** | Vertical | `flex flex-col` |
| **Padding** | 40/24/40/24 | `px-[40px] py-[24px]` |
| **Gap** | 8px | `gap-[8px]` |
| **Fill Container** | Width | `w-full` |

### Header (121:6177)

| Property | Value | Implementation |
|----------|-------|----------------|
| **Layout Mode** | Horizontal | `flex` |
| **Justify** | Space Between | `justify-between` |
| **Align** | Center | `items-center` |
| **Fill Container** | Width | `w-full` |

### Logo (121:6178)

| Property | Value | Implementation |
|----------|-------|----------------|
| **Layout Mode** | Horizontal | `flex` |
| **Gap** | 8px | `gap-[8px]` |
| **Align** | Flex Start | `items-start` |

### Navigation (121:6179)

| Property | Value | Implementation |
|----------|-------|----------------|
| **Layout Mode** | Horizontal | `flex` |
| **Gap** | 16px | `gap-[16px]` |
| **Padding** | 16/10 | `px-[16px] py-[10px]` |
| **Fixed Width** | 552px | `w-[552px]` |

## Variants

### Sticky State

| Variant | Figma State | Code Implementation |
|---------|-------------|---------------------|
| **Sticky (Default)** | Not in Figma | `sticky top-0 z-50` (code only) |
| **Non-Sticky** | Default Figma | No position classes |

**Note:** Sticky behavior is a runtime enhancement, not in Figma design.

### Navigation States

| State | Figma | Code Implementation |
|-------|-------|---------------------|
| **Default** | White text | `text-white` |
| **Hover** | Not shown | `hover:opacity-80` |
| **Active** | Not shown | Same as hover |

## Assets

### Logo Icon

| Asset | Node ID | Type | Dimensions | Source |
|-------|---------|------|------------|--------|
| **Logo Icon** | 2:9627 | SVG | 24×24px | `http://localhost:3845/assets/6ad9cb58d31a676bc7d5f5fbc051e93c41e2e5b4.svg` |

**Implementation:**
```tsx
const logoIcon = "http://localhost:3845/assets/6ad9cb58d31a676bc7d5f5fbc051e93c41e2e5b4.svg";

<Image
  src={logoIcon}
  alt="SkullCandy Logo"
  width={24}
  height={24}
/>
```

## Implementation Notes

### ✅ Completed Features

**Exact Measurements:**
- Container: 1366×91px, padding 40/24, gap 8px
- Logo: Icon 24×24px, gap 8px to text
- Navigation: 552px width, padding 16/10, gap 16px
- All values from Figma node metadata (not estimated)

**Design Tokens:**
- Font: `font-orbitron` for Orbitron Bold
- Colors: `text-white` for #ffffff
- Blur: `backdrop-blur-[100px]` (from Figma 200 ÷ 2)

**Sticky Positioning:**
- Default `sticky = true` prop
- Uses `sticky top-0 z-50` classes
- Parent must NOT have `overflow-hidden`

**Navigation Behavior:**
- **Market:** Scrolls to products section with `scrollIntoView`
- **Features:** Next.js Link to `/features`
- **Community:** Next.js Link to `/community`

### Critical Rules Followed

1. **No Estimation** - All padding, gaps from Figma node metadata
2. **Blur Conversion** - Figma 200 → CSS 100px (÷ 2)
3. **Design Tokens** - Used semantic tokens for fonts and colors
4. **Accessibility** - Semantic HTML, keyboard navigation, ARIA
5. **Sticky Fix** - Removed `overflow-hidden` from parent container

### Figma to Code Conversion

```tsx
// Figma MCP Output
<div className="backdrop-blur-[var(--glass-blur/amount,100px)]">

// Project Code (using explicit value for clarity)
<header className="backdrop-blur-[100px] backdrop-filter">
```

**Why explicit value:**
- Clear and readable
- Matches Figma exactly
- `backdrop-filter` added for Safari compatibility

### Edge Cases Handled

**Sticky Positioning Requirements:**
```tsx
// ❌ Parent with overflow-hidden blocks sticky
<div className="overflow-hidden">
  <Navbar />  // Won't stick!
</div>

// ✅ Parent without overflow-hidden
<div className="relative">
  <Navbar />  // Will stick!
</div>
```

**Solution:** Removed `overflow-hidden` from `page.tsx` parent container.

**Navigation Link Types:**
- Market: `<a>` with `onClick` handler (internal scroll)
- Features/Community: Next.js `<Link>` (page navigation)

## Update Log

| Date | Change | Author | Notes |
|------|--------|--------|-------|
| 2025-10-17 | Initial implementation | Agent | Created with Figma specs |
| 2025-10-17 | Blur effect updated | Agent | Changed to exact 100px value |
| 2025-10-17 | Sticky default enabled | Agent | Changed default from false to true |
| 2025-10-17 | Spacing corrections | Agent | Updated gaps to exact Figma values |
| 2025-10-17 | Sticky fix | Agent | Removed overflow-hidden from parent |
| 2025-10-17 | Documentation created | Agent | Component spec + mapping docs |

---

**Next Steps:**
1. ✅ Component implemented
2. ✅ Sticky positioning working
3. ✅ Documentation complete
4. Future: Add active link styling
5. Future: Add dropdown menus (if needed)
6. Future: Add mobile responsive menu (hamburger)

---

**Related Files:**
- [Navbar Component Spec](../components/Navbar.md)
- [Navbar TypeScript](../../src/components/navbar/Navbar.tsx)
- [Navbar Types](../../src/components/navbar/Navbar.types.ts)
