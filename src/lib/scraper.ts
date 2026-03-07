const MAX_CONTENT_LENGTH = 16000; // ~4K tokens
const FETCH_TIMEOUT = 15000; // 15 seconds

export interface ScrapeResult {
  content: string;
  logoUrl?: string;
}

export async function scrapeUrl(url: string): Promise<string> {
  // GitHub repos get special treatment via API
  if (url.includes("github.com")) {
    return await scrapeGitHub(url);
  }

  // Try Jina Reader first, fall back to direct fetch
  try {
    return await scrapeViaJina(url);
  } catch (jinaError) {
    console.warn("Jina Reader failed, trying direct fetch:", jinaError);
  }

  try {
    return await scrapeDirectFetch(url);
  } catch (directError) {
    console.error("Both scrapers failed:", directError);
    throw new Error(
      `Could not extract content from URL. Error: ${directError instanceof Error ? directError.message : "Unknown error"}`
    );
  }
}

async function scrapeGitHub(url: string): Promise<string> {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return scrapeViaJina(url);

  const [, owner, repo] = match;
  const parts: string[] = [];

  try {
    // Fetch repo info
    const repoRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { signal: AbortSignal.timeout(FETCH_TIMEOUT) }
    );
    if (repoRes.ok) {
      const repoData = await repoRes.json();
      parts.push(`Project: ${repoData.name}`);
      if (repoData.description) parts.push(`Description: ${repoData.description}`);
      if (repoData.topics?.length) parts.push(`Topics: ${repoData.topics.join(", ")}`);
      if (repoData.license?.name) parts.push(`License: ${repoData.license.name}`);
      parts.push(`Stars: ${repoData.stargazers_count}`);
      parts.push(`Language: ${repoData.language}`);
    }

    // Fetch README
    const readmeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      { signal: AbortSignal.timeout(FETCH_TIMEOUT) }
    );
    if (readmeRes.ok) {
      const readmeData = await readmeRes.json();
      const readmeContent = Buffer.from(readmeData.content, "base64").toString("utf-8");
      parts.push("\n--- README ---\n");
      parts.push(readmeContent);
    }
  } catch {
    // Fallback to Jina if GitHub API fails
    return scrapeViaJina(url);
  }

  const combined = parts.join("\n");
  return sanitizeContent(combined);
}

// Jina Reader: fetches any URL via proxy, returns clean markdown
async function scrapeViaJina(url: string): Promise<string> {
  const jinaUrl = `https://r.jina.ai/${url}`;
  const response = await fetch(jinaUrl, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
    headers: {
      Accept: "text/plain",
    },
  });

  if (!response.ok) {
    throw new Error(`Jina Reader returned HTTP ${response.status}`);
  }

  const markdown = await response.text();
  return sanitizeContent(markdown);
}

// Direct fetch fallback — works for sites that don't block serverless IPs
async function scrapeDirectFetch(url: string): Promise<string> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; WTFisDACCBot/1.0)",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const html = await response.text();
  // Simple HTML-to-text extraction without cheerio
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');

  // Extract title from HTML
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";

  const parts = [];
  if (title) parts.push(`Title: ${title}`);
  parts.push(text);

  return sanitizeContent(parts.join("\n"));
}

export async function scrapeUrlWithLogo(url: string): Promise<ScrapeResult> {
  const content = await scrapeUrl(url);
  return { content, logoUrl: undefined };
}

function sanitizeContent(content: string): string {
  return content
    .replace(/\n{3,}/g, "\n\n") // Max 2 consecutive newlines
    .trim()
    .slice(0, MAX_CONTENT_LENGTH);
}
