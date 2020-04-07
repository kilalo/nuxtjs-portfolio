<template>
  <div class="loader-block">
    <atom-spinner
        class="loader"
        :animation-duration="1000"
        :size="150"
        :color="'#5F9EA0'" />
  </div>
</template>
<script>
import { AtomSpinner } from 'epic-spinners'
export default {
  components: {
    AtomSpinner
  }
}
</script>