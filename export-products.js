import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Client } = pg;

const DATABASE_URI = "postgresql://CSBMuRSrmK:T2b8rkLtrbzEZtEf@theorem.cvjr50y57yre.us-west-2.rds.amazonaws.com:5432/theorem";

async function exportProducts() {
  const client = new Client({
    connectionString: DATABASE_URI,
  });

  try {
    await client.connect();
    console.log('Connected to database...');

    const query = `
      SELECT DISTINCT p.id, p.name, p.details
      FROM product p
      INNER JOIN product_to_organization pto ON p.id = pto.product_id
      WHERE p.type = 'SOFTWARE' AND p.status != 'UPLOADED'
      ORDER BY p.name
    `;

    console.log('Executing query...');
    const result = await client.query(query);

    console.log(`Found ${result.rows.length} products`);

    const outputPath = path.join(__dirname, 'src', 'data', 'products.json');

    // Ensure the directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(result.rows, null, 2));

    console.log(`Successfully exported ${result.rows.length} products to ${outputPath}`);
  } catch (error) {
    console.error('Error exporting products:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

exportProducts();
