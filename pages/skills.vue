<template>
	<v-row
		class="h100 mb-10">
		<v-col
			class="ma"
			cols="12" lg="6">
			<h1
				class="w100 d-inline-block my-10 font-style txt-color text-center">
				Compétences
			</h1>
			<p>
				Au cours de mes expériences en tant que développeur, autant sur le plan personnel que professionnel, 
				j'ai été amené à utiliser bon nombre de langages et technologies. Initialement développeur back end de par ma formation, 
				je suis de plus en plus amené à utiliser les outils modernes de développement front end. 
				Si vous voulez en savoir plus sur mon profil, rendez vous sur ma page linkedin ou sur mon CV en ligne.
			</p>
		</v-col>
		<v-col
			class="ma"
			cols="12" lg="6">
			<div class="big-bottom-marge mt-10 w100 tagcloud" />
		</v-col>
	</v-row>
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
	  words: [
		  'HTML5',
		  'CSS3',
		  'Javascript',
		  'Vue',
		  'Nuxt',
		  'React',
		  'Symfony',
		  'Laravel',
		  'Git',
		  'Docker',
		  'REST',
		  'MySQL',
		  'jQuery',
			'SASS',
			'Apache',
			'Nginx',
			'Linux',
			'Java'
	  ],
    }
	},
	mounted() {
		const TagCloud = require('TagCloud');

		const container = '.tagcloud';
		const texts = this.words
		const options = {
			radius: 200,
			maxSpeed: 'slow'
		};

		const cloud = TagCloud(container, texts, options);
		cloud.$el.style.cssText = 'margin : auto; position: relative; width: 200px; height: 200px';
		cloud.items.forEach((item) => {
			item.el.style.color = '#5F9EA0'
		})

	}
}
</script>
