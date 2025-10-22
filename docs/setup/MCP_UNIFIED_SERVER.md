# SkullCandy MCP Unified Server

## ✅ Simplified Architecture

**ONE SERVER, TWO PROTOCOLS:**
- **Port 3001** - Single server handles both MCP protocol AND REST API
- No more dual-server setup!

## 🚀 Quick Start

```bash
# Start the server (only one command needed!)
pnpm run mcp

# Server runs on http://localhost:3001
# - MCP Protocol: POST /mcp
# - REST API: GET /list-components, /component-context, etc.
```

## 📋 VS Code Configuration

Already configured in `mcp.json`:

```json
{
  "servers": {
    "skullcandy-mcp-server": {
      "url": "http://127.0.0.1:3001/mcp",
      "type": "http"
    }
  }
}
```

## 🔧 Available Endpoints

### MCP Protocol (for VS Code)
```bash
POST http://localhost:3001/mcp

# Example: List components
curl -X POST http://localhost:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "list_components",
      "arguments": {}
    }
  }'
```

### REST API (for direct access)
```bash
# List all components
GET http://localhost:3001/list-components

# Get component context
GET http://localhost:3001/component-context?name=Button

# List design tokens
GET http://localhost:3001/list-tokens?scope=color

# Compare variants
GET http://localhost:3001/compare-variants?name=Button
```

## 🛠️ Available Tools

1. **get_component_context** - Get full component info (figma, code, tokens)
2. **list_components** - List all available components
3. **list_tokens** - List design tokens (optionally filter by scope)
4. **compare_variants** - Compare Figma variants vs code props

## 📊 Architecture

```
Before (2 servers):
  VS Code → Port 3001 (MCP Adapter) → Port 8787 (REST API) → Data

After (1 server):
  VS Code → Port 3001 (Unified Server) → Data
  Direct API → Port 3001 (Unified Server) → Data
```

## ✅ Benefits

- **Simpler**: One server instead of two
- **Faster**: No proxy overhead
- **Cleaner**: Single port, single process
- **Flexible**: Both MCP and REST on same endpoint

## 🧪 Testing

```bash
# Test REST API
curl http://localhost:3001/list-components

# Test MCP Protocol
curl -X POST http://localhost:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}'

# Check server health
curl http://localhost:3001/
```

## 📝 Scripts

```json
{
  "mcp": "Start unified server (port 3001)",
  "mcp:old": "Legacy dual-server setup (deprecated)",
  "mcp:test": "Test server endpoints"
}
```

## 🔍 Logs

Server logs: `/tmp/mcp-unified.log`

```bash
tail -f /tmp/mcp-unified.log
```

## ⚡ Migration Notes

**Old setup (deprecated):**
- Port 8787: REST API
- Port 3001: MCP Adapter
- Command: `pnpm run mcp:all`

**New setup (current):**
- Port 3001: Unified server (MCP + REST)
- Command: `pnpm run mcp`

No changes needed in VS Code config - same URL!
