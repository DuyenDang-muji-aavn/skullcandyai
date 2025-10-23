import { NextResponse } from 'next/server';
import componentsData from '@/../../data/components.json';

export async function GET() {
  const components = Object.keys(componentsData);
  
  return NextResponse.json({
    meta: {
      version: '0.1.0',
      source: 'skullcandy-mcp',
    },
    data: {
      components,
      count: components.length,
    },
    status: 'ok',
  });
}
