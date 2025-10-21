# Button

| Property       | Value                                                   |
| -------------- | ------------------------------------------------------- |
| **Last Updated** | 2025-10-16                                            |
| **Status**       | ✅ Implemented                                          |
| **Figma**        | [Link to Figma node](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4-1696) |
| **Node ID**      | 4:1696                                                 |

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

The Button component is a glass morphism-styled interactive element with three size variants (L, M, S) and three style variants (CTA, Neutral, Stroke). It uses the Orbitron font family for brand consistency and features backdrop blur effects for a modern, semi-transparent aesthetic. Built with CVA (class-variance-authority) for optimal variant management.

---

## 2. Specs

| Property        | Value       | Token                |
| --------------- | ----------- | -------------------- |
| Width (L)       | Auto (hug content) | - |
| Height (L)      | 67px        | Fixed height |
| Width (M)       | Auto (hug content) | - |
| Height (M)      | 47px        | Fixed height |
| Width (S)       | Auto (hug content) | - |
| Height (S)      | 32px        | Fixed height |
| Border Radius   | 9999px      | `rounded-[9999px]` (pill shape) |
| Backdrop Blur   | 100px       | `backdrop-blur-glass` (Figma 200 ÷ 2) |

---

## 3. Variants

**9 Total Variants:** 3 sizes × 3 styles = 9 unique combinations

### Size Variants

| Variant Name | Description                     | Props                   | Figma Node |
| ------------ | ------------------------------- | ----------------------- | ---------- |
| Large (L)    | 67px height, 24px text, 80px horizontal padding | `{ size: 'L' }` | 4:1693 (CTA) |
| Medium (M)   | 47px height, 18px text, 32px horizontal padding | `{ size: 'M' }` | 4:1708 (CTA) |
| Small (S)    | 32px height, 14px text, 16px horizontal padding | `{ size: 'S' }` | 4:4509 (CTA) |

### Style Variants

| Variant Name | Description                     | Props                   | Figma Node |
| ------------ | ------------------------------- | ----------------------- | ---------- |
| CTA          | Gradient background, no border, backdrop blur | `{ style: 'CTA' }` | 4:1693 (L) |
| Neutral      | Glass light background, gradient border, backdrop blur | `{ style: 'Neutral' }` | 4:1697 (L) |
| Stroke       | Transparent background, solid white border, no backdrop blur | `{ style: 'Stroke' }` | 4:1704 (L) |

### Complete Variant Matrix

| Size | Style   | Node ID | Padding (H×V) | Text Size | Border |
|------|---------|---------|---------------|-----------|--------|
| L    | CTA     | 4:1693  | 80px × 18px   | 24px      | None   |
| L    | Neutral | 4:1697  | 80px × 18px   | 24px      | Gradient |
| L    | Stroke  | 4:1704  | 80px × 18px   | 24px      | 2px solid |
| M    | CTA     | 4:1708  | 32px × 12px   | 18px      | None   |
| M    | Neutral | 4:1701  | 32px × 12px   | 18px      | Gradient |
| M    | Stroke  | 4:1712  | 32px × 12px   | 18px      | 1px solid |
| S    | CTA     | 4:4509  | 16px × 12px   | 14px      | None   |
| S    | Neutral | 4:4505  | 16px × 12px   | 14px      | Gradient |
| S    | Stroke  | 4:4507  | 16px × 12px   | 14px      | 1px solid |

---

## 4. Typography

| Style        | Font Size | Font Weight | Font Family | Token                 |
| ------------ | --------- | ----------- | ----------- | --------------------- |
| Large        | 24px      | 700 (Bold)  | Orbitron    | `font-family-button`  |
| Medium       | 18px      | 700 (Bold)  | Orbitron    | `font-family-button`  |
| Small        | 14px      | 700 (Bold)  | Orbitron    | `font-family-button`  |

**Classes:**
- Font family: `font-family-button`
- Font weight: `font-bold`
- Text color: `text-white`
- Line height: `leading-[normal]`

---

## 5. Colors

