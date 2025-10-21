---
description: Storybook MCP UI building instructions for SkullCandy project
alwaysApply: true
---

# UI Building Instructions - Storybook MCP

> **For AI Agents**: Follow these instructions when creating or modifying UI components

## Quick Reference

| Item | Value |
|------|-------|
| **Project** | SkullCandy NFT Marketplace |
| **Framework** | Next.js 14 + React 18 + TypeScript |
| **Styling** | Tailwind CSS + Design Tokens |
| **Components** | `src/components/` |
| **Stories** | `src/components/*/*.stories.tsx` |
| **Story Format** | CSF3 (Component Story Format v3) |

---

## 1. Story Creation Rules

### ✅ ALWAYS Create Stories When

- Creating new UI components
- Adding new component variants
- Modifying component props
- Fixing component bugs (add regression story)

### Story File Structure

```tsx
// src/components/button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/...',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};
```

---

## 2. Required Story Elements

### Metadata Object

```tsx
const meta: Meta<typeof Component> = {
  title: 'Category/ComponentName',      // ✅ Required
  component: Component,                  // ✅ Required
  parameters: {
    layout: 'centered' | 'fullscreen',  // ✅ Required
    design: { /* Figma link */ },       // ✅ If available
  },
  tags: ['autodocs'],                   // ✅ Recommended
  argTypes: { /* Control types */ },    // ⚠️ If needed
};
```

### Story Objects

```tsx
export const StoryName: Story = {
  args: { /* Component props */ },      // ✅ Required
  render: (args) => <Component {...args} />, // ⚠️ If custom render needed
};
```

---

## 3. Story Naming Conventions

| Pattern | Example | When to Use |
|---------|---------|-------------|
| **Variant Name** | `Primary`, `Secondary` | Component variants |
| **State** | `Disabled`, `Loading` | Component states |
| **Content Type** | `WithIcon`, `LongText` | Content variations |
| **Use Case** | `LandingPage`, `Dashboard` | Real-world scenarios |

### Examples

```tsx
// ✅ GOOD - Clear, descriptive names
export const Primary: Story = { ... };
export const Secondary: Story = { ... };
export const Disabled: Story = { ... };
export const WithLongText: Story = { ... };
export const LandingPageHero: Story = { ... };

// ❌ BAD - Vague names
export const Story1: Story = { ... };
export const Test: Story = { ... };
export const Example: Story = { ... };
```

---

## 4. Component-Specific Patterns

### Layout Components (Sections, Grids)

```tsx
parameters: {
  layout: 'fullscreen', // Use fullscreen for layout components
}
```

### Atomic Components (Buttons, Inputs)

```tsx
parameters: {
  layout: 'centered', // Use centered for small components
}
```

### Container Components (Cards, Modals)

```tsx
parameters: {
  layout: 'padded', // Add padding for visual breathing room
}
```

---

## 5. Design System Integration

### Use Existing Components

```tsx
// ✅ GOOD - Compose from existing components
import { Button } from '@/components/button';
import { Card } from '@/components/card';

export const CardWithButton: Story = {
  render: (args) => (
    <Card>
      <Button {...args} />
    </Card>
  ),
};
```

### Use Design Tokens

```tsx
// ✅ GOOD - Use semantic token classes
className="bg-glass-light backdrop-blur-glass rounded-xl"

// ❌ BAD - Hardcoded values
className="bg-[rgba(255,255,255,0.1)] backdrop-blur-[100px] rounded-[16px]"
```

---

## 6. Story Coverage Checklist

For each component, create stories for:

- [ ] **Default state** - Component with default props
- [ ] **All variants** - Each `variant` prop value
- [ ] **All sizes** - Each `size` prop value (if applicable)
- [ ] **States** - Disabled, loading, error, success
- [ ] **Content variations** - Empty, short, long, overflowing
- [ ] **Edge cases** - Extreme values, missing data
- [ ] **Real-world usage** - Actual use case scenarios

### Example Coverage

```tsx
// Button component stories
export const Default: Story = { ... };
export const Primary: Story = { ... };
export const Secondary: Story = { ... };
export const Outline: Story = { ... };
export const Large: Story = { ... };
export const Medium: Story = { ... };
export const Small: Story = { ... };
export const Disabled: Story = { ... };
export const Loading: Story = { ... };
export const WithIcon: Story = { ... };
export const LongText: Story = { ... };
export const RealWorld: Story = { ... };
```

---

## 7. Figma Integration

### Always Link Figma Designs

```tsx
parameters: {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6098',
  },
},
```

### Get Node IDs from Mapping Docs

**Check these files first**:
- `docs/components/<Component>.md` - Component specs
- `docs/mapping/<component>.md` - Figma node mappings

**Example from mapping**:
```markdown
| Figma Node | Component Path |
|------------|----------------|
| 121:6098 | src/components/button/ |
```

