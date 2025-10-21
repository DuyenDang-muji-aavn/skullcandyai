# SearchBar

| Property | Value |
|----------|-------|
| **Last Updated** | 2025-10-16 |
| **Status** | ✅ Implemented |
| **Figma** | [Search Field](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=5-1711) |
| **Node ID** | 5:1711 |

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
16. [Performance](#16-performance)
17. [Testing](#17-testing)
18. [References](#18-references)

---

## 1. Overview

Glass morphism search input field with icon. Single size variant (420×56px) with dark glass background, backdrop blur, and pill-shaped border radius. Features a search icon on the left and text input for user queries.

**Key Features:**
- Glass morphism design with backdrop blur
- Search icon with 8px gap spacing
- Controlled/uncontrolled input support
- Form submission on Enter key
- Hover and focus states
- WCAG AA accessible

---

## 2. Specs

| Property | Value | Token |
|----------|-------|-------|
| **Width** | 420px | - |
| **Height** | 56px | - |
| **Border Radius** | 9999px (pill) | `rounded-full` |
| **Padding X** | 24px | - |
| **Gap** | 8px | - |
| **Icon Size** | 24×24px | - |
| **Background** | rgba(0,0,0,0.1) | `--glass-dark` |
| **Backdrop Blur** | 100px | `--glass-blur` |
| **Text Size** | 20px | - |
| **Font Family** | Outfit | `--font-family-body` |
| **Font Weight** | Regular (400) | - |

---

## 3. Variants

### Default (Node 5:1711)

**Single Size:**
- Width: 420px
- Height: 56px
- Padding: 24px horizontal
- Gap: 8px between icon and input

**No Size Variants:**
Figma design shows only one size. Previous M/L variants removed to match design system.

---

## 4. Typography

| Element | Font Family | Size | Weight | Color | Token |
|---------|-------------|------|--------|-------|-------|
| **Input Text** | Outfit | 20px | Regular (400) | White | `--font-family-body` |
| **Placeholder** | Outfit | 20px | Regular (400) | White 50% | `--font-family-body` |

**Text Properties:**
- Line height: Normal (1.0)
- Letter spacing: 0
- Text overflow: Ellipsis
- White space: Nowrap

---

## 5. Colors

| Element | Color | Opacity | Token | Tailwind Class |
|---------|-------|---------|-------|----------------|
| **Background** | #000000 | 10% | `--glass-dark` | `bg-glass-dark` |
| **Text** | #ffffff | 100% | `--color-text` | `text-white` |
| **Placeholder** | #ffffff | 50% | - | `placeholder:text-white/50` |
| **Icon Stroke** | #ffffff | 100% | - | `stroke-white` |
| **Hover BG** | #ffffff | 10% | `--glass-light` | `hover:bg-glass-light` |
| **Focus Ring** | #ffffff | 20% | - | `ring-white/20` |

---

## 6. Spacing

| Property | Value | Token | Usage |
|----------|-------|-------|-------|
| **Padding X** | 24px | - | Container horizontal padding |
| **Gap** | 8px | `--grid-010000` | Icon to input spacing |
| **Margin** | Auto | - | Center alignment (optional) |

**Spacing Hierarchy:**
```
Container
├─ Padding X: 24px
├─ Icon: 24×24px
├─ Gap: 8px
└─ Input: flex-1 (fills remaining)
```

---

## 7. Effects

| Effect | Value | Token | Tailwind Class |
|--------|-------|-------|----------------|
| **Backdrop Blur** | 100px | `--glass-blur` | `backdrop-blur-glass` |
| **Border Radius** | 9999px | - | `rounded-full` |
| **Transition** | All 200ms | - | `transition-all` |
| **Focus Ring** | 2px white 20% | - | `ring-2 ring-white/20` |

**Hover Effect:**
- Background transitions to glass-light
- Smooth 200ms transition

**Focus Effect:**
- 2px ring appears around container
- Ring color: white 20% opacity

---

## 8. Layout

### Flexbox Structure

```tsx
<form>
  <div className="flex items-center gap-[8px]">
    <svg /> {/* Icon: 24×24px, shrink-0 */}
    <input /> {/* flex-1 */}
  </div>
</form>
```

**Layout Properties:**
- Display: Flex
- Align Items: Center
- Gap: 8px
- Icon: Fixed width (shrink-0)
- Input: Flexible (flex-1)

**Container:**
- Width: Fixed 420px
- Height: Fixed 56px
- Padding: 24px horizontal
- Border radius: Full (pill shape)

---

## 9. Responsive

### Fixed Width Design

**No Responsive Breakpoints:**
Component maintains fixed 420×56px size across all viewports per Figma spec.

**Mobile Considerations:**
```tsx
// For mobile, consider using max-w-full with px-4 wrapper
<div className="px-4">
  <SearchBar className="!w-full max-w-[420px]" />
</div>
```

**Recommended Breakpoints:**
| Viewport | Width | Notes |
|----------|-------|-------|
| Mobile (<640px) | 100% (max 420px) | Add wrapper with padding |
| Tablet (≥640px) | 420px | Fixed width |
| Desktop (≥1024px) | 420px | Fixed width |

---

## 10. States

| State | Background | Ring | Cursor | Notes |
|-------|------------|------|--------|-------|
| **Default** | glass-dark | None | text | Initial state |
| **Hover** | glass-light | None | text | Lightens on hover |
| **Focus** | glass-dark | 2px white/20 | text | Input focused |
| **Typing** | glass-dark | 2px white/20 | text | Active input |
| **Disabled** | glass-dark | None | not-allowed | Not implemented |

**State Transitions:**
```css
transition-all duration-200
```

---

## 11. Accessibility

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- ✅ Tab to focus input
- ✅ Enter to submit form
- ✅ Escape to clear (if implemented)

**Screen Readers:**
- ✅ `aria-label="Search"` on input
- ✅ `aria-hidden="true"` on decorative icon
- ✅ Semantic `<form>` element
- ✅ Proper label text via placeholder

**Color Contrast:**
- ✅ White text on dark glass: >7:1 ratio
- ✅ Placeholder at 50% opacity: >4.5:1 ratio
- ✅ Icon stroke white: >7:1 ratio

**Focus Management:**
- ✅ Visible focus ring (2px white 20%)
- ✅ Focus-within on container
- ✅ Clear focus indicators

**Best Practices:**
```tsx
<SearchBar
  placeholder="Search by topics or collections"
  aria-label="Search NFTs"
/>
```

---

## 12. Props API

```tsx
export interface SearchBarProps {
  /**
   * Placeholder text
   * @default "Search by topics or collections"
   */
  placeholder?: string;

  /**
   * Controlled input value
   */
  value?: string;

  /**
   * Change handler - called on every keystroke
   */
  onChange?: (value: string) => void;

  /**
   * Submit handler - called on Enter key or form submit
   */
  onSearch?: (value: string) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}
```

**Ref Support:**
```tsx
const searchRef = useRef<HTMLInputElement>(null);
<SearchBar ref={searchRef} />
```

---

## 13. Usage

### Basic Usage

```tsx
import { SearchBar } from '@/components/search-bar';

export default function Page() {
  return <SearchBar />;
}
```

### Controlled Component

```tsx
const [query, setQuery] = useState('');

<SearchBar
  value={query}
  onChange={setQuery}
  onSearch={(value) => console.log('Search:', value)}
/>
```

### Custom Placeholder

```tsx
<SearchBar placeholder="Find your perfect NFT..." />
```

### With Form Handler

```tsx
const handleSearch = (value: string) => {
  // Fetch results
  fetchResults(value);
};

<SearchBar onSearch={handleSearch} />
```

---

## 14. Examples

### Example 1: Basic Search

```tsx
export function BasicSearch() {
  return (
    <div className="flex justify-center py-8">
      <SearchBar placeholder="Search NFTs..." />
    </div>
  );
}
```

### Example 2: Search with Results

```tsx
export function SearchWithResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (value: string) => {
    const data = await fetch(`/api/search?q=${value}`);
    setResults(data);
  };

  return (
    <div>
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
      />
      <Results items={results} />
    </div>
  );
}
```

### Example 3: With Debounce

```tsx
import { useDebouncedCallback } from 'use-debounce';

export function DebouncedSearch() {
  const [query, setQuery] = useState('');

  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      console.log('Searching for:', value);
      // Perform search
    },
    500
  );

  const handleChange = (value: string) => {
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <SearchBar
      value={query}
      onChange={handleChange}
    />
  );
}
```

### Example 4: Mobile Responsive Wrapper

```tsx
export function ResponsiveSearch() {
  return (
    <div className="w-full px-4">
      <SearchBar className="!w-full max-w-[420px] mx-auto" />
    </div>
  );
}
```

---

## 15. Edge Cases

### Empty Input
```tsx
// Allow empty searches or prevent?
const handleSearch = (value: string) => {
  if (value.trim().length === 0) {
    console.warn('Empty search query');
    return;
  }
  performSearch(value);
};
```

### Very Long Input
```tsx
// Input has text-overflow ellipsis built-in
// Text truncates with "..." when exceeding width
```

### Special Characters
```tsx
// Sanitize input before searching
const sanitize = (input: string) => {
  return input.replace(/[<>]/g, '');
};
```

### Rapid Submissions
```tsx
// Use debounce for onChange, throttle for onSearch
const throttledSearch = useThrottle(performSearch, 1000);
```

---

## 16. Performance

### Optimizations

**1. Controlled vs Uncontrolled:**
```tsx
// Uncontrolled (better for performance)
<SearchBar onSearch={handleSearch} />

// Controlled (needed for external state)
<SearchBar value={query} onChange={setQuery} />
```

**2. Debouncing:**
```tsx
// Debounce onChange to reduce re-renders
const debouncedChange = useDebouncedCallback(onChange, 300);
```

**3. Memoization:**
```tsx
const SearchMemo = React.memo(SearchBar);
```

**4. Event Handler Optimization:**
```tsx
// useCallback for stable references
const handleSearch = useCallback((value: string) => {
  performSearch(value);
}, []);
```

---

## 17. Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder', () => {
    render(<SearchBar placeholder="Search..." />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls onChange on input', () => {
    const handleChange = jest.fn();
    render(<SearchBar onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalledWith('test');
  });

  it('calls onSearch on submit', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);
    
    const form = screen.getByRole('textbox').closest('form');
    fireEvent.submit(form!);
    
    expect(handleSearch).toHaveBeenCalled();
  });

  it('matches Figma specs', () => {
    const { container } = render(<SearchBar />);
    const searchContainer = container.querySelector('div');
    
    expect(searchContainer).toHaveClass('w-[420px]');
    expect(searchContainer).toHaveClass('h-[56px]');
    expect(searchContainer).toHaveClass('rounded-full');
  });
});
```

### Visual Testing

```tsx
// Storybook story
export const Default: Story = {
  args: {
    placeholder: 'Search by topics or collections',
  },
};

export const Focused: Story = {
  args: {
    placeholder: 'Search...',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox');
    await userEvent.click(input);
  },
};
```

---

## 18. References

**Related Components:**
- [NFTGrid](./NFTGrid.md) - Uses SearchBar in header
- [SectionHeading](./SectionHeading.md) - Often paired together

**Related Docs:**
- [Component Patterns](../.github/instructions/component-patterns.instructions.md)
- [Figma MCP](../.github/instructions/figma-mcp.instructions.md)

**Figma:**
- [Design File](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy)
- [Node: 5:1711](https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=5-1711)

**Code:**
- [`SearchBar.tsx`](../../src/components/search-bar/SearchBar.tsx)
- [`SearchBar.types.ts`](../../src/components/search-bar/SearchBar.types.ts)
