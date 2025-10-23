import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    endpoints: [
      '/api/mcp/list-components',
      '/api/mcp/get-component-context',
      '/api/mcp/list-tokens',
      '/api/mcp/compare-variants',
    ],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle MCP protocol messages
    if (body.jsonrpc === '2.0') {
      const { method, params } = body;
      
      switch (method) {
        case 'initialize':
          return NextResponse.json({
            jsonrpc: '2.0',
            id: body.id,
            result: {
              protocolVersion: '0.1.0',
              serverInfo: {
                name: 'skullcandy-mcp-server',
                version: '0.1.0',
              },
              capabilities: {
                tools: {},
              },
            },
          });
          
        case 'tools/list':
          return NextResponse.json({
            jsonrpc: '2.0',
            id: body.id,
            result: {
              tools: [
                {
                  name: 'list_components',
                  description: 'List all available design system components',
                  inputSchema: {
                    type: 'object',
                    properties: {},
                  },
                },
                {
                  name: 'get_component_context',
                  description: 'Get comprehensive context for a component',
                  inputSchema: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        description: 'Component name (e.g., Button, NFTCard)',
                      },
                    },
                    required: ['name'],
                  },
                },
                {
                  name: 'list_tokens',
                  description: 'List design tokens',
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
                  description: 'Compare Figma variants vs code props',
                  inputSchema: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                        description: 'Component name',
                      },
                    },
                    required: ['name'],
                  },
                },
              ],
            },
          });
          
        case 'tools/call':
          const { name, arguments: args } = params;
          
          // Proxy to the appropriate endpoint
          const baseUrl = request.url.replace('/api/mcp', '/api/mcp');
          let endpointUrl = '';
          
          switch (name) {
            case 'list_components':
              endpointUrl = `${baseUrl}/list-components`;
              break;
            case 'get_component_context':
              endpointUrl = `${baseUrl}/get-component-context?name=${args.name}`;
              break;
            case 'list_tokens':
              endpointUrl = `${baseUrl}/list-tokens${args.scope ? `?scope=${args.scope}` : ''}`;
              break;
            case 'compare_variants':
              endpointUrl = `${baseUrl}/compare-variants?name=${args.name}`;
              break;
            default:
              return NextResponse.json({
                jsonrpc: '2.0',
                id: body.id,
                error: {
                  code: -32601,
                  message: `Unknown tool: ${name}`,
                },
              });
          }
          
          // Fetch from the endpoint
          const response = await fetch(endpointUrl);
          const data = await response.json();
          
          return NextResponse.json({
            jsonrpc: '2.0',
            id: body.id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(data, null, 2),
                },
              ],
            },
          });
          
        default:
          return NextResponse.json({
            jsonrpc: '2.0',
            id: body.id,
            error: {
              code: -32601,
              message: `Unknown method: ${method}`,
            },
          });
      }
    }
    
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
