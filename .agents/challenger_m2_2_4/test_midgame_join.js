import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../../.env');
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  console.error("Failed to read .env file:", e.message);
  process.exit(1);
}

const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.join('=').trim();
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];

async function createBot(name) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw new Error(`Auth failed: ` + error.message);
  return { name, supabase, userId: data.user.id, cleanup: async () => await supabase.auth.signOut() };
}

async function runTest() {
  const host = await createBot('Host');
  const lateJoiner = await createBot('LateJoiner');
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    // 1. Create Room & Start Game
    await host.supabase.from('battle_rooms').insert({
      room_code: roomCode, host_id: host.userId, host_name: host.name,
      max_players: 4, status: 'playing', seed: 0, day: 2, max_days: 5
    });

    console.log(`Room ${roomCode} created and playing.`);

    // 2. LateJoiner tries to join a playing game
    const { error } = await lateJoiner.supabase.from('room_participants').insert({
        room_code: roomCode, player_id: lateJoiner.userId, player_name: lateJoiner.name,
        portfolio_value: 10000, return_pct: 0
    });

    if (error) {
       console.log("SUCCESS: Blocked!");
    } else {
       console.log("FAILED: Mid-game join allowed!");
    }
  } finally {
    await host.supabase.from('battle_rooms').delete().eq('room_code', roomCode);
    await host.cleanup();
    await lateJoiner.cleanup();
  }
}
runTest();
