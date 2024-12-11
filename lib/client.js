import { createClient } from '@supabase/supabase-js';
import { REACT_NATIVE_SUPABASE_URL, REACT_NATIVE_SUPABASE_KEY } from '@env';

const supabase = createClient(REACT_NATIVE_SUPABASE_URL, REACT_NATIVE_SUPABASE_KEY);

export default supabase;
