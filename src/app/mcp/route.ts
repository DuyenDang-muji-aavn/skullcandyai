import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import componentsData from '@/../../data/components.json';
import tokensData from '@/../../data/tokens.json';

// Create MCP handler with all our tools
const handler = createMcpHandler(
  async (server) => {
    // Tool 1: List all components
    server.tool(
      'list_components',
      'List all available design system components',
      {},
      async () => {
        const components = Object.keys(componentsData);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  meta: { version: '0.1.0', source: 'skullcandy-mcp' },
                  data: { components, count: components.length },
                  status: 'ok',
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Tool 2: Get component context
    server.tool(
      'get_component_context',
      'Get comprehensive context for a component including import path, props, examples, and Figma variants',
      {
        name: z.string().describe('Component name (e.g., Button, NFTCard)'),
      },
      async ({ name }) => {
        const componentInfo = (componentsData as any)[name];
        if (!componentInfo) {
          throw new Error(`Component '${name}' not found`);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  meta: { version: '0.1.0', source: 'skullcandy-mcp' },
                  data: {
                    component: {
                      name,
                      import: componentInfo.import,
                      props: componentInfo.props,
                      examples: componentInfo.examples,
                      figma: componentInfo.figma,
                    },
                    tokens: {},
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Tool 3: List design tokens
    server.tool(
      'list_tokens',
      'List design tokens with optional scope filtering',
      {
        scope: z
          .string()
          .optional()
          .describe('Comma-separated scopes: color,spacing,typography'),
      },
      async ({ scope }) => {
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

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  meta: { version: '0.1.0', source: 'skullcandy-mcp' },
                  data: {
                    tokens: filteredTokens,
                    count: Object.keys(filteredTokens).length,
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Tool 4: Compare Figma variants vs code props
    server.tool(
      'compare_variants',
      'Compare Figma variants vs code props to check for parity',
      {
        name: z.string().describe('Component name'),
      },
      async ({ name }) => {
        const componentInfo = (componentsData as any)[name];
        if (!componentInfo) {
          throw new Error(`Component '${name}' not found`);
        }

        const figmaVariants = componentInfo.figma?.variants || {};
        const codeProps = componentInfo.props || {};
        const comparison: any = {};

        const allProps = new Set([
          ...Object.keys(figmaVariants),
          ...Object.keys(codeProps),
        ]);

        allProps.forEach((prop) => {
          const figmaValues = figmaVariants[prop] || [];
          const codeValues = codeProps[prop] || [];
          const match =
            JSON.stringify(figmaValues.sort()) === JSON.stringify(codeValues.sort());
          comparison[prop] = { figma: figmaValues, code: codeValues, match };
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  meta: { version: '0.1.0', source: 'skullcandy-mcp' },
                  data: { component: name, comparison },
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );
  },
  {
    capabilities: {
      tools: {},
    },
  },
  {
    basePath: '',
    verboseLogs: true,
    maxDuration: 60,
    disableSse: true, // Use StreamableHTTP transport
  }
);

export { handler as GET, handler as POST, handler as DELETE };
