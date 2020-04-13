<template>
  <v-container>
    <div class="grid h100">
			<div
			  v-for="project in projects"
    		:key="project.id"
				class="my-5 pa-5 g12 g6--tablet g4--wide">
      <v-card
        class="ma"
        max-width="374">
        <v-img
          height="240"
          :src="project.img" />
        <v-card-title
          class="pb-2">
          {{ project.title }}
        </v-card-title>
        <v-card-text
          color="amber">
          <v-row
            align="center"
            class="mx-0">
            <div class="">{{ project.date }}</div>
          </v-row>
          <div class="subtitle-1 txt-color my-2">
            {{ project.role }}
          </div>
          <div>
            {{ project.description }}
          </div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-title>Technologies</v-card-title>
        <v-card-text>
          <v-chip-group
            class="txt-color"
            active-class="white--text"
            column>
            <v-chip
              v-for="techno in project.technologies"
              :key="project.title + '-' + techno">
              {{ techno }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ma"
            color="#5F9EA0"
            text
            @click="more()">
            Voir plus
          </v-btn>
        </v-card-actions>
      </v-card>
			</div>
    </div>
  </v-container>
</template>
<script>
export default {
   head () {
    return {
      title: 'Projets',
    }
  },
	data () {
    return {
      projects: [
        {
          id: 1,
          title: 'Portfolio',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
          img: '/kilalo-project.png',
          date: 'Avril 2020',
          technologies: ['Vue','Nuxt'],
          role: 'Développeur Front-end'
        },
        {
          id: 2,
          title: 'Movies App',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
          img: '/movies-project.png',
          date: 'Mars 2020',
          technologies: ['React','React Native'],
          role: 'Développeur Front-end'
        },
        {
          id: 3,
          title: 'Sports Village',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
          img: '/sv-project.png',
          date: 'Juillet 2019',
          technologies: ['Vue','Nuxt', 'Laravel', 'Docker'],
          role: 'Développeur Full-stack'
        },
        {
          id: 4,
          title: 'Miuseec',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
          img: '/miuseec-project.png',
          date: 'Septembre 2019',
          technologies: ['Symfony'],
          role: 'Développeur Back-end'
        },
        {
          id: 5,
          title: 'Study Share',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex',
          img: '/studyshare-project.png',
          date: 'Avril 2019',
          technologies: ['Angular', 'Laravel'],
          role: 'Développeur Back-end'

        },
      ]
    }
  },
  methods: {
    more() {
      console.log('TO DO')
    }
  }
}
</script>
