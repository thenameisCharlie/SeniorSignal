import { createClient } from '@supabase/supabase-js';

const supabaseUrl = YOUR_REACT_APP_SUPABASE_URL;
const supabaseKey = YOUR_REACT_NATIVE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;