| Element             | Color Token         | Value               | Usage |
| ------------------- | ------------------- | ------------------- | ----- |
| Text (all variants) | `text-white`        | #ffffff             | Button label text |
| CTA Background      | `--button-gradient` | 4-stop gradient     | CTA style only |
| Neutral Background  | `bg-glass-light`    | rgba(255,255,255,0.1) | Neutral style only |
| Stroke Background   | `bg-transparent`    | transparent         | Stroke style only |
| Stroke Border       | `border-[rgba(255,255,255,0.9)]` | rgba(255,255,255,0.9) | Stroke style only |
| Neutral Border      | `.button-gradient-border` | Gradient utility | Neutral style only |

**Gradient Details (CTA):**
```css
linear-gradient(
  273deg,
  rgba(1,166,255,0.70) 2.08%,
  rgba(132,235,127,0.70) 46.22%,
  rgba(140,226,59,0.70) 89.23%,
  rgba(64,106,255,0.70) 108.56%
)
```

---

## 6. Spacing

| Property       | Large (L) | Medium (M) | Small (S) | Token        |
| -------------- | --------- | ---------- | --------- | ------------ |
| Padding H      | 80px      | 32px       | 16px      | `px-[...]`   |
| Padding V      | 18px      | 12px       | 12px      | `py-[...]`   |
| Gap            | 10px      | 8px        | 8px       | `gap-[...]`  |
| Border Width   | -         | -          | -         | -            |
| Border Width (Stroke L) | 2px | -     | -         | `border-2`   |
| Border Width (Stroke M/S) | - | 1px   | 1px       | `border`     |

**Tailwind Classes:**
- L: `px-[80px] py-[18px] gap-[10px]`
- M: `px-[32px] py-[12px] gap-[8px]`
- S: `px-[16px] py-[12px] gap-[8px]`

---

## 7. Effects

| Effect          | Class                  | Token                | Usage |
| --------------- | ---------------------- | -------------------- | ----- |
| Backdrop Blur   | `backdrop-blur-glass`  | `--glass-blur` (100px) | CTA, Neutral only |
| Focus Ring      | `focus-visible:ring-2` | -                    | All variants |
| Focus Ring Color| `focus-visible:ring-white/80` | -           | All variants |
| Focus Ring Offset | `focus-visible:ring-offset-2` | -        | All variants |
| Transition      | `transition-all`       | -                    | All variants |
| Disabled Opacity| `disabled:opacity-50`  | -                    | All variants |

**Note:** Stroke style does NOT have backdrop blur effect.

---

## 8. Layout

```tsx
// Base structure - inline-flex with centered content
<button className="inline-flex items-center justify-center">
  {children}
</button>
```

**Layout Classes:**
- Display: `inline-flex`
- Align items: `items-center`
- Justify content: `justify-center`
- Cursor: `cursor-pointer`

**Composition Pattern:**
```tsx
// Using CVA for variant management
const buttonVariants = cva(
  'inline-flex items-center justify-center font-family-button font-bold text-white transition-all',
  {
    variants: {
      style: { CTA: '...', Neutral: '...', Stroke: '...' },
      size: { L: '...', M: '...', S: '...' }
    }
  }
);
```

---

## 9. Responsive

| Breakpoint | Behavior                        | Notes |
| ---------- | ------------------------------- | ----- |
| Default    | All sizes available             | No responsive size changes |
| Mobile     | Recommend M or S sizes          | Better tap targets |
| Tablet     | All sizes work                  | M is most common |
| Desktop    | All sizes work                  | L for hero sections |

**Note:** Button sizes are fixed per variant, not responsive. Choose appropriate size based on context.

---

## 10. States

| State    | Behavior/Class                 | Visual Effect |
| -------- | ------------------------------ | ------------- |
| Default  | Base variant styles            | Static appearance |
| Hover    | Implicit via `transition-all`  | Smooth state changes |
| Active   | Native browser active state    | Slight press effect |
| Focus    | `focus-visible:outline-none focus-visible:ring-2` | White ring around button |
| Disabled | `disabled:pointer-events-none disabled:opacity-50` | 50% opacity, no interaction |

