/**
 * Converts a Strapi media URL to a CDN URL when CDN_URL is configured.
 *
 * Handles both relative paths (/uploads/...) and absolute URLs
 * (http://localhost:1337/uploads/...) by replacing the origin with CDN_URL.
 * Returns null when given a falsy input.
 */
export function toCdnUrl(url: string | null | undefined): string {
  if (!url) return '';

  const cdnBase = process.env.CDN_URL?.replace(/\/$/, '');
  if (!cdnBase) return url;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    const parsed = new URL(url);
    return cdnBase + parsed.pathname + parsed.search + parsed.hash;
  }

  return cdnBase + url;
}
