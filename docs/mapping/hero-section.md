# HeroSection Mapping: hero-section

| Property | Value |
|----------|-------|
| **Figma Node** | 465:1935 (Left), 124:6799 (Right) |
| **Component Path** | `src/components/hero-section/` |
| **Last Synced** | 2025-10-17 |
| **Status** | ✅ Complete (Left side + Right side image) |

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
Hero (465:1935) - 1366×1025px
├─ Featured Section (124:6799) - 793×918px [Right Side - ✅ Implemented as Image]
│  └─ Featured Content (124:6800)
│     ├─ Vector 5 (124:6801) - Decorative
│     ├─ Vector 6 (124:6802) - Decorative
│     ├─ Hover Cards (124:6803, 124:6804, 124:6806)
│     ├─ Countdown Container (124:6807)
│     ├─ Featured Image (124:6815) - Main skull image
│     ├─ Bid Card Container (124:6816) - HAPE #6959 card
│     └─ Bid Cards (124:6837, 124:6838) - Latest Bid, BID NOW!
│
└─ Main Content (121:6161) - 644×1025px [Left Side - ✅ Implemented]
   ├─ Intro Section (121:6162) - 564×358px
   │  ├─ Intro Title (121:6163) - 60px Orbitron Bold
   │  └─ Intro Description (121:6164) - 24px Outfit Regular
   └─ Button (121:6165) - CTA button with gradient
