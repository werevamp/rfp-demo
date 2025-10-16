import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Client } = pg;

const DATABASE_URI = "postgresql://CSBMuRSrmK:T2b8rkLtrbzEZtEf@theorem.cvjr50y57yre.us-west-2.rds.amazonaws.com:5432/theorem";

const lawfirmIds = [
  '2f3397bc-5c6f-4a57-b109-95a7b80eb414',
  'b690ea0f-6473-4055-a81a-dfcdf8598b83',
  '06bc2d3f-b2f3-4c9a-8c3b-c34efd00e74d',
  '46348746-3bf0-4b81-b75f-938f61eb4943',
  'ee51a061-8e8a-4d3b-a174-7977fe7c66b1',
  '20004225-e742-41d8-af17-6f7539c87b07',
  '40a8b01b-d6e5-4cd6-8ff2-e60dae4a4678',
  'a94bc4f1-face-442e-bc18-17f7a6418f54',
  'ee4c1023-caef-403f-8d4a-13264f77424d',
  '8576bcb4-63f1-4501-ac6f-d43abfc1ecac',
  '0fa28221-6b37-4ec6-88de-1d39c0df7591',
  '4ba860ec-57f3-4f68-bd5a-b84285bf4b7a'
];

async function exportLawfirms() {
  const client = new Client({
    connectionString: DATABASE_URI,
  });

  try {
    await client.connect();
    console.log('Connected to database...');

    const query = `
      SELECT id, name, details
      FROM organization
      WHERE id = ANY($1::uuid[])
      ORDER BY name
    `;

    console.log('Executing query...');
    const result = await client.query(query, [lawfirmIds]);

    console.log(`Found ${result.rows.length} law firms`);

    const outputPath = path.join(__dirname, 'src', 'data', 'lawfirms.json');

    // Ensure the directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(result.rows, null, 2));

    console.log(`Successfully exported ${result.rows.length} law firms to ${outputPath}`);
  } catch (error) {
    console.error('Error exporting law firms:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

exportLawfirms();
