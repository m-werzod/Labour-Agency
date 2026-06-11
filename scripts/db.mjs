// Local development database — a real PostgreSQL server that runs in userspace
// (no system install, no admin, no Docker). Data persists in ./.pgdata.
//
//   pnpm db        → start it (leave the terminal open while developing)
//
// Connection (matches .env): postgresql://postgres:postgres@localhost:5432/specialist_group
import EmbeddedPostgres from 'embedded-postgres';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const databaseDir = path.join(root, '.pgdata');

const pg = new EmbeddedPostgres({
  databaseDir,
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  persistent: true,
  // Force UTF-8 so multilingual content (Korean, Arabic, Japanese, Cyrillic,
  // emoji) stores correctly. Windows defaults the cluster to WIN1251 otherwise.
  initdbFlags: ['--encoding=UTF8', '--locale=C'],
});

let stopping = false;
async function shutdown() {
  if (stopping) return;
  stopping = true;
  try {
    await pg.stop();
  } catch {
    /* ignore */
  }
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

async function main() {
  if (!existsSync(path.join(databaseDir, 'PG_VERSION'))) {
    console.log('• Initialising PostgreSQL data directory (first run)…');
    await pg.initialise();
  }
  await pg.start();
  try {
    await pg.createDatabase('specialist_group');
    console.log('• Created database "specialist_group".');
  } catch {
    /* database already exists */
  }
  console.log('\n✅ PostgreSQL is running on localhost:5432  (database: specialist_group)');
  console.log('   Leave this terminal open. Press Ctrl+C to stop.\n');
}

main().catch((err) => {
  console.error('Failed to start the local database:', err);
  process.exit(1);
});
