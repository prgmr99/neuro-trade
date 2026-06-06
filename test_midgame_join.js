import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  // We need to authenticate as a user
  // Let's sign in a dummy user
  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email: `test_${Date.now()}@test.com`,
    password: 'password123'
  });
  
  const userId = authData.user.id;
  
  // Create a room as this user
  const roomCode = "LATE" + Math.floor(Math.random() * 100);
  await supabase.from('battle_rooms').insert({
    room_code: roomCode,
    host_id: userId,
    host_name: 'Host',
    max_players: 5,
    status: 'playing', // Room is ALREADY playing
    seed: 0,
    day: 3, // Day 3
    max_days: 5,
  });
  
  // Now try to insert into room_participants
  const { data, error } = await supabase.from('room_participants').insert({
    room_code: roomCode,
    player_id: userId,
    player_name: 'Late Joiner',
    portfolio_value: 10000,
    return_pct: 0
  });
  
  console.log("Insert Error:", error ? error.message : "None, SUCCESS!");
  
  // Cleanup
  await supabase.from('battle_rooms').delete().eq('room_code', roomCode);
}

test().catch(console.error);
