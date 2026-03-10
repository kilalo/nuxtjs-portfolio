<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900"
  >
    <div class="relative">
      <!-- AtomSpinner -->
      <div class="atom-spinner">
        <div class="spinner-inner">
          <div class="spinner-line"></div>
          <div class="spinner-line"></div>
          <div class="spinner-line"></div>
          <div class="spinner-circle">
            <div class="spinner-circle-inner"></div>
          </div>
        </div>
      </div>
      <div
        class="text-center mt-8 text-teal-500 font-signature text-2xl animate-pulse"
      >
        Kilalo
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<style scoped>
.atom-spinner {
  height: 150px;
  width: 150px;
  overflow: hidden;
}

.atom-spinner .spinner-inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.atom-spinner .spinner-circle {
  display: block;
  position: absolute;
  color: #5f9ea0;
  font-size: calc(150px * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.atom-spinner .spinner-circle-inner {
  height: 1em;
  width: 1em;
  border-radius: 50%;
  background-color: #5f9ea0;
}

.atom-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation-duration: 1000ms;
  border-left-width: calc(150px / 25);
  border-top-width: calc(150px / 25);
  border-left-color: #5f9ea0;
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;
}

.atom-spinner .spinner-line:nth-child(1) {
  animation: atom-spinner-animation-1 1000ms linear infinite;
  transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(2) {
  animation: atom-spinner-animation-2 1000ms linear infinite;
  transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(3) {
  animation: atom-spinner-animation-3 1000ms linear infinite;
  transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
}

@keyframes atom-spinner-animation-1 {
  100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-2 {
  100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-3 {
  100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
}
</style>
