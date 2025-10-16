import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'src', 'data', 'products.json');
const outputPath = path.join(__dirname, 'src', 'data', 'products.json');

try {
  console.log('Reading products.json...');
  const rawData = fs.readFileSync(inputPath, 'utf8');
  const products = JSON.parse(rawData);

  console.log(`Found ${products.length} products`);

  // Transform products to keep only required fields
  const simplifiedProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    details: {
      logoUrl: product.details?.logoUrl || '',
      squareLogoUrl: product.details?.squareLogoUrl || ''
    }
  }));

  // Write simplified data back to file
  fs.writeFileSync(outputPath, JSON.stringify(simplifiedProducts, null, 2));

  console.log(`✓ Successfully simplified ${simplifiedProducts.length} products`);
  console.log(`✓ Saved to ${outputPath}`);

  // Calculate size reduction
  const originalSize = Buffer.byteLength(rawData, 'utf8');
  const newSize = Buffer.byteLength(JSON.stringify(simplifiedProducts, null, 2), 'utf8');
  const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);

  console.log(`\nFile size reduced by ${reduction}%`);
  console.log(`Original: ${(originalSize / 1024).toFixed(2)} KB`);
  console.log(`New: ${(newSize / 1024).toFixed(2)} KB`);
} catch (error) {
  console.error('Error simplifying products:', error);
  process.exit(1);
}
