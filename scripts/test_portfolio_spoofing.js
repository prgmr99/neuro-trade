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
  console.log("Starting Adversarial Test: Portfolio Spoofing...");
  const bots = [];
  
  try {
    for (let i = 1; i <= 2; i++) {
      bots.push(await createBot(`Bot_${i}`));
    }
    
    const host = bots[0];
    const attacker = bots[1];
    
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Create room
    await host.supabase.from('battle_rooms').insert({
      room_code: roomCode,
      host_id: host.userId,
      host_name: host.name,
      max_players: 2,
      status: 'playing',
      seed: 0,
      day: 1,
      max_days: 2,
    });
    
    // Setup host's own portfolio in DB
    await host.supabase.from('room_participants').insert({ room_code: roomCode, player_id: host.userId, player_name: host.name, portfolio_value: 10000 });
    
    console.log(`[Attacker] Attempting to spoof Host's DB row...`);
    const { error: spoofError } = await attacker.supabase.from('room_participants').update({
        portfolio_value: 0
    }).eq('room_code', roomCode).eq('player_id', host.userId);

    if (spoofError) {
        console.log("SUCCESS: DB explicitly rejected the spoof attempt! RLS is active.");
    } else {
        // Just in case it didn't throw an error but didn't update either
        const { data: hostRow } = await host.supabase.from('room_participants').select('portfolio_value').eq('player_id', host.userId).single();
        if (hostRow && hostRow.portfolio_value === 10000) {
            console.log("SUCCESS: Spoof attempt ignored by DB (no rows updated).");
        } else {
            throw new Error("Test failed: Spoofing successful, portfolio value changed to " + hostRow?.portfolio_value);
        }
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