```

## Property Mapping

### Main Content Container (121:6161)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Width** | 644px | `lg:w-[644px]` | - |
| **Height** | 1025px | `min-h-[1025px]` | - |
| **Padding Left** | 40px | `px-[40px]` | - |
| **Padding Right** | 40px | `px-[40px]` | - |
| **Padding Top** | 176px | `pt-[176px]` | - |
| **Padding Bottom** | 64px | `pb-[64px]` | - |
| **Gap** | 104px | `gap-[104px]` | - |
| **Direction** | Vertical | `flex-col` | - |

### Intro Section (121:6162)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Width** | 564px | `w-full` (parent constrained) | - |
| **Height** | 358px | Auto (content-based) | - |
| **Gap** | 32px | `gap-[32px]` | - |
| **Direction** | Vertical | `flex-col` | - |

### Title (121:6163)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Font Family** | Orbitron | `font-family-title` | `--font-family-title` |
| **Font Weight** | Bold | `font-bold` | - |
| **Font Size** | 60px | `text-[60px]` | `--text-hero-title` |
| **Line Height** | 1.374 | `leading-[1.374]` | - |
| **Color** | #ffffff | `text-white` | `--color-text` |
| **Width** | 564px | `w-full` | - |
| **Height** | 246px | Auto (3 lines) | - |

### Description (121:6164)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Font Family** | Outfit | `font-family-body` | `--font-family-body` |
| **Font Weight** | Regular | `font-normal` | `--font-weight-body` |
| **Font Size** | 24px | `text-[24px]` | `--text-hero-description` |
| **Line Height** | 40px | `leading-[40px]` | - |
| **Color** | #ffffff | `text-white` | `--color-text` |
| **Width** | 564px | `w-full` | - |
| **Height** | 80px | Auto (2 lines) | - |

### Button (121:6165)

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Padding Horizontal** | 80px | `px-[80px]` (via Button L) | - |
| **Padding Vertical** | 18px | `py-[18px]` (via Button L) | - |
| **Border Radius** | 9999px | `rounded-[9999px]` | `--radius-button` |
| **Backdrop Blur** | 100px | `backdrop-blur-glass` | `--glass-blur` (200 → 100px) |
| **Background** | Gradient | Button CTA variant | `--button-gradient` |
| **Font Family** | Orbitron | `font-family-button` | `--font-family-button` |
| **Font Weight** | Bold | `font-bold` | - |
| **Font Size** | 24px | `text-[24px]` | - |
| **Color** | #ffffff | `text-white` | - |

### Featured Section (124:6799)

| Figma Property | Value | Code Property | Status |
|----------------|-------|---------------|--------|
| **Width** | 793px | - | 🚧 Pending |
| **Height** | 918px | - | 🚧 Pending |
| **Position** | Absolute (573, 107) | - | 🚧 Pending |
| **Content** | Complex 3D cards | Export as image | 🚧 Pending |

## Token Extraction

### Design Tokens from Figma Variables

| Figma Variable | Figma Value | CSS Token | Tailwind Class |
|----------------|-------------|-----------|----------------|
| **Font Family/Title** | Orbitron | `--font-family-title` | `font-family-title` |
| **Font Family/Body** | Outfit | `--font-family-body` | `font-family-body` |
| **Font Family/Button** | Orbitron | `--font-family-button` | `font-family-button` |
| **Text/Hero Title** | 60 | `--text-hero-title: 60px` | `text-[60px]` |
| **Text/Hero Description** | 24 | `--text-hero-description: 24px` | `text-[24px]` |
| **Font Weight/Body** | Regular | - | `font-normal` |
| **Color/Text** | #ffffff | `--color-text` | `text-white` |
| **Color/Glass Dark** | #0000001a | `--glass-dark` | `bg-glass-dark` |
| **Glass Blur/Amount** | 200 | `--glass-blur: 100px` | `backdrop-blur-glass` |
| **Button Gradient** | (complex) | `--button-gradient` | Button CTA |
| **Radius/Button** | 9999 | `--radius-button: 9999px` | `rounded-[9999px]` |

## Auto Layout

### Main Content (121:6161)

| Property | Value | Implementation |
|----------|-------|----------------|
| **Layout Mode** | Vertical | `flex flex-col` |
| **Primary Axis** | Fixed (1025px) | `min-h-[1025px]` |
| **Counter Axis** | Fixed (644px) | `lg:w-[644px]` |
| **Padding** | 40/176/40/64 | `px-[40px] pt-[176px] pb-[64px]` |
| **Item Spacing** | 104px | `gap-[104px]` |

### Intro Section (121:6162)

| Property | Value | Implementation |
|----------|-------|----------------|
| **Layout Mode** | Vertical | `flex flex-col` |
| **Item Spacing** | 32px | `gap-[32px]` |
| **Fill Container** | Width | `w-full` |

## Variants

### Left Side (Main Content)

| Variant | Figma State | Code Implementation |
|---------|-------------|---------------------|
| **Default** | Base design | Current implementation |
| **Mobile** | Responsive adaptation | `flex-col w-full` |
| **Desktop** | Full layout | `lg:flex-row lg:w-[644px]` |

### Right Side (Featured Section)

| Variant | Figma State | Code Implementation |
|---------|-------------|---------------------|
| **Image** | Static export | ✅ Next.js Image component |
| **Interactive** | Live component | Future enhancement (optional) |

## Assets

### Images Required

| Asset | Node ID | Type | Dimensions | Status |
|-------|---------|------|------------|--------|
| **Vector 5** | 124:6801 | SVG | 243.82×484.80px | ✅ `/images/hero-vector-5.svg` |
| **Vector 6** | 124:6802 | SVG | 275.13×547.04px | ✅ `/images/hero-vector-6.svg` |
| **Skull Character** | 124:6815 | PNG | 517×548px | ✅ `/images/hero-skull-character.png` |
| **Avatar 1** | - | PNG | 67×67px | ✅ `/images/avatar-1.png` |
| **Avatar 2** | - | PNG | 67×67px | ✅ `/images/avatar-2.png` |
| **Avatar Overlay** | - | PNG | 73×73px | ✅ `/images/avatar-overlay.png` |
| **Verified Badge** | 124:6825 | PNG | 20×18px | ✅ `/images/verified-badge.png` |

### Component Structure

```typescript
<FeaturedSection>
  ├─ Decorative Vectors (rotate 39.402deg)
  │  ├─ Vector 5 (background gradient shape)
  │  └─ Vector 6 (background gradient shape)
  ├─ Hover Cards (semi-transparent backgrounds, skew-x -10.331deg)
  │  ├─ Top hover card
  │  └─ Bottom hover card
  ├─ Main Image (skull character, skew-x -10.331deg, shadow)
  ├─ HAPE #6959 Card (glass border, blur 24.62px)
  │  ├─ Avatar stack (3 layers)
  │  ├─ Title + Subtitle
  │  └─ Verified badge
  ├─ Latest Bid Card (bottom left, skew-x -10.301deg)
  │  ├─ ETH amount
  │  ├─ USD amount
  │  └─ Percentage change
  ├─ BID NOW! Card (top right, glass border, blur 13.38px)
  │  ├─ Title
  │  └─ Subtitle
  └─ Countdown Container (bottom, skew-x -11.7deg)
     ├─ Auction End In card
     ├─ Hours card (17)
     ├─ Colon separator
     ├─ Minutes card (56, blur 13.38px)
     ├─ Colon separator
     └─ Seconds card (03, blur 13.38px)
