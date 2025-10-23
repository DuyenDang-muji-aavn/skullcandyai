import { NextRequest, NextResponse } from 'next/server';
import tokensData from '@/../../data/tokens.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const scope = searchParams.get('scope');

  let filteredTokens: Record<string, any> = tokensData;

  if (scope) {
    const scopes = scope.split(',').map((s) => s.trim().toLowerCase());
    filteredTokens = Object.fromEntries(
      Object.entries(tokensData).filter(([key]) => {
        const tokenKey = key.toLowerCase();
        return scopes.some((s) => tokenKey.includes(s));
      })
    ) as Record<string, any>;
  }

  return NextResponse.json({
    meta: {
      version: '0.1.0',
      source: 'skullcandy-mcp',
    },
    data: {
      tokens: filteredTokens,
      count: Object.keys(filteredTokens).length,
    },
  });
}
