// https://nuxt.com/docs/api/configuration/nuxt-config

// Self-hosted Umami. The website ID is public (it ships in the page HTML),
// and is baked in at build time because / and /en are prerendered.
const UMAMI_HOST = "https://stats.kilalo.io";
const UMAMI_WEBSITE_ID = "b97708e1-13a4-41fa-af38-3e8e61bc3e13";

export default defineNuxtConfig({
  nitro: {
    externals: {
      external: ["nodemailer"],
    },
    compressPublicAssets: true,
  },

  runtimeConfig: {
    smtpHost: "",
    smtpPort: "587",
    smtpSecure: "false",
    smtpUser: "",
    smtpPass: "",
    contactEmail: "",
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  site: {
    url: "https://kilalo.io",
    name: "Killian Challeau",
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxtjs/sitemap",
  ],

  i18n: {
    baseUrl: "https://kilalo.io",
    strategy: "prefix_except_default",
    locales: [
      { code: "fr", language: "fr-FR", file: "fr.json" },
      { code: "en", language: "en-GB", file: "en.json" },
    ],
    langDir: "locales/",
    defaultLocale: "fr",
    vueI18n: "./i18n/i18n.config.ts",
    detectBrowserLanguage: false,
  },

  icon: {
    // Icons are bundled at build time: no client-side request to the Iconify API
    serverBundle: { collections: ["fa6-solid", "fa6-brands"] },
    clientBundle: { scan: true },
  },

  fonts: {
    families: [{ name: "Inter", provider: "google", weights: [300, 400, 500, 600, 700, 800] }],
  },

  sitemap: {
    // A single /sitemap.xml with hreflang alternates instead of one sitemap per locale
    sitemaps: false,
    exclude: ["/api/**"],
  },

  routeRules: {
    "/": { prerender: true },
    "/en": { prerender: true },
    "/images/**": {
      headers: { "cache-control": "public, max-age=2592000, stale-while-revalidate=86400" },
    },
  },

  css: ["~/assets/css/fonts.css", "~/assets/css/theme.css"],

  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "Killian Challeau" },
        { name: "theme-color", content: "#0f172a" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: UMAMI_HOST },
      ],
      script: UMAMI_WEBSITE_ID
        ? [
            {
              src: `${UMAMI_HOST}/script.js`,
              defer: true,
              "data-website-id": UMAMI_WEBSITE_ID,
              // Only count visits on the production domain, not localhost
              "data-domains": "kilalo.io",
            },
          ]
        : [],
    },
  },

  vite: {
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
  },
});
