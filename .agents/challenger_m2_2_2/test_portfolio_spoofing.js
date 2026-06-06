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
    players: [],
    cleanup: async function() {
      if (this.channel) await this.supabase.removeChannel(this.channel);
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
    
    // Host joins and listens
    host.channel = host.supabase.channel(`room-presence-${roomCode}`);
    host.channel.on('broadcast', { event: 'portfolio_update' }, ({ payload }) => {
        const existing = host.players.find(p => p.playerId === payload.playerId);
        if (existing) {
            existing.portfolioValue = payload.portfolioValue;
        } else {
            host.players.push(payload);
        }
    });
    await host.channel.subscribe();
    
    // Attacker joins
    attacker.channel = attacker.supabase.channel(`room-presence-${roomCode}`);
    await attacker.channel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
            // Attacker maliciously sends a broadcast claiming to be the Host, setting their portfolio to 0
            console.log(`[Attacker] Spoofing broadcast for Host ID: ${host.userId}`);
            await attacker.channel.send({
                type: 'broadcast',
                event: 'portfolio_update',
                payload: {
                    playerId: host.userId,
                    playerName: 'Hacked_Host',
                    portfolioValue: 0,
                    returnPct: -100
                }
            });
        }
    });

    await sleep(2000);

    const hackedHost = host.players.find(p => p.playerId === host.userId);
    if (hackedHost && hackedHost.portfolioValue === 0) {
        console.log("SUCCESS: Vulnerability confirmed! Attacker successfully spoofed the host's portfolio value.");
    } else {
        throw new Error("Test failed: Spoofing unsuccessful.");
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
