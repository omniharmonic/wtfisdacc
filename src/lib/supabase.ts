import { createClient } from "@supabase/supabase-js";

// Server-side client (with service role key for writes)
export function getServiceClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Client-side singleton (anon key, read-only via RLS)
let anonClient: ReturnType<typeof createClient> | null = null;

export function getAnonClient() {
  if (anonClient) return anonClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  anonClient = createClient(url, key);
  return anonClient;
}

export async function checkCache(urlHash: string) {
  const client = getServiceClient();
  if (!client) return null;

  const { data } = await client
    .from("analyses")
    .select("*")
    .eq("url_hash", urlHash)
    .gt("expires_at", new Date().toISOString())
    .single();

  return data;
}

export async function saveAnalysis(analysis: Record<string, unknown>) {
  const client = getServiceClient();
  if (!client) return null;

  const { data, error } = await client
    .from("analyses")
    .insert(analysis)
    .select()
    .single();

  if (error) {
    console.error("Error saving analysis:", error);
    return null;
  }
  return data;
}

export async function checkRateLimit(ipHash: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetIn: number;
}> {
  const client = getServiceClient();
  if (!client) return { allowed: true, remaining: 10, resetIn: 0 };

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { data } = await client
    .from("rate_limits")
    .select("*")
    .eq("ip_hash", ipHash)
    .single();

  if (!data || new Date(data.window_start) < new Date(oneHourAgo)) {
    // New window or expired window
    await client
      .from("rate_limits")
      .upsert({
        ip_hash: ipHash,
        window_start: new Date().toISOString(),
        request_count: 1,
      });
    return { allowed: true, remaining: 9, resetIn: 3600 };
  }

  if (data.request_count >= 10) {
    const resetIn = Math.ceil(
      (new Date(data.window_start).getTime() + 3600000 - Date.now()) / 1000
    );
    return { allowed: false, remaining: 0, resetIn };
  }

  await client
    .from("rate_limits")
    .update({ request_count: data.request_count + 1 })
    .eq("ip_hash", ipHash);

  return {
    allowed: true,
    remaining: 10 - data.request_count - 1,
    resetIn: Math.ceil(
      (new Date(data.window_start).getTime() + 3600000 - Date.now()) / 1000
    ),
  };
}

export async function getAnalysisById(id: string) {
  const client = getServiceClient() || getAnonClient();
  if (!client) return null;

  const { data } = await client
    .from("analyses")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}
