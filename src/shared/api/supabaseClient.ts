import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

if (!supabaseUrl || !supabasePublishableKey) {
  console.warn(
    "Warning: Supabase credentials are not fully configured in your environment variables. Please check your .env.local file.",
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
export default supabase;
