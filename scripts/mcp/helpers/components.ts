import * as fs from 'fs';
import * as path from 'path';

export interface ComponentData {
  import: string;
  props: Record<string, string[]>;
  examples: string[];
  figma?: {
    variants?: Record<string, string[]>;
  };
  tokens?: string[];
}

export interface ComponentsMap {
  [componentName: string]: ComponentData;
}

// Cache components to avoid repeated file reads
let cachedComponents: ComponentsMap | null = null;

/**
 * Load components from data/components.json
 * Uses cache for performance
 */
export function loadComponents(): ComponentsMap {
  if (cachedComponents) {
    return cachedComponents;
  }

  const componentsPath = path.resolve(
    process.cwd(),
    'data',
    'components.json'
  );

  if (!fs.existsSync(componentsPath)) {
    throw new Error(`Components file not found: ${componentsPath}`);
  }

  const content = fs.readFileSync(componentsPath, 'utf-8');
  cachedComponents = JSON.parse(content) as ComponentsMap;
  return cachedComponents;
}

/**
 * Get a specific component by name
 */
export function getComponent(name: string): ComponentData | null {
  const components = loadComponents();
  return components[name] || null;
}

/**
 * List all component names
 */
export function listComponentNames(): string[] {
  const components = loadComponents();
  return Object.keys(components);
}
