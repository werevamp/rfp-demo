import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Client } = pg;

const DATABASE_URI = "postgresql://CSBMuRSrmK:T2b8rkLtrbzEZtEf@theorem.cvjr50y57yre.us-west-2.rds.amazonaws.com:5432/theorem";

async function exportCategories() {
  const client = new Client({
    connectionString: DATABASE_URI,
  });

  try {
    await client.connect();
    console.log('Connected to database...');

    const query = `
      SELECT id, name, slug
      FROM term
      WHERE taxonomy_id = 14
      ORDER BY name
    `;

    console.log('Executing query...');
    const result = await client.query(query);

    console.log(`Found ${result.rows.length} product categories`);

    const outputPath = path.join(__dirname, 'src', 'data', 'categories.json');

    // Ensure the directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(result.rows, null, 2));

    console.log(`✓ Successfully exported ${result.rows.length} categories to ${outputPath}`);
  } catch (error) {
    console.error('Error exporting categories:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

exportCategories();
