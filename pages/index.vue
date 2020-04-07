<template>
  <v-layout
    class="layout container">
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
        je suis &nbsp;<span class="txt-color">developpeur web</span>.
      </h1>
      <span class="title-mobile-second">developpeur web full stack.</span>
    </div>
  </v-layout>
</template>

<script>
export default {
   head () {
    return {
      title: 'Killian Challeau',
    }
  },
}
</script>
