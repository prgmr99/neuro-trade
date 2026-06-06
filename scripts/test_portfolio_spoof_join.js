import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function signInUser(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      const res = await supabase.auth.signUp({ email, password });
      data = res.data;
      error = res.error;
    } else {
      throw error;
    }
  }
  return data.session;
}

async function run() {
  const session1 = await signInUser('malicious_join@example.com', 'password123');
  const client1 = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${session1.access_token}` } }
  });
  const userId = session1.user.id;

  const session2 = await signInUser('host_join@example.com', 'password123');
  const hostClient = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${session2.access_token}` } }
  });
  const hostId = session2.user.id;

  const roomCode = 'SPOOF1';

  // Cleanup
  await hostClient.from('battle_rooms').delete().eq('room_code', roomCode);

  // Host creates room
  let res = await hostClient.from('battle_rooms').insert({
    room_code: roomCode,
    host_id: hostId,
    host_name: 'Host',
    max_players: 4,
    status: 'waiting',
    seed: 123,
    day: 1,
    max_days: 5
  });
  if (res.error) throw res.error;

  // Host joins correctly
  await hostClient.from('room_participants').insert({
    room_code: roomCode,
    player_id: hostId,
    player_name: 'Host',
    portfolio_value: 10000,
    return_pct: 0
  });

  console.log("Malicious client joining with spoofed initial portfolio...");
  // Malicious client injects arbitrary portfolio on INSERT
  res = await client1.from('room_participants').insert({
    room_code: roomCode,
    player_id: userId,
    player_name: 'Hacker',
    portfolio_value: 999999999, // SPOOFED!
    return_pct: 9999            // SPOOFED!
  });

  if (res.error) {
    console.log("Failed to inject portfolio:", res.error.message);
  } else {
    console.log("Successfully injected spoofed portfolio on join!");
    
    // Verify it was saved
    const check = await client1.from('room_participants').select('*').eq('player_id', userId).eq('room_code', roomCode).single();
    console.log("Saved participant state:", check.data);
    if (check.data.portfolio_value > 10000) {
      console.log("VULNERABILITY CONFIRMED: Initial State Injection (Portfolio Spoofing) works.");
    }
  }
}

run().catch(console.error);
