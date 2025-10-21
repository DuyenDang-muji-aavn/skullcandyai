# SkullCandy Design System

Production-ready Next.js 14 + TypeScript workspace optimized for design-to-code using Figma MCP integration.

## 🎯 Project Overview

This project implements the SkullCandy design system with strict design-to-code parity, using:

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with token-based styling
- **Radix UI** primitives for accessibility
- **Storybook** (Vite) for component documentation
- **Figma MCP** for design synchronization

## 📦 Tech Stack

- **Framework**: Next.js 14.2.15 (App Router)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.18 + CSS Variables
- **Components**: Radix UI primitives
- **Variant Management**: class-variance-authority (CVA)
- **Storybook**: v8.6.14 with Vite builder
- **Testing**: Vitest 2.1.9 + React Testing Library
- **Package Manager**: pnpm 10.18.2

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (installed globally)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start Storybook
pnpm sb
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start Next.js development server on port 3000 |
| `pnpm build` | Build production bundle |
| `pnpm start` | Start production server |
| `pnpm sb` | Start Storybook on port 6006 |
| `pnpm sb:build` | Build Storybook for production |
| `pnpm lint` | Run ESLint with zero warnings tolerance |
| `pnpm format` | Format code with Prettier |
| `pnpm test` | Run all tests with Vitest |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm check:mapping` | Validate component mapping documentation |
| `pnpm check` | Run lint + test + mapping validation |

## 📁 Project Structure

```
SkullCandy2/
├── .storybook/              # Storybook configuration
│   ├── main.ts             # Storybook main config (Vite)
│   └── preview.tsx         # Global decorators and parameters
├── docs/                    # Documentation
│   ├── components/         # Component specifications from Figma
│   │   ├── Button.md                  # Complete Button spec (merged analysis + specs)
│   │   ├── NFTCard.md                 # NFT Card component spec
│   │   └── NFTCard-Figma-Analysis.md  # NFT Card Figma analysis (to be merged)
│   └── mapping/            # Figma-to-code mapping files
│       ├── button.md       # Button mapping with YAML front-matter
│       └── nft-card.md     # NFT Card mapping with YAML front-matter
├── scripts/                 # Build and validation scripts
│   └── validate-mapping.js # Validates mapping YAML schemas
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout with Orbitron font
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   └── button/         # Button component (to be implemented)
│   ├── styles/             # Global styles and tokens
│   │   ├── tokens.css      # Design tokens as CSS variables
│   │   └── globals.css     # Global styles with Tailwind
│   └── test/               # Test configuration
│       └── setup.ts        # Vitest setup with jest-dom
├── .designrc.json          # Project identity and Figma links
├── AGENT_INSTRUCTIONS.md   # Complete agent runbook
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind configuration
├── vitest.config.ts        # Vitest configuration
└── next.config.mjs         # Next.js configuration
```

## 🎨 Design System

### Design Tokens

All design tokens are defined in `src/styles/tokens.css` as CSS variables and referenced throughout the codebase. **Never hardcode colors, spacing, or typography values.**

```css
:root {
  /* Colors */
  --color-text-button: #ffffff;
  --glass-light: #ffffff1a;
  --glass-border: #ffffffe5;
  
  /* Typography */
  --font-display: 'Orbitron', sans-serif;
  --font-size-button-l: 24px;
  --font-size-button-m: 18px;
  --font-size-button-s: 14px;
  
  /* Effects */
  --glass-blur-amount: 100px;
  --radius-pill: 9999px;
}
```

### Tailwind Integration

Tailwind is configured to reference CSS variables via the `theme.extend` configuration:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      bg: 'var(--bg)',
      fg: 'var(--fg)',
      brand: { DEFAULT: 'var(--brand-9)' }
    },
    borderRadius: {
      pill: 'var(--radius-pill)'
    }
  }
}
```

## 🧩 Component Development

### Workflow

When adding or updating a component, **always follow this sequence**:

1. **Read Description**: Study `/docs/components/<Component>.md` for exact Figma specs
2. **Implement Component**: Create in `src/components/<kebab>/<Component>.tsx` using CVA
3. **Update Mapping**: Document in `docs/mapping/<component>.md` with YAML front-matter
4. **Create Stories**: Add all variants to `<Component>.stories.tsx` with Figma links
5. **Write Tests**: Add tests in `<Component>.test.tsx`
6. **Validate**: Run `pnpm check` to ensure everything passes

### Button Component Example

The Button component demonstrates the complete workflow:

- **Description**: `/docs/components/Button.md`
- **Mapping**: `/docs/mapping/button.md` (9 variants documented)
- **Implementation**: `/src/components/button/Button.tsx` (to be created)
- **Stories**: All 9 combinations (Size × Style)
- **Tests**: Render, interaction, and a11y tests

## 🔍 Figma Integration

### Figma MCP

This project uses Figma MCP to extract design tokens and maintain design-code parity.

**Project Configuration** (`.designrc.json`):

```json
{
  "projectName": "SkullCandy",
  "organization": "ePost",
  "designSystem": "DevDaySkullCandy",
  "figma": {
    "fileUrl": "https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy",
    "rootNodeId": "0:1"
  }
}
```

### Design Variables Extracted

See `docs/components/Button.md` for the complete specification including extracted design tokens and Figma analysis for the Button component.

## ✅ Validation

### Mapping Validation

The `scripts/validate-mapping.js` script ensures:

- ✅ All mapping files have valid YAML front-matter
- ✅ Required fields are present (`component`, `figma`, `mapping`)
- ✅ Code paths exist on disk
- ✅ Figma node IDs are documented

Run validation:

```bash
pnpm check:mapping
```

## 🧪 Testing

Tests are written with Vitest and React Testing Library:

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch
```

## 📚 Documentation

### Component Documentation

Each component has two documentation files:

1. **Description** (`/docs/components/<Component>.md`): Detailed specs from Figma
2. **Mapping** (`/docs/mapping/<component>.md`): YAML front-matter with node IDs and token mappings

### Agent Instructions

See `AGENT_INSTRUCTIONS.md` for the complete runbook that all agents must follow when working on this project.

## 🎯 Guardrails

1. ❌ **Never hardcode hex colors** in components
2. ✅ **Always reference CSS variables** for colors, spacing, typography
3. ✅ **Keep Radix primitives intact** for accessibility
4. ✅ **Update mappings** when Figma nodes change
5. ✅ **Maintain design-code parity** at all times

## 🚧 Current Status

### ✅ Completed

- [x] Next.js 14 + TypeScript workspace scaffolded
- [x] Tailwind CSS with token-based configuration
- [x] Storybook (Vite) setup with addon-designs
- [x] ESLint, Prettier, Vitest configured
- [x] Design token foundation in CSS variables
- [x] Validation scripts for component mappings
- [x] Button component documentation
- [x] Figma MCP analysis completed

### 🔄 In Progress

- [ ] Button component implementation
- [ ] Button Storybook stories (9 variants)
- [ ] Button tests

### 📋 Next Steps

1. Get confirmation on gradient colors for CTA button
2. Implement Button component with CVA
3. Create all 9 Storybook stories
4. Write comprehensive tests
5. Validate with `pnpm check`
6. Launch Storybook for visual verification

## 🤝 Contributing

When contributing, ensure you:

1. Follow the component development workflow
2. Reference design tokens (never hardcode)
3. Update both description and mapping docs
4. Add Storybook stories for all variants
5. Write tests
6. Run `pnpm check` before committing

## 📄 License

Private project for ePost organization.

---

**Built with ❤️ for design-to-code parity**
