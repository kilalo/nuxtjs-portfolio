<template>
  <div class="min-h-screen text-white app-root">
    <!-- Custom cursor -->
    <CustomCursor />

    <!-- Scroll progress bar -->
    <div
      class="scroll-progress-bar"
      :style="{ width: `${scrollProgress}%` }"
    ></div>

    <!-- Global background orbs -->
    <div class="g-orb g-orb--1" aria-hidden="true"></div>
    <div class="g-orb g-orb--2" aria-hidden="true"></div>
    <div class="g-orb g-orb--3" aria-hidden="true"></div>

    <!-- Global grid overlay -->
    <div class="g-grid" aria-hidden="true"></div>

    <!-- Grain overlay -->
    <div class="grain-overlay" aria-hidden="true"></div>

    <!-- Atom fixed background -->
    <div class="atom-fixed-bg" aria-hidden="true">
      <AtomLogo :size="420" color="#14b8a6" :duration="5000" />
    </div>

    <!-- Navigation -->
    <nav
      class="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <button @click="scrollToSection('home')" class="nav-logo-btn">
            <AtomLogo :size="28" color="#14b8a6" :duration="5000" />
            <span class="nav-logo-text font-signature font-bold">Kilalo</span>
          </button>

          <!-- Menu desktop -->
          <div class="hidden md:flex space-x-1 items-center">
            <button
              v-for="item in items"
              :key="item.section"
              @click="scrollToSection(item.section)"
              :class="
                activeSection === item.section
                  ? 'bg-teal-500/20 text-teal-500'
                  : 'text-gray-300 hover:text-teal-500'
              "
              class="px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
            >
              {{ t(`nav.${item.key}`) }}
            </button>
            <a
              href="https://linkedin.com/in/killian-challeau"
              target="_blank"
              class="px-3 py-2 rounded-lg text-gray-300 hover:text-teal-500 transition-colors duration-200 text-sm"
            >
              {{ t("nav.linkedin") }}
            </a>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <!-- Bouton hamburger animé -->
          <button
            @click="mobileMenu = !mobileMenu"
            class="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Menu"
          >
            <span
              class="absolute block w-5 h-0.5 bg-teal-500 transition-all duration-300"
              :class="
                mobileMenu ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
              "
            ></span>
            <span
              class="absolute block w-5 h-0.5 bg-teal-500 transition-all duration-300"
              :class="
                mobileMenu ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
              "
            ></span>
            <span
              class="absolute block w-5 h-0.5 bg-teal-500 transition-all duration-300"
              :class="
                mobileMenu ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
              "
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
            @click="
              scrollToSection(item.section);
              mobileMenu = false;
            "
            :class="[
              activeSection === item.section
                ? 'bg-teal-500/15 text-teal-400 border-teal-500/40'
                : 'text-gray-300 border-transparent hover:bg-gray-800 hover:text-white',
              'nav-item',
            ]"
            :style="{ animationDelay: `${index * 60}ms` }"
            class="flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-left transition-colors duration-200"
          >
            <span
              class="w-8 h-8 flex items-center justify-center rounded-lg text-sm"
              :class="
                activeSection === item.section
                  ? 'bg-teal-500/20 text-teal-400'
                  : 'bg-gray-800 text-gray-400'
              "
            >
              <i :class="item.icon"></i>
            </span>
            <span class="font-medium">{{ t(`nav.${item.key}`) }}</span>
            <i
              class="fas fa-chevron-right ml-auto text-xs opacity-30"
              :class="
                activeSection === item.section ? 'opacity-60 text-teal-400' : ''
              "
            ></i>
          </button>

          <a
            href="https://linkedin.com/in/killian-challeau"
            target="_blank"
            @click="mobileMenu = false"
            :style="{ animationDelay: `${items.length * 60}ms` }"
            class="nav-item flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-transparent text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
          >
            <span
              class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 text-sm"
            >
              <i class="fab fa-linkedin"></i>
            </span>
            <span class="font-medium">{{ t("nav.linkedin") }}</span>
            <i class="fas fa-external-link-alt ml-auto text-xs opacity-30"></i>
          </a>
        </div>

        <!-- Language + theme en bas -->
        <div
          class="px-4 py-4 border-t border-gray-800 flex items-center justify-between gap-3"
        >
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </Transition>

    <!-- Contenu -->
    <main>
      <slot />
    </main>

    <!-- Footer enrichi -->
    <footer class="site-footer">
      <div class="footer-glow"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="footer-inner">
          <!-- Brand -->
          <div class="footer-brand">
            <button @click="scrollToSection('home')" class="footer-logo-btn">
              <AtomLogo :size="24" color="#14b8a6" :duration="5000" />
              <span class="footer-logo-text font-signature font-bold"
                >Kilalo</span
              >
            </button>
            <p class="footer-tagline">Full Stack & AI Developer · Bordeaux</p>
          </div>

          <!-- Nav links -->
          <nav class="footer-nav">
            <button
              v-for="item in items"
              :key="item.section"
              @click="scrollToSection(item.section)"
              class="footer-link"
            >
              {{ t(`nav.${item.key}`) }}
            </button>
          </nav>

          <!-- Socials -->
          <div class="footer-socials">
            <a
              href="https://github.com/kilalo"
              target="_blank"
              class="footer-social"
              aria-label="GitHub"
            >
              <i class="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/killian-challeau"
              target="_blank"
              class="footer-social"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div class="footer-bottom">
          <span class="footer-copy"
            >© 2026 Killian Challeau · Made with Nuxt 3 & Claude Code 🤖</span
          >
          <span class="footer-separator">·</span>
          <span class="footer-copy">kilalo.io</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { init: initTheme } = useTheme();
