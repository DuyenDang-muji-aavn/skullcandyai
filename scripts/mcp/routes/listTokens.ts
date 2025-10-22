import { Router, Request, Response } from 'express';
import { getTokens } from '../helpers/tokens';

const router = Router();

/**
 * GET /list-tokens?scope=color,spacing,typography
 * Returns design tokens filtered by scope
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { scope } = req.query;
    let scopeFilter: string | string[] | undefined;

    if (scope && typeof scope === 'string') {
      scopeFilter = scope.split(',').map((s) => s.trim());
    }

    const tokens = getTokens(scopeFilter);

    return res.json({
      meta: { version: '0.1.0', source: 'skullcandy-mcp' },
      data: {
        tokens,
        scope: scopeFilter || 'all',
      },
      status: 'ok',
    });
  } catch (error) {
    return res.status(500).json({
      meta: { version: '0.1.0', source: 'skullcandy-mcp' },
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
