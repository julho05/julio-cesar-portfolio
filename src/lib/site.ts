/**
 * URL pública do site. Defina NEXT_PUBLIC_SITE_URL no ambiente de produção
 * (ex.: https://juliocesar.dev). Na Vercel, o domínio de produção é usado como fallback.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
