# SkullCandy Design System MCP Server

A lightweight HTTP JSON server that provides design system context for AI coding assistants (Copilot/Cursor).

## 🚀 Quick Start

```bash
# Start the server
pnpm run mcp

# Test endpoints
pnpm run mcp:test

# Development (with auto-reload)
pnpm run mcp:dev
```

Server runs on **http://localhost:8787**

## 📋 API Endpoints

### 1. Health Check
```bash
GET /
```

**Response:**
```json
{
  "name": "SkullCandy Design System MCP Server",
  "version": "0.1.0",
  "status": "running",
  "endpoints": [...]
}
```

### 2. List Components
```bash
GET /list-components
```

**Response:**
```json
{
  "meta": { "version": "0.1.0", "source": "skullcandy-mcp" },
  "data": {
    "components": ["Button", "NFTCard", "SearchBar", "Navbar", "Cart", ...],
    "count": 9
  },
  "status": "ok"
}
```

### 3. Component Context
```bash
GET /component-context?name=Button
```

**Response:**
```json
{
  "meta": { "version": "0.1.0", "source": "skullcandy-mcp" },
  "data": {
    "component": "Button",
    "figma": {
      "variants": {
        "style": ["CTA", "Neutral", "Stroke"],
        "size": ["L", "M", "S"]
      }
    },
    "code": {
      "import": "@/components/button/Button",
      "props": {
        "style": ["CTA", "Neutral", "Stroke"],
        "size": ["L", "M", "S"]
      },
      "example": "<Button style=\"CTA\" size=\"M\">Buy Now</Button>"
    },
    "tokens": {
      "color": { ... },
      "spacing": { ... }
    }
  },
  "status": "ok"
}
```

### 4. List Tokens
```bash
GET /list-tokens?scope=color,spacing,typography
```

**Parameters:**
- `scope` (optional): Comma-separated list of token categories
  - Available: `color`, `spacing`, `radius`, `effects`, `typography`

**Response:**
```json
{
  "meta": { "version": "0.1.0", "source": "skullcandy-mcp" },
  "data": {
    "tokens": {
      "color": { "glass-light": "rgba(255, 255, 255, 0.1)", ... },
      "spacing": { "xs": "4px", "sm": "8px", ... }
    },
    "scope": ["color", "spacing"]
  },
  "status": "ok"
}
```

### 5. Compare Variants
```bash
GET /compare-variants?name=Button
```

**Response:**
```json
{
  "meta": { "version": "0.1.0", "source": "skullcandy-mcp" },
  "data": {
    "component": "Button",
    "comparison": {
      "matching": ["style", "size"],
      "missingInCode": [],
      "extraInCode": []
    },
    "figmaVariants": { ... },
    "codeProps": { ... }
  },
  "status": "ok|warn"
}
```

## 🤖 Usage with AI Assistants

### GitHub Copilot / Cursor

In your React component file, add this instruction comment:

```tsx
// Implement Figma: Button.CTA (SkullCandy)
// @mcp http://localhost:8787/component-context?name=Button

// Copilot will call the MCP server and get:
// - Valid imports: @/components/button/Button
// - Valid props: style="CTA", size="M"
// - Design tokens: --button-gradient, --glass-blur

import { Button } from "@/components/button/Button";

export function BuyNowCTA() {
  return <Button style="CTA" size="M">Buy Now</Button>;
}
```

### Workflow

1. **Before suggesting code**, AI calls: `http://localhost:8787/component-context?name=Button`
2. **Use returned data**:
   - `code.import` → correct import path
   - `code.props` → valid prop values
   - `tokens` → design system tokens
3. **Output React code** using exact component API

## 📂 File Structure

```
scripts/mcp/
├── mcp-server.ts              # Express server
├── test-server.js             # Test script
├── helpers/
│   ├── components.ts          # Component data loader (cached)
│   ├── tokens.ts              # Token manager (cached)
│   └── cssTokenParser.ts      # CSS variable parser
└── routes/
    ├── componentContext.ts    # /component-context
    ├── listComponents.ts      # /list-components
    ├── listTokens.ts          # /list-tokens
    └── compareVariants.ts     # /compare-variants

data/
├── components.json            # Component metadata
└── tokens.json                # Token fallback data
```

## ⚙️ Configuration

**Environment Variables** (`.env.local`):
```bash
MCP_PORT=8787
```

**TypeScript Config** (`tsconfig.mcp.json`):
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./scripts/mcp"
  }
}
```

## 🔄 Data Sources

### Primary: `src/styles/tokens.css`
- 130+ CSS custom properties
- Parsed at server start (cached)
- Used for `/list-tokens` endpoint

### Fallback: `data/tokens.json`
- Used if CSS parsing fails
- Contains color, spacing, radius, typography, effects

### Components: `data/components.json`
- All design system components
- Includes: import paths, props, examples, figma variants, tokens
- Loaded once at startup (cached)

## 🚀 Performance

**Optimizations:**
- ✅ Caching: Components and tokens cached after first load
- ✅ Timeouts: 5-second timeout on all requests
- ✅ Direct execution: No file watching in production
- ✅ Minimal dependencies: Express + CORS + Dotenv only

**Response Times:**
- Health check: ~5ms
- List components: ~10ms
- Component context: ~15ms
- List tokens: ~20ms (first call), ~5ms (cached)

## 🧪 Testing

```bash
# Run all endpoint tests
pnpm run mcp:test

# Manual curl tests
curl "http://localhost:8787/list-components"
curl "http://localhost:8787/component-context?name=Button"
curl "http://localhost:8787/list-tokens?scope=color"
curl "http://localhost:8787/compare-variants?name=NFTCard"
```

## 🏗️ Building for Production

```bash
# Build TypeScript to JavaScript
pnpm run mcp:build

# Run compiled version
pnpm run mcp:start
```

Output: `dist/mcp-server.js`

## 🐛 Troubleshooting

**Server not starting:**
```bash
# Check if port is already in use
lsof -i :8787

# Kill existing process
pkill -9 -f "mcp-server"
```

**Slow responses:**
- Check if `src/styles/tokens.css` exists
- Verify `data/components.json` is valid JSON
- Clear cache and restart server

**Connection refused:**
- Ensure server is running: `pnpm run mcp`
- Check firewall settings
- Verify port 8787 is not blocked

## 📝 Adding New Components

1. **Add to `data/components.json`**:
```json
{
  "NewComponent": {
    "import": "@/components/new-component/NewComponent",
    "props": {
      "variant": ["Primary", "Secondary"]
    },
    "examples": [
      "<NewComponent variant=\"Primary\">Content</NewComponent>"
    ],
    "figma": {
      "variants": {
        "variant": ["Primary", "Secondary"]
      }
    },
    "tokens": ["--spacing-md", "--glass-light"]
  }
}
```

2. **Restart server** (cache is cleared on restart)

3. **Test**:
```bash
curl "http://localhost:8787/component-context?name=NewComponent"
```

## 🔗 Integration Examples

### VS Code Task
```json
{
  "label": "Start MCP Server",
  "type": "shell",
  "command": "pnpm run mcp",
  "isBackground": true,
  "problemMatcher": []
}
```

### Pre-commit Hook
```bash
#!/bin/bash
# Validate components.json before commit
node -e "JSON.parse(require('fs').readFileSync('data/components.json'))"
```

## 📚 References

- **Components**: See `docs/components/` for detailed specs
- **Mapping**: See `docs/mapping/` for Figma-to-code mappings
- **Tokens**: See `src/styles/tokens.css` for all design tokens

---

**Version**: 0.1.0  
**Author**: SkullCandy Design System Team  
**License**: Private
