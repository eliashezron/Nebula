import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_KEY
if (!supabaseUrl) {
    throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
  
if (!supabaseKey) {
    throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_KEY');
}
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase