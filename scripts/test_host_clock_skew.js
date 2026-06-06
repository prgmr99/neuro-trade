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
  const session1 = await signInUser('host_skew@example.com', 'password123');
  const client1 = createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${session1.access_token}` } }
  });
  const userId = session1.user.id;

  const roomCode = 'SKEW12';

  // Cleanup
  await client1.from('battle_rooms').delete().eq('room_code', roomCode);

  // Create room
  let res = await client1.from('battle_rooms').insert({
    room_code: roomCode,
    host_id: userId,
    host_name: 'Host',
    max_players: 2,
    status: 'waiting',
    seed: 123,
    day: 1,
    max_days: 5
  });
  if (res.error) throw res.error;

  // Add host participant
  await client1.from('room_participants').insert({
    room_code: roomCode,
    player_id: userId,
    player_name: 'Host',
    portfolio_value: 10000,
    return_pct: 0
  });

  // Start game
  res = await client1.from('battle_rooms').update({
    status: 'playing',
    day_ends_at: new Date(Date.now() + 60000).toISOString()
  }).eq('room_code', roomCode);
  if (res.error) throw res.error;

  console.log("Started game. Advancing day legitimately should fail...");
  res = await client1.from('battle_rooms').update({
    day: 2
  }).eq('room_code', roomCode);
  console.log("Legitimate advance error:", res.error?.message);

  console.log("Now host explicitly modifies day_ends_at...");
  res = await client1.from('battle_rooms').update({
    day_ends_at: new Date(Date.now() - 60000).toISOString()
  }).eq('room_code', roomCode);
  if (res.error) throw res.error;
  console.log("day_ends_at updated successfully without error.");

  console.log("Advancing day again...");
  res = await client1.from('battle_rooms').update({
    day: 2
  }).eq('room_code', roomCode);
  
  if (res.error) {
    console.log("Failed to advance day:", res.error.message);
  } else {
    console.log("SUCCESSFULLY BYPASSED TIME RESTRICTION! Day advanced.");
  }
}

run().catch(console.error);
