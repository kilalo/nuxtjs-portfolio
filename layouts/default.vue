<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      disable-resize-watcher
      fixed
      app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          active-class="active-btn"
          :ripple="false"
          @click.stop="animate()"
          class="my-5">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          href='https://linkedin.com/in/killian-challeau'
          target="_blank"
          :ripple="false"
          class="my-5">
          <v-list-item-action>
            <v-icon>mdi-linkedin</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Linkedin'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app>
      <div
        class="d-flex justify-space-around w100">
        <div
          class="d-sm-none d-xs-block">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            :ripple="false"
            class="hamburger" />
          <span
            class="nav-title txt-color">
            Kilalo.io
          </span>
        </div>
        <v-btn
          class="mt-2 d-none no-box-shadow d-sm-block align-self-center"
          active-class="active-btn"
          :ripple="false"
          :class="path == '/' ? 'active-btn' : null"
          :to="{ path: '/' }"
          replace
          @click.stop="animate()">
            <v-icon
              class="mb-1 mr-2">
              mdi-home-outline
            </v-icon>
            <span
              class="d-none no-box-shadow d-md-block align-self-center">
              Accueil
            </span>
        </v-btn>
        <v-btn
          :ripple="false"
          class="mt-2 d-none no-box-shadow d-sm-block align-self-center"
          :class="path == '/projects' ? 'active-btn' : null"
          :to="{ path: '/projects' }"
          replace
          @click.stop="animate()">
            <v-icon
              class="mb-1 mr-2">
              mdi-lightbulb-on-outline
            </v-icon>
            <span
              class="d-none no-box-shadow d-md-block align-self-center">
              Projets
            </span>
        </v-btn>
        <v-btn
          :ripple="false"
          :to="{ path: '/skills' }"
          replace
          :class="path == '/skills' ? 'active-btn' : null"
          class="mt-2 d-none no-box-shadow d-sm-block align-self-center"
          @click.stop="animate()">
            <v-icon
              class="mb-1 mr-2">
              mdi-xml
            </v-icon>
            <span
              class="d-none no-box-shadow d-md-block align-self-center">
              Compétences
            </span>
        </v-btn>
        <v-btn
          :ripple="false"
          :to="{ path: '/resume' }"
          replace
          :class="path == '/resume' ? 'active-btn' : null"
          class="mt-2 d-none no-box-shadow d-sm-block align-self-center"
          @click.stop="animate()">
            <v-icon
              class="mb-1 mr-2">
              mdi-file-outline
            </v-icon>  
            <span
              class="d-none no-box-shadow d-md-block align-self-center">
              curriculum vitae
            </span> 
        </v-btn>
        <v-btn          
          :ripple="false"
          :to="{ path: '/contact' }"
          replace
          :class="path == '/contact' ? 'active-btn' : null"
          class="mt-2 d-none no-box-shadow d-sm-block align-self-center"
          @click.stop="animate()">
            <v-icon
              class="mb-1 mr-2">
              mdi-email-outline
            </v-icon>
            <span
              class="d-none d-md-block align-self-center">
              Contact
            </span>
        </v-btn>
        <v-btn          
          :ripple="false"
          href="https://linkedin.com/in/killian-challeau"
          target="_blank"
          replace
          class="mt-2 d-none no-box-shadow d-sm-block align-self-center"
          @click.stop="animate()">
            <v-icon
              class="mb-1 mr-2">
              mdi-linkedin
            </v-icon>
            <span
              class="d-none d-md-block align-self-center">
              LINKEDIN
            </span>
        </v-btn>
      </div>
    </v-app-bar>
    <v-content>
       <loader 
        v-if="loader" />
        <vue-particles
          :click-effect="false"
          :particles-number="50"
          color="#dedede" />
      <v-container
        class="h100 oh">
          <nuxt />
      </v-container>
    </v-content>
    <v-footer
      class="text-center footer">
      <span>Made with Nuxt.js - kilalo.io </span>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue'
import Loader from '~/components/loader.vue'
import VueParticles from 'vue-particles'

Vue.use(VueParticles)
Vue.use(Loader)
export default {
  components: {
    Loader,
  },
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://kilalo.io' + this.$route.path
        }
      ]
    }
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-home-outline',
          title: 'Accueil',
          to: '/'
        },
        {
          icon: 'mdi-lightbulb-on-outline',
          title: 'Projets',
          to: '/projects'
        },
        {
          icon: 'mdi-xml',
          title: 'Compétences',
          to: '/skills'
        },
         {
          icon: 'mdi-file-outline',
          title: 'Curriculum vitae',
          to: '/resume'
        },
        {
          icon: 'mdi-email-outline',
          title: 'Contact',
          to: '/contact'
        },
      ],
      title: 'Kilalo.io'
    }
  },
  computed: {
    path() {
      return this.$route.path
    },
    loader () {
      return this.$store.state.loader
    }
  },
  mounted() {
    //setTimeout(() => {
    //  this.$store.dispatch('LOADER')
    //}, 500)
  },
  methods: {
    animate () {
      this.$store.dispatch('LOADER')
      setTimeout(() => {
        this.$store.dispatch('LOADER')
      }, 500)
    }
  }
}
</script>
