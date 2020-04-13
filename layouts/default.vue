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
          :to="'/'"
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
          :to="'projects'"
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
          :to="'skills'"
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
          :to="'resume'"
          :class="path == '/resume' ? 'active-btn' : null"
          class="mt-2 d-none no-box-shadow d-sm-block align-self-center"
          @click.stop="animate()">
            <v-icon
              class="mb-1 mr-2">
              mdi-file-outline
            </v-icon>  
            <span
              class="d-none no-box-shadow d-md-block align-self-center">
              Voir le CV
            </span>
        </v-btn>
        <v-btn          
          :ripple="false"
          :to="'contact'"
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
        class="h100">
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
  data () {
    return {
      loader: true,
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
          title: 'Voir mon CV',
          to: '/resume'
        },
        {
          icon: 'mdi-email-outline',
          title: 'Contact',
          to: '/contact'
        }
      ],
      title: 'Kilalo.io'
    }
  },
  computed: {
    path() {
      return this.$route.path
    }
  },
  mounted() {
    this.animate()
  },
  methods: {
    animate () {
      this.loader = true
      setTimeout(() => {
        this.loader = false
      }, 500)
    }
  }
}
</script>
