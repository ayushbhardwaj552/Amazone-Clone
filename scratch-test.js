const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://hiqtdukddfhjzuapgcvr.supabase.co";
const supabaseAnonKey = "sb_publishable_fzP4ULfy0zuusAuQtcB6JA_SHnJXZvw";

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.from("Products").select("*").limit(1);
  if (error) {
    console.error("Error fetching Products:", error);
  } else {
    console.log("Successfully fetched Products:", data);
  }
}

run();
