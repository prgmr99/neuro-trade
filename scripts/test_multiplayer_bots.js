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
    partsChannel: null,
    dbChannel: null,
    roomState: null,
    players: [],
    cleanup: async function() {
      if (this.partsChannel) await this.supabase.removeChannel(this.partsChannel);
      if (this.dbChannel) await this.supabase.removeChannel(this.dbChannel);
      await this.supabase.auth.signOut();
    }
  };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function runTest() {
  console.log("Starting Multiplayer Bots E2E Test...");
  const bots = [];
  
  try {
    for (let i = 1; i <= 4; i++) {
      bots.push(await createBot(`Bot_${i}`));
    }
    console.log("4 Bots authenticated anonymously.");
    
    const host = bots[0];
    
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const { error: insertError } = await host.supabase.from('battle_rooms').insert({
      room_code: roomCode,
      host_id: host.userId,
      host_name: host.name,
      max_players: 4,
      status: 'waiting',
      seed: 0,
      day: 1,
      max_days: 2,
    });
    
    if (insertError) throw new Error("Host failed to create room: " + insertError.message);
    console.log(`Host created room ${roomCode}`);
    
    for (const bot of bots) {
      bot.dbChannel = bot.supabase
        .channel(`room-db-${roomCode}-${bot.name}`)
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'battle_rooms', filter: `room_code=eq.${roomCode}` }, (payload) => {
          bot.roomState = payload.new;
        })
        .subscribe();
        
      bot.partsChannel = bot.supabase.channel(`room-parts-${roomCode}-${bot.name}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'room_participants', filter: `room_code=eq.${roomCode}` }, async () => {
          const { data } = await bot.supabase.from('room_participants').select('*').eq('room_code', roomCode);
          if (data) {
              bot.players = data.map(r => ({ playerId: r.player_id, playerName: r.player_name, portfolioValue: Number(r.portfolio_value) }));
          }
        })
        .subscribe();

      // Bot joins room via DB
      await bot.supabase.from('room_participants').insert({ room_code: roomCode, player_id: bot.userId, player_name: bot.name, portfolio_value: 10000, return_pct: 0 });
    }
    
    console.log("Waiting for DB sync...");
    await sleep(2000); 
    
    if (host.players.length !== 4) {
      throw new Error(`Host sees ${host.players.length} players, expected 4.`);
    }
    console.log("DB sync verified. 4 players in room.");
    
    console.log("Host starting game...");
    await host.supabase.from('battle_rooms').update({
      status: 'playing',
      started_at: new Date().toISOString(),
      day_ends_at: new Date(Date.now() + 5000).toISOString()
    }).eq('room_code', roomCode);
    
    await sleep(1000);
    if (bots[1].roomState?.status !== 'playing') {
      throw new Error("Client 2 did not receive playing state");
    }
    console.log("Status transition to 'playing' verified across clients.");
    
    console.log("Clients updating portfolios in DB...");
    for (let i = 0; i < bots.length; i++) {
        await bots[i].supabase.from('room_participants').update({
            portfolio_value: 10000 + i * 100
        }).eq('room_code', roomCode).eq('player_id', bots[i].userId);
    }
    
    await sleep(1500);
    
    const c2Players = bots[1].players;
    const bot4Id = bots[3].userId;
    const targetPlayer = c2Players.find(p => p.playerId === bot4Id);
    if (!targetPlayer || targetPlayer.portfolioValue !== 10300) {
        throw new Error("DB portfolio value not synced correctly. Target value: " + targetPlayer?.portfolioValue);
    }
    console.log("Leaderboard accuracy verified across clients.");
    
    console.log("Host advancing day...");
    // Simulate timer ends
    await host.supabase.from('battle_rooms').update({
        day: 2,
        day_ends_at: new Date(Date.now() - 5000).toISOString() // End immediately for test speed
    }).eq('room_code', roomCode).eq('day', 1);
    
    await sleep(1000);
    
    if (bots[2].roomState?.day !== 2) {
        throw new Error("Client 3 did not receive day advancement");
    }
    console.log("Day advancement synchronization verified.");
    
    await host.supabase.from('battle_rooms').update({
        status: 'finished',
        day: 3
    }).eq('room_code', roomCode);
    
    await sleep(1000);
    if (bots[3].roomState?.status !== 'finished') {
        throw new Error("Client 4 did not receive finished state");
    }
    console.log("Status transition to 'finished' verified.");
    
    await host.supabase.from('battle_rooms').delete().eq('room_code', roomCode);
    console.log(`Room ${roomCode} deleted. Test Complete!`);
    
  } catch (err) {
    console.error("Test Failed:", err);
    process.exitCode = 1;
  } finally {
    console.log("Cleaning up bots...");
    for (const bot of bots) {
      await bot.cleanup();
    }
  }
}

runTest();
