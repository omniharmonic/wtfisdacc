import { hashUrl } from "@/lib/utils";
import { checkCache } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();
  const { url } = body;

  if (!url) {
    return Response.json({ error: "URL required" }, { status: 400 });
  }

  // Cache check only — rate limiting happens in the main analyze route
  const urlHash = hashUrl(url);
  const cached = await checkCache(urlHash);
  if (cached) {
    return Response.json({ cached: true, analysis: cached });
  }

  return Response.json({ proceed: true });
}
