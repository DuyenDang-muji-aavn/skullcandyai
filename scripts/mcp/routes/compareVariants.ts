import { Router, Request, Response } from 'express';
import { getComponent } from '../helpers/components';

const router = Router();

/**
 * GET /compare-variants?name=<Component>
 * Compares Figma variants vs code props
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

  // Compare figma variants with code props
  const figmaVariants = component.figma?.variants || {};
  const codeProps = component.props || {};

  const missingInCode: string[] = [];
  const extraInCode: string[] = [];
  const matching: string[] = [];

  // Normalize keys for comparison (case-insensitive)
  const figmaKeys = Object.keys(figmaVariants).map((k) => k.toLowerCase());
  const codeKeys = Object.keys(codeProps).map((k) => k.toLowerCase());

  // Find missing in code
  for (const key of figmaKeys) {
    if (!codeKeys.includes(key)) {
      missingInCode.push(key);
    } else {
      matching.push(key);
    }
  }

  // Find extra in code
  for (const key of codeKeys) {
    if (!figmaKeys.includes(key)) {
      extraInCode.push(key);
    }
  }

  const status =
    missingInCode.length > 0 || extraInCode.length > 0 ? 'warn' : 'ok';

  return res.json({
    meta: { version: '0.1.0', source: 'skullcandy-mcp' },
    data: {
      component: name,
      comparison: {
        matching,
        missingInCode,
        extraInCode,
      },
      figmaVariants,
      codeProps,
    },
    status,
  });
});

export default router;
