
import {createClient} from '@supabase/supabase-js'
import { Database } from '../types/supabase';

const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;

export const supabase = createClient<Database>(supabaseURL, supabaseKey);