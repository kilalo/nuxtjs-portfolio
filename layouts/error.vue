<template>
  <v-app 
    dark>
    <div
      class="loader">
      <h2
        class="txt-color fzs" 
        v-if="error.statusCode === 404">
        404 NOT FOUND
      </h2>
      <h1
        class="txt-color"
        v-else>
        {{ otherError }}
      </h1>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
