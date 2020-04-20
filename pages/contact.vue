<template>
	<v-container>
		<div
			class="contact-form my-10">
			<div>
				<h1
					class="w100 d-inline-block my-5 font-style txt-color text-center">
					Me contacter
				</h1>
				<p
					class="fzxs pa-2">
					Opportunités professionnelles ou simple question ? N'hésitez surtout pas à me contacter en utilisant le formulaire ci-dessous, je ferai mon possible pour vous répondre dans les meilleurs délais.
				</p>
			</div>
			<ValidationObserver 
				ref="observer">
				<form
					class="text-center">
					<v-container>
      			<v-row>
							<v-col
								cols="12" sm="6">
								<ValidationProvider v-slot="{ errors }" name="name" rules="required|max:50">
									<v-text-field
										color="#5F9EA0"
										filled
										v-model="name"
										:error-messages="errors"
										label="Nom"
										required />
								</ValidationProvider>
							</v-col>
							<v-col
								cols="12" sm="6">
								<ValidationProvider v-slot="{ errors }" name="email" rules="required|max:50|email">
									<v-text-field
										color="#5F9EA0"
										filled
										v-model="email"
										:error-messages="errors"
										label="E-mail"
										required />
								</ValidationProvider>
							</v-col>
						</v-row>
					</v-container>
					<ValidationProvider v-slot="{ errors }" name="subject" rules="required|max:50">
						<v-text-field
							class="pa-2"
							color="#5F9EA0"
							filled
							v-model="subject"
							:error-messages="errors"
							label="Sujet"
							required />
					</ValidationProvider>
					<ValidationProvider v-slot="{ errors }" name="content" rules="required">
						<v-textarea
							class="pa-2"
							color="#5F9EA0"
							name="input-7-1"
							filled
							label="Contenu de votre message"
							auto-grow
							:counter="400"
							required
							:error-messages="errors"
							v-model="content" />
					</ValidationProvider>
					<v-btn
						outlined
						color="#5F9EA0" 
						class="ma" 
						@click="submit">
						Envoyer
					</v-btn>
				</form>
			</ValidationObserver>
		</div>
		<v-snackbar
      v-model="success">
      Mail envoyé avec succès !
      <v-btn
        color="#5F9EA0"
        text
        @click="success = false">
        Fermer
      </v-btn>
    </v-snackbar>
		<v-snackbar
      v-model="error">
      Échec dans l'envoi du mail !
      <v-btn
        color="red"
        text
        @click="error = false">
        Fermer
      </v-btn>
    </v-snackbar>
	</v-container>
</template>
<script>
  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('required', {
    ...required,
    message: 'Le champ {_field_} ne peut pas être vide',
  })

  extend('max', {
    ...max,
    message: 'Le champ {_field_} ne peut pas être supérieur à {length} caractères',
  })

  extend('email', {
    ...email,
    message: 'Le champ email doit être valide',
  })

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
	},
	data () {
		return {
			name: '',
			email: '',
			subject: '',
			content: '',
			success: false,
			error: false	
		}
	},
	methods: {
		reset() {
			this.name = ''
			this.email = ''
			this.subject = ''
			this.content = ''
		},
		async submit () {
		  const isValid = await this.$refs.observer.validate();
			if(isValid) {
				const data = {
					name: this.name,
					subject: this.subject,
					email: this.email,
					content: this.content
				}
				this.$store.dispatch('LOADER')
				this.$axios.post('https://api.kilalo.io/api/mail', data).then(() => {
					this.$store.dispatch('LOADER')
					this.success = true
				}).catch(() => {
					this.$store.dispatch('LOADER')
					this.error = true
				})
			}
		},
	},
}
</script>
