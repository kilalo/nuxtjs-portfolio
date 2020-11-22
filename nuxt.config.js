import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  url: 'https://kilalo.io',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Killian Challeau - Développeur web full stack sur Bordeaux',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'développeur, developer, killian, challeau, web, full, stack, kilalo, bordeaux, back, front, end, vue, nuxt, react, laravel, javascript, php, freelance, software, mobile, native, ios, java, android, code, programming, programmation, geek, bordeaux, coding, digital, scrum, app, html, css, typescript, angular'},
      { hid: 'description', name: 'description', content: 'Jeune développeur full stack passionné de nouvelles technologies et plus particulièrement du monde du web. Ouvert aux opportunités en tant que freelance.' },
      // OPENGRAPH
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Killian Challeau - Développeur web'
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://kilalo.io/'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Jeune développeur full stack passionné de nouvelles technologies et plus particulièrement du monde du web. Ouvert aux opportunités en tant que freelance.'
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://kilalo.io/kilalo-project.jpg'
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/all.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'https://kilalo.io',
    path: '/sitemap.xml', // L'emplacement de votre fichier sitemap.
    cacheTime: 1000 * 60 * 15, // La durée avant que le sitemap soit regénéré. Ici 15mn.
    gzip: true,
    routes: [
      { 
        url: '/',
        priority: 1,
      },
      { 
        url: '/contact',
        priority: 0.7,
      },
      { 
        url: '/projects',
        priority: 0.5,
      },
      { 
        url: '/skills',
        priority: 0.5,
      },
      { 
        url: '/resume',
        priority: 0.5,
      }
    ]
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/scss/all.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: ['vue-particles', 'epic-spinners', 'vee-validate'],
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient }) {

      config.node = {
        fs: 'empty'
      }
    }
  }
}
