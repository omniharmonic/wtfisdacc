import CryptoJS from "crypto-js";

export function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url.trim().toLowerCase());
    // Remove www prefix
    parsed.hostname = parsed.hostname.replace(/^www\./, "");
    // Remove trailing slash
    let normalized = parsed.toString();
    if (normalized.endsWith("/")) {
      normalized = normalized.slice(0, -1);
    }
    return normalized;
  } catch {
    return url.trim().toLowerCase();
  }
}

export function hashUrl(url: string): string {
  const normalized = normalizeUrl(url);
  return CryptoJS.SHA256(normalized).toString();
}

export function formatScore(score: number): string {
  return `${score}/100`;
}

export function getTierFromScore(score: number): string {
  if (score >= 85) return "tier_1";
  if (score >= 70) return "tier_2";
  if (score >= 55) return "tier_3";
  return "not_aligned";
}

export function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
