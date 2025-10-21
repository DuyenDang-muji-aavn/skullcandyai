#!/bin/bash

# Cloudinary credentials
CLOUD_NAME="dtes5pcfm"
API_KEY="279415635918263"
API_SECRET="kTnO17uuq2PrP4FHSSnQ0J-dCBM"
UPLOAD_URL="https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "🚀 Starting Cloudinary upload process..."
echo ""

# Create results file
RESULTS_FILE="cloudinary-urls.json"
echo "{" > $RESULTS_FILE
echo '  "products": [' >> $RESULTS_FILE

# Counter for JSON formatting
COUNTER=0

# Array of product IDs and Figma asset URLs
declare -a PRODUCTS=(
  "100|http://localhost:3845/assets/c987db946c7e77771722c6c59b09744d3fff06cb.png|Cryptic Hacker"
  "101|http://localhost:3845/assets/ee52308bbb2c32d8a9942d54af7717bb7e18d9c6.png|Frosty Snow Queen"
  "102|http://localhost:3845/assets/0f2daaf2aa723b94de74dad7e6b075f378de559b.png|Spooky Halloween Ghost"
  "103|http://localhost:3845/assets/6d722229f92ffdf624ecfff9e515b231c1fb2e8d.png|Lunar Moon Queen"
  "104|http://localhost:3845/assets/58776648d5abc13c417fd265af54d20ae4d392bb.png|Jolly Christmas Elf"
  "105|http://localhost:3845/assets/4c1f83bad53e5978f4861f85a6b6c3959c9f2815.png|Galactic Astronaut"
  "106|http://localhost:3845/assets/b134bb2ee7e89e265a2eb1a6d37aa98f1d0cecb5.png|Rustic Farmer"
  "107|http://localhost:3845/assets/37a7357ac53524e79dcd89ce8218d54170cad85c.png|Athletic Tennis Girl"
  "108|http://localhost:3845/assets/2621022b0f530014cccaaa39d6534856dd0520ba.png|Grapevine Wine Monster"
  "109|http://localhost:3845/assets/30c5563b90999cf5b74d07ca4ad94d6d29d0ae5a.png|Regal Rose Lord"
  "110|http://localhost:3845/assets/c0c4c4641a0b870a6b7760943d53193dbd6de3cc.png|Skateboard Boy"
  "111|http://localhost:3845/assets/293c52ea58913b9dd758a6b241c74c704cbedccb.png|Oceanic Sea Princess"
  "113|http://localhost:3845/assets/86bd2e87408c7138be942a547412321f5f9d7902.png|Joyful Ice Cream Lover"
  "114|http://localhost:3845/assets/a92c3069e4103814fbc229a6f2cb05ef442d5cbd.png|Daring Pilot Captain"
  "115|http://localhost:3845/assets/77e7ffc4c61442dc6e6663b4ac0db32e4cef1d13.png|Charming Valentine Cupid"
  "116|http://localhost:3845/assets/85df4efda123d9bb49ed7e6856f6ce67323d5fb9.png|Santa Claus is coming"
  "117|http://localhost:3845/assets/6f447d58bc12110ba576f5b027dccb25ed236f7e.png|Peter Pan"
  "118|http://localhost:3845/assets/9bf5b1d0ffea87ed913a50a6b8778c0632d4d108.png|Santa claus"
  "119|http://localhost:3845/assets/5c4ebb9f25ee25cc94ff0ad36ee41574c4203e06.png|Sound of love"
  "120|http://localhost:3845/assets/a9cedf2ba82cccd2bfe52e2ebb95c1c891bfc6e3.png|Baby Angel"
  "121|http://localhost:3845/assets/e554e7bd5ad2aae1f3739cb91ef3fa3ab20a6b6c.png|King"
  "122|http://localhost:3845/assets/2034dea609b2d15f2dc8dc871ac6d06f447c6767.png|Little Red Riding Hood"
  "123|http://localhost:3845/assets/6ee750f9701ffc2a37c2fd8d08db5f37f04e4693.png|Friends Forever"
)

