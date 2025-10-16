import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Client } = pg;

const DATABASE_URI = "postgresql://CSBMuRSrmK:T2b8rkLtrbzEZtEf@theorem.cvjr50y57yre.us-west-2.rds.amazonaws.com:5432/theorem";

const productIds = [
  5061,  // Salesforce
  790,   // DocuSign
  2647,  // SAP
  774,   // Microsoft 365
  773,   // Microsoft Teams
  775,   // Microsoft Outlook
  712,   // Brightflag
  746,   // Ironclad
  1302,  // Adobe Sign
  680,   // LexisNexis
  829,   // CounselLink
  11000, // Harvey
  12021  // CoCounsel
];

async function exportTechStackProducts() {
  const client = new Client({
    connectionString: DATABASE_URI,
  });

  try {
    await client.connect();
    console.log('Connected to database...');

    const query = `
      SELECT id, name, details
      FROM product
      WHERE id = ANY($1::int[])
      ORDER BY name
    `;

    console.log('Executing query...');
    const result = await client.query(query, [productIds]);

    console.log(`Found ${result.rows.length} products out of ${productIds.length} requested`);

    // Show which products were found and which were not
    const foundIds = result.rows.map(p => p.id);
    const missingIds = productIds.filter(id => !foundIds.includes(id));

    if (missingIds.length > 0) {
      console.log('Missing product IDs:', missingIds);
    }

    // Read existing products.json
    const productsPath = path.join(__dirname, 'src', 'data', 'products.json');
    const existingProducts = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

    // Merge new products with existing ones, avoiding duplicates
    const existingIds = new Set(existingProducts.map(p => p.id));
    const newProducts = result.rows.filter(p => !existingIds.has(p.id));

    const mergedProducts = [...existingProducts, ...newProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Write merged products back to file
    fs.writeFileSync(productsPath, JSON.stringify(mergedProducts, null, 2));

    console.log(`Successfully added ${newProducts.length} new products to ${productsPath}`);
    console.log(`Total products in file: ${mergedProducts.length}`);

    if (newProducts.length > 0) {
      console.log('\nNewly added products:');
      newProducts.forEach(p => console.log(`  - ${p.name} (ID: ${p.id})`));
    }
  } catch (error) {
    console.error('Error exporting products:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

exportTechStackProducts();
