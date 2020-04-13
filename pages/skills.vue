<template>
  <v-container
  	class="h100">
		<v-row
			class="h100">
			<v-col
				class="ma"
				cols="12" lg="6">
				<h1
					class="w100 d-inline-block my-10 font-style txt-color text-center">
					Compétences
				</h1>
				<p>
					{{ text }}
				</p>
			</v-col>
			<v-col
				class="ma"
				cols="12" lg="6">
				<div class="w100 tagcloud" />
			</v-col>
		</v-row>
  </v-container>
</template>
<script>

export default {
   head () {
    return {
      title: 'Compétences',
    }
  },
	data () {
    return {
		text : "Au cours de mes expériences en tant que développeur, autant sur le plan personnel que professionnel, j'ai été amené à utiliser bon nombre de langages et technologies. Initialement développeur back end de par ma formation, je suis de plus en plus amené à utiliser les outils modernes de développement front end. Si vous voulez en savoir plus sur mon profil, rendez vous sur ma page linkedin",
	  words: [
		  'HTML5',
		  'CSS3',
		  'Javascript',
		  'Vue',
		  'Nuxt',
		  'React',
		  'Native',
		  'Symfony',
		  'Laravel',
		  'Git',
		  'Docker',
		  'REST',
		  'MySQL',
		  'jQuery',
		  'SASS'
	  ],
    }
	},
	mounted() {
		const TagCloud = require('TagCloud');

		const container = '.tagcloud';
		const texts = this.words
		const options = {};

		TagCloud(container, texts, options);

	}
}
</script>