TOTAL=${#PRODUCTS[@]}

for PRODUCT_INFO in "${PRODUCTS[@]}"; do
  # Split the string
  IFS='|' read -r PRODUCT_ID FIGMA_URL PRODUCT_NAME <<< "$PRODUCT_INFO"
  
  COUNTER=$((COUNTER + 1))
  
  echo -e "${BLUE}📦 Processing [$COUNTER/$TOTAL]: $PRODUCT_NAME (ID: $PRODUCT_ID)${NC}"
  
  # Download image from Figma
  TEMP_FILE="temp-product-$PRODUCT_ID.png"
  echo "   ⬇️  Downloading from Figma..."
  curl -s "$FIGMA_URL" -o "$TEMP_FILE"
  
  # Check if file is valid
  FILE_SIZE=$(wc -c < "$TEMP_FILE" | tr -d ' ')
  if [ "$FILE_SIZE" -lt "1000" ]; then
    echo -e "   ${RED}❌ Failed: File too small (${FILE_SIZE} bytes) - might be invalid${NC}"
    rm -f "$TEMP_FILE"
    if [ $COUNTER -lt $TOTAL ]; then
      echo "    {\"id\": $PRODUCT_ID, \"name\": \"$PRODUCT_NAME\", \"error\": \"Invalid file from Figma\"}," >> $RESULTS_FILE
    else
      echo "    {\"id\": $PRODUCT_ID, \"name\": \"$PRODUCT_NAME\", \"error\": \"Invalid file from Figma\"}" >> $RESULTS_FILE
    fi
    continue
  fi
  
  # Upload to Cloudinary
  echo "   ⬆️  Uploading to Cloudinary..."
  
  # Generate timestamp
  TIMESTAMP=$(date +%s)
  
  # Generate signature
  STRING_TO_SIGN="folder=skullcandy-products&public_id=product-$PRODUCT_ID&timestamp=$TIMESTAMP$API_SECRET"
  SIGNATURE=$(echo -n "$STRING_TO_SIGN" | openssl dgst -sha1 | sed 's/^.* //')
  
  # Upload with curl
  RESPONSE=$(curl -s -X POST "$UPLOAD_URL" \
    -F "file=@$TEMP_FILE" \
    -F "api_key=$API_KEY" \
    -F "timestamp=$TIMESTAMP" \
    -F "public_id=product-$PRODUCT_ID" \
    -F "folder=skullcandy-products" \
    -F "signature=$SIGNATURE")
  
  # Parse response
  CLOUDINARY_URL=$(echo "$RESPONSE" | grep -o '"secure_url":"[^"]*' | sed 's/"secure_url":"//')
  
  if [ -n "$CLOUDINARY_URL" ]; then
    echo -e "   ${GREEN}✅ Success: $CLOUDINARY_URL${NC}"
    echo ""
    
    # Add to results JSON
    if [ $COUNTER -lt $TOTAL ]; then
      echo "    {\"id\": $PRODUCT_ID, \"name\": \"$PRODUCT_NAME\", \"url\": \"$CLOUDINARY_URL\"}," >> $RESULTS_FILE
    else
      echo "    {\"id\": $PRODUCT_ID, \"name\": \"$PRODUCT_NAME\", \"url\": \"$CLOUDINARY_URL\"}" >> $RESULTS_FILE
    fi
  else
    ERROR_MSG=$(echo "$RESPONSE" | grep -o '"message":"[^"]*' | sed 's/"message":"//')
    echo -e "   ${RED}❌ Failed: $ERROR_MSG${NC}"
    echo ""
    
    # Add error to results JSON
    if [ $COUNTER -lt $TOTAL ]; then
      echo "    {\"id\": $PRODUCT_ID, \"name\": \"$PRODUCT_NAME\", \"error\": \"$ERROR_MSG\"}," >> $RESULTS_FILE
    else
      echo "    {\"id\": $PRODUCT_ID, \"name\": \"$PRODUCT_NAME\", \"error\": \"$ERROR_MSG\"}" >> $RESULTS_FILE
    fi
  fi
  
  # Clean up temp file
  rm -f "$TEMP_FILE"
done

# Close JSON
echo '  ]' >> $RESULTS_FILE
echo '}' >> $RESULTS_FILE

echo ""
echo -e "${GREEN}✨ Upload process complete!${NC}"
echo -e "${BLUE}📊 Results saved to: $RESULTS_FILE${NC}"
