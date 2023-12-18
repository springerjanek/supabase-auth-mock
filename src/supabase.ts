import { createClient } from "@supabase/supabase-js";
import { config } from "./environments/supabase.config"

export const supabase = createClient(config.supabaseUrl, config.supabaseKey);
