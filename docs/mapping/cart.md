# Component Mapping: cart

| Property | Value |
|----------|-------|
| **Figma Node** | 234:5845 |
| **Component Path** | `src/components/cart/` |
| **Last Synced** | 2025-10-16 |

## Node Structure

```
Cart (234:5845)
├─ Container (Inner)
│  ├─ User Info (234:2006)
│  │  ├─ Avatar (169:2230)
│  │  │  ├─ Component 2 (169:2232) [border-[3px] border-white]
│  │  │  │  ├─ Background (436:3004)
│  │  │  │  └─ Vector (436:3048)
│  │  │  └─ Outline (169:2233)
│  │  └─ Username Text (169:2234) "MUJI"
│  └─ Bid Info (169:2402)
│     ├─ Images (169:2413)
│     │  ├─ Item (234:1988)
│     │  │  └─ image (169:2397) [36×40px]
│     │  ├─ Item (234:1989)
│     │  │  └─ image (169:2397)
│     │  └─ Item (234:1991)
│     │     └─ image (169:2397)
│     ├─ Divider (169:2412) [Line, rotated 90°]
│     └─ Price Text (169:2410) "8.15 ETH"
```

---

## Property Mapping

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Container** |
| Width | 898px (in Figma frame) | `w-full` | - |
| Height | 90px | Auto (based on content) | - |
| Fill | #0000001a (Glass Dark) | `bg-glass-dark` | `--glass-dark` |
| Stroke | Glass Border (gradient) | `glass-border-gradient` | `--gradient-border-main` |
| Corner Radius | 24px | `rounded-[24px]` | `--radius-card` |
| Backdrop Blur | 200 (Figma value) | `backdrop-blur-glass` | `--glass-blur` (100px CSS) |
| **Inner Padding** |
| Horizontal | 16px | `px-4` | `--spacing-4` |
| Vertical | 8px | `py-2` | `--spacing-2` |
| **User Info** |
| Gap | 8px | `gap-2` | `--spacing-2` |
| Layout | Horizontal auto-layout | `flex items-center` | - |
| **Avatar** |
| Size | 48×48px | `w-12 h-12` | - |
| Border | 3px solid white | `border-[3px] border-white` | - |
| Border Radius | 999px (circle) | `rounded-full` | - |
| **Username** |
| Font | Orbitron SemiBold | `font-orbitron font-semibold` | `--font-family-title` |
| Size | 16px | `text-base` | - |
| Line Height | 32px (2) | `leading-8` | - |
| Color | #ffffff | `text-white` | `--color-text` |
| **Bid Info** |
| Gap | 24px | `gap-6` | `--spacing-6` |
| Padding | 8px all sides | `p-2` | `--spacing-2` |
| Layout | Horizontal auto-layout | `flex items-center` | - |
| **Images Container** |
| Gap | 8px | `gap-2` | `--spacing-2` |
| Layout | Horizontal auto-layout | `flex items-center` | - |
| **Item (Thumbnail)** |
| Fill | Glass (backdrop blur) | `backdrop-blur-glass` | `--glass-blur` |
| Stroke | Glass Border (gradient) | `glass-border-gradient` | `--gradient-border-main` |
| Corner Radius | 16px | `rounded-[16px]` | `--radius-card-small` |
| Padding X | 12px | `px-3` | `--spacing-3` |
| Padding Y | 9px | `py-2.5` | - |
| **Image** |
| Width | 36px | `w-9` | - |
| Height | 40px | `h-10` | - |
| **Divider** |
| Height | 46px (rotated line) | `h-12` | - |
| Width | 1px | `w-px` | - |
| Color | #ffffff | `bg-white` | - |
| **Price Text** |
| Font | Orbitron SemiBold | `font-orbitron font-semibold` | `--font-family-title` |
| Size | 16px | `text-base` | - |
| Line Height | 32px (2) | `leading-8` | - |
| Color | #ffffff | `text-white` | `--color-text` |

---

## Token Extraction

| Figma Variable | Figma Value | Project Token | CSS Value |
|----------------|-------------|---------------|-----------|
| Color/Text | #ffffff | `--color-text` | #ffffff |
| Color/Glass Dark | #0000001a | `--glass-dark` | rgba(0,0,0,0.1) |
| Glass Blur/Amount | 200 | `--glass-blur` | 100px |
| Radius/Card | 24 | `--radius-card` | 24px |
| Radius/Card Small | 16 | `--radius-card-small` | 16px |

**Critical Note:** Figma blur value 200 → CSS blur 100px (divide by 2)

---

## Auto Layout

| Element | Direction | Gap | Padding | Sizing |
|---------|-----------|-----|---------|--------|
| **Container** | Horizontal | - | 16px H, 8px V | Fill container |
| **User Info** | Horizontal | 8px | - | Hug contents |
| **Bid Info** | Horizontal | 24px | 8px all | Hug contents |
| **Images** | Horizontal | 8px | - | Hug contents |
| **Item** | - | - | 12px H, 9px V | Hug contents |

