// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    externals: {
      inline: ["nodemailer"],
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
      title: "Killian Challeau - Développeur Web Freelance",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "keywords",
          content:
            "développeur, developer, killian, challeau, web, full, stack, kilalo, bordeaux, back, front, end, vue, nuxt, react, laravel, javascript, php, freelance, software, mobile, native, ios, java, android, code, programming, programmation, geek, bordeaux, coding, digital, scrum, app, html, css, typescript, angular",
        },
        {
          hid: "description",
          name: "description",
          content:
            "Jeune développeur web full stack passionné de nouvelles technologies et plus particulièrement du monde du web. Ouvert aux opportunités en tant que freelance.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Killian Challeau - Développeur Web Freelance",
        },
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:url", property: "og:url", content: "https://kilalo.io/" },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Jeune développeur full stack passionné de nouvelles technologies et plus particulièrement du monde du web. Ouvert aux opportunités en tant que freelance.",
        },
        {
          hid: "og:image",
          property: "og:image",
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
