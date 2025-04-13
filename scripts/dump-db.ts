// scripts/dump-db.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config(); // Load from .env

const execAsync = promisify(exec);

async function dumpDatabase() {
  const dbName = process.env.DATABASE_NAME || 'appdb';
  const dbUser = process.env.DATABASE_USER || 'postgres';
  const dbPassword = process.env.DATABASE_PASSWORD || 'postgres';
  const dbHost = process.env.DATABASE_HOST || 'localhost';
  const dbPort = process.env.DATABASE_PORT || '5432';

  const backupDir = path.join(__dirname, '..', 'dump');
  const backupPath = path.join(backupDir, `${dbName}-${Date.now()}.backup`);

  // Make sure dump folder exists
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const dumpCommand = `PGPASSWORD="${dbPassword}" pg_dump -h ${dbHost} -p ${dbPort} -U ${dbUser} -F c -b -v -f ${backupPath} ${dbName}`;

  try {
    console.log(`⏳ Dumping database '${dbName}' to ${backupPath}...`);
    const { stdout, stderr } = await execAsync(dumpCommand);
    console.log(stdout || stderr);
    console.log('✅ Database dumped successfully!');
  } catch (error) {
    console.error('❌ Failed to dump database:', error.message);
    process.exit(1);
  }
}

dumpDatabase();

