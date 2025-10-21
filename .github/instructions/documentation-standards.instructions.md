---
applyTo: "docs/**/*.md"
---

# Documentation Standards - Agent-Optimized Writing

> **Purpose**: Token-efficient documentation for AI agents  
> **Updated**: 2025-10-16

## Table of Contents

1. [Core Principles](#core-principles)
2. [General Rules](#general-rules)
3. [2-File System](#2-file-system)
4. [Token-Efficient Markdown](#token-efficient-markdown)
5. [Update Workflow](#update-workflow)
6. [Cross-References](#cross-references)

---

## Core Principles

**Write SHORT, KEYWORD-RICH, SCANNABLE docs to save tokens:**

- ✅ Tables > Paragraphs
- ✅ Bullets > Sentences
- ✅ Keywords > Full explanations
- ✅ Examples > Descriptions
- ✅ Code blocks > Prose
- ✅ Numbers > Words ("16px" not "sixteen pixels")

**Target:** Keep component docs under 3KB each

---

## General Rules

**Required Elements:**
- Table of Contents (anchored)
- Heading hierarchy (`##` / `###`)
- Cross-reference links (relative paths)
- Exact specs: dimensions, tokens, effects
- Code examples where applicable

**Formatting:**
- Use tables for structured data
- Use bullets for lists
- Use code blocks for examples
- Avoid paragraph-heavy writing

---

## 2-File System

### Component Specification: `docs/components/<Component>.md`

**18 Required Sections:**

| Section | Purpose | Format |
|---------|---------|--------|
| **1. Header** | Date, status, Figma link | Table |
| **2. TOC** | Navigation | Anchored list |
| **3. Overview** | Brief description | 2-3 sentences |
| **4. Specs** | Exact dimensions/spacing | Table |
| **5. Variants** | All component states | Table |
| **6. Typography** | Font styles, sizes, weights | Table |
| **7. Colors** | All color tokens used | Table |
| **8. Spacing** | Padding, gaps, margins | Table |
| **9. Effects** | Shadows, blur, borders | Table |
| **10. Layout** | Flexbox/Grid structure | Code block |
| **11. Responsive** | Breakpoint behavior | Table |
| **12. States** | Hover, active, disabled, focus | Table |
| **13. Accessibility** | ARIA, keyboard, screen reader | Bullets |
| **14. Props API** | TypeScript interface | Code block |
| **15. Usage** | Import + basic example | Code block |
| **16. Examples** | Common use cases | Code blocks |
| **17. Edge Cases** | Error states, empty states | Bullets |
| **18. References** | Related components, Figma | Links |

**Template:**
```markdown
# Component Name

| Property | Value |
|----------|-------|
| **Last Updated** | 2025-10-16 |
| **Status** | ✅ Implemented / 🚧 In Progress / 📋 Planned |
| **Figma** | [Link](url) |
| **Node ID** | 123:456 |

## Table of Contents
[Standard 18-section TOC]

## 1. Overview
Brief 2-3 sentence description.

## 2. Specs
| Property | Value | Token |
|----------|-------|-------|
| Width | 320px | - |
| Height | 48px | - |
| Border Radius | 8px | `--radius-md` |

[Continue with all 18 sections...]
```

### Figma Mapping: `docs/mapping/<component>.md`

**8 Required Sections:**

| Section | Purpose | Format |
|---------|---------|--------|
| **1. Node Structure** | Figma layer hierarchy | Code tree |
| **2. Property Mapping** | Figma prop → Code prop | Table |
| **3. Token Extraction** | Design tokens from Figma | Table |
| **4. Auto Layout** | Gap, padding, direction | Table |
| **5. Variants** | Figma variants → Props | Table |
| **6. Assets** | Images, icons, SVGs | Table |
| **7. Implementation Notes** | Special cases, gotchas | Bullets |
| **8. Update Log** | Change history | Table |

**Template:**
```markdown
# Component Mapping: component-name

| Property | Value |
|----------|-------|
| **Figma Node** | 123:456 |
| **Component Path** | `src/components/component/` |
| **Last Synced** | 2025-10-16 |

## Node Structure
```
Component (123:456)
├─ Container (123:457)
│  ├─ Icon (123:458)
│  └─ Text (123:459)
└─ Background (123:460)
```

## Property Mapping
| Figma Property | Value | Code Property | Token |
|----------------|-------|---------------|-------|
| Fill | #007AFF | `bg-primary-500` | `--color-primary-500` |
| Padding | 16px | `p-4` | `--spacing-4` |

[Continue with all 8 sections...]
```

---

## Token-Efficient Markdown

### Tables (Preferred for Structured Data)

```markdown
<!-- ✅ GOOD - Scannable, token-efficient -->
| Variant | Background | Text | Border |
|---------|------------|------|--------|
| Primary | `primary-500` | `white` | - |
| Secondary | `neutral-100` | `neutral-900` | - |
| Outline | `transparent` | `neutral-900` | `neutral-300` |
```

### Bullets (For Lists)

```markdown
<!-- ✅ GOOD - Quick scan -->
- Width: 320px
- Height: 48px
- Padding: 16px (all sides)
- Gap: 8px
- Border radius: 8px

<!-- ❌ AVOID - Too verbose -->
The component has a width of three hundred and twenty pixels,
a height of forty-eight pixels, and padding of sixteen pixels
applied to all sides.
```

### Code Blocks (For Examples)

```markdown
<!-- ✅ GOOD - Clear, reusable -->
```tsx
<Button variant="primary" size="md">
  Click me
</Button>
```

<!-- ❌ AVOID - Paragraph description -->
To use the button, import it and pass the variant prop
set to "primary" and size prop set to "md".
```

### Exact Values (Always Use Numbers)

```markdown
<!-- ✅ GOOD -->
Padding: 16px
Gap: 8px
Font size: 14px
Line height: 1.5

<!-- ❌ AVOID -->
Padding: medium spacing
Gap: small gap
Font size: body text
Line height: normal
```

---

## Update Workflow

### When to Update

**Trigger Events:**
- ✅ New component created
- ✅ Component modified
- ✅ Figma design changed
- ✅ Props API updated
- ✅ New variant added

### Update Sequence

1. **Modify Component** → `src/components/<Component>/`
2. **Update Spec Doc** → `docs/components/<Component>.md`
3. **Update Mapping** → `docs/mapping/<component>.md`
4. **Update Memory** → `.github/.agent-memory.md`

### Validation

**Before committing, verify:**
- [ ] All 18 sections in component doc
- [ ] All 8 sections in mapping doc
- [ ] Cross-references are correct
- [ ] Code examples are tested
- [ ] Figma links are valid
- [ ] Tokens are documented

---

## Cross-References

### Linking Guidelines

```markdown
<!-- Component to Mapping -->
See [Figma Mapping](../../mapping/button.md) for translation details.

<!-- Mapping to Component -->
See [Component Spec](../../components/Button.md) for full specifications.

<!-- Between Components -->
Similar to [Card](./Card.md) component.

<!-- To Code -->
Implementation: [`src/components/button/Button.tsx`](../../src/components/button/Button.tsx)

<!-- To Figma -->
Design: [Figma Node](https://www.figma.com/design/...?node-id=123-456)
```

### Reference Section Format

```markdown
## References

**Related Components:**
- [Card](./Card.md)
- [Input](./Input.md)

**Related Docs:**
- [Component Patterns](../.github/instructions/component-patterns.instructions.md)
- [Figma MCP](../.github/instructions/figma-mcp.instructions.md)

**Figma:**
- [Design File](https://figma.com/...)
- [Node: 123:456](https://figma.com/...?node-id=123-456)

**Code:**
- [`Button.tsx`](../../src/components/button/Button.tsx)
- [`Button.types.ts`](../../src/components/button/Button.types.ts)
```

---

## Examples

### Good Documentation

```markdown
## Spacing

| Property | Value | Token |
|----------|-------|-------|
| Padding | 16px | `--spacing-4` |
| Gap | 8px | `--spacing-2` |
| Margin | 24px | `--spacing-6` |

## Layout

```tsx
<div className="flex items-center gap-2 p-4">
  <Icon />
  <Text />
</div>
```

## States

| State | Behavior |
|-------|----------|
| **Default** | `bg-primary-500 text-white` |
| **Hover** | `bg-primary-600` |
| **Active** | `bg-primary-700` |
| **Disabled** | `opacity-50 cursor-not-allowed` |
```

### Poor Documentation (Avoid)

```markdown
## Spacing

The component uses padding on all sides. The amount of padding is
medium-sized and follows our design system guidelines. There is also
a gap between elements which is smaller than the padding.

## Layout

The component is laid out using flexbox. The items are centered
vertically and there is some space between them. The whole thing
has padding around it.
```

---

## Quick Reference

### Doc Checklist

**Component Doc (`docs/components/`):**
- [ ] All 18 sections present
- [ ] Table of contents with anchors
- [ ] Tables for structured data
- [ ] Code blocks for examples
- [ ] Exact values (not descriptions)
- [ ] Token references included
- [ ] Cross-references linked

**Mapping Doc (`docs/mapping/`):**
- [ ] All 8 sections present
- [ ] Node structure visualized
- [ ] Property mappings complete
- [ ] Token extraction documented
- [ ] Implementation notes included
- [ ] Update log maintained

### Writing Dos & Don'ts

| ❌ Don't | ✅ Do |
|---------|------|
| Write paragraphs | Use tables/bullets |
| Describe values | State exact numbers |
| Explain at length | Show code examples |
| Use vague terms | Use specific tokens |
| Skip sections | Follow template |
| Break links | Test all references |

---

**Related Files:**
- [Component Patterns](./component-patterns.instructions.md)
- [Figma MCP Rules](./figma-mcp.instructions.md)
- [Main instructions](../copilot-instructions.md)
