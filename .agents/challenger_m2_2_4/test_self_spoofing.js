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
      max_players: 4, status: 'playing', seed: 0, day: 1, max_days: 5
    });

    await host.supabase.from('room_participants').insert({
        room_code: roomCode, player_id: host.userId, player_name: host.name,
        portfolio_value: 10000, return_pct: 0
    });

    // Attempt to spoof own portfolio
    const { error } = await host.supabase.from('room_participants').update({
        portfolio_value: 999999999, return_pct: 100000
    }).eq('room_code', roomCode).eq('player_id', host.userId);

    if (error) {
       console.log("SUCCESS: Self-spoofing blocked!");
    } else {
       console.log("FAILED: Self-spoofing allowed!");
    }
  } finally {
    await host.supabase.from('battle_rooms').delete().eq('room_code', roomCode);
    await host.cleanup();
  }
}
runTest();