const mobileMenu = ref<boolean>(false);
const activeSection = ref<string>("home");
const scrollProgress = ref(0);

interface MenuItem {
  icon: string;
  key: string;
  section: string;
}

const items: MenuItem[] = [
  { icon: "fas fa-home", key: "home", section: "home" },
  { icon: "fas fa-lightbulb", key: "projects", section: "projects" },
  { icon: "fas fa-briefcase", key: "experience", section: "experience" },
  { icon: "fas fa-code", key: "skills", section: "skills" },
  { icon: "fas fa-file", key: "resume", section: "resume" },
  { icon: "fas fa-envelope", key: "contact", section: "contact" },
];

const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({ top: element.offsetTop - 64, behavior: "smooth" });
  }
};

onMounted(() => {
  initTheme();

  // Active section observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id;
      });
    },
    { root: null, threshold: 0.3 },
  );

  nextTick(() => {
    document
      .querySelectorAll("section[id]")
      .forEach((section) => observer.observe(section));
  });

  // Scroll progress bar
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop || document.body.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    scrollProgress.value = max > 0 ? (scrolled / max) * 100 : 0;
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  onUnmounted(() => window.removeEventListener("scroll", onScroll));
});
</script>

<style scoped>
/* App root background */
.app-root {
  background: #0f172a;
  transition: background-color 0.3s ease;
}

/* Scroll progress */
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(to right, #14b8a6, #6ee7b7, #14b8a6);
  z-index: 51;
  transition: width 0.1s linear;
  box-shadow: 0 0 8px rgba(20, 184, 166, 0.5);
}

/* Global background orbs */
.g-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

.g-orb--1 {
  width: 700px;
  height: 700px;
  background: radial-gradient(
    circle,
    rgba(20, 184, 166, 0.13) 0%,
    transparent 70%
  );
  top: -180px;
  left: -120px;
  animation: orbFloat1 14s ease-in-out infinite;
}

.g-orb--2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.1) 0%,
    transparent 70%
  );
  bottom: -120px;
  right: -100px;
  animation: orbFloat2 17s ease-in-out infinite;
}

.g-orb--3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(20, 184, 166, 0.07) 0%,
    transparent 70%
  );
  top: 40vh;
  left: 50vw;
  animation: orbFloat3 20s ease-in-out infinite;
}

@keyframes orbFloat1 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(60px, 80px) scale(1.1);
  }
}
@keyframes orbFloat2 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-50px, -60px) scale(1.08);
  }
}
@keyframes orbFloat3 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -40px) scale(0.95);
  }
}

/* Global grid overlay */
.g-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(20, 184, 166, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 184, 166, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(
    ellipse 80% 80% at 50% 50%,
    black 30%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 0;
}

/* Atom fixed background */
.atom-fixed-bg {
  position: fixed;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.07;
  pointer-events: none;
  z-index: 3;
}

@media (max-width: 900px) {
  .atom-fixed-bg {
    right: -80px;
    opacity: 0.045;
  }
}

/* Nav logo */
.nav-logo-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 2px;
  transition: opacity 0.2s ease;
}

.nav-logo-btn:hover {
  opacity: 0.8;
}

.nav-logo-text {
  font-size: 1.05rem;
  font-weight: 700;
  color: #14b8a6;
  letter-spacing: 0.04em;
}

/* Hide text on very small screens, keep atom */
@media (max-width: 360px) {
  .nav-logo-text {
    display: none;
  }
}

/* Footer logo */
.footer-logo-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s ease;
}

.footer-logo-btn:hover {
  opacity: 0.75;
}

.footer-logo-text {
  font-size: 1rem;
  font-weight: 700;
  color: #14b8a6;
  letter-spacing: 0.03em;
}

/* Grain overlay */
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}

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

/* Footer */
.site-footer {
  position: relative;
  background: #080f1e;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 3.5rem 0 2rem;
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(20, 184, 166, 0.4),
    transparent
  );
}

.footer-inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer-logo {
  font-size: 1.1rem;
  font-weight: 700;
  color: #14b8a6;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;
}

.footer-logo:hover {
  color: #5eead4;
}

.footer-tagline {
  font-size: 12px;
  color: #334155;
  font-weight: 500;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 8px;
}

.footer-link {
  font-size: 13px;
  color: #475569;
  padding: 4px 8px;
  border-radius: 6px;
  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.footer-link:hover {
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.04);
}

.footer-socials {
  display: flex;
  gap: 8px;
}

.footer-social {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  color: #475569;
  font-size: 14px;
  transition: all 0.2s ease;
}

.footer-social:hover {
  border-color: rgba(20, 184, 166, 0.35);
  color: #14b8a6;
  background: rgba(20, 184, 166, 0.07);
}

.footer-bottom {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.footer-copy {
  font-size: 12px;
  color: #1e293b;
}

.footer-separator {
  font-size: 12px;
  color: #1e293b;
}
</style>
