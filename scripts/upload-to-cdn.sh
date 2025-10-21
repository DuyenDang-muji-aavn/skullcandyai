#!/bin/bash

# Cloudinary credentials
CLOUD_NAME="dtes5pcfm"
API_KEY="279415635918263"
API_SECRET="kTnO17uuq2PrP4FHSSnQ0J-dCBM"
UPLOAD_URL="https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting CDN upload from local assets...${NC}"
echo ""

# Base path for assets
IMAGE_DIR="../public/assets/products"

# Results file
RESULTS_FILE="cdn-urls.json"
echo "{" > $RESULTS_FILE
echo '  "products": [' >> $RESULTS_FILE

# Product IDs (matching all-products.json)
PRODUCT_IDS=(100 101 102 103 104 105 106 107 108 109 110 111 113 114 115 116 117 118 119 120 121 122 123)

TOTAL=${#PRODUCT_IDS[@]}
SUCCESS_COUNT=0
FAIL_COUNT=0

for i in "${!PRODUCT_IDS[@]}"; do
  PRODUCT_ID="${PRODUCT_IDS[$i]}"
  IMAGE_FILE="$IMAGE_DIR/product-$PRODUCT_ID.png"
  
  COUNTER=$((i + 1))
  
  echo -e "${BLUE}📦 Processing [$COUNTER/$TOTAL]: Product ID $PRODUCT_ID${NC}"
  
  # Check if image exists
  if [ ! -f "$IMAGE_FILE" ]; then
    echo -e "   ${RED}❌ Image not found: $IMAGE_FILE${NC}"
    echo ""
    FAIL_COUNT=$((FAIL_COUNT + 1))
    
    if [ $COUNTER -lt $TOTAL ]; then
      echo "    {\"id\": $PRODUCT_ID, \"error\": \"Image file not found\"}," >> $RESULTS_FILE
    else
      echo "    {\"id\": $PRODUCT_ID, \"error\": \"Image file not found\"}" >> $RESULTS_FILE
    fi
    continue
  fi
  
  # Check file size
  FILE_SIZE=$(wc -c < "$IMAGE_FILE" | tr -d ' ')
  echo -e "   ${YELLOW}📊 File size: $FILE_SIZE bytes${NC}"
  
  if [ "$FILE_SIZE" -lt "1000" ]; then
    echo -e "   ${RED}❌ File too small - likely invalid${NC}"
    echo ""
    FAIL_COUNT=$((FAIL_COUNT + 1))
    
    if [ $COUNTER -lt $TOTAL ]; then
      echo "    {\"id\": $PRODUCT_ID, \"error\": \"File too small\"}," >> $RESULTS_FILE
    else
      echo "    {\"id\": $PRODUCT_ID, \"error\": \"File too small\"}" >> $RESULTS_FILE
    fi
    continue
  fi
  
  # Upload to Cloudinary
  echo -e "   ${YELLOW}⬆️  Uploading to Cloudinary...${NC}"
  
  # Generate timestamp
  TIMESTAMP=$(date +%s)
  
  # Generate signature
  STRING_TO_SIGN="folder=skullcandy-products&public_id=product-$PRODUCT_ID&timestamp=$TIMESTAMP$API_SECRET"
  SIGNATURE=$(echo -n "$STRING_TO_SIGN" | openssl dgst -sha1 | sed 's/^.* //')
  
  # Upload with curl
  RESPONSE=$(curl -s -X POST "$UPLOAD_URL" \
    -F "file=@$IMAGE_FILE" \
    -F "api_key=$API_KEY" \
    -F "timestamp=$TIMESTAMP" \
    -F "public_id=product-$PRODUCT_ID" \
    -F "folder=skullcandy-products" \
    -F "signature=$SIGNATURE")
  
  # Parse response
  CLOUDINARY_URL=$(echo "$RESPONSE" | grep -o '"secure_url":"[^"]*' | sed 's/"secure_url":"//')
  
  if [ -n "$CLOUDINARY_URL" ]; then
    echo -e "   ${GREEN}✅ Success!${NC}"
    echo -e "   ${GREEN}🔗 URL: $CLOUDINARY_URL${NC}"
    echo ""
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    
    # Add to results JSON
    if [ $COUNTER -lt $TOTAL ]; then
      echo "    {\"id\": $PRODUCT_ID, \"url\": \"$CLOUDINARY_URL\"}," >> $RESULTS_FILE
    else
      echo "    {\"id\": $PRODUCT_ID, \"url\": \"$CLOUDINARY_URL\"}" >> $RESULTS_FILE
    fi
  else
    ERROR_MSG=$(echo "$RESPONSE" | grep -o '"message":"[^"]*' | sed 's/"message":"//' | head -1)
    if [ -z "$ERROR_MSG" ]; then
      ERROR_MSG=$(echo "$RESPONSE" | grep -o '"error":{[^}]*' | head -1)
    fi
    echo -e "   ${RED}❌ Upload failed: $ERROR_MSG${NC}"
    echo ""
    FAIL_COUNT=$((FAIL_COUNT + 1))
    
    # Add error to results JSON
    if [ $COUNTER -lt $TOTAL ]; then
      echo "    {\"id\": $PRODUCT_ID, \"error\": \"Upload failed: $ERROR_MSG\"}," >> $RESULTS_FILE
    else
      echo "    {\"id\": $PRODUCT_ID, \"error\": \"Upload failed: $ERROR_MSG\"}" >> $RESULTS_FILE
    fi
  fi
done

# Close JSON
echo '  ]' >> $RESULTS_FILE
echo '}' >> $RESULTS_FILE

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ Upload process complete!${NC}"
echo -e "${BLUE}📊 Results saved to: $RESULTS_FILE${NC}"
echo -e "${GREEN}✅ Successful uploads: $SUCCESS_COUNT/$TOTAL${NC}"
echo -e "${RED}❌ Failed uploads: $FAIL_COUNT/$TOTAL${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
