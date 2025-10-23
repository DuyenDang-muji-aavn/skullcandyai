import { NextRequest, NextResponse } from 'next/server';
import componentsData from '@/../../data/components.json';

type ComponentData = {
  import: string;
  props: Record<string, string[]>;
  examples: string[];
  figma: {
    variants: Record<string, string[]>;
  };
  tokens: string[];
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json(
      {
        meta: { version: '0.1.0', source: 'skullcandy-mcp' },
        status: 'error',
        message: 'Missing required parameter: name',
      },
      { status: 400 }
    );
  }

  const componentData = (componentsData as Record<string, ComponentData>)[name];

  if (!componentData) {
    return NextResponse.json(
      {
        meta: { version: '0.1.0', source: 'skullcandy-mcp' },
        status: 'error',
        message: `Component '${name}' not found`,
      },
      { status: 404 }
    );
  }

  const figmaVariants = componentData.figma?.variants || {};
  const codeProps = componentData.props || {};

  const comparison: Record<string, { figma: string[]; code: string[]; match: boolean }> = {};

  // Compare each prop
  const allProps = new Set([...Object.keys(figmaVariants), ...Object.keys(codeProps)]);

  allProps.forEach((prop) => {
    const figmaValues = figmaVariants[prop] || [];
    const codeValues = codeProps[prop] || [];
    const match =
      JSON.stringify(figmaValues.sort()) === JSON.stringify(codeValues.sort());

    comparison[prop] = {
      figma: figmaValues,
      code: codeValues,
      match,
    };
  });

  return NextResponse.json({
    meta: {
      version: '0.1.0',
      source: 'skullcandy-mcp',
    },
    data: {
      component: name,
      comparison,
    },
  });
}
