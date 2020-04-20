import colors from 'vuetify/es5/util/colors'
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Killian Challeau - Développeur web',
    title: 'Killian Challeau - Développeur web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'développeur, developer, killian, challeau, web, full, stack, kilalo, bordeaux'},
      { hid: 'description', name: 'description', content: 'Killian Challeau, jeune développeur web de Bordeaux. Venez découvrir mon portfolio.' },
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
        content: 'Killian Challeau, jeune développeur web de Bordeaux. Venez découvrir mon portfolio.'
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: this.BASE_URL + '/kilalo-project.png'
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
  ],
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
