import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jlkuwyanfnfxotnwbotb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impsa3V3eWFuZm5meG90bndib3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTQ1NTksImV4cCI6MjA4OTM5MDU1OX0.l-gS9kvmSM9hhAahX4-CGTb6KZCPsqi5E8sqDEBpWXY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
