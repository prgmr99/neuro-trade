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
  console.log("Starting Adversarial Test: Room Capacity Bypass...");
  const bots = [];
  
  try {
    for (let i = 1; i <= 3; i++) {
      bots.push(await createBot(`Bot_${i}`));
    }
    
    const host = bots[0];
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Create room with max_players = 2
    const { error: insertError } = await host.supabase.from('battle_rooms').insert({
      room_code: roomCode,
      host_id: host.userId,
      host_name: host.name,
      max_players: 2,
      status: 'waiting',
      seed: 0,
      day: 1,
      max_days: 2,
    });
    
    if (insertError) throw new Error("Host failed to create room: " + insertError.message);
    console.log(`Room ${roomCode} created with max_players = 2.`);
    
    // Bot 1 (Host) joins via DB
    await host.supabase.from('room_participants').insert({ room_code: roomCode, player_id: host.userId, player_name: host.name });

    // Bot 2 joins
    await bots[1].supabase.from('room_participants').insert({ room_code: roomCode, player_id: bots[1].userId, player_name: bots[1].name });

    await sleep(1000);

    // Bot 3 joins (Attempting capacity bypass)
    const { error: bypassError } = await bots[2].supabase.from('room_participants').insert({ room_code: roomCode, player_id: bots[2].userId, player_name: bots[2].name });

    if (bypassError && bypassError.message.includes('Room is full')) {
        console.log("SUCCESS: Vulnerability prevented! Bot 3 rejected by DB trigger due to capacity enforcement.");
    } else if (!bypassError) {
        throw new Error("Test failed: Vulnerability confirmed! Bot 3 bypassed the capacity limit.");
    } else {
        throw new Error("Unexpected error: " + bypassError.message);
    }

    // Clean up
    await host.supabase.from('battle_rooms').delete().eq('room_code', roomCode);
  } catch (err) {
    console.error("Test Failed:", err);
    process.exitCode = 1;
  } finally {
    for (const bot of bots) {
      await bot.cleanup();
    }
  }
}

runTest();
