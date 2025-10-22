import { Router, Request, Response } from 'express';
import { getComponent } from '../helpers/components';
import { getTokens } from '../helpers/tokens';

const router = Router();

/**
 * GET /component-context?name=<Component>
 * Returns merged component info: code, figma, tokens
 */
router.get('/', (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({
      meta: { version: '0.1.0', source: 'skullcandy-mcp' },
      status: 'error',
      message: 'Missing or invalid "name" query parameter',
    });
  }

  const component = getComponent(name);

  if (!component) {
    return res.status(404).json({
      meta: { version: '0.1.0', source: 'skullcandy-mcp' },
      status: 'error',
      message: `Component "${name}" not found`,
    });
  }

  // Get tokens used by this component
  let componentTokens = {};
  if (component.tokens && component.tokens.length > 0) {
    try {
      const allTokens = getTokens();
      // Filter to only tokens used by this component
      componentTokens = component.tokens.reduce((acc, tokenName) => {
        // Search through all token categories
        for (const [category, tokens] of Object.entries(allTokens)) {
          if (typeof tokens === 'object' && tokens !== null) {
            for (const [key, value] of Object.entries(tokens)) {
              if (
                tokenName.includes(key) ||
                `--${key}` === tokenName ||
                tokenName.includes(category)
              ) {
                if (!acc[category]) acc[category] = {};
                acc[category][key] = value;
              }
            }
          }
        }
        return acc;
      }, {} as Record<string, any>);
    } catch (error) {
      console.error('Error loading tokens:', error);
    }
  }

  return res.json({
    meta: { version: '0.1.0', source: 'skullcandy-mcp' },
    data: {
      component: name,
      figma: component.figma || {},
      code: {
        import: component.import,
        props: component.props,
        example: component.examples[0] || '',
      },
      tokens: componentTokens,
    },
    status: 'ok',
  });
});

export default router;
