# MCP Server - HTTP vs STDIO Setup

## Two Options for VS Code Integration

### Option 1: MCP-over-HTTP (Like Figma MCP) ⭐ RECOMMENDED

**Pros:**
- ✅ Single command to start
- ✅ Works like Figma MCP
- ✅ Easy to debug with curl
- ✅ Can be accessed remotely
- ✅ No stdio complexity

**Cons:**
- ❌ Uses an extra port (3001)

#### Setup:

**1. Start both servers:**
```bash
# Terminal 1: REST API (port 8787)
pnpm run mcp

# Terminal 2: MCP-over-HTTP adapter (port 3001)
pnpm run mcp:http
```

**Or use a single command:**
```bash
# Start both in background
pnpm run mcp > /tmp/mcp-api.log 2>&1 &
pnpm run mcp:http > /tmp/mcp-http.log 2>&1 &
```

**2. VS Code Configuration:**

Edit: `~/Library/Application Support/Code/User/mcp.json`

```json
{
  "servers": {
    "figma-mcp-server": {
      "url": "http://127.0.0.1:3845/mcp",
      "type": "http"
    },
    "skullcandy-mcp-server": {
      "url": "http://127.0.0.1:3001/mcp",
      "type": "http"
    }
  },
  "inputs": []
}
```

**3. Reload VS Code:**
- Cmd+Shift+P → "Developer: Reload Window"

**4. Verify:**
```bash
# Test initialize
curl -X POST http://localhost:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}'

# Test tools/list
curl -X POST http://localhost:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'

# Test calling a tool
curl -X POST http://localhost:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"list_components","arguments":{}}}'
```

---

### Option 2: STDIO (Traditional MCP)

**Pros:**
- ✅ Only one port needed (8787)
- ✅ Standard MCP approach

**Cons:**
- ❌ Harder to debug
- ❌ VS Code spawns process each time
- ❌ No direct testing with curl

#### Setup:

**1. Start REST API server:**
```bash
pnpm run mcp
```

**2. VS Code Configuration:**

Edit: `~/Library/Application Support/Code/User/mcp.json`

```json
{
  "servers": {
    "figma-mcp-server": {
      "url": "http://127.0.0.1:3845/mcp",
      "type": "http"
    },
    "skullcandy-mcp-server": {
      "command": "node",
      "args": ["/Users/antruong/Work/Projects/SkullCandy2/scripts/mcp/mcp-stdio-adapter.js"],
      "type": "stdio"
    }
  },
  "inputs": []
}
```

**3. Reload VS Code:**
- Cmd+Shift+P → "Developer: Reload Window"

**4. Verify:**
```bash
# Test with stdio
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' | \
  node /Users/antruong/Work/Projects/SkullCandy2/scripts/mcp/mcp-stdio-adapter.js
```

---

## Architecture Comparison

### HTTP Version:
```
VS Code Copilot
      ↓ (HTTP POST to /mcp)
MCP-over-HTTP Server (port 3001)
      ↓ (HTTP GET)
REST API Server (port 8787)
      ↓
Design System Data
```

### STDIO Version:
```
VS Code Copilot
      ↓ (spawns process, stdio)
MCP STDIO Adapter
      ↓ (HTTP GET)
REST API Server (port 8787)
      ↓
Design System Data
```

---

## Scripts Summary

| Script | Description | Ports |
|--------|-------------|-------|
| `pnpm run mcp` | REST API server | 8787 |
| `pnpm run mcp:http` | MCP-over-HTTP adapter | 3001 |
| `pnpm run mcp:test` | Test REST API endpoints | - |

---

## Troubleshooting

### HTTP Version

**"Connection refused on port 3001"**
```bash
# Check if HTTP adapter is running
lsof -i :3001

# Start it
pnpm run mcp:http
```

**"404 from API"**
```bash
# Check if REST API is running
curl http://localhost:8787/

# Start it
pnpm run mcp
```

**VS Code not showing tools**
1. Verify URL in mcp.json: `http://127.0.0.1:3001/mcp`
2. Ensure type is "http"
3. Reload VS Code window

### STDIO Version

**"Waiting for server to respond"**
```bash
# Check if REST API is running
curl http://localhost:8787/

# Start it if not running
pnpm run mcp
```

**"Command not found"**
- Use absolute path in mcp.json args
- Verify file exists: `ls /Users/antruong/Work/Projects/SkullCandy2/scripts/mcp/mcp-stdio-adapter.js`

---

## Recommended: HTTP Version

**Why?**
1. ✅ **Easier debugging** - Can test with curl
2. ✅ **Better logging** - See requests in terminal
3. ✅ **Same pattern as Figma MCP** - Familiar
4. ✅ **More stable** - No process spawning issues
5. ✅ **Better error messages** - HTTP status codes

**Quick Start:**
```bash
# 1. Start both servers
pnpm run mcp &
pnpm run mcp:http &

# 2. Update mcp.json to use http://127.0.0.1:3001/mcp

# 3. Reload VS Code

# Done! Your tools will appear in Configure Tools
```

---

## VS Code Configuration Example (HTTP)

Complete `mcp.json` file:

```json
{
  "servers": {
    "figma-mcp-server": {
      "url": "http://127.0.0.1:3845/mcp",
      "type": "http"
    },
    "skullcandy-mcp-server": {
      "url": "http://127.0.0.1:3001/mcp",
      "type": "http"
    }
  },
  "inputs": []
}
```

After saving and reloading, you'll see in "Configure Tools":
- ✅ MCP Server: figma-mcp-server (expanded)
- ✅ MCP Server: skullcandy-mcp-server (expanded with 4 tools)

---

## Files Created

```
scripts/mcp/
├── mcp-server.ts              # REST API (port 8787)
├── mcp-http-adapter.ts        # MCP-over-HTTP (port 3001) ⭐ NEW
├── mcp-stdio-adapter.js       # MCP stdio adapter
├── test-server.js             # Test REST API
└── README.md                  # Documentation
```

Both adapters proxy to the same REST API, so you only need to pick one method (HTTP or STDIO) for VS Code integration.
