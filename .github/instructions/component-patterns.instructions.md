---
description: Component development patterns and design system integration
globs: 
  - "src/components/**/*.{tsx,ts,jsx,js}"
  - "src/styles/**/*.{css,scss}"
alwaysApply: true
---

# Component Patterns & Design System

> **Purpose**: Unified rules for component development with design system integration  
> **Updated**: 2025-10-16

## Table of Contents

1. [Component Development Workflow](#component-development-workflow)
2. [Design Token System](#design-token-system)
3. [Component Architecture](#component-architecture)
4. [Styling Rules](#styling-rules)
5. [Layout Patterns](#layout-patterns)
6. [Testing Requirements](#testing-requirements)
7. [Quick Reference](#quick-reference)

---

## Component Development Workflow

### ⚠️ CRITICAL: Always Wait for Confirmation

**BEFORE executing any implementation:**

1. **Analyze** - Review Figma design via MCP
2. **Plan** - Create detailed implementation plan
3. **WAIT** - Get user confirmation
4. **Execute** - Implement after approval

### 5-Step Update Process

| Step | Action | Files | Validation |
|------|--------|-------|------------|
| **1. Read** | Extract Figma specs | `docs/components/<Component>.md` | Padding, gap, colors, typography, effects |
| **2. Implement** | Build component | `src/components/<kebab-case>/` | TypeScript, props, variants |
| **3. Map** | Document translation | `docs/mapping/<component>.md` | Figma node → code mapping |
| **4. Test** | Verify implementation | Visual + functional | Pixel-perfect match |
| **5. Update** | Refresh docs | Component + mapping docs | Specs, usage, examples |

### Component Creation Checklist

**Before Creating:**
- [ ] Search existing components in `src/components/`
- [ ] Check reusability of similar components
- [ ] Verify design tokens availability
- [ ] Review Figma node structure

**During Creation:**
- [ ] Use semantic token classes
- [ ] Follow naming conventions (PascalCase file, kebab-case folder)
- [ ] Implement TypeScript interfaces
- [ ] Add JSDoc comments
- [ ] Handle all variants from Figma

**After Creation:**
- [ ] Update `docs/components/<Component>.md`
- [ ] Update `docs/mapping/<component>.md`
- [ ] Add Storybook story (if applicable)
- [ ] Update `.agent-memory.md`

---

## Design Token System

### Token Files

| File | Purpose | Count | Usage |
|------|---------|-------|-------|
| `src/styles/tokens.css` | CSS custom properties | 130+ | Direct CSS usage |
| `tailwind.config.ts` | Tailwind utilities | Mapped | className props |
| `src/styles/globals.css` | Custom utilities | 20+ | Special cases |

### Semantic Classes (REQUIRED)

#### Typography

| ❌ NEVER Use | ✅ ALWAYS Use | Token |
|-------------|--------------|-------|
| `text-[16px]` | `body-md` | `--font-size-body-md` |
| `text-[24px] font-bold` | `heading-lg` | `--font-size-heading-lg` |
| `text-[14px]` | `body-sm` | `--font-size-body-sm` |
| `leading-[1.5]` | `leading-normal` | `--line-height-normal` |

**Available Classes:**
```css
/* Headings */
.heading-xs, .heading-sm, .heading-md, .heading-lg, .heading-xl

/* Body Text */
.body-xs, .body-sm, .body-md, .body-lg

/* Display */
.display-sm, .display-md, .display-lg
```

#### Colors

| ❌ NEVER Use | ✅ ALWAYS Use | Token |
|-------------|--------------|-------|
| `#333333` | `text-neutral-900` | `--color-neutral-900` |
| `bg-[#F5F5F5]` | `bg-neutral-50` | `--color-neutral-50` |
| `text-[#007AFF]` | `text-primary-500` | `--color-primary-500` |

**Color System:**
```css
/* Primary */
primary-50, primary-100, ..., primary-900

/* Neutral */
neutral-50, neutral-100, ..., neutral-900

/* Semantic */
success-{50-900}, warning-{50-900}, error-{50-900}, info-{50-900}
```

#### Spacing

| ❌ NEVER Use | ✅ ALWAYS Use | Token |
|-------------|--------------|-------|
| `p-[16px]` | `p-4` | `--spacing-4` (16px) |
| `m-[24px]` | `m-6` | `--spacing-6` (24px) |
| `gap-[8px]` | `gap-2` | `--spacing-2` (8px) |

**Spacing Scale:**
```
0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32
→ 0, 2px, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px
```

#### Effects

| Effect | Class | Token |
|--------|-------|-------|
| **Shadow SM** | `shadow-sm` | `--shadow-sm` |
| **Shadow MD** | `shadow-md` | `--shadow-md` |
| **Shadow LG** | `shadow-lg` | `--shadow-lg` |
| **Blur** | `backdrop-blur-{sm\|md\|lg}` | `--blur-{size}` |
| **Border Radius** | `rounded-{sm\|md\|lg\|xl}` | `--radius-{size}` |

#### Glass Morphism Borders (Figma Stroke Glass)

**CRITICAL RULE**: When Figma shows **"Stroke Glass Border"** or glass morphism borders, **ALWAYS use gradient stroke classes**, NOT solid borders.

| Figma Pattern | ❌ NEVER Use | ✅ ALWAYS Use | Token |
|---------------|-------------|--------------|-------|
| **Stroke Glass Border** | `border border-white` | `glass-border-gradient` | `--gradient-border-main` |
| **Stroke Glass (Subtle)** | `border border-white/50` | `glass-border-subtle` | `--gradient-border-subtle` |
| **Stroke Glass (Vibrant)** | `border border-primary` | `glass-border-vibrant` | `--gradient-border-vibrant` |
| **Stroke Glass (Thick)** | `border-2 border-white` | `glass-border-thick` | `--gradient-border-main` |

**Usage Examples:**
```tsx
// ✅ CORRECT - SearchBar with gradient stroke
<div className="glass-border-gradient bg-glass-dark backdrop-blur-glass rounded-full">

// ✅ CORRECT - Card with subtle gradient border
<div className="glass-border-subtle bg-glass-light rounded-lg">

// ✅ CORRECT - Button with vibrant gradient border (Neutral variant)
<div className="glass-border-vibrant bg-glass-dark rounded-full">

// ❌ WRONG - Solid border (loses glass morphism effect)
<div className="border border-white bg-glass-dark">
```

**Why Gradient Borders?**
- Matches Figma's glass morphism design exactly
- Creates depth and visual interest
- Maintains consistency with design system
- Uses CSS mask technique for clean rendering

---

## Component Architecture

### File Structure

```
src/components/
├── button/
│   ├── Button.tsx              # Main component
│   ├── Button.types.ts         # TypeScript interfaces
│   ├── Button.module.css       # Component styles (if needed)
│   ├── index.ts                # Barrel export
│   └── __tests__/
│       └── Button.test.tsx     # Tests
```

### Component Template

```tsx
// Button.types.ts
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

// Button.tsx
import { ButtonProps } from './Button.types';

/**
 * Button component matching Figma design
 * @see docs/components/Button.md for specifications
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseClasses = 'button-base'; // From tokens.css
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
    outline: 'border-2 border-neutral-300 text-neutral-900 hover:border-neutral-400',
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 body-sm',
    md: 'px-4 py-2 body-md',
    lg: 'px-6 py-3 body-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
```

### Composition Patterns

**Container/Content Pattern:**
```tsx
// ✅ GOOD - Flexible composition
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>
```

**Props Drilling (Avoid):**
```tsx
// ❌ BAD
<Card title="Title" content="Content" footer={<Actions />} />

// ✅ GOOD
<Card>
  {/* Compose as needed */}
</Card>
```

---

## Styling Rules

### Priority Hierarchy

1. **Semantic Tokens** - Design system tokens
2. **Tailwind Utilities** - Token-mapped utilities
3. **Component Classes** - Reusable component styles
4. **Inline Styles** - ONLY for dynamic values

### CSS Custom Properties Usage

```tsx
// ❌ NEVER - Hardcoded
<div style={{ color: '#333333', fontSize: '16px' }}>

// ✅ ALWAYS - Token-based
<div className="text-neutral-900 body-md">

// ✅ ACCEPTABLE - Dynamic positioning
<div style={{ top: `${dynamicY}px`, left: `${dynamicX}px` }}>
```

### Responsive Design

**Mobile-First Approach:**
```tsx
<div className="
  w-full           // Mobile default
  md:w-1/2         // Tablet
  lg:w-1/3         // Desktop
  px-4 md:px-6 lg:px-8
">
```

**Breakpoints:**
```ts
{
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
}
```

---

## Layout Patterns

### Flexbox Layouts

```tsx
// Horizontal Stack
<div className="flex items-center gap-4">

// Vertical Stack
<div className="flex flex-col gap-2">

// Space Between
<div className="flex items-center justify-between">

// Centered
<div className="flex items-center justify-center">
```

### Grid Layouts

```tsx
// Responsive Grid
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 
  md:gap-6
">

// Auto-fit Grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
```

### Common Patterns from Figma

| Pattern | Figma | Code |
|---------|-------|------|
| **Auto Layout → Horizontal** | Direction: Horizontal, Gap: 16 | `flex gap-4` |
| **Auto Layout → Vertical** | Direction: Vertical, Gap: 8 | `flex flex-col gap-2` |
| **Fixed Width** | Width: 320px | `w-80` (320px) |
| **Fill Container** | Constraints: Left/Right | `w-full` |
| **Padding** | Padding: 24 | `p-6` |
| **Spacing Between** | Space Between | `justify-between` |

---

## Testing Requirements

### Visual Testing

```tsx
// Button.test.tsx
describe('Button', () => {
  it('matches Figma specs for primary variant', () => {
    const { container } = render(<Button variant="primary">Click</Button>);
    const button = container.firstChild;
    
    // Verify classes
    expect(button).toHaveClass('bg-primary-500');
    expect(button).toHaveClass('text-white');
  });
});
```

### Accessibility Testing

```tsx
it('is keyboard accessible', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  const button = screen.getByRole('button');
  fireEvent.keyDown(button, { key: 'Enter' });
  
  expect(handleClick).toHaveBeenCalled();
});
```

### Checklist

- [ ] All variants render correctly
- [ ] Keyboard navigation works
- [ ] Screen reader accessible
- [ ] Color contrast meets WCAG AA
- [ ] Responsive on all breakpoints
- [ ] Matches Figma pixel-perfect

---

## Quick Reference

### Common Token Classes

```css
/* Typography */
.heading-lg, .body-md, .body-sm

/* Colors */
.text-primary-500, .bg-neutral-50, .border-neutral-300

/* Spacing */
.p-4, .m-6, .gap-2

/* Layout */
.flex, .grid, .items-center, .justify-between

/* Effects */
.shadow-md, .rounded-lg, .backdrop-blur-sm
```

### Component Checklist

1. ✅ Uses semantic token classes
2. ✅ TypeScript interfaces defined
3. ✅ All variants implemented
4. ✅ Accessible (WCAG AA)
5. ✅ Responsive design
6. ✅ Documented in `docs/`
7. ✅ Mapping documented
8. ✅ Tests written

### Anti-Patterns

| ❌ Don't | ✅ Do |
|---------|------|
| Hardcode colors/sizes | Use design tokens |
| Inline styles | Use Tailwind classes |
| Create duplicate components | Reuse existing |
| Skip documentation | Document everything |
| Ignore Figma specs | Match exactly |
| Break accessibility | Follow WCAG |

---

**Related Files:**
- [Figma MCP Rules](./figma-mcp.instructions.md)
- [Documentation Standards](./documentation-standards.instructions.md)
- [Main instructions](../copilot-instructions.md)