---

## Variants

Currently single variant. Potential future variants:

| Variant | Figma | Code Implementation |
|---------|-------|---------------------|
| **Default** | Standard cart with items | `<Cart items={items} />` |
| **Empty** | No items shown | `<Cart items={[]} />` |
| **Collapsed** | Icon only (mobile) | Future implementation |

---

## Assets

| Asset | Node ID | Type | URL | Usage |
|-------|---------|------|-----|-------|
| Avatar Background | 436:3004 | SVG | http://localhost:3845/assets/22f567adbf237ee30e4838ea2d9c0c1339246499.svg | User avatar background |
| Avatar Vector | 436:3048 | SVG | http://localhost:3845/assets/7885a6f881b802869ec099fdf8bf4f2df3a72440.svg | User icon |
| Avatar Outline | 169:2233 | SVG | http://localhost:3845/assets/dbf6bb52c24610ddc62223700b44ae19d4c46846.svg | Avatar border outline |
| Divider Line | 169:2412 | SVG | http://localhost:3845/assets/9267b81054d0e2033b180bdef87fc6c9142d87e0.svg | Vertical separator |
| Product Image 1 | 169:2397 | PNG | http://localhost:3845/assets/c987db946c7e77771722c6c59b09744d3fff06cb.png | Example product thumbnail |
| Product Image 2 | 234:1989 | PNG | http://localhost:3845/assets/293c52ea58913b9dd758a6b241c74c704cbedccb.png | Example product thumbnail |
| Product Image 3 | 234:1991 | PNG | http://localhost:3845/assets/58776648d5abc13c417fd265af54d20ae4d392bb.png | Example product thumbnail |

**Note:** Product images are dynamic and loaded from cart items, not static assets.

---

## Implementation Notes

### Glass Border Gradient

**CRITICAL:** Figma shows "Stroke Glass Border" which translates to gradient stroke, NOT solid border.

```tsx
// ❌ WRONG - Figma MCP output
className="border border-solid border-white"

// ✅ CORRECT - Project convention
className="glass-border-gradient"
```

**Reason:** Matches glassmorphism design system exactly. Uses CSS mask technique for gradient borders.

### Backdrop Blur Conversion

**CRITICAL:** Figma blur values must be divided by 2.

```tsx
// Figma value: 200
// CSS value: 100px

// ❌ WRONG
backdrop-blur-[200px]

// ✅ CORRECT
backdrop-blur-glass  // → --glass-blur: 100px
```

### Product Thumbnails

**Dynamic Content:**
- Displays first 3 items from `items` array
- Uses Next.js `Image` component for optimization
- Falls back gracefully if fewer than 3 items

```tsx
{items.slice(0, 3).map((item, index) => (
  <div key={index} className="...">
    <Image src={item.image} alt={item.name} fill />
  </div>
))}
```

### Total Price Calculation

**Dynamic Calculation:**
```tsx
const totalPrice = items.reduce((sum, item) => 
  sum + (item.price * item.quantity), 0
);
```

Displayed with 2 decimal places: `{totalPrice.toFixed(2)} ETH`

### Avatar Implementation

**Current:** Uses placeholder SVG icon and static "MUJI" username.

**Future Enhancement:**
- Dynamic user data from authentication
- User profile images
- Username from user context

### Positioning

**Fixed Bottom:**
```tsx
className="fixed bottom-0 left-0 w-full px-8 py-4 z-50"
```

- `z-50` ensures cart appears above page content
- Padding provides breathing room from viewport edges
- Full width stretches across viewport

---

## Update Log

| Date | Changes | By |
|------|---------|-----|
| 2025-10-16 | Initial cart implementation with Figma design | Agent |
| 2025-10-16 | Applied glass-border-gradient styling | Agent |
| 2025-10-16 | Integrated "Bid now" functionality | Agent |
| 2025-10-16 | Created documentation (spec + mapping) | Agent |

---

## References

**Component Spec:**
- [Cart.md](../components/Cart.md)

**Related Components:**
- [NFTCard](../components/NFTCard.md) - Adds items to cart
- [Button](../components/Button.md) - Could add checkout button

**Code Files:**
- [`Cart.tsx`](../../src/components/cart/Cart.tsx)
- [`Cart.types.ts`](../../src/components/cart/Cart.types.ts)
- [`CartItem.tsx`](../../src/components/cart/CartItem.tsx)

**Figma:**
- [Design File](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy)
- [Cart Node: 234:5845](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=234-5845)

**Instructions:**
- [Component Patterns](../../.github/instructions/component-patterns.instructions.md)
- [Figma MCP Rules](../../.github/instructions/figma-mcp.instructions.md)
- [Documentation Standards](../../.github/instructions/documentation-standards.instructions.md)
