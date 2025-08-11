import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Read values if present, but avoid crashing when missing
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

let client: SupabaseClient | null = null;

if (supabaseUrl && supabaseKey) {
  client = createClient(supabaseUrl, supabaseKey);
} else {
  // Non-blocking warning to guide setup
  console.warn(
    "[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY not found. " +
      "Connect your project to Supabase (green button) to enable auth and database."
  );
}

// Minimal safe stub to prevent runtime crashes when Supabase isn't configured yet
const stubSupabase = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: (_cb: any) => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: async () => ({ error: null }),
    signUp: async (_args?: any) => ({ data: null, error: new Error("Supabase not configured") }),
    signInWithPassword: async (_args?: any) => ({ data: null, error: new Error("Supabase not configured") }),
  },
  functions: {
    invoke: async (_name: string, _options?: any) => ({ data: null, error: new Error("Supabase not configured") }),
  },
} as any;

// Export either a real client or a stub (typed as any for flexibility)
export const supabase: any = client ?? stubSupabase;
