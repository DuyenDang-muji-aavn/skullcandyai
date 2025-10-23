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

  return NextResponse.json({
    meta: {
      version: '0.1.0',
      source: 'skullcandy-mcp',
    },
    data: {
      component: {
        name,
        import: componentData.import,
        props: componentData.props,
        examples: componentData.examples,
        figma: componentData.figma,
      },
      tokens: {},
    },
  });
}
