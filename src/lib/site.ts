// Resolves the canonical site URL for metadata, OG tags, sitemap, and robots.
//
// Priority:
//   1. NEXT_PUBLIC_SITE_URL, if you've set it explicitly (e.g. a custom domain).
//   2. Vercel's automatically-exposed production URL, so no configuration
//      needed once deployed there.
//   3. localhost, so local builds without either still work and never point at a domain I do not own.
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
