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
    channel: null,
    cleanup: async function() {
      if (this.channel) await this.supabase.removeChannel(this.channel);
      await this.supabase.auth.signOut();
    }
  };
}

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
    
    // Bot 1 (Host) joins
    host.channel = host.supabase.channel(`room-presence-${roomCode}`);
    await host.channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
            await host.channel.track({ playerId: host.userId, playerName: host.name, portfolioValue: 10000, joinedAt: Date.now() });
        }
    });

    // Bot 2 joins
    bots[1].channel = bots[1].supabase.channel(`room-presence-${roomCode}`);
    await bots[1].channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
            await bots[1].channel.track({ playerId: bots[1].userId, playerName: bots[1].name, portfolioValue: 10000, joinedAt: Date.now() });
        }
    });

    // Bot 3 joins (Bypassing max_players)
    // The join logic in useRoomBattle.ts only checks if status === 'waiting'
    const { data } = await bots[2].supabase.from('battle_rooms').select('*').eq('room_code', roomCode).single();
    if (data && data.status === 'waiting') {
        bots[2].channel = bots[2].supabase.channel(`room-presence-${roomCode}`);
        await bots[2].channel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                await bots[2].channel.track({ playerId: bots[2].userId, playerName: bots[2].name, portfolioValue: 10000, joinedAt: Date.now() });
            }
        });
        console.log("SUCCESS: Vulnerability confirmed! Bot 3 bypassed the capacity limit because there are no capacity checks.");
    } else {
        throw new Error("Test failed: Room is somehow protected.");
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
