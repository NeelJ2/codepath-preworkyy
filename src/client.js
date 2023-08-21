import { createClient } from '@supabase/supabase-js';
const URL = 'https://vatcrevhvnpipzdzbfdb.supabase.co';
const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdGNyZXZodm5waXB6ZHpiZmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzMzU1NDksImV4cCI6MjAwNTkxMTU0OX0.mrt5MKo8l2ic1xOwbBP5coHa3mnOT_SZ3hXReQFaui4';
// const supabase = createClient(URL, API_KEY);
export const supabase = createClient(URL, API_KEY);
