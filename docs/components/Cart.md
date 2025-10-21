# Cart Component

| Property | Value |
|----------|-------|
| **Last Updated** | 2025-10-16 |
| **Status** | ✅ Implemented |
| **Figma** | [Cart Component](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=234-5845) |
| **Node ID** | 234:5845 |

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

---

## 1. Overview

The Cart component displays a fixed bottom bar showing the user's current cart state with product thumbnails, user info, and total price in ETH. Features glassmorphic design with gradient borders.

**Key Features:**
- Fixed bottom positioning, full viewport width
- User avatar and username display
- Up to 3 product thumbnails
- Dynamic total price calculation
- Glassmorphic background with gradient stroke

---

## 2. Specs

| Property | Value | Token |
|----------|-------|-------|
| **Width** | Full viewport | `w-full` |
| **Height** | 90px | Auto based on content |
| **Border Radius** | 24px | `--radius-card` / `rounded-[24px]` |
| **Padding (Outer)** | 32px horizontal, 16px vertical | `px-8 py-4` |
| **Padding (Inner)** | 16px horizontal, 8px vertical | `px-4 py-2` |
| **Position** | Fixed bottom | `fixed bottom-0 left-0` |
| **Z-Index** | 50 | `z-50` |

---

## 3. Variants

| Variant | Use Case |
|---------|----------|
| **Default** | Standard cart display with items |
| **Empty** | No items (could hide or show empty state) |

Currently implements single variant with conditional rendering based on item count.

---

## 4. Typography

| Element | Font Family | Size | Weight | Line Height | Token |
|---------|-------------|------|--------|-------------|-------|
| **Username** | Orbitron | 16px | 600 (SemiBold) | 32px (2) | `font-orbitron font-semibold text-base leading-8` |
| **Price** | Orbitron | 16px | 600 (SemiBold) | 32px (2) | `font-orbitron font-semibold text-base leading-8` |

---

## 5. Colors

| Element | Color | Token |
|---------|-------|-------|
| **Background** | #0000001a (black 10% opacity) | `--glass-dark` / `bg-glass-dark` |
| **Text** | #ffffff (white) | `--color-text` / `text-white` |
| **Border** | Gradient stroke (glass) | `--gradient-border-main` / `glass-border-gradient` |
| **Avatar Border** | #ffffff (white 3px) | `border-[3px] border-white` |

---

## 6. Spacing

| Element | Property | Value | Token |
|---------|----------|-------|-------|
| **Container** | Padding X | 32px | `px-8` |
| **Container** | Padding Y | 16px | `py-4` |
| **Inner** | Padding X | 16px | `px-4` |
| **Inner** | Padding Y | 8px | `py-2` |
| **User Info** | Gap | 8px | `gap-2` |
| **Bid Info** | Gap | 24px | `gap-6` |
| **Images** | Gap | 8px | `gap-2` |
| **Item** | Padding X | 12px | `px-3` |
| **Item** | Padding Y | 9px | `py-2.5` |

---

## 7. Effects

| Effect | Value | Token |
|--------|-------|-------|
| **Backdrop Blur** | 100px (Figma: 200 ÷ 2) | `--glass-blur` / `backdrop-blur-glass` |
| **Border Radius (Main)** | 24px | `--radius-card` / `rounded-[24px]` |
| **Border Radius (Item)** | 16px | `--radius-card-small` / `rounded-[16px]` |
| **Border** | Gradient stroke | `glass-border-gradient` |

**Critical**: Uses gradient stroke border, NOT solid border. Follows glassmorphism design pattern.

---

## 8. Layout

```tsx
<div className="fixed bottom-0 left-0 w-full px-8 py-4 z-50">
  <div className="backdrop-blur-glass bg-glass-dark glass-border-gradient rounded-[24px] px-4 py-2">
    <div className="flex items-center justify-between">
      {/* Left: User Info */}
      <div className="flex items-center gap-2">
        {/* Avatar + Username */}
      </div>
      
      {/* Right: Bid Info */}
      <div className="flex items-center gap-6 py-2">
        {/* Product Images */}
        <div className="flex items-center gap-2">
          {/* Up to 3 thumbnails */}
        </div>
        
        {/* Divider */}
        <div className="h-12">
          <div className="w-px h-full bg-white" />
        </div>
        
        {/* Total Price */}
        <p>{totalPrice} ETH</p>
      </div>
    </div>
  </div>
</div>
```

**Structure:**
- Outer wrapper: Fixed positioning
- Inner container: Glassmorphic card
- Flex layout: Space between user info and bid info

---

## 9. Responsive

