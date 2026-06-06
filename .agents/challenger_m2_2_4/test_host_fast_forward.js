import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '../../.env');
const env = {};
fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) env[key.trim()] = value.join('=').trim();
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];

async function createBot(name) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data } = await supabase.auth.signInAnonymously();
  return { name, supabase, userId: data.user.id, cleanup: async () => await supabase.auth.signOut() };
}

async function runTest() {
  const host = await createBot('Host');
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  try {
    await host.supabase.from('battle_rooms').insert({
      room_code: roomCode, host_id: host.userId, host_name: host.name,
      max_players: 4, status: 'playing', seed: 0, day: 1, max_days: 5,
      day_ends_at: new Date(Date.now() + 60000).toISOString()
    });

    await host.supabase.from('room_participants').insert({
        room_code: roomCode, player_id: host.userId, player_name: host.name,
        portfolio_value: 10000, return_pct: 0
    });

    // Host updates day_ends_at to the past, keeping day same
    const { error } = await host.supabase.from('battle_rooms').update({
        day_ends_at: new Date(Date.now() - 10000).toISOString()
    }).eq('room_code', roomCode).eq('day', 1);

    if (error) {
       console.log("SUCCESS: Fast-forward blocked!", error.message);
    } else {
       console.log("FAILED: Host successfully fast-forwarded the timer!");
    }
  } finally {
    await host.supabase.from('battle_rooms').delete().eq('room_code', roomCode);
    await host.cleanup();
  }
}
runTest();
