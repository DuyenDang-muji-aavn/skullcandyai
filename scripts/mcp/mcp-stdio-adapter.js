#!/usr/bin/env node
/**
 * MCP Protocol Adapter for SkullCandy Design System
 * Wraps the REST API with proper MCP JSON-RPC 2.0 protocol
 */

const http = require('http');

const MCP_VERSION = '2024-11-05';
const SERVER_NAME = 'skullcandy-mcp-server';
const SERVER_VERSION = '0.1.0';
const API_BASE = 'http://127.0.0.1:8787';

// MCP Tools Definition
const TOOLS = [
  {
    name: 'get_component_context',
    description: 'Get unified context (figma, code, tokens) for a component. Use this before suggesting any component code.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Component name (e.g., Button, NFTCard, SearchBar)',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'list_components',
    description: 'List all available design system components.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'list_tokens',
    description: 'List design tokens. Optionally filter by scope (color, spacing, typography, radius, effects).',
    inputSchema: {
      type: 'object',
      properties: {
        scope: {
          type: 'string',
          description: 'Comma-separated scopes: color,spacing,typography',
        },
      },
    },
  },
  {
    name: 'compare_variants',
    description: 'Compare Figma variants vs code props for a component.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Component name to compare',
        },
      },
      required: ['name'],
    },
  },
];

/**
 * Call the underlying REST API
 */
function callAPI(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE}${endpoint}${queryString ? '?' + queryString : ''}`;

    http
      .get(url, { timeout: 5000 }, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Invalid JSON from API'));
          }
        });
      })
      .on('error', reject)
      .on('timeout', () => reject(new Error('API timeout')));
  });
}

/**
 * Handle MCP JSON-RPC requests
 */
async function handleRequest(request) {
  const { method, params } = request;

  switch (method) {
    case 'initialize':
      return {
        protocolVersion: MCP_VERSION,
        serverInfo: {
          name: SERVER_NAME,
          version: SERVER_VERSION,
        },
        capabilities: {
          tools: {},
        },
      };

    case 'tools/list':
      return { tools: TOOLS };

    case 'tools/call': {
      const { name, arguments: args } = params;

      try {
        let result;
        switch (name) {
          case 'get_component_context':
            result = await callAPI('/component-context', { name: args.name });
            break;
          case 'list_components':
            result = await callAPI('/list-components');
            break;
          case 'list_tokens':
            result = await callAPI('/list-tokens', args.scope ? { scope: args.scope } : {});
            break;
          case 'compare_variants':
            result = await callAPI('/compare-variants', { name: args.name });
            break;
          default:
            throw new Error(`Unknown tool: ${name}`);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    }

    default:
      throw new Error(`Unknown method: ${method}`);
  }
}

/**
 * Main stdio handler
 */
async function main() {
  let buffer = '';

  process.stdin.on('data', async (chunk) => {
    buffer += chunk.toString();
    const parts = buffer.split('\n');
    buffer = parts.pop() || '';

    for (const line of parts) {
      if (!line.trim()) continue;

      try {
        const request = JSON.parse(line);
        const response = await handleRequest(request);

        const reply = {
          jsonrpc: '2.0',
          id: request.id,
          result: response,
        };

        process.stdout.write(JSON.stringify(reply) + '\n');
      } catch (error) {
        const errorReply = {
          jsonrpc: '2.0',
          id: (typeof request !== 'undefined' && request.id) || null,
          error: {
            code: -32603,
            message: error.message,
          },
        };
        process.stdout.write(JSON.stringify(errorReply) + '\n');
      }
    }
  });

  process.stdin.on('end', async () => {
    // Process any remaining buffer
    if (buffer.trim()) {
      try {
        const request = JSON.parse(buffer);
        const response = await handleRequest(request);
        const reply = {
          jsonrpc: '2.0',
          id: request.id,
          result: response,
        };
        process.stdout.write(JSON.stringify(reply) + '\n');
      } catch (error) {
        // Ignore errors on exit
      }
    }
    process.exit(0);
  });

  // Keep alive
  process.stdin.resume();
}

// Start
console.error(`[MCP] ${SERVER_NAME} v${SERVER_VERSION} starting...`);
console.error(`[MCP] Connecting to REST API at ${API_BASE}`);
main().catch((err) => {
  console.error('[MCP] Fatal error:', err);
  process.exit(1);
});
