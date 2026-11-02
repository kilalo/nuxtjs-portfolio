// https://nuxt.com/docs/api/configuration/nuxt-config
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
      ],
    },
  },

  vite: {
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
  },
});
