// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    externals: {
      external: ["nodemailer"],
    },
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

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],

  i18n: {
    locales: [
      { code: "fr", file: "fr.json" },
      { code: "en", file: "en.json" },
    ],
    langDir: "locales/",
    defaultLocale: "fr",
    vueI18n: "./i18n/i18n.config.ts",
    detectBrowserLanguage: false,
  },

  css: ["~/assets/css/fonts.css", "~/assets/css/theme.css"],

  app: {
    head: {
      title: "Killian Challeau — Développeur Full Stack Freelance | Bordeaux",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "keywords",
          content:
            "killian challeau, développeur full stack, freelance, bordeaux, vue, nuxt, react, laravel, typescript, nodejs, devops, docker, ci/cd, ia agentique, llm, rag, lead tech, web developer, kilalo",
        },
        {
          name: "description",
          content:
            "Développeur web full stack freelance avec 10+ ans d'expérience. Spécialisé Vue/Nuxt, React, Laravel, TypeScript, DevOps et IA agentique. Disponible pour vos projets depuis Bordeaux.",
        },
        { name: "author", content: "Killian Challeau" },
        { name: "robots", content: "index, follow" },
        {
          property: "og:title",
          content: "Killian Challeau — Développeur Full Stack Freelance | Bordeaux",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://kilalo.io/" },
        { property: "og:site_name", content: "Killian Challeau" },
        {
          property: "og:description",
          content:
            "Développeur web full stack freelance avec 10+ ans d'expérience. Spécialisé Vue/Nuxt, React, Laravel, TypeScript, DevOps et IA agentique. Disponible pour vos projets depuis Bordeaux.",
        },
        {
          property: "og:image",
          content: "https://kilalo.io/kilalo-project.jpg",
        },
        { property: "og:locale", content: "fr_FR" },
        { property: "og:locale:alternate", content: "en_GB" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Killian Challeau — Développeur Full Stack Freelance | Bordeaux",
        },
        {
          name: "twitter:description",
          content:
            "Développeur web full stack freelance avec 10+ ans d'expérience. Spécialisé Vue/Nuxt, React, Laravel, TypeScript, DevOps et IA agentique.",
        },
        {
          name: "twitter:image",
          content: "https://kilalo.io/kilalo-project.jpg",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
        },
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