---

## 8. Testing Integration

### Add Test IDs for Component Testing

```tsx
export const Testable: Story = {
  args: {
    'data-testid': 'button-primary',
  },
};
```

### Document Edge Cases

```tsx
/**
 * This story tests the component with extremely long text
 * to ensure proper text truncation and overflow handling.
 */
export const VeryLongText: Story = {
  args: {
    children: 'This is an extremely long text that should demonstrate how the component handles overflow situations...',
  },
};
```

---

## 9. Project-Specific Components

### Current Component Library

**Implemented Components** (use these for composition):

1. **Button** - `src/components/button/`
   - Variants: CTA, Neutral, Stroke
   - Sizes: L, M, S
   - Figma: 121:6098

2. **NFTCard** - `src/components/nft-card/`
   - Props: image, name, verified, countdown, currentBid, currency
   - Figma: 121:6088

3. **SearchBar** - `src/components/search-bar/`
   - Sizes: M, L
   - Figma: 4:1716

4. **SectionHeading** - `src/components/section-heading/`
   - Alignment: center, left
   - Figma: 121:6082

5. **NFTGrid** - `src/components/nft-grid/`
   - Props: gap, header, search
   - Figma: 121:6074

6. **Navbar** - `src/components/navbar/`
   - Fixed positioning
   - Figma: 121:6143

7. **HeroSection** - `src/components/hero-section/`
   - With featured card
   - Figma: 121:6155

8. **Footer** - `src/components/footer/`
   - With cart integration
   - Figma: 121:6151

9. **Cart** - `src/components/cart/`
   - Side cart with items

---

## 10. Common Mistakes to Avoid

| ❌ DON'T | ✅ DO |
|---------|-------|
| Skip stories for "simple" components | Create stories for ALL components |
| Use default export for stories | Use named exports (CSF3) |
| Hardcode values in args | Use semantic tokens and variables |
| Create one story per component | Create multiple stories for coverage |
| Ignore Figma designs | Always link Figma and match exactly |
| Use inline styles | Use Tailwind utilities and tokens |
| Skip documentation | Add JSDoc comments |

---

## 11. Story Examples

### Simple Component Story

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Click me',
    style: 'CTA',
    size: 'M',
  },
};
```

### Complex Component Story with Context

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NFTCard } from './NFTCard';

const meta: Meta<typeof NFTCard> = {
  title: 'Components/NFTCard',
  component: NFTCard,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121-6088',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NFTCard>;

const mockNFT = {
  id: '1',
  name: 'Skull #123',
  image: 'https://example.com/image.jpg',
  verified: true,
  countdown: {
    hours: 12,
    minutes: 34,
    seconds: 56,
  },
  currentBid: 2.5,
  currency: {
    name: 'ETH',
    icon: 'https://example.com/eth.svg',
  },
};

export const Default: Story = {
  args: mockNFT,
};

export const Unverified: Story = {
  args: {
    ...mockNFT,
    verified: false,
  },
};

export const HighPrice: Story = {
  args: {
    ...mockNFT,
    currentBid: 999.99,
  },
};
```

---

## 12. Workflow

### Creating a New Component

1. **Check Figma** - Get design from Figma MCP
2. **Check Existing** - Search `src/components/` for reusable pieces
3. **Create Component** - Build in `src/components/<name>/`
4. **Create Story** - Add `<Name>.stories.tsx` with multiple variants
5. **Test Visually** - View story in Storybook
6. **Document** - Update `docs/components/<Name>.md`
7. **Map** - Update `docs/mapping/<name>.md`

### Modifying Existing Component

1. **Read Docs** - Check `docs/components/<Name>.md`
2. **Check Stories** - Review existing stories
3. **Modify Component** - Make changes
4. **Update Stories** - Add/modify stories for changes
5. **Test** - Verify all stories still work
6. **Update Docs** - Reflect changes in documentation

---

## 13. Quick Commands

```bash
# Start Storybook
pnpm sb

# Build Storybook
pnpm sb:build

# Run tests
pnpm test

# Check everything
pnpm check
```

---

## 14. Resources

**Project Docs**:
- Component Specs: `docs/components/`
- Figma Mappings: `docs/mapping/`
- Instructions: `.github/instructions/`

**Design System**:
- Tokens: `src/styles/tokens.css`
- Tailwind Config: `tailwind.config.ts`
- Global Styles: `src/styles/globals.css`

**Figma**:
- Design File: https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy
- Figma MCP: http://127.0.0.1:3845/mcp

**Storybook**:
- Dev Server: http://localhost:6006/
- MCP Server: http://localhost:6006/mcp

---

**For AI Agents**: Use these instructions as your guide when creating or modifying UI components. Always create comprehensive Storybook stories that follow these patterns and conventions.
