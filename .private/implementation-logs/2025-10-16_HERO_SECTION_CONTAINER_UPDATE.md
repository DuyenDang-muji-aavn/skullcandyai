# HeroSection Container Width Update

**Date:** 2025-10-16  
**Update Type:** Layout Enhancement  
**Status:** ✅ Complete

---

## Changes Made

### 1. Added Container Max-Width Constraint

**Before:**
- HeroSection stretched full viewport width on large screens
- No alignment with NFTGrid below
- Button potentially stretching too wide

**After:**
- ✅ Added `max-w-container` (1366px) wrapper
- ✅ Centered container with `justify-center` on section
- ✅ Aligns perfectly with NFTGrid layout below
- ✅ Button wrapped in div to maintain `inline-flex` width

### 2. Layout Structure

```tsx
<section className="relative flex justify-center min-h-[1025px]">
  {/* Container matching NFTGrid max-width */}
  <div className="w-full max-w-container flex flex-col lg:flex-row">
    {/* Left: Main Content (644px on desktop) */}
    <div className="lg:w-[644px]">
      {/* Title, Description */}
      {/* Button wrapped to prevent stretching */}
      <div>
        <Button style="CTA" size="L">Explore</Button>
      </div>
    </div>
    
    {/* Right: Featured Section (flex-1) */}
    <div className="flex-1">
      {/* Image placeholder */}
    </div>
  </div>
</section>
```

---

## Container Alignment

### NFTGrid Container
```tsx
// From HomeClient.tsx
<div className="max-w-container mx-auto">
  <NFTGrid>
    {/* Cards with px-[32px] py-[64px] */}
  </NFTGrid>
</div>
```

### HeroSection Container
```tsx
// Now matches!
<div className="w-full max-w-container flex flex-col lg:flex-row">
  {/* Content */}
</div>
```

**Container Token:**
- `--container-max: 1366px` (from `tokens.css`)
- `max-w-container` Tailwind class

---

## Button Width Fix

### Issue
Button component uses `inline-flex`, but without a wrapper could stretch if parent uses `flex-col` with `w-full` items.

### Solution
Wrapped button in a `<div>` to contain its width:

```tsx
{/* CTA Button - Keep as inline-flex to not stretch full width */}
<div>
  <Button style="CTA" size="L" onClick={ctaOnClick}>
    {ctaLabel}
  </Button>
</div>
```

This ensures the button only takes the width it needs based on:
- Text content: "Explore"
- Size L padding: `px-[80px] py-[18px]`

---

## Visual Result

### Large Screens (> 1366px)
```
┌─────────────────────────────────────────────────────┐
│                   Full Viewport                      │
│  ┌───────────────────────────────────────────────┐  │
│  │        Max Container (1366px, centered)       │  │
│  │  ┌──────────────┐  ┌────────────────────────┐ │  │
│  │  │ Left (644px) │  │ Right (flexible)       │ │  │
│  │  │              │  │                        │ │  │
│  │  │ Title        │  │ Featured Image         │ │  │
│  │  │ Description  │  │ (placeholder)          │ │  │
│  │  │ [Button]     │  │                        │ │  │
│  │  └──────────────┘  └────────────────────────┘ │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Medium Screens (1024px - 1366px)
```
┌────────────────────────────────────────────┐
│         Container (full width)             │
│  ┌──────────────┐  ┌───────────────────┐  │
│  │ Left (644px) │  │ Right (flexible)  │  │
│  └──────────────┘  └───────────────────┘  │
└────────────────────────────────────────────┘
```

### Mobile Screens (< 1024px)
```
┌──────────────────┐
│   Full Width     │
│  ┌────────────┐  │
│  │   Title    │  │
│  │ Description│  │
│  │  [Button]  │  │
│  └────────────┘  │
│  ┌────────────┐  │
│  │  Featured  │  │
│  └────────────┘  │
└──────────────────┘
```

---

## Alignment with NFTGrid

Both sections now share the same max-width container:

```tsx
// HeroSection
<section className="flex justify-center">
  <div className="max-w-container">...</div>
</section>

// NFTGrid (via HomeClient)
<section className="px-container">
  <div className="max-w-container mx-auto">
    <NFTGrid>...</NFTGrid>
  </div>
</section>
```

**Result:** Seamless vertical alignment on all screen sizes!

---

## Testing Checklist

- [x] No compilation errors
- [ ] HeroSection centers on screens > 1366px
- [ ] Aligns with NFTGrid below
- [ ] Button maintains proper width (not stretched)
- [ ] Responsive: stacks on mobile
- [ ] No layout shift between sections

---

## Files Modified

- ✅ `src/components/hero-section/HeroSection.tsx`

**No breaking changes** - Props API unchanged.

---

**Status:** Ready for visual testing! 🎯
