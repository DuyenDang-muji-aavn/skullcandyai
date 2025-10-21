# Component Mapping: section-heading

| Property | Value |
|----------|-------|
| **Figma Node** | 121:6098 |
| **Component Path** | `src/components/section-heading/` |
| **Last Synced** | 2025-10-16 |

## Node Structure

```
Header (121:6098)
├─ Title (121:6099)
│  ├─ Title Text (121:6100) - "MONTHLY SKULL CANDIES"
│  └─ Description (121:6101)
└─ Search Field (121:6102) → SearchBar Component
   └─ Construction (I121:6102;310:2219)
      └─ Content (I121:6102;310:2275)
         ├─ Leading Icon container (I121:6102;310:2276)
         │  └─ Leading Icon (I121:6102;310:2327)
         │     └─ Frame (I121:6102;310:2328)
         └─ Text Container (I121:6102;310:2280)
            └─ Placeholder (I121:6102;310:2282)
```

## Property Mapping

| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| **Container** |
| Direction | Vertical | `flex flex-col` | - |
| Gap | 80px | `gap-[80px]` | - |
| Alignment | Center | `items-center` | - |
| Width | Fill container | `w-full` | - |
| **Title Section** |
| Direction | Vertical | `flex flex-col` | - |
| Gap | 16px | `gap-[16px]` | - |
| Alignment | Center | `text-center` | - |
| **Title (121:6100)** |
| Font Family | Orbitron | `font-family-title` | `--font-family-title` |
| Font Weight | Bold | `font-bold` | - |
| Font Size | 38px | `text-[38px]` | - |
| Letter Spacing | 1.9px | `tracking-[1.9px]` | - |
| Text Transform | - | `uppercase` | - |
| Color | #ffffff | `text-white` | `--color-text` |
| Max Width | 649.043px | `max-w-[649px]` | - |
| Line Height | Normal | `leading-normal` | - |
| **Description (121:6101)** |
| Font Family | Outfit | `font-family-body` | `--font-family-body` |
| Font Weight | Regular | `font-normal` | - |
| Font Size | 20px | `text-[20px]` | - |
| Color | #ffffff | `text-white` | `--color-text` |
| Opacity | 70% | `opacity-70` | - |
| Max Width | 744px | `max-w-[744px]` | - |
| Line Height | Normal | `leading-normal` | - |
| **Search Field (121:6102)** |
| Component | Search Field | `<SearchBar />` | - |
| Width | 420px | Handled by SearchBar | - |
| Height | 56px | Handled by SearchBar | - |

## Token Extraction

| Figma Variable | Figma Value | Project Token | Tailwind Class |
|----------------|-------------|---------------|----------------|
| Font Family/Title | Orbitron | `--font-family-title` | `font-family-title` |
| Font Family/Body | Outfit | `--font-family-body` | `font-family-body` |
| Color/Text | #ffffff | `--color-text` | `text-white` |
| Color/Glass Dark | #0000001a | `--glass-dark` | Used in SearchBar |
| ↔️ grid/010000 (8) | 8 | - | Grid spacing |

## Auto Layout

| Layer | Direction | Gap | Padding | Alignment |
|-------|-----------|-----|---------|-----------|
| **Header (121:6098)** | Vertical | 80px | 0 | Center |
| **Title (121:6099)** | Vertical | 16px | 0 | Center |
| **Search Field** | - | - | 12px | - |

### Measurement Details

**Container (121:6098):**
- `layoutMode`: VERTICAL
- `itemSpacing`: 80
- `paddingLeft`: 0
- `paddingRight`: 0
- `paddingTop`: 0
- `paddingBottom`: 0
- `primaryAxisAlignItems`: CENTER

**Title Section (121:6099):**
- `layoutMode`: VERTICAL
- `itemSpacing`: 16
- `paddingLeft`: 0
- `paddingRight`: 0
- `paddingTop`: 0
- `paddingBottom`: 0
- `primaryAxisAlignItems`: CENTER

## Variants