| Breakpoint | Behavior |
|------------|----------|
| **Mobile (<640px)** | Full width, reduced padding |
| **Tablet (640-1024px)** | Full width, standard padding |
| **Desktop (>1024px)** | Full width, standard padding |

**Responsive Strategy:**
- Fixed bottom position maintained across all breakpoints
- Content adapts to viewport width
- Consider collapsing to icon-only view on very small screens

---

## 10. States

| State | Behavior | Classes |
|-------|----------|---------|
| **Default** | Standard display | Base classes |
| **Empty** | No items, could hide cart | Conditional rendering |
| **Loading** | Fetching cart data | Could add skeleton state |

**Current Implementation:**
- Always visible (unconditional rendering)
- Items array can be empty

---

## 11. Accessibility

**ARIA Attributes:**
- [ ] Add `role="complementary"` to cart container
- [ ] Add `aria-label="Shopping cart"` to main container
- [ ] Add `aria-live="polite"` for total price updates
- [ ] Add `aria-label` to avatar images

**Keyboard Navigation:**
- [ ] Ensure focusable elements are keyboard accessible
- [ ] Tab order: User info → Product items → Close button (if added)

**Screen Reader:**
- [ ] Announce cart updates when items added
- [ ] Provide descriptive labels for all interactive elements
- [ ] Ensure price is announced with currency

**Color Contrast:**
- ✅ White text on dark background meets WCAG AA
- ✅ Sufficient contrast for glassmorphic elements

---

## 12. Props API

```typescript
export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartProps {
  items: CartItemProps[];
}
```

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `CartItemProps[]` | ✅ | - | Array of cart items to display |

**CartItemProps:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✅ | Unique item identifier |
| `name` | `string` | ✅ | Product name |
| `price` | `number` | ✅ | Item price in ETH |
| `quantity` | `number` | ✅ | Item quantity |
| `image` | `string` | ✅ | Product image URL |

---

## 13. Usage

```tsx
import { Cart } from '@/components/cart';

function App() {
  const cartItems = [
    {
      id: '1',
      name: 'Skull Candy #001',
      price: 2.5,
      quantity: 1,
      image: '/images/product-1.png'
    },
    {
      id: '2',
      name: 'Skull Candy #002',
      price: 3.25,
      quantity: 2,
      image: '/images/product-2.png'
    }
  ];

  return (
    <div>
      {/* Page content */}
      <Cart items={cartItems} />
    </div>
  );
}
```

---

## 14. Examples

### Empty Cart
```tsx
<Cart items={[]} />
```

### Cart with 1 Item
```tsx
<Cart items={[
  {
    id: '1',
    name: 'Skull Candy #001',
    price: 2.5,
    quantity: 1,
    image: '/images/product.png'
  }
]} />
```

### Cart with 3+ Items (Shows First 3)
```tsx
<Cart items={[
  { id: '1', name: 'Item 1', price: 2.5, quantity: 1, image: '/img1.png' },
  { id: '2', name: 'Item 2', price: 3.0, quantity: 1, image: '/img2.png' },
  { id: '3', name: 'Item 3', price: 1.5, quantity: 1, image: '/img3.png' },
  { id: '4', name: 'Item 4', price: 4.0, quantity: 1, image: '/img4.png' }
]} />
// Only first 3 items shown in thumbnails, all counted in total
```

---

## 15. Edge Cases

**No Items:**
- Cart still renders but shows no thumbnails
- Total displays 0.00 ETH

**Many Items:**
- Only first 3 items shown as thumbnails
- All items counted in total price
- Consider adding "+N more" indicator

**Long Product Names:**
- Names not displayed in cart (thumbnails only)
- Could add tooltip on hover

**Large Prices:**
- ETH values formatted to 2 decimal places
- Consider formatting for very large numbers (e.g., 1,234.56 ETH)

**Image Loading Errors:**
- Use Next.js Image with fallback
- Could show placeholder icon

---

## 16. References

**Related Components:**
- [NFTCard](./NFTCard.md) - Adds items to cart via "Bid now"
- [Button](./Button.md) - Could add checkout button

**Related Docs:**
- [Component Patterns](../.github/instructions/component-patterns.instructions.md)
- [Figma MCP](../.github/instructions/figma-mcp.instructions.md)

**Figma:**
- [Design File](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy)
- [Node: 234:5845](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=234-5845)

**Code:**
- [`Cart.tsx`](../../src/components/cart/Cart.tsx)
- [`Cart.types.ts`](../../src/components/cart/Cart.types.ts)
- [`CartItem.tsx`](../../src/components/cart/CartItem.tsx)

**Mapping:**
- [Cart Mapping](../mapping/cart.md)
