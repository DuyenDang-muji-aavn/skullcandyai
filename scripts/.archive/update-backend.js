#!/usr/bin/env node

/**
 * Script to update product data in backend via batch API
 * API Documentation: https://phuongdoanduy.github.io/devday-api-docs/#/Products/patch_api_products_batch
 */

const fs = require('fs');
const path = require('path');

const API_BASE_URL = 'https://devday-aavn-d5284e914439.herokuapp.com/api';
const BATCH_UPDATE_ENDPOINT = `${API_BASE_URL}/products/batch`;

async function updateProductsBatch() {
  try {
    // Read the batch update JSON file
    const batchDataPath = path.join(__dirname, 'update-products-batch.json');
    const batchData = JSON.parse(fs.readFileSync(batchDataPath, 'utf-8'));

    console.log('📦 Preparing to update products...');
    console.log(`   Total products to update: ${batchData.updates.length}`);
    console.log('');

    // Call the PATCH API endpoint
    const response = await fetch(BATCH_UPDATE_ENDPOINT, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(batchData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const result = await response.json();

    console.log('✅ Batch update successful!');
    console.log('');
    console.log('📊 Update Summary:');
    console.log(`   Success: ${result.success || result.updated || batchData.updates.length} products`);
    
    if (result.failed && result.failed.length > 0) {
      console.log(`   Failed: ${result.failed.length} products`);
      console.log('');
      console.log('❌ Failed Products:');
      result.failed.forEach((failure) => {
        console.log(`   - ID ${failure.id}: ${failure.error}`);
      });
    }

    console.log('');
    console.log('🎉 Backend data updated successfully!');
    console.log(`   API Endpoint: ${BATCH_UPDATE_ENDPOINT}`);

    return result;
  } catch (error) {
    console.error('');
    console.error('❌ Error updating products:');
    console.error(`   ${error.message}`);
    console.error('');
    
    if (error.cause) {
      console.error('   Details:', error.cause);
    }
    
    process.exit(1);
  }
}

// Execute the update
updateProductsBatch()
  .then(() => {
    console.log('');
    console.log('✨ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