| Figma Variant | Code Prop | Values |
|---------------|-----------|--------|
| Alignment | `align` | 'center' (default), 'left' |
| Description | `description` | Optional string |
| Search Placeholder | `searchPlaceholder` | Custom string (default: "Search by topics or collections") |

## Assets

| Asset | Node ID | Type | Usage | Source |
|-------|---------|------|-------|--------|
| Search Icon | I121:6102;310:2327 | SVG | SearchBar leading icon | `http://localhost:3845/assets/...` |

## Implementation Notes

### Design Decisions

1. **Component Composition:**
   - Reuse existing `<SearchBar />` component
   - SearchBar always visible (not optional)
   - Matches Figma structure exactly

2. **Spacing:**
   - 80px gap between title section and search (Figma metadata)
   - 16px gap between title and description (Figma metadata)
   - No padding on container (Figma metadata)

3. **Alignment:**
   - Center alignment default (matches Figma)
   - Left alignment option for flexibility
   - Both title and description centered with `mx-auto`

4. **Typography:**
   - Title: Orbitron Bold, 38px, 1.9px tracking, uppercase
   - Description: Outfit Regular, 20px, 70% opacity
   - Exact match to Figma specs

5. **Integration:**
   - SearchBar component handles its own styling
   - Parent provides placeholder via prop
   - No need to duplicate search styling

### Breaking Changes from Previous Version

| Change | Before | After | Reason |
|--------|--------|-------|--------|
| **Gap** | 21px | 80px | Match Figma metadata (Header node) |
| **Title Gap** | N/A | 16px | Separate title section |
| **SearchBar** | Not included | Always visible | Match Figma design |
| **Container** | Simple div | Nested structure | Better semantic organization |

### Code Transformations

```tsx
// ❌ Before: MCP Output (hardcoded fonts, no reuse)
<div className="font-['Orbitron:Bold',_sans-serif]">
  <p className="text-[38px]">MONTHLY SKULL CANDIES</p>
</div>
<div className="font-['Outfit:Regular',_sans-serif]">
  <p className="text-[20px] opacity-70">Discover...</p>
</div>
<div className="bg-[rgba(0,0,0,0.1)] border border-solid border-white">
  {/* Search implementation */}
</div>

// ✅ After: Project Code (tokens, component reuse)
<div className="flex flex-col gap-[80px]">
  <div className="flex flex-col gap-[16px]">
    <h2 className="font-family-title text-[38px] tracking-[1.9px] uppercase">
      {title}
    </h2>
    <p className="font-family-body text-[20px] opacity-70">
      {description}
    </p>
  </div>
  <SearchBar placeholder={searchPlaceholder} />
</div>
```

### Special Cases

1. **No Description:**
   - Component still renders search
   - Gap maintained between title and search

2. **Multi-line Description:**
   - Supports `\n` with `whitespace-pre-line`
   - Maintains 744px max width

3. **Custom Search Placeholder:**
   - Passes through to SearchBar component
   - Default matches Figma design

4. **Left Alignment:**
   - Only affects title section
   - Search remains centered

## Update Log

| Date | Change | Reason |
|------|--------|--------|
| 2025-10-16 | Integrated SearchBar component | Match Figma design (node 121:6098) |
| 2025-10-16 | Update gap from 21px to 80px | Use Figma metadata spacing |
| 2025-10-16 | Add title section gap (16px) | Separate title from description |
| 2025-10-16 | Add searchPlaceholder prop | Allow custom search context |
| 2025-10-16 | Update documentation (18 + 8 sections) | Complete spec compliance |

---

**Related Mappings:**
- [SearchBar Mapping](./search-bar.md)

**Related Specs:**
- [Section Heading Spec](../components/SectionHeading.md)
- [SearchBar Spec](../components/SearchBar.md)

**Figma:**
- [Header Node](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6098)
- [Search Field Node](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6102)

**Code:**
- [`SectionHeading.tsx`](../../src/components/section-heading/SectionHeading.tsx)
- [`SectionHeading.types.ts`](../../src/components/section-heading/SectionHeading.types.ts)
- [`SearchBar.tsx`](../../src/components/search-bar/SearchBar.tsx)
