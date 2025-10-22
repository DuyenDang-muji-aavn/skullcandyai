import * as fs from 'fs';

export type TokenMap = {
  color?: Record<string, any>;
  spacing?: Record<string, any>;
  radius?: Record<string, any>;
  effects?: Record<string, any>;
  typography?: Record<string, any>;
  [key: string]: any;
};

/**
 * Parse CSS custom properties from src/styles/tokens.css
 * Groups tokens by prefix:
 * - --spacing-* → spacing
 * - --glass-*, --color-*, --gradient-* → color
 * - --radius-* → radius
 * - --blur-*, --shadow-* → effects
 * - --font-* → typography
 */
export function parseCSSTokens(cssFilePath: string): TokenMap {
  if (!fs.existsSync(cssFilePath)) {
    throw new Error(`CSS file not found: ${cssFilePath}`);
  }

  const cssContent = fs.readFileSync(cssFilePath, 'utf-8');
  const tokens: TokenMap = {
    color: {},
    spacing: {},
    radius: {},
    effects: {},
    typography: {},
  };

  // Match CSS custom properties: --var-name: value;
  const varRegex = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
  let match;

  while ((match = varRegex.exec(cssContent)) !== null) {
    const varName = match[1]; // e.g., "spacing-md"
    const value = match[2].trim(); // e.g., "16px"

    // Group by prefix
    if (varName.startsWith('spacing-')) {
      const key = varName.replace('spacing-', '');
      tokens.spacing![key] = value;
    } else if (
      varName.startsWith('glass-') ||
      varName.startsWith('color-') ||
      varName.startsWith('gradient-') ||
      varName.startsWith('button-')
    ) {
      tokens.color![varName] = value;
    } else if (varName.startsWith('radius-')) {
      const key = varName.replace('radius-', '');
      tokens.radius![key] = value;
    } else if (
      varName.startsWith('blur-') ||
      varName.startsWith('shadow-') ||
      varName.startsWith('backdrop-')
    ) {
      tokens.effects![varName] = value;
    } else if (
      varName.startsWith('font-') ||
      varName.startsWith('line-') ||
      varName.startsWith('letter-')
    ) {
      tokens.typography![varName] = value;
    } else {
      // Catch-all for other tokens
      if (!tokens.other) tokens.other = {};
      tokens.other[varName] = value;
    }
  }

  return tokens;
}

/**
 * Get tokens with optional scope filtering
 */
export function getTokensByScope(
  cssFilePath: string,
  scope?: string | string[]
): TokenMap {
  const allTokens = parseCSSTokens(cssFilePath);

  if (!scope) {
    return allTokens;
  }

  const scopes = Array.isArray(scope) ? scope : [scope];
  const filtered: TokenMap = {};

  for (const s of scopes) {
    if (allTokens[s]) {
      filtered[s] = allTokens[s];
    }
  }

  return filtered;
}
