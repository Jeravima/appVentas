import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient<Database>(supabaseURL, supabaseKey);
