<template>
  <v-layout
    class="main-container">
    <div class="justify-space-around layout">
      <div class="content">
        <div class="content__container">
          <ul class="px-3 content__container__list text-center fwn">
            <li class="content__container__list__item">console.log("Hello World")</li>
            <li class="content__container__list__item">echo("Hello World")</li>
            <li class="content__container__list__item">System.out.println("Hello World")</li>
            <li class="content__container__list__item">std::cout << "Hello World"</li>
          </ul>
        </div>
      </div>
    </div>
    <div 
      class="title-main">
      <h1>
        Je m'appelle &nbsp;<span class="txt-color">Killian</span>,
      </h1>
      <span class="txt-color title-mobile-first">Killian</span>
    </div>
    <div 
      class="title-second">
      <h1>
        je suis &nbsp;<span class="txt-color">développeur web</span>.
      </h1>
      <span class="title-mobile-second">développeur web full stack.</span>
    </div>
  </v-layout>
</template>

<script>
export default {
   head () {
    return {
      title: 'Killian Challeau - Développeur Web Freelance', 
    }
  },
  data () {
    return {
      loader: true,
      clipped: false,
      drawer: false,
      fixed: false,
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Kilalo.io'
    }
  },
}
</script>
