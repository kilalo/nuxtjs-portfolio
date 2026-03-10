<template>
  <div class="relative inline-block">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-teal-500 transition-colors duration-200"
    >
      <i class="fas fa-globe"></i>
      <span class="uppercase">{{ locale }}</span>
      <i class="fas fa-chevron-down text-xs" :class="{ 'rotate-180': isOpen }"></i>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50"
    >
      <button
        v-for="loc in availableLocales"
        :key="loc.code"
        @click="switchLocale(loc.code)"
        class="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors flex items-center gap-2"
        :class="{ 'bg-gray-700 text-teal-500': locale === loc.code }"
      >
        <span class="text-sm">{{ loc.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();
const isOpen = ref(false);

const locales = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' }
];

const availableLocales = computed(() => {
  return locales.filter((l) => l.code !== locale.value);
});

const switchLocale = (code: string) => {
  setLocale(code);
  isOpen.value = false;
};

// Close dropdown when clicking outside
onMounted(() => {
  const closeDropdown = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.relative')) {
      isOpen.value = false;
    }
  };
  document.addEventListener('click', closeDropdown);
  onUnmounted(() => {
    document.removeEventListener('click', closeDropdown);
  });
});
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s;
}
</style>
