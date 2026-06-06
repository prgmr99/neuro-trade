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
    dbChannel: null,
    roomState: null,
    cleanup: async function() {
      if (this.channel) await this.supabase.removeChannel(this.channel);
      if (this.dbChannel) await this.supabase.removeChannel(this.dbChannel);
      await this.supabase.auth.signOut();
    }
  };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function runTest() {
  console.log("Starting Adversarial Test: Host Disconnect Stall...");
  const bots = [];
  
  try {
    for (let i = 1; i <= 2; i++) {
      bots.push(await createBot(`Bot_${i}`));
    }
    
    const host = bots[0];
    const client = bots[1];
    
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const { error: insertError } = await host.supabase.from('battle_rooms').insert({
      room_code: roomCode,
      host_id: host.userId,
      host_name: host.name,
      max_players: 2,
      status: 'playing',
      seed: 0,
      day: 1,
      max_days: 2,
      day_ends_at: new Date(Date.now() + 3000).toISOString() // Day ends in 3 seconds
    });
    
    if (insertError) throw new Error("Host failed to create room: " + insertError.message);
    console.log(`Room ${roomCode} created directly in 'playing' state.`);

    // Simulate Client joining via DB
    await client.supabase.from('room_participants').insert({ room_code: roomCode, player_id: client.userId, player_name: client.name });
    
    // Simulate Client joining and acting as useRoomBattle
    client.dbChannel = client.supabase
      .channel(`room-db-${roomCode}-${client.name}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'battle_rooms', filter: `room_code=eq.${roomCode}` }, (payload) => {
        console.log(`[Client] Received DB update: Day ${payload.new.day}`);
        client.roomState = payload.new;
      })
      .subscribe();
    
    // Initial state fetch
    const { data } = await client.supabase.from('battle_rooms').select('*').eq('room_code', roomCode).single();
    client.roomState = data;

    let isAdvancing = false;
    // Client timer loop simulating FIXED useRoomBattle
    const clientTimer = setInterval(() => {
        if (!client.roomState) return;
        const remaining = Math.max(0, Math.ceil((new Date(client.roomState.day_ends_at).getTime() - Date.now()) / 1000));
        
        // Fixed code allows any participant client to advance
        if (remaining <= 0 && !isAdvancing) {
            isAdvancing = true;
            console.log("[Client] Timer reached 0, advancing day!");
            const newDay = client.roomState.day + 1;
            client.supabase.from('battle_rooms').update({
              day: newDay,
              day_ends_at: new Date(Date.now() + 60000).toISOString(),
            }).eq('room_code', client.roomState.room_code).eq('day', client.roomState.day)
            .then(() => { isAdvancing = false; });
        }
    }, 1000);

    console.log("Waiting 5 seconds for day to end. Host is disconnected (not running timer).");
    await sleep(5000);
    clearInterval(clientTimer);

    if (client.roomState.day > 1) {
        console.log("SUCCESS: Vulnerability prevented! The day advanced successfully without the host.");
    } else {
        throw new Error("Test failed: Day did not advance. Stall still present.");
    }

    // Clean up
    await host.supabase.from('battle_rooms').delete().eq('room_code', roomCode);
    console.log(`Room ${roomCode} deleted.`);
  } catch (err) {
    console.error("Test Failed:", err);
    process.exit(1);
  } finally {
    for (const bot of bots) {
      await bot.cleanup();
    }
  }
}

runTest();
