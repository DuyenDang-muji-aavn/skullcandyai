# Instruction Files Update - TOC & Design System Rules

> **Date**: January 2025  
> **Changes**: Added TOC to all instruction files, created design-system-rules.md

---

## Changes Made

### 1. Created `design-system-rules.md` ✅

**Location**: `.github/instructions/design-system-rules.md`

**Purpose**: Comprehensive design system reference for Figma MCP integration

**Sections** (8 major):
1. **Token System** - Semantic classes, Figma→CSS conversions (blur ÷ 2)
2. **Component Architecture** - CVA pattern, file structure, existing components
3. **Figma MCP Workflow** - Required steps (get_code → get_variable_defs → get_screenshot)
4. **Styling Rules** - Hierarchy, custom utilities, responsive
5. **Asset Management** - Next.js Image, localhost sources
6. **Testing Requirements** - Template, coverage checklist
7. **Documentation Rules** - 18-section structure, token-efficient format
8. **Quick Reference** - Common patterns (glass, gradients, typography)

**Token Count**: ~1,400 tokens (efficient table format)

**Key Features**:
- ✅ DO/DON'T checklists
- ✅ Code templates (CVA, tests, docs)
- ✅ Token mapping tables
- ✅ Existing components reference
- ✅ Commands quick ref

---

### 2. Added TOC to `figma-mcp.instructions.md` ✅

**Sections** (11):
1. Core Principles
2. Required Flow (DO NOT SKIP)
3. Implementation Rules
4. Translation Guide
5. Asset Handling
6. Node ID Extraction
7. Component Reuse Strategy
8. Validation Checklist
9. Example Workflow
10. Figma Blur Conversion
11. Quick Reference

---

### 3. Added TOC to `copilot-instructions.md` ✅

**Sections** (11):
1. Project Stack
2. File Priority (Check First)
3. Commands
4. Project Structure
5. Critical Rules
6. Token System Quick Ref
7. Workflow Summary
8. Key Files
9. Patterns
10. TypeScript
11. Notes

---

### 4. Added TOC to `component-development.instructions.md` ✅

**Sections** (8):
1. Critical: Always Wait for Confirmation
2. 5-Step Update Process
3. Component Creation Checklist
4. Architecture Patterns
5. Figma MCP Integration
6. Layout Pattern Examples
7. Testing Requirements
8. Guardrails

---

### 5. Added TOC to `documentation-standards.instructions.md` ✅

**Sections** (6):
1. Core Principles
2. General Rules
3. 2-File System
4. Token-Efficient Markdown
5. Update Workflow
6. Cross-References

---

## Instruction Files Structure (Complete)

```
.github/instructions/
├── copilot-instructions.md              # Main quick reference
│   ├── TOC (11 sections)
│   ├── Project stack
│   ├── File priority
│   └── Quick refs
│
├── design-system-rules.md               # NEW: Comprehensive design system
│   ├── TOC (8 sections)
│   ├── Token system (complete mapping)
│   ├── Component architecture (CVA)
│   ├── Figma MCP workflow
│   ├── Testing templates
│   └── Quick reference patterns
│
├── figma-mcp.instructions.md            # Figma integration workflow
│   ├── TOC (11 sections)
│   ├── Required flow
│   ├── Translation guide
│   ├── Asset handling
│   └── Validation checklist
│
├── component-development.instructions.md # Component workflow
│   ├── TOC (8 sections)
│   ├── 5-step process
│   ├── Architecture patterns
│   └── Testing requirements
│
└── documentation-standards.instructions.md # Doc format
    ├── TOC (6 sections)
    ├── 18-section structure
    ├── Token-efficient writing
    └── Examples (BAD vs GOOD)
```

---

## Benefits

### Navigation
- **Quick scanning**: TOC at top of every file
- **Direct jumping**: Anchored links to sections
- **Cross-references**: Links between related files

