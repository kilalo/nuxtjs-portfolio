<template>
	<v-row
		class="h100">
		<v-col
			cols="12" md="6"
			class="ma">
			<v-btn
				outlined
				class="d-block big-btn my-10 ma"
				:ripple="false">
					<v-icon
						class="d-block big-ico ma-2">
						mdi-file-pdf-outline
					</v-icon>
					<span
						class="fzxs">
						Télécharger la version PDF
					</span>
			</v-btn>
		</v-col>
		<v-col
			cols="12" md="6"
			class="ma">
			<v-btn
				outlined
				class="d-block big-btn my-10 ma"
				:ripple="false">
				<a 
					href="https://resume.kilalo.io"
					target="_blank">
					<v-icon
						class="big-ico ma-2">
						mdi-web
					</v-icon>
					<span
						class="fzxs">
						Accéder à la version en ligne
					</span>
				</a>
			</v-btn>
		</v-col>
	</v-row>
</template>
<script>

export default {
  head () {
    return {
      title: 'CV',
    }
  },
	data () {
		return {}
	},
}
</script>
