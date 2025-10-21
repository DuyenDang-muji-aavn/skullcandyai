---
description: Figma MCP integration workflow and rules
globs: "**/*"
alwaysApply: true
---

# Figma MCP Integration Rules

## Table of Contents

1. [Core Principles](#-core-principles)
2. [Required Flow](#required-flow-do-not-skip)
3. [Implementation Rules](#implementation-rules)
4. [Translation Guide](#translation-guide)
5. [Asset Handling](#asset-handling)
6. [Node ID Extraction](#node-id-extraction)
7. [Component Reuse Strategy](#component-reuse-strategy)
8. [Validation Checklist](#validation-checklist)
9. [Example Workflow](#example-workflow)
10. [Figma Blur Conversion](#figma-blur-conversion)
11. [Quick Reference](#quick-reference)

---

## 🎯 Core Principles

- **ALWAYS** use existing components from `src/components/` when possible
- **Prioritize** Figma fidelity - match designs exactly
- **Avoid** hardcoded values - use design tokens from Figma
- **Follow** WCAG accessibility requirements
- **Document** in `docs/components/` + `docs/mapping/`
- **Place** UI in `src/components/` - avoid inline styles

---

## Required Flow (DO NOT SKIP)

| Step | Tool | Purpose | Output |
|------|------|---------|--------|
| 1 | `get_code` | Fetch structured component code | React + Tailwind implementation |
| 2 | `get_variable_defs` | Extract design tokens | Font families, colors, spacing, blur |
| 3 | `get_screenshot` | Visual reference | PNG/JPG for validation |
| 4 | `get_metadata` (optional) | High-level node map | Use if `get_code` truncated |

### If Response Too Large
1. Run `get_metadata` to see node structure
2. Re-fetch specific nodes with `get_code(nodeId: "123:456")`
3. Combine outputs for complete picture

### After Extraction
1. Download assets (images, SVGs) from localhost source
2. Translate to project conventions (CVA, semantic tokens)
3. Reuse existing components - NO duplication
4. Validate 1:1 visual match with Figma screenshot

---

## Implementation Rules

### Measurement & Constraints

- ❌ NEVER estimate or calculate padding/gaps from screenshots.
- ✅ ALWAYS use Figma node metadata:
  - Use `node.layoutMode`, `node.primaryAxisSizingMode`, `node.counterAxisSizingMode`
  - Read `node.paddingLeft`, `node.paddingRight`, `node.paddingTop`, `node.paddingBottom`
  - Read `node.itemSpacing` for gaps between children
- ❌ DO NOT measure pixels from the PNG; rely solely on metadata values.
- ✅ If design tokens change, update `tokens.css` / `tailwind.config.ts` once and reference those tokens.

### ✅ DO

| Rule | Example |
|------|---------|
| **Use semantic tokens** | `font-family-title`, `bg-glass-light`, `backdrop-blur-glass` |
| **Reuse components** | Import `<Button>` from `src/components/button` |
| **Match Figma exactly** | Use `text-[24px]`, `px-[80px]`, `gap-[21px]` for exact values |
| **Convert blur values** | Figma 200 → CSS 100px (divide by 2) |
| **Use existing patterns** | CVA for variants, Radix Slot for polymorphic |
| **Document everything** | Component.md (18 sections) + mapping/component.md |

### ❌ DON'T

| Rule | Why |
|------|-----|
| **Hardcode colors** | Use `bg-glass-light` NOT `bg-[rgba(255,255,255,0.1)]` |
| **Hardcode fonts** | Use `font-family-title` NOT `font-orbitron` |
| **Duplicate components** | Reuse existing, compose, extend |
| **Use Figma blur directly** | Must divide by 2: 200 → 100px |
| **Skip documentation** | Both Component.md + mapping required |
| **Create inline styles** | Use Tailwind utilities or tokens |


---

## Translation Guide

### Figma MCP Output → Project Code

```tsx
// ❌ Figma MCP Output (DO NOT USE AS-IS)
<div className="font-['Orbitron'] bg-[rgba(255,255,255,0.1)] backdrop-blur-[100px]">
  <span className="text-[24px] font-[700]">Title</span>
</div>

// ✅ Translated to Project Code
<div className="font-family-title bg-glass-light backdrop-blur-glass">
  <span className="text-[24px] font-bold">Title</span>
</div>
```

### Token Mapping Table

| Figma Variable | Figma Value | Project Token | Tailwind Class |
|----------------|-------------|---------------|----------------|
| Font Family/Title | Orbitron | `--font-family-title` | `font-family-title` |
| Font Family/Body | Outfit | `--font-family-body` | `font-family-body` |
| Glass Blur Amount | 200 | `--glass-blur: 100px` | `backdrop-blur-glass` |
| Color/Glass Light | #ffffff1a | `--glass-light` | `bg-glass-light` |
| Color/Glass Dark | #0000001a | `--glass-dark` | `bg-glass-dark` |
| Button Gradient | linear-gradient(...) | `--button-gradient` | `[background:var(--button-gradient)]` |

---

## Asset Handling

### MCP Server Localhost Assets

**CRITICAL**: Figma MCP Server provides `assets` endpoint with localhost sources

```tsx
// ✅ USE LOCALHOST SOURCE DIRECTLY
<Image src="http://localhost:3000/figma-mcp/assets/abc123.png" />

// ❌ DO NOT create placeholders or import icon packages
<Image src="/placeholder.png" />  // WRONG
import { Icon } from 'lucide-react';  // WRONG - use Figma assets
```

### Rules

- **USE** localhost source from Figma payload directly
- **DO NOT** import/add new icon packages
- **DO NOT** create placeholders if localhost source provided
- **SAVE** assets to `public/` after validation
- **OPTIMIZE** images with Next.js `<Image>` component

---

## Node ID Extraction

### From URL

```bash
# URL format
https://figma.com/design/:fileKey/:fileName?node-id=1-2

# Extract nodeId: "1:2" (replace hyphen with colon)
node-id=121-6098  →  nodeId: "121:6098"
node-id=5-1788    →  nodeId: "5:1788"
```

### From Selection

```bash
# If user says "selected component" or "current selection"
# Use get_code() with no nodeId - defaults to selection
get_code()  # Fetches currently selected node in Figma
```

---

## Component Reuse Strategy

### Before Creating New Component

**Check existing components:**

```bash
src/components/
├── button/         # CTA, Neutral, Stroke variants (L/M/S)
├── nft-card/       # Card with image, badge, timer, price
├── search-bar/     # Glass morphism search input (M/L)
├── section-heading/ # Title + description (center/left)
├── nft-grid/       # Grid layout with optional header
├── navbar/         # Navigation bar
├── footer/         # Footer section
└── hero-section/   # Hero with background
```

### Composition Pattern

```tsx
// ✅ GOOD: Compose existing components
export const NFTGrid = ({ title, description, showSearch, children }) => (
  <div>
    <SectionHeading title={title} description={description} />
    <SearchBar showSearch={showSearch} />
    <div className="grid">{children}</div>
  </div>
);

// ❌ BAD: Duplicate code
export const NFTGrid = ({ title, description }) => (
  <div>
    <h2 className="font-family-title text-[38px]">{title}</h2>
    <p className="font-family-body text-[20px]">{description}</p>
    {/* Duplicating SectionHeading logic */}
  </div>
);
```

---

## Validation Checklist

After implementation, verify:

- [ ] Visual match with Figma screenshot (pixel-perfect)
- [ ] All semantic tokens used (no hardcoded values)
- [ ] Existing components reused (no duplication)
- [ ] Assets from localhost source (if provided)
- [ ] Blur values divided by 2 (Figma 200 → 100px)
- [ ] Documentation created (Component.md + mapping)
- [ ] Tests written (Vitest + RTL)
- [ ] Stories created (Storybook)
- [ ] Accessibility validated (ARIA, keyboard)
- [ ] `pnpm check` passes (lint + test + mapping)

---

## Example Workflow

```bash
# 1. User: "Implement header from Figma selection"
get_code()  # No nodeId = use selection
get_variable_defs()
get_screenshot()

# 2. Analyze output
# - Title: 38px Orbitron, 1.9px tracking
# - Description: 20px Outfit, 70% opacity
# - Search: 420×56px, 24px radius

# 3. Check existing components
# - SectionHeading exists ✅
# - SearchBar exists ✅

# 4. Compose (don't duplicate)
<div className="flex flex-col gap-[80px]">
  <SectionHeading title="..." description="..." />
  <SearchBar size="M" placeholder="..." />
</div>

# 5. Document
# - docs/components/SectionHeading.md
# - docs/mapping/section-heading.md

# 6. Test & verify
pnpm test
pnpm check
```

---

## Figma Blur Conversion

**CRITICAL RULE**: Figma blur values must be divided by 2

| Figma Blur | CSS Blur | Token | Tailwind Class |
|------------|----------|-------|----------------|
| 200 | 100px | `--glass-blur: 100px` | `backdrop-blur-glass` |
| 96 | 48px | `--glass-blur-sm: 48px` | `backdrop-blur-glass-sm` |
| 7.446 | 3.723px | `--backdrop-blur-3-723` | `backdrop-blur-countdown` |

**Why?** Figma uses different units. Always store Figma value in tokens comment, use CSS value in code.

```css
/* tokens.css */
--glass-blur-amount: 200; /* Figma design variable */
--glass-blur: 100px; /* CSS value (200 ÷ 2) */
```

---

## Quick Reference

| Task | Command | Result |
|------|---------|--------|
| **Fetch component** | `get_design_context(nodeId: "121:6098")` | React + Tailwind code |
| **Get tokens** | `get_variable_defs(nodeId: "121:6098")` | Font families, colors, spacing |
| **Visual ref** | `get_screenshot(nodeId: "121:6098")` | PNG screenshot |
| **Node structure** | `get_metadata(nodeId: "121:6098")` | XML node hierarchy |
| **Current selection** | `get_design_context()` (no nodeId) | Selected node in Figma |

---

**For AI Agents**: Follow this workflow for EVERY Figma-driven change. Extract → Map → Compose → Document → Test → Verify.
