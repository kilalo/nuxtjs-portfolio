<template>
  <v-row class="h100">
    <v-col cols="12" md="6" class="ma">
      <v-btn text class="d-block big-btn my-10 ma" :ripple="false">
        <a href="/CV_KC_2022.pdf" target="_blank">
          <v-icon class="d-block big-ico ma-2"> mdi-file-pdf-box</v-icon>
          <span class="fzxs"> Télécharger la version PDF </span>
        </a>
      </v-btn>
    </v-col>
    <v-col cols="12" md="6" class="ma">
      <v-btn text class="d-block big-btn my-10 ma" :ripple="false">
        <a href="https://resume.kilalo.io" target="_blank">
          <v-icon class="big-ico ma-2"> mdi-web </v-icon>
          <span class="fzxs"> Accéder à la version en ligne </span>
        </a>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  head: {
    title: "CV",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Consultez mon CV en ligne ou au format PDF.",
      },
    ],
  },
  data() {
    return {};
  },
};
</script>