**Implementation:**
```tsx
<Button disabled>Disabled Button</Button>
<Button onClick={handleClick}>Active Button</Button>
```

---

## 11. Accessibility

**ARIA Attributes:**
- Role: `button` (implicit from `<button>` element)
- `aria-disabled`: Automatically set when `disabled` prop is true
- `aria-label`: Can be passed via props for icon-only buttons

**Keyboard Support:**
- `Enter`: Triggers button click
- `Space`: Triggers button click
- `Tab`: Focuses button (standard browser behavior)

**Screen Reader:**
- Button text content is automatically announced
- Use `aria-label` for icon-only buttons
- Disabled state is announced automatically

**Focus Management:**
- Visible focus ring with `focus-visible:ring-2`
- Focus ring color: `white/80` (80% opacity white)
- Focus ring offset: 2px for better visibility
- Native outline removed with `outline-none` (replaced by custom ring)

**Best Practices:**
```tsx
// ✅ Good - Clear label
<Button>Save Changes</Button>

// ✅ Good - Icon with label
<Button aria-label="Close dialog">
  <CloseIcon />
</Button>

// ❌ Bad - No accessible text
<Button><Icon /></Button>
```

---

## 12. Props API

```ts
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as a different element while preserving button behavior
   * Uses Radix UI Slot for polymorphic rendering
   */
  asChild?: boolean;
  
  /**
   * Button style variant
   * @default 'CTA'
   */
  style?: 'CTA' | 'Neutral' | 'Stroke';
  
  /**
   * Button size variant
   * @default 'M'
   */
  size?: 'L' | 'M' | 'S';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Click handler
   */
  onClick?: () => void;
  
  /**
   * Button content
   */
  children: React.ReactNode;
}
```

**Note:** The `style` prop name conflicts with native HTML `style` attribute, so we use `Omit<..., 'style'>` to remove it from the base props.

---

## 13. Usage

```tsx
import { Button } from '@/components/button';

// Basic usage with defaults (CTA style, M size)
<Button>Explore</Button>

// Specify size and style
<Button size="L" style="CTA">Get Started</Button>

// Neutral variant with Medium size
<Button size="M" style="Neutral">Learn More</Button>

// Stroke variant with Small size
<Button size="S" style="Stroke">Cancel</Button>

// Disabled button
<Button disabled>Processing...</Button>

// With click handler
<Button onClick={() => console.log('clicked')}>
  Click me
</Button>

// As a link (using asChild with Radix Slot)
<Button asChild>
  <a href="/explore">Explore</a>
</Button>
```

---

## 14. Examples

### Hero Section CTA
```tsx
<Button size="L" style="CTA">
  Explore Collection
</Button>
```

### Form Actions
```tsx
<div className="flex gap-4">
  <Button size="M" style="Neutral">Cancel</Button>
  <Button size="M" style="CTA">Submit</Button>
</div>
```

### Card Actions
```tsx
<Button size="S" style="Stroke">
  View Details
</Button>
```

### Loading State
```tsx
<Button disabled>
  <Spinner className="mr-2" />
  Loading...
</Button>
```

### Icon Button
```tsx
<Button size="S" style="Neutral" aria-label="Close">
  <CloseIcon />
</Button>
```

### Link styled as Button
```tsx
<Button asChild size="M" style="CTA">
  <Link href="/products">Shop Now</Link>
</Button>
```

---

## 15. Edge Cases

### Long Text Handling
```tsx
// Text will wrap naturally within button constraints
<Button size="M" style="CTA">
  This is a very long button label that might wrap
</Button>
```

**Recommendation:** Keep button text concise (1-3 words). For longer text, consider:
- Splitting into multiple buttons
- Using a different component (link, card)
- Abbreviating the text

### Icon-Only Buttons
```tsx
// Always provide accessible label
<Button size="S" style="Neutral" aria-label="Delete item">
  <TrashIcon />
</Button>
```

