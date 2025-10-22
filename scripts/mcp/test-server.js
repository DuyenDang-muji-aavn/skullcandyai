#!/usr/bin/env node
/**
 * Simple test script for MCP server endpoints
 * Usage: node scripts/mcp/test-server.js
 */

const http = require('http');

const PORT = 8787;
const BASE_URL = `http://localhost:${PORT}`;

function testEndpoint(path, description) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${BASE_URL}${path}`, { timeout: 3000 }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✅ ${description}`);
          console.log(`   Status: ${res.statusCode}`);
          console.log(`   Response:`, JSON.stringify(json, null, 2).split('\n').slice(0, 5).join('\n'));
          console.log('');
          resolve(json);
        } catch (e) {
          console.log(`❌ ${description} - Invalid JSON`);
          reject(e);
        }
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${description} - ${err.message}`);
      reject(err);
    });

    req.on('timeout', () => {
      console.log(`⏱️  ${description} - Timeout`);
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function runTests() {
  console.log('🧪 Testing MCP Server Endpoints...\n');
  console.log('='.repeat(60));
  
  try {
    // Test 1: Health check
    await testEndpoint('/', 'Health Check');
    
    // Test 2: List components
    await testEndpoint('/list-components', 'List Components');
    
    // Test 3: Component context
    await testEndpoint('/component-context?name=Button', 'Component Context - Button');
    
    // Test 4: List tokens
    await testEndpoint('/list-tokens?scope=color,spacing', 'List Tokens');
    
    // Test 5: Compare variants
    await testEndpoint('/compare-variants?name=Button', 'Compare Variants - Button');
    
    console.log('='.repeat(60));
    console.log('✅ All tests passed!');
    process.exit(0);
  } catch (error) {
    console.log('='.repeat(60));
    console.log('❌ Tests failed');
    process.exit(1);
  }
}

// Check if server is running first
http.get(`${BASE_URL}/`, { timeout: 1000 }, () => {
  runTests();
}).on('error', () => {
  console.error('❌ MCP Server not running on port', PORT);
  console.error('   Start it with: pnpm run mcp');
  process.exit(1);
});
