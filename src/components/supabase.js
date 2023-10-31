import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gmkcuohafgzuzcutplsz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdta2N1b2hhZmd6dXpjdXRwbHN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0NTg3NTIsImV4cCI6MjAxNDAzNDc1Mn0.f3s8JlReGb7ISXBFhOHcVULNRlOGWzJx34z8YKQlO9U";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
