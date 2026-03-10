<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <span class="text-teal-500 font-bold text-lg tracking-wide">Kilalo.io</span>

          <!-- Menu desktop -->
          <div class="hidden md:flex space-x-4 items-center">
            <button
              v-for="item in items"
              :key="item.section"
              @click="scrollToSection(item.section)"
              :class="activeSection === item.section ? 'bg-teal-500/20 text-teal-500' : 'text-gray-300 hover:text-teal-500'"
              class="px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <i :class="item.icon" class="mr-2"></i>
              {{ t(`nav.${item.key}`) }}
            </button>
            <a
              href="https://linkedin.com/in/killian-challeau"
              target="_blank"
              class="px-4 py-2 rounded-lg text-gray-300 hover:text-teal-500 transition-colors duration-200"
            >
              <i class="fab fa-linkedin mr-2"></i>
              {{ t('nav.linkedin') }}
            </a>
            <LanguageSwitcher />
          </div>

          <!-- Bouton hamburger animé -->
          <button
            @click="mobileMenu = !mobileMenu"
            class="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Menu"
          >
            <span
              class="absolute block w-5 h-0.5 bg-teal-500 transition-all duration-300"
              :class="mobileMenu ? 'rotate-45 translate-y-0' : '-translate-y-1.5'"
            ></span>
            <span
              class="absolute block w-5 h-0.5 bg-teal-500 transition-all duration-300"
              :class="mobileMenu ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'"
            ></span>
            <span
              class="absolute block w-5 h-0.5 bg-teal-500 transition-all duration-300"
              :class="mobileMenu ? '-rotate-45 translate-y-0' : 'translate-y-1.5'"
            ></span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Overlay -->
    <Transition name="fade">
      <div
        v-if="mobileMenu"
        @click="mobileMenu = false"
        class="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
      ></div>
    </Transition>

    <!-- Drawer mobile -->
    <Transition name="drawer">
      <div
        v-if="mobileMenu"
        class="fixed top-16 right-0 bottom-0 w-72 z-40 md:hidden bg-gray-900 border-l border-gray-800 flex flex-col"
      >
        <div class="flex flex-col flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <button
            v-for="(item, index) in items"
            :key="item.section"
            @click="scrollToSection(item.section); mobileMenu = false"
            :class="[
              activeSection === item.section
                ? 'bg-teal-500/15 text-teal-400 border-teal-500/40'
                : 'text-gray-300 border-transparent hover:bg-gray-800 hover:text-white',
              'nav-item'
            ]"
            :style="{ animationDelay: `${index * 60}ms` }"
            class="flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-left transition-colors duration-200"
          >
            <span
              class="w-8 h-8 flex items-center justify-center rounded-lg text-sm"
              :class="activeSection === item.section ? 'bg-teal-500/20 text-teal-400' : 'bg-gray-800 text-gray-400'"
            >
              <i :class="item.icon"></i>
            </span>
            <span class="font-medium">{{ t(`nav.${item.key}`) }}</span>
            <i
              class="fas fa-chevron-right ml-auto text-xs opacity-30"
              :class="activeSection === item.section ? 'opacity-60 text-teal-400' : ''"
            ></i>
          </button>

          <a
            href="https://linkedin.com/in/killian-challeau"
            target="_blank"
            @click="mobileMenu = false"
            :style="{ animationDelay: `${items.length * 60}ms` }"
            class="nav-item flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-transparent text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
          >
            <span class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 text-sm">
              <i class="fab fa-linkedin"></i>
            </span>
            <span class="font-medium">{{ t('nav.linkedin') }}</span>
            <i class="fas fa-external-link-alt ml-auto text-xs opacity-30"></i>
          </a>
        </div>

        <!-- Language switcher en bas -->
        <div class="px-4 py-4 border-t border-gray-800">
          <LanguageSwitcher />
        </div>
      </div>
    </Transition>

    <!-- Contenu -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 border-t border-gray-700 py-6">
      <div class="container mx-auto px-4 text-center text-gray-400">
        <p>Made with Nuxt 3 & Tailwind CSS - kilalo.io</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const mobileMenu = ref<boolean>(false)
const activeSection = ref<string>('home')

interface MenuItem {
  icon: string
  key: string
  section: string
}

const items: MenuItem[] = [
  { icon: 'fas fa-home', key: 'home', section: 'home' },
  { icon: 'fas fa-lightbulb', key: 'projects', section: 'projects' },
  { icon: 'fas fa-code', key: 'skills', section: 'skills' },
  { icon: 'fas fa-file', key: 'resume', section: 'resume' },
  { icon: 'fas fa-envelope', key: 'contact', section: 'contact' },
]

const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId)
  if (element) {
    window.scrollTo({ top: element.offsetTop - 64, behavior: 'smooth' })
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      })
    },
    { root: null, threshold: 0.3 }
  )

  nextTick(() => {
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section))
  })
})
</script>

<style scoped>
/* Overlay fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Drawer slide */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

/* Items cascade */
.nav-item {
  animation: slideIn 0.3s ease both;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
