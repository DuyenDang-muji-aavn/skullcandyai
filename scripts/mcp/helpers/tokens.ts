import * as fs from 'fs';
import * as path from 'path';
import { getTokensByScope, TokenMap } from './cssTokenParser';

// Cache tokens to avoid repeated parsing
let cachedTokens: TokenMap | null = null;

/**
 * Get tokens with optional scope filtering
 * Uses cached tokens for performance
 * Tries to parse from src/styles/tokens.css first
 * Falls back to data/tokens.json if parsing fails
 */
export function getTokens(scope?: string | string[]): TokenMap {
  // Return from cache if available
  if (!cachedTokens) {
    const cssTokensPath = path.resolve(
      process.cwd(),
      'src',
      'styles',
      'tokens.css'
    );
    const fallbackPath = path.resolve(process.cwd(), 'data', 'tokens.json');

    // Try parsing CSS first
    try {
      cachedTokens = getTokensByScope(cssTokensPath);
    } catch (error) {
      console.warn('Failed to parse CSS tokens, falling back to JSON');

      // Fallback to JSON
      if (!fs.existsSync(fallbackPath)) {
        throw new Error(`Fallback tokens file not found: ${fallbackPath}`);
      }

      const content = fs.readFileSync(fallbackPath, 'utf-8');
      cachedTokens = JSON.parse(content) as TokenMap;
    }
  }

  if (!scope) {
    return cachedTokens;
  }

  // Filter by scope
  const scopes = Array.isArray(scope) ? scope : [scope];
  const filtered: TokenMap = {};

  for (const s of scopes) {
    if (cachedTokens[s]) {
      filtered[s] = cachedTokens[s];
    }
  }

  return filtered;
}

/**
 * Clear the token cache (useful for testing)
 */
export function clearTokenCache(): void {
  cachedTokens = null;
}
