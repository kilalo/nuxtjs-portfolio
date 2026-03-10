<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo mobile -->
          <div class="md:hidden">
            <button @click="mobileMenu = !mobileMenu" class="text-teal-500">
              <i class="fas fa-bars text-2xl"></i>
            </button>
            <span class="ml-3 text-teal-500 font-bold">Kilalo.io</span>
          </div>

          <!-- Menu desktop -->
          <div class="hidden md:flex space-x-4 w-full justify-center items-center">
            <button
              v-for="item in items"
              :key="item.section"
              @click="scrollToSection(item.section)"
              :class="activeSection === item.section ? 'bg-teal-500/20 text-teal-500' : 'text-gray-300 hover:text-teal-500'"
              class="px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <i :class="item.icon" class="mr-2"></i>
              {{ $t(`nav.${item.key}`) }}
            </button>
            <a
              href="https://linkedin.com/in/killian-challeau"
              target="_blank"
              class="px-4 py-2 rounded-lg text-gray-300 hover:text-teal-500 transition-colors duration-200"
            >
              <i class="fab fa-linkedin mr-2"></i>
              {{ $t('nav.linkedin') }}
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <!-- Menu mobile -->
      <div v-if="mobileMenu" class="md:hidden bg-gray-800 border-t border-gray-700">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <button
            v-for="item in items"
            :key="item.section"
            @click="scrollToSection(item.section); mobileMenu = false"
            :class="activeSection === item.section ? 'bg-teal-500/20 text-teal-500' : 'text-gray-300'"
            class="block w-full text-left px-3 py-2 rounded-md"
          >
            <i :class="item.icon" class="mr-2"></i>
            {{ $t(`nav.${item.key}`) }}
          </button>
          <a
            href="https://linkedin.com/in/killian-challeau"
            target="_blank"
            class="block px-3 py-2 rounded-md text-gray-300"
          >
            <i class="fab fa-linkedin mr-2"></i>
            {{ $t('nav.linkedin') }}
          </a>
          <div class="px-3 py-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>

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
  {
    icon: 'fas fa-home',
    key: 'home',
    section: 'home'
  },
  {
    icon: 'fas fa-lightbulb',
    key: 'projects',
    section: 'projects'
  },
  {
    icon: 'fas fa-code',
    key: 'skills',
    section: 'skills'
  },
  {
    icon: 'fas fa-file',
    key: 'resume',
    section: 'resume'
  },
  {
    icon: 'fas fa-envelope',
    key: 'contact',
    section: 'contact'
  },
]

const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 64
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  const options = {
    root: null,
    threshold: 0.3
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  nextTick(() => {
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => observer.observe(section))
  })
})
</script>