```

### Responsive Scaling

```typescript
// Container scales based on viewport
scale-[0.5]      // Mobile (< 640px)
sm:scale-[0.6]   // Small tablets (640px+)
md:scale-[0.8]   // Tablets (768px+)
lg:scale-100     // Desktop (1024px+)
```
// Available from localhost:3845
const imgFeaturedImage = "http://localhost:3845/assets/c987db946c7e77771722c6c59b09744d3fff06cb.png";
const imgVector5 = "http://localhost:3845/assets/f4215a2a73c269fda0081462c63e4f43cf82c4f1.svg";
const imgVector6 = "http://localhost:3845/assets/02b953d5ee2fc851b1f4bc46f99b0f3ebdd30e07.svg";
```

## Implementation Notes

### ✅ Completed: Left Side (Main Content)

**Exact Measurements:**
- Container: 644×1025px with precise padding (40/176/64)
- Gap between sections: 104px (not estimated)
- Gap within intro: 32px (from Figma metadata)
- Typography: Exact font sizes and line heights

**Design Tokens:**
- All font families use semantic tokens
- Colors use design system tokens
- Button uses CTA variant from Button component



**Layout:**
- Uses Flexbox with exact gaps from Figma
- Responsive: stacks on mobile, side-by-side on desktop
- Maintains aspect ratios

### ✅ Completed: Right Side (Featured Section)

**Implementation:**
- Created interactive `FeaturedSection` component with all individual elements
- 7 separate assets downloaded and optimized
- All cards positioned with exact Figma coordinates
- 3D transforms implemented using CSS skew and rotate
- Glass morphism effects with backdrop-blur and borders
- Responsive scaling for mobile (50%), tablet (60-80%), desktop (100%)

**Component Breakdown:**
1. **Decorative Vectors** - 2 SVG shapes rotated 39.402deg for depth
2. **Hover Cards** - 2 semi-transparent backgrounds with skew transforms
3. **Main Skull Image** - 517×548px with shadow and skew
4. **HAPE #6959 Card** - Glass card with avatar stack (3 layers), verified badge
5. **Latest Bid Card** - ETH/USD amounts with green percentage
6. **BID NOW! Card** - Call-to-action with glass border
7. **Countdown Timer** - 3 cards (17:56:03) with colon separators

**Transform Details:**
- `rotate(39.402deg)` - Decorative vectors
- `skewX(-10.331deg)` - Main image and hover cards
- `skewX(-10.301deg)` - Bid cards
- `skewX(-11.7deg)` - Countdown cards
- `rotate(-0.339deg) + skewX(-10.353deg)` - HAPE card

**Glass Morphism:**
- `backdrop-blur-[24.622px]` - HAPE card
- `backdrop-blur-[13.382px]` - BID NOW! and countdown cards
- `border-white` - Glass borders on cards
- `bg-white/10` - Semi-transparent backgrounds

**Responsive Strategy:**
- CSS `scale()` transforms applied to container
- All internal positioning remains in absolute px values
- Transform origin set to center for balanced scaling
- No content reflow, just visual scaling

### Critical Rules Followed

1. **No Estimation** - All padding, gap, and spacing values taken from Figma node metadata
2. **Design Tokens** - Used semantic tokens for fonts, colors, and effects
3. **Exact Typography** - Font sizes, weights, line heights match Figma exactly
4. **Figma Annotation** - Followed "export as SVG, don't need to implement" guidance
5. **Component Reuse** - Uses existing Button component with CTA variant
6. **Responsive** - Mobile-first approach with breakpoint handling

### Figma Annotation

**Featured Section has annotation:**
```
data-development-annotations="export as SVG, don't need to implement it"
```

This confirmed the right side should be exported as an asset rather than implemented as code.

## Update Log

| Date | Change | Author | Notes |
|------|--------|--------|-------|
| 2025-10-16 | Initial implementation | Agent | Left side complete per Figma specs |
| 2025-10-16 | Documentation created | Agent | Component spec + mapping docs |
| Date | Change | Author | Notes |
|------|--------|--------|-------|
| 2025-10-16 | Initial left side implementation | Agent | Main content with exact Figma specs |
| 2025-10-17 | Right side completed | Agent | Exported Featured Section as image asset |

---

**Implementation Complete:**
1. ✅ Exported Featured Section from Figma as PNG (793×918px)
2. ✅ Saved to `public/images/hero-featured.png`
3. ✅ Updated HeroSection to use Next.js Image component
4. ✅ Tested responsive behavior
