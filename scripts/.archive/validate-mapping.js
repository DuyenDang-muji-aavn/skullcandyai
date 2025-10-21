#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Validation script for component mapping files
 * Scans /docs/mapping/*.md files, validates YAML front-matter schema, 
 * and verifies codePath existence
 */

const MAPPING_DIR = path.join(__dirname, '../docs/mapping');
const REQUIRED_FIELDS = ['component', 'figma', 'mapping'];
const FIGMA_REQUIRED_FIELDS = ['file', 'node'];
const MAPPING_REQUIRED_FIELDS = ['figmaNodeId', 'variant', 'codePath', 'props', 'tokens'];

let hasErrors = false;

function error(message) {
  console.error(`❌ ERROR: ${message}`);
  hasErrors = true;
}

function warning(message) {
  console.warn(`⚠️  WARNING: ${message}`);
}

function success(message) {
  console.log(`✅ ${message}`);
}

function parseYamlFrontMatter(content) {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) {
    return null;
  }

  try {
    const yamlContent = frontMatterMatch[1];
    return yaml.load(yamlContent);
  } catch (e) {
    console.error('YAML parsing error:', e.message);
    return null;
  }
}

function validateMappingFile(filePath) {
  const fileName = path.basename(filePath);
  console.log(`\n📄 Validating ${fileName}...`);

  if (!fs.existsSync(filePath)) {
    error(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const frontMatter = parseYamlFrontMatter(content);

  if (!frontMatter) {
    error(`${fileName}: No valid YAML front-matter found`);
    return;
  }

  // Validate required top-level fields
  for (const field of REQUIRED_FIELDS) {
    if (!frontMatter[field]) {
      error(`${fileName}: Missing required field '${field}'`);
    }
  }

  // Validate figma object
  if (frontMatter.figma) {
    for (const field of FIGMA_REQUIRED_FIELDS) {
      if (!frontMatter.figma[field]) {
        error(`${fileName}: Missing required figma field '${field}'`);
      }
    }
  }

  // Validate mapping array
  if (Array.isArray(frontMatter.mapping)) {
    frontMatter.mapping.forEach((mapping, index) => {
      for (const field of MAPPING_REQUIRED_FIELDS) {
        if (!mapping[field]) {
          error(`${fileName}: mapping[${index}] missing required field '${field}'`);
        }
      }

      // Verify codePath exists
      if (mapping.codePath) {
        const fullPath = path.join(__dirname, '..', mapping.codePath);
        if (!fs.existsSync(fullPath)) {
          error(`${fileName}: mapping[${index}] codePath does not exist: ${mapping.codePath}`);
        }
      }
    });

    success(`${fileName}: Validated ${frontMatter.mapping.length} mapping entries`);
  } else {
    error(`${fileName}: 'mapping' must be an array`);
  }
}

function main() {
  console.log('🔍 Starting component mapping validation...\n');

  if (!fs.existsSync(MAPPING_DIR)) {
    warning(`Mapping directory does not exist: ${MAPPING_DIR}`);
    warning('No mappings to validate. This is okay for initial setup.');
    process.exit(0);
  }

  const files = fs.readdirSync(MAPPING_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(MAPPING_DIR, file));

  if (files.length === 0) {
    warning('No mapping files found in /docs/mapping/');
    warning('This is okay for initial setup.');
    process.exit(0);
  }

  files.forEach(validateMappingFile);

  console.log('\n' + '='.repeat(50));
  if (hasErrors) {
    console.error('\n❌ Validation failed with errors\n');
    process.exit(1);
  } else {
    console.log('\n✅ All mapping files validated successfully\n');
    process.exit(0);
  }
}

main();
