import { Router, Request, Response } from 'express';
import { listComponentNames } from '../helpers/components';

const router = Router();

/**
 * GET /list-components
 * Returns array of component names
 */
router.get('/', (_req: Request, res: Response) => {
  try {
    const components = listComponentNames();

    return res.json({
      meta: { version: '0.1.0', source: 'skullcandy-mcp' },
      data: {
        components,
        count: components.length,
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