### Loading/Processing State
```tsx
// Disable button during async operations
const [loading, setLoading] = useState(false);

<Button 
  disabled={loading}
  onClick={async () => {
    setLoading(true);
    await processAction();
    setLoading(false);
  }}
>
  {loading ? 'Processing...' : 'Submit'}
</Button>
```

### Empty Children
```tsx
// ❌ Avoid - no accessible text
<Button></Button>

// ✅ Better - always provide content
<Button>Action</Button>
```

### Nested Interactive Elements
```tsx
// ❌ Bad - button inside button (invalid HTML)
<Button>
  <Button>Nested</Button>
</Button>

// ✅ Good - use asChild to merge elements
<Button asChild>
  <a href="/link">Link styled as button</a>
</Button>
```

---

## 16. Theming

### Dark Mode Support
The Button component is designed for dark backgrounds and uses white text by default. It does not require dark mode variants.

### Custom Styling
```tsx
// Add custom classes via className prop
<Button 
  className="hover:scale-105 active:scale-95"
  style="CTA"
  size="M"
>
  Animated Button
</Button>
```

### Token Customization
Modify design tokens in `src/styles/tokens.css`:

```css
:root {
  --button-gradient: linear-gradient(...); /* Customize CTA gradient */
  --glass-light: rgba(255,255,255,0.1);   /* Customize glass background */
  --glass-blur: 100px;                     /* Customize blur amount */
}
```

### Size Customization
Extend size variants in `Button.tsx`:

```tsx
const buttonVariants = cva(
  '...',
  {
    variants: {
      size: {
        L: '...',
        M: '...',
        S: '...',
        XL: 'text-[32px] px-[120px] py-[24px]', // New size
      }
    }
  }
);
```

---

## 17. Performance

### Optimizations
- **CVA-based variants**: Zero runtime overhead, compiled to static classes
- **React.forwardRef**: Supports ref forwarding for parent component control
- **Radix Slot**: Efficient polymorphic rendering with `asChild` prop
- **Minimal re-renders**: Stateless component, only re-renders on prop changes

### Bundle Size
- Core component: ~2KB (gzipped)
- Dependencies: CVA (~1KB), Radix Slot (~1KB)
- Total: ~4KB (gzipped)

### Best Practices
```tsx
// ✅ Good - memoize handlers passed to Button
const handleClick = useCallback(() => {
  // action
}, [dependencies]);

<Button onClick={handleClick}>Click</Button>

// ❌ Avoid - inline handlers cause re-renders
<Button onClick={() => console.log('clicked')}>Click</Button>
```

### Rendering Performance
- No inline styles (except via className)
- No dynamic style calculations
- CSS custom properties enable instant theme switching
- Backdrop blur is GPU-accelerated

---

## 18. References

**Documentation:**
- Mapping: [`docs/mapping/button.md`](../mapping/button.md)
- Component Patterns: [`.github/instructions/component-patterns.instructions.md`](../../.github/instructions/component-patterns.instructions.md)
- Figma MCP: [`.github/instructions/figma-mcp.instructions.md`](../../.github/instructions/figma-mcp.instructions.md)

**Code:**
- Component: [`src/components/button/Button.tsx`](../../src/components/button/Button.tsx)
- Types: [`src/components/button/Button.types.ts`](../../src/components/button/Button.types.ts) (if separated)
- Stories: [`src/components/button/Button.stories.tsx`](../../src/components/button/Button.stories.tsx)
- Tests: [`src/components/button/Button.test.tsx`](../../src/components/button/Button.test.tsx)

**Design System:**
- Tokens: [`src/styles/tokens.css`](../../src/styles/tokens.css)
- Tailwind Config: [`tailwind.config.ts`](../../tailwind.config.ts)
- Global Styles: [`src/styles/globals.css`](../../src/styles/globals.css)

**Figma:**
- Main Component: [Figma Frame 4:1696](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4-1696)
- Design File: [SkullCandy Design System](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy)
- All Variants: See [variant matrix](#3-variants) for specific node IDs

**Related Components:**
- None (Button is a base component)
