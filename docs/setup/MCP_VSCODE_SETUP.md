# MCP Server Configuration Guide

## Problem

VS Code's MCP integration expects:
1. **JSON-RPC 2.0 protocol** (not simple REST)
2. **stdio communication** (not HTTP for local servers)
3. **Proper `initialize` handshake** with protocol version

Your current setup has a REST API but no MCP protocol wrapper.

## Solution

### Step 1: Update VS Code MCP Configuration

Edit: `~/Library/Application Support/Code/User/mcp.json`

**Replace the `skullcandy-mcp-server` entry with:**

```json
{
  "servers": {
    "figma-mcp-server": {
      "url": "http://127.0.0.1:3845/mcp",
      "type": "http"
    },
    "skullcandy-mcp-server": {
      "command": "node",
      "args": [
        "/Users/antruong/Work/Projects/SkullCandy2/scripts/mcp/mcp-stdio-adapter.js"
      ],
      "type": "stdio"
    }
  },
  "inputs": []
}
```

### Step 2: Start the REST API Server

The MCP adapter (stdio) calls your REST API (HTTP), so you need BOTH running:

```bash
# Terminal 1: Start the REST API server
cd /Users/antruong/Work/Projects/SkullCandy2
pnpm run mcp
```

Keep this running in the background.

### Step 3: Reload VS Code

1. Save the `mcp.json` file
2. Run: `Developer: Reload Window` (Cmd+Shift+P)
3. Check "Configure Tools" - you should now see the MCP server with tools

### Step 4: Verify Tools Are Available

Open Configure Tools, you should see:
- ✅ `get_component_context` - Get component details
- ✅ `list_components` - List all components
- ✅ `list_tokens` - Get design tokens
- ✅ `compare_variants` - Compare Figma vs code

## Architecture

```
VS Code Copilot
      ↓ (stdio/JSON-RPC)
MCP Adapter (scripts/mcp/mcp-stdio-adapter.js)
      ↓ (HTTP/REST)
REST API Server (scripts/mcp/mcp-server.ts on port 8787)
      ↓
Design System Data (data/components.json, src/styles/tokens.css)
```

## Troubleshooting

### "Waiting for server to respond to 'initialize'"

**Cause**: REST API server not running
**Fix**: Start `pnpm run mcp` in a terminal

### "404 status"

**Cause**: Wrong URL or server not running
**Fix**: 
```bash
# Check if server is running
curl http://localhost:8787/

# Should return server info
```

### "Connection refused"

**Cause**: Port 8787 already in use or server crashed
**Fix**:
```bash
# Check port
lsof -i :8787

# Kill and restart
pkill -9 -f "mcp-server"
pnpm run mcp
```

### Tools not showing

**Cause**: Wrong mcp.json format or path
**Fix**: Use **absolute path** in args, and **stdio** type (not http)

## Testing

### Test REST API directly:
```bash
curl http://localhost:8787/list-components
```

### Test MCP Adapter:
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' | node scripts/mcp/mcp-stdio-adapter.js
```

Should return initialization response.

## Quick Start Script

Add to `package.json`:
```json
{
  "scripts": {
    "mcp:bg": "pnpm run mcp > /tmp/mcp-server.log 2>&1 &"
  }
}
```

Then just run:
```bash
pnpm run mcp:bg
```

This starts the server in the background, and the MCP adapter will work automatically in VS Code.
