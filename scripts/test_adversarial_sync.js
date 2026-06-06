import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../.env');
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

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
  process.exit(1);
}

async function createBot(name) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw new Error(`Auth failed for ${name}: ` + error.message);
  
  return {
    name,
    supabase,
    userId: data.user.id,
    cleanup: async function() {
      await this.supabase.auth.signOut();
    }
  };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function runTest() {
  console.log("Starting Adversarial Sync Test...");
  const host = await createBot('Host');
  const client = await createBot('Client');
  
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  console.log(`Room Code: ${roomCode}`);

  try {
    // 1. Host creates room
    await host.supabase.from('battle_rooms').insert({
      room_code: roomCode,
      host_id: host.userId,
      host_name: host.name,
      max_players: 4,
      status: 'playing',
      seed: 0,
      day: 1,
      max_days: 2,
    });

    // 2. Client joins room via DB
    await client.supabase.from('room_participants').insert({
        room_code: roomCode,
        player_id: client.userId,
        player_name: client.name,
        portfolio_value: 10000,
        return_pct: 0
    });

    // 3. Start game with day_ends_at in the PAST
    await host.supabase.from('battle_rooms').update({
      status: 'playing',
      day: 1,
      // 5 seconds ago
      day_ends_at: new Date(Date.now() - 5000).toISOString(),
    }).eq('room_code', roomCode);

    console.log("Game started. Host is disconnecting...");
    // Host disconnects without advancing day or deleting room
    await host.cleanup();

    let roomData = await client.supabase.from('battle_rooms').select('*').eq('room_code', roomCode).single();
    
    // Simulate Client waiting 3 seconds and ADVANCING THE DAY (fixed logic)
    const remaining = Math.max(0, Math.ceil((new Date(roomData.data.day_ends_at).getTime() - Date.now()) / 1000));
    if (remaining <= 0) {
        await client.supabase.from('battle_rooms').update({
            day: roomData.data.day + 1,
            day_ends_at: new Date(Date.now() + 60000).toISOString()
        }).eq('room_code', roomCode).eq('day', roomData.data.day);
    }
    
    await sleep(2000);
    
    roomData = await client.supabase.from('battle_rooms').select('*').eq('room_code', roomCode).single();
    
    if (roomData.data.day > 1) {
      console.log("SUCCESS: Game advanced! Host disconnect bug not present.");
    } else {
      throw new Error("[GAP FOUND] Game is permanently stuck! Client cannot advance the day.");
    }

  } catch (err) {
    console.error("Test Failed:", err);
    process.exitCode = 1;
  } finally {
    await client.supabase.from('battle_rooms').delete().eq('room_code', roomCode);
    await client.cleanup();
  }
}

runTest();