### Discoverability
- **Find what you need**: Section titles in TOC
- **Understand hierarchy**: Numbered sections
- **Related content**: See all sections at once

### Efficiency
- **Skip to section**: No scrolling through entire file
- **Context awareness**: Know where you are
- **Faster onboarding**: New AI agents see structure immediately

---

## Design System Rules Highlights

### Token Mapping Table

| Figma Property | Figma Value | CSS Value | Class |
|----------------|-------------|-----------|-------|
| Glass Blur Amount | 200 | **100px** | `backdrop-blur-glass` |
| Font Family/Title | Orbitron | Orbitron | `font-family-title` |
| Color/Glass Light | #ffffff1a | rgba(255,255,255,0.1) | `bg-glass-light` |

### CVA Pattern Template

```tsx
const componentVariants = cva(
  'base-classes font-family-title',
  {
    variants: {
      style: { primary: 'bg-glass-light', secondary: 'bg-glass-dark' },
      size: { L: 'text-[24px]', M: 'text-[18px]' },
    },
    defaultVariants: { style: 'primary', size: 'M' },
  }
);
```

### Existing Components Reference

| Component | Path | Variants | Sizes |
|-----------|------|----------|-------|
| Button | `src/components/button` | CTA, Neutral, Stroke | L, M, S |
| SearchBar | `src/components/search-bar` | — | M, L |
| SectionHeading | `src/components/section-heading` | — | — |
| NFTGrid | `src/components/nft-grid` | — | — |

### Quick Reference Patterns

All common patterns ready to copy-paste:
- Glass morphism
- Gradient border
- Button with gradient
- Typography (title + description)

---

## Token Efficiency

| File | Tokens | Format |
|------|--------|--------|
| `design-system-rules.md` | ~1,400 | Tables, bullets, code |
| `figma-mcp.instructions.md` | ~850 | Tables, bullets, code |
| `copilot-instructions.md` | ~450 | Quick ref format |
| `component-development.instructions.md` | ~500 | Checklist format |
| `documentation-standards.instructions.md` | ~300 | Examples + rules |

**Total**: ~3,500 tokens across all instruction files

---

## Validation

All files follow `documentation-standards.instructions.md`:
- ✅ Table of Contents (required)
- ✅ Tables > Paragraphs
- ✅ Bullets > Sentences
- ✅ Code > Prose
- ✅ Keywords > Explanations
- ✅ Emojis for visual cues (✅❌⚠️)

---

## Usage for AI Agents

### Starting a Task

1. **Read** `copilot-instructions.md` - Get project overview
2. **Check** File Priority table - Know what to read next
3. **Follow** specific instruction file for task type:
   - Figma integration → `figma-mcp.instructions.md`
   - Component creation → `component-development.instructions.md`
   - Documentation → `documentation-standards.instructions.md`
   - Design system → `design-system-rules.md`

### During Implementation

1. **Navigate** using TOC - Jump to relevant section
2. **Reference** Quick Reference sections - Copy patterns
3. **Validate** using checklists - Ensure nothing missed

---

## Next Steps

With comprehensive instruction files in place:

1. **SectionHeading Documentation** (pending)
   - Create docs/components/SectionHeading.md (18 sections)
   - Create docs/mapping/section-heading.md
   - Follow documentation-standards.instructions.md format

2. **SectionHeading Stories & Tests** (pending)
   - Use templates from design-system-rules.md
   - Follow component-development.instructions.md workflow

3. **NFTGrid Documentation** (pending)
   - Update docs/components/NFTGrid.md
   - Add header section specifications

4. **Integration & Verification** (pending)
   - Integrate in app/page.tsx
   - Run pnpm check

---

**Status**: All instruction files updated with TOC ✅  
**New File**: design-system-rules.md created ✅  
**Format**: Token-efficient (tables, bullets, code) ✅  
**Navigation**: TOC in all 5 instruction files ✅
