import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import http from 'http';

const MCP_VERSION = '2024-11-05';
const SERVER_NAME = 'skullcandy-mcp-server';
const SERVER_VERSION = '0.1.0';
const API_BASE = 'http://127.0.0.1:8787';
const MCP_PORT = 3001; // Different port from REST API

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
function callAPI(endpoint: string, params: Record<string, string> = {}): Promise<any> {
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
async function handleMCPRequest(request: any) {
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

    case 'notifications/initialized':
      // Acknowledge the initialized notification
      // This is sent after initialize is complete
      return { acknowledged: true };

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
      } catch (error: any) {
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

// Create Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// MCP endpoint - handles JSON-RPC requests
app.post('/mcp', async (req: Request, res: Response) => {
  try {
    const request = req.body;
    console.log(`[MCP-HTTP] ${request.method}`, request.params ? JSON.stringify(request.params).substring(0, 50) : '');

    // Handle notifications (no id, no response needed)
    if (request.method?.startsWith('notifications/')) {
      console.log(`[MCP-HTTP] Notification acknowledged: ${request.method}`);
      // For notifications, just return 200 OK with empty result
      res.json({ jsonrpc: '2.0', result: null });
      return;
    }

    const result = await handleMCPRequest(request);

    const response = {
      jsonrpc: '2.0',
      id: request.id,
      result,
    };

    res.json(response);
  } catch (error: any) {
    console.error('[MCP-HTTP] Error:', error.message);
    const errorResponse = {
      jsonrpc: '2.0',
      id: req.body.id || null,
      error: {
        code: -32603,
        message: error.message,
      },
    };
    res.status(500).json(errorResponse);
  }
});

// Health check
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: SERVER_NAME,
    version: SERVER_VERSION,
    protocol: 'MCP over HTTP',
    endpoint: '/mcp',
    status: 'running',
  });
});

// Start server
const server = app.listen(MCP_PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🔌 SkullCandy MCP-over-HTTP Server');
  console.log('='.repeat(60));
  console.log(`🚀 MCP endpoint: http://localhost:${MCP_PORT}/mcp`);
  console.log(`📊 Health check: http://localhost:${MCP_PORT}/`);
  console.log(`🔗 REST API proxy: ${API_BASE}`);
  console.log('\n💡 VS Code configuration:');
  console.log('   {');
  console.log('     "skullcandy-mcp-server": {');
  console.log(`       "url": "http://127.0.0.1:${MCP_PORT}/mcp",`);
  console.log('       "type": "http"');
  console.log('     }');
  console.log('   }');
  console.log('='.repeat(60) + '\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing MCP server');
  server.close(() => {
    console.log('MCP server closed');
  });
});

export default app;
