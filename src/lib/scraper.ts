import * as cheerio from "cheerio";

const MAX_CONTENT_LENGTH = 16000; // ~4K tokens
const FETCH_TIMEOUT = 10000; // 10 seconds

interface ScrapedContent {
  title: string;
  description: string;
  content: string;
  source: "github" | "web" | "text";
  logoUrl?: string;
}

export interface ScrapeResult {
  content: string;
  logoUrl?: string;
}

export async function scrapeUrl(url: string): Promise<string> {
  try {
    // GitHub repos get special treatment
    if (url.includes("github.com")) {
      return await scrapeGitHub(url);
    }

    return await scrapeWeb(url);
  } catch (error) {
    console.error("Scraping error:", error);
    throw new Error(
      `Could not extract content from URL. Error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

async function scrapeGitHub(url: string): Promise<string> {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return scrapeWeb(url);

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
    // Fallback to web scraping if API fails
    return scrapeWeb(url);
  }

  const combined = parts.join("\n");
  return sanitizeContent(combined);
}

async function scrapeWeb(url: string): Promise<string> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
    headers: {
      "User-Agent": "WTFisDACCBot/1.0 (educational project analyzer)",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Remove unwanted elements
  $("script, style, nav, footer, header, iframe, noscript").remove();

  const scraped: ScrapedContent = {
    title: $("title").text().trim() || $('meta[property="og:title"]').attr("content") || "",
    description:
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      "",
    content: "",
    source: "web",
  };

  // Extract main content
  const mainContent =
    $("main").text() || $("article").text() || $('[role="main"]').text() || $("body").text();

  scraped.content = mainContent.trim();

  const parts = [];
  if (scraped.title) parts.push(`Title: ${scraped.title}`);
  if (scraped.description) parts.push(`Description: ${scraped.description}`);
  parts.push("\n--- Page Content ---\n");
  parts.push(scraped.content);

  return sanitizeContent(parts.join("\n"));
}

export async function scrapeUrlWithLogo(url: string): Promise<ScrapeResult> {
  try {
    if (url.includes("github.com")) {
      const content = await scrapeGitHub(url);
      return { content, logoUrl: undefined };
    }

    const response = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT),
      headers: {
        "User-Agent": "WTFisDACCBot/1.0 (educational project analyzer)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract logo/favicon
    const logoUrl =
      $('link[rel="apple-touch-icon"]').attr("href") ||
      $('link[rel="icon"][type="image/png"]').attr("href") ||
      $('link[rel="icon"]').attr("href") ||
      $('meta[property="og:image"]').attr("content") ||
      undefined;

    // Resolve relative URLs
    let resolvedLogo = logoUrl;
    if (logoUrl && !logoUrl.startsWith("http")) {
      try {
        resolvedLogo = new URL(logoUrl, url).toString();
      } catch {
        resolvedLogo = undefined;
      }
    }

    // Remove unwanted elements
    $("script, style, nav, footer, header, iframe, noscript").remove();

    const scraped: ScrapedContent = {
      title: $("title").text().trim() || $('meta[property="og:title"]').attr("content") || "",
      description:
        $('meta[name="description"]').attr("content") ||
        $('meta[property="og:description"]').attr("content") ||
        "",
      content: "",
      source: "web",
      logoUrl: resolvedLogo,
    };

    const mainContent =
      $("main").text() || $("article").text() || $('[role="main"]').text() || $("body").text();

    scraped.content = mainContent.trim();

    const parts = [];
    if (scraped.title) parts.push(`Title: ${scraped.title}`);
    if (scraped.description) parts.push(`Description: ${scraped.description}`);
    parts.push("\n--- Page Content ---\n");
    parts.push(scraped.content);

    return {
      content: sanitizeContent(parts.join("\n")),
      logoUrl: resolvedLogo,
    };
  } catch (error) {
    console.error("Scraping error:", error);
    throw new Error(
      `Could not extract content from URL. Error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

function sanitizeContent(content: string): string {
  return content
    .replace(/<[^>]*>/g, "") // Strip any remaining HTML
    .replace(/\s+/g, " ") // Collapse whitespace
    .replace(/\n{3,}/g, "\n\n") // Max 2 consecutive newlines
    .trim()
    .slice(0, MAX_CONTENT_LENGTH);
}
