import { NextRequest, NextResponse } from 'next/server';
import componentsData from '@/../../data/components.json';
import tokensData from '@/../../data/tokens.json';

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
          
          let toolResult: any;
          
          switch (name) {
            case 'list_components': {
              const components = Object.keys(componentsData);
              toolResult = {
                meta: { version: '0.1.0', source: 'skullcandy-mcp' },
                data: { components, count: components.length },
                status: 'ok',
              };
              break;
            }
            case 'get_component_context': {
              const componentName = args?.name;
              if (!componentName) {
                return NextResponse.json({
                  jsonrpc: '2.0',
                  id: body.id,
                  error: { code: -32602, message: 'Missing parameter: name' },
                });
              }
              const componentInfo = (componentsData as any)[componentName];
              if (!componentInfo) {
                return NextResponse.json({
                  jsonrpc: '2.0',
                  id: body.id,
                  error: { code: -32602, message: `Component '${componentName}' not found` },
                });
              }
              toolResult = {
                meta: { version: '0.1.0', source: 'skullcandy-mcp' },
                data: {
                  component: {
                    name: componentName,
                    import: componentInfo.import,
                    props: componentInfo.props,
                    examples: componentInfo.examples,
                    figma: componentInfo.figma,
                  },
                  tokens: {},
                },
              };
              break;
            }
            case 'list_tokens': {
              const scope = args?.scope;
              let filteredTokens: any = tokensData;
              if (scope) {
                const scopes = scope.split(',').map((s: string) => s.trim().toLowerCase());
                filteredTokens = Object.fromEntries(
                  Object.entries(tokensData).filter(([key]) => {
                    const tokenKey = key.toLowerCase();
                    return scopes.some((s: string) => tokenKey.includes(s));
                  })
                );
              }
              toolResult = {
                meta: { version: '0.1.0', source: 'skullcandy-mcp' },
                data: { tokens: filteredTokens, count: Object.keys(filteredTokens).length },
              };
              break;
            }
            case 'compare_variants': {
              const componentName = args?.name;
              if (!componentName) {
                return NextResponse.json({
                  jsonrpc: '2.0',
                  id: body.id,
                  error: { code: -32602, message: 'Missing parameter: name' },
                });
              }
              const componentInfo = (componentsData as any)[componentName];
              if (!componentInfo) {
                return NextResponse.json({
                  jsonrpc: '2.0',
                  id: body.id,
                  error: { code: -32602, message: `Component '${componentName}' not found` },
                });
              }
              const figmaVariants = componentInfo.figma?.variants || {};
              const codeProps = componentInfo.props || {};
              const comparison: any = {};
              const allProps = new Set([...Object.keys(figmaVariants), ...Object.keys(codeProps)]);
              allProps.forEach((prop) => {
                const figmaValues = figmaVariants[prop] || [];
                const codeValues = codeProps[prop] || [];
                const match = JSON.stringify(figmaValues.sort()) === JSON.stringify(codeValues.sort());
                comparison[prop] = { figma: figmaValues, code: codeValues, match };
              });
              toolResult = {
                meta: { version: '0.1.0', source: 'skullcandy-mcp' },
                data: { component: componentName, comparison },
              };
              break;
            }
            default:
              return NextResponse.json({
                jsonrpc: '2.0',
                id: body.id,
                error: { code: -32601, message: `Unknown tool: ${name}` },
              });
          }
          
          return NextResponse.json({
            jsonrpc: '2.0',
            id: body.id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(toolResult, null, 2),
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
