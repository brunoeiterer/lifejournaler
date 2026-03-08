/**
 * One-time migration script to export entries from the old PostgreSQL database
 * and import them into the Supabase entries table.
 * 
 * Prerequisites:
 * 1. Users must have re-registered on Supabase Auth first
 * 2. Set environment variables:
 *    - OLD_DATABASE_URL: Connection string for the old PostgreSQL database
 *    - SUPABASE_URL: Your Supabase project URL
 *    - SUPABASE_SERVICE_ROLE_KEY: Your Supabase service role key (NOT anon key)
 * 
 * Usage:
 *   npx tsx scripts/migrate-to-supabase.ts
 * 
 * The script will:
 * 1. Connect to the old database and fetch all users and entries
 * 2. Connect to Supabase and look up each old user by email in auth.users
 * 3. Map old user IDs to new Supabase UUIDs
 * 4. Insert all entries with updated user_id references
 */

// NOTE: Install dependencies before running:
//   npm install pg @supabase/supabase-js

import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

const OLD_DATABASE_URL = process.env.OLD_DATABASE_URL!;
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface OldUser {
  Id: number;
  Username: string;
}

interface OldEntry {
  Id: number;
  Date: string;
  Mood: string;
  Weather: string;
  SleepQuality: string;
  Menstruation: string;
  Exercise: string;
  AppetiteLevel: string;
  AnxietyThoughts: number;
  DepressiveThoughts: number;
  Autocriticism: number;
  SensorialOverload: number;
  RacingThoughts: number;
  Notes: string;
  UserId: number;
}

async function migrate() {
  // Connect to old database
  const oldDb = new pg.Client({ connectionString: OLD_DATABASE_URL });
  await oldDb.connect();
  console.log('Connected to old database');

  // Connect to Supabase with service role
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Fetch all old users
  const usersResult = await oldDb.query<OldUser>('SELECT "Id", "Username" FROM "Users"');
  const oldUsers = usersResult.rows;
  console.log(`Found ${oldUsers.length} users in old database`);

  // Fetch all old entries
  const entriesResult = await oldDb.query<OldEntry>(
    'SELECT "Id", "Date", "Mood", "Weather", "SleepQuality", "Menstruation", "Exercise", "AppetiteLevel", "AnxietyThoughts", "DepressiveThoughts", "Autocriticism", "SensorialOverload", "RacingThoughts", "Notes", "UserId" FROM "Entries"'
  );
  const oldEntries = entriesResult.rows;
  console.log(`Found ${oldEntries.length} entries in old database`);

  // Map old user IDs to Supabase UUIDs by looking up emails
  const userIdMap = new Map<number, string>();
  const { data: { users: supabaseUsers }, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    console.error('Failed to list Supabase users:', listError);
    process.exit(1);
  }

  for (const oldUser of oldUsers) {
    const supabaseUser = supabaseUsers.find(u => u.email === oldUser.Username);
    if (supabaseUser) {
      userIdMap.set(oldUser.Id, supabaseUser.id);
      console.log(`  Mapped: ${oldUser.Username} (old ID ${oldUser.Id}) -> ${supabaseUser.id}`);
    } else {
      console.warn(`  WARNING: No Supabase user found for ${oldUser.Username} (old ID ${oldUser.Id}) - entries will be skipped`);
    }
  }

  // Insert entries into Supabase
  let insertedCount = 0;
  let skippedCount = 0;

  for (const entry of oldEntries) {
    const newUserId = userIdMap.get(entry.UserId);
    if (!newUserId) {
      skippedCount++;
      continue;
    }

    const { error } = await supabase.from('entries').insert({
      user_id: newUserId,
      date: entry.Date,
      mood: entry.Mood,
      weather: entry.Weather,
      sleep_quality: entry.SleepQuality,
      menstruation: entry.Menstruation,
      exercise: entry.Exercise,
      appetite_level: entry.AppetiteLevel,
      anxiety_thoughts: entry.AnxietyThoughts,
      depressive_thoughts: entry.DepressiveThoughts,
      autocriticism: entry.Autocriticism,
      sensorial_overload: entry.SensorialOverload,
      racing_thoughts: entry.RacingThoughts,
      notes: entry.Notes,
    });

    if (error) {
      console.error(`  Failed to insert entry ${entry.Id} (date: ${entry.Date}):`, error.message);
    } else {
      insertedCount++;
    }
  }

  console.log(`\nMigration complete: ${insertedCount} entries inserted, ${skippedCount} skipped (unmapped users)`);

  await oldDb.end();
}

migrate().catch(console.error);
