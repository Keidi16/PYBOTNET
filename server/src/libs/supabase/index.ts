import { createClient } from '@supabase/supabase-js';
import { SUPABASE } from 'src/helpers/supabase.helper';

const supabaseUrl = SUPABASE.URL;
const supabaseKey = SUPABASE.KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
