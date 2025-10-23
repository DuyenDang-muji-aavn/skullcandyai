# SkullCandy MCP API Routes

Next.js API routes for Model Context Protocol (MCP) server integration.

## 🚀 Endpoints

### 1. Main MCP Endpoint
**GET** `/mcp`
- Returns list of available endpoints

**POST** `/mcp`
- Handles MCP protocol JSON-RPC messages
- Supports `initialize`, `tools/list`, `tools/call` methods

### 2. List Components
**GET** `/mcp/list-components`

**Response:**
```json
{
  "meta": { "version": "0.1.0", "source": "skullcandy-mcp" },
  "data": {
    "components": ["Button", "NFTCard", "SearchBar", ...],
    "count": 9
  },
  "status": "ok"
}
```

### 3. Get Component Context
**GET** `/api/mcp/get-component-context?name=<ComponentName>`

**Example:**
```bash
curl "http://localhost:3000/mcp/get-component-context?name=Button"
```

**Response:**
```json
{
  "meta": { "version": "0.1.0", "source": "skullcandy-mcp" },
  "data": {
    "component": {
      "name": "Button",
      "import": "@/components/button/Button",
      "props": { "style": ["CTA", "Neutral", "Stroke"], "size": ["L", "M", "S"] },
      "examples": ["<Button style=\"CTA\" size=\"M\">Buy Now</Button>"],
      "figma": { "variants": {...} }
    },
    "tokens": {}
  }
}
```

### 4. List Tokens
**GET** `/api/mcp/list-tokens?scope=<scopes>`

**Example:**
```bash
curl "http://localhost:3000/mcp/list-tokens?scope=color,spacing"
```

**Response:**
```json
{
  "meta": { "version": "0.1.0", "source": "skullcandy-mcp" },
  "data": {
    "tokens": { "color": {...}, "spacing": {...} },
    "count": 2
  }
}
```

### 5. Compare Variants
**GET** `/api/mcp/compare-variants?name=<ComponentName>`

**Example:**
```bash
curl "http://localhost:3000/mcp/compare-variants?name=Button"
```

**Response:**
```json
{
  "meta": { "version": "0.1.0", "source": "skullcandy-mcp" },
  "data": {
    "component": "Button",
    "comparison": {
      "style": {
        "figma": ["CTA", "Neutral", "Stroke"],
        "code": ["CTA", "Neutral", "Stroke"],
        "match": true
      },
      "size": {
        "figma": ["L", "M", "S"],
        "code": ["L", "M", "S"],
        "match": true
      }
    }
  }
}
```

## 🧪 Testing Locally

**Start the dev server:**
```bash
pnpm dev
```

**Test all endpoints:**
```bash
# List components
curl "http://localhost:3000/mcp/list-components" | jq .

# Get component context
curl "http://localhost:3000/mcp/get-component-context?name=Button" | jq .

# List tokens
curl "http://localhost:3000/mcp/list-tokens?scope=color" | jq .

# Compare variants
curl "http://localhost:3000/mcp/compare-variants?name=Button" | jq .

# Test MCP protocol
curl -X POST "http://localhost:3000/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' | jq .
```

## 🌐 Vercel Deployment

Once deployed to Vercel, the API will be available at:
```
https://skullcandyai-lnmu.vercel.app/mcp/list-components
https://skullcandyai-lnmu.vercel.app/mcp/get-component-context?name=Button
https://skullcandyai-lnmu.vercel.app/mcp/list-tokens
https://skullcandyai-lnmu.vercel.app/mcp/compare-variants?name=Button
```

## 🔧 VS Code MCP Configuration

Update your `mcp.json`:
```json
{
  "servers": {
    "sc-cloud-mcp-server": {
      "url": "https://skullcandyai-lnmu.vercel.app/api/mcp",
      "type": "http"
    }
  }
}
```

## 📁 File Structure

```
src/app/mcp/
├── route.ts                      # Main MCP endpoint (GET/POST)
├── list-components/
│   └── route.ts                  # List all components
├── get-component-context/
│   └── route.ts                  # Get component details
├── list-tokens/
│   └── route.ts                  # List design tokens
├── compare-variants/
│   └── route.ts                  # Compare Figma vs code
└── README.md                     # This file
```

## 📊 Data Sources

- **Components**: `data/components.json`
- **Tokens**: `data/tokens.json`

## 🚨 Error Handling

All endpoints return proper error responses:

**400 Bad Request** - Missing required parameters
```json
{
  "meta": { "version": "0.1.0", "source": "skullcandy-mcp" },
  "status": "error",
  "message": "Missing required parameter: name"
}
```

**404 Not Found** - Component not found
```json
{
  "meta": { "version": "0.1.0", "source": "skullcandy-mcp" },
  "status": "error",
  "message": "Component 'InvalidName' not found"
}
```

**500 Internal Server Error** - Server error
```json
{
  "error": "Internal server error"
}
```

## 📚 Related Documentation

- [Main MCP Server README](../../../../scripts/mcp/README.md)
- [MCP Setup Guide](../../../../docs/setup/MCP_UNIFIED_SERVER.md)
- [Component Patterns](../../../../.github/instructions/component-patterns.instructions.md)

---

**Created**: 2025-10-23  
**Status**: ✅ Production Ready  
**Version**: 0.1.0
