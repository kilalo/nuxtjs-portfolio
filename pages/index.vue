<template>
  <div class="scroll-smooth">
    <!-- Section Accueil -->
    <section id="home" class="hero">
      <!-- Background orbs -->
      <div class="hero-orb hero-orb--1"></div>
      <div class="hero-orb hero-orb--2"></div>
      <div class="hero-orb hero-orb--3"></div>

      <!-- Grid overlay -->
      <div class="hero-grid"></div>

      <!-- Content -->
      <div
        class="hero-content"
        :class="{ 'hero-content--visible': heroVisible }"
      >
        <!-- Badge disponible -->
        <div class="hero-badge reveal" style="--delay: 0ms">
          <span class="hero-badge__dot"></span>
          {{ t("home.available") }}
        </div>

        <!-- Terminal -->
        <div class="hero-terminal reveal" style="--delay: 150ms">
          <span class="hero-terminal__prompt">~/killian</span>
          <span class="hero-terminal__separator"> ❯ </span>
          <span class="hero-terminal__cmd">{{ terminalText }}</span>
          <span class="hero-terminal__cursor" :class="{ blink: terminalDone }"
            >▋</span
          >
        </div>

        <!-- Nom -->
        <h1 class="hero-name reveal" style="--delay: 300ms">
          Killian<br class="sm:hidden" />
          <span class="hero-name__last"> Challeau</span>
        </h1>

        <!-- Subtitle typewriter -->
        <div class="hero-subtitle reveal" style="--delay: 500ms">
          <span class="hero-subtitle__text">{{ typewriterText }}</span>
          <span class="hero-subtitle__cursor">|</span>
        </div>

        <!-- CTAs -->
        <div class="hero-ctas reveal" style="--delay: 700ms">
          <button
            @click="scrollToSection('projects')"
            class="hero-btn hero-btn--primary"
          >
            <i class="fas fa-lightbulb mr-2"></i>{{ t("home.cta.projects") }}
          </button>
          <button
            @click="scrollToSection('contact')"
            class="hero-btn hero-btn--secondary"
          >
            <i class="fas fa-envelope mr-2"></i>{{ t("home.cta.contact") }}
          </button>
        </div>

        <!-- Socials -->
        <div class="hero-socials reveal" style="--delay: 900ms">
          <a
            href="https://linkedin.com/in/killian-challeau"
            target="_blank"
            class="hero-social"
            aria-label="LinkedIn"
          >
            <i class="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/kilalo"
            target="_blank"
            class="hero-social"
            aria-label="GitHub"
          >
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="hero-scroll reveal"
        style="--delay: 1100ms"
        :class="{ 'hero-content--visible': heroVisible }"
      >
        <div class="hero-scroll__mouse">
          <div class="hero-scroll__dot"></div>
        </div>
        <span class="hero-scroll__label">Scroll</span>
      </div>
    </section>

    <!-- Section Projets -->
    <section id="projects" class="s-section">
      <div class="container mx-auto px-4">
        <div class="s-header scroll-reveal">
          <span class="s-label">01 // {{ t("projects.title") }}</span>
          <h2 class="s-title">{{ t("projects.title") }}</h2>
        </div>

        <div class="projects-grid">
          <div
            v-for="(project, index) in projects"
            :key="project.id"
            class="project-card scroll-reveal"
            :style="{ '--reveal-delay': `${index * 80}ms` }"
          >
            <div class="project-card__img">
              <img :src="project.img" :alt="project.title" />
              <div class="project-card__img-overlay"></div>
            </div>
            <div class="project-card__body">
              <div class="project-card__meta">
                <span class="project-card__date">{{ project.date }}</span>
                <span class="project-card__role">{{ project.role }}</span>
              </div>
              <h3 class="project-card__title">{{ project.title }}</h3>
              <div class="project-card__techs">
                <span
                  v-for="tech in project.technologies.slice(0, 4)"
                  :key="tech"
                  class="tech-badge"
                  >{{ tech }}</span
                >
                <span
                  v-if="project.technologies.length > 4"
                  class="tech-badge tech-badge--more"
                  >+{{ project.technologies.length - 4 }}</span
                >
              </div>
              <div class="project-card__actions">
                <a
                  v-if="project.link"
                  :href="project.link"
                  target="_blank"
                  class="p-btn p-btn--primary"
                >
                  <i class="fas fa-link"></i>{{ t("projects.access") }}
                </a>
                <span v-else-if="!project.prod" class="p-btn p-btn--warn">
                  <i class="fas fa-wrench"></i>{{ t("projects.notDeployed") }}
                </span>
                <span v-else class="p-btn p-btn--muted">
                  <i class="fas fa-lock"></i>{{ t("projects.private") }}
                </span>
                <button
                  @click="showProject(project)"
                  class="p-btn p-btn--ghost"
                >
                  {{ t("projects.viewMore") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <Transition name="modal">
        <div
          v-if="selectedProject"
          @click="selectedProject = null"
          class="modal-overlay"
        >
          <div @click.stop class="modal-box">
            <button @click="selectedProject = null" class="modal-close">
              <i class="fas fa-times"></i>
            </button>
            <span class="modal-role">{{ selectedProject.role }}</span>
            <h3 class="modal-title">{{ selectedProject.title }}</h3>
            <p class="modal-date">{{ selectedProject.date }}</p>
            <p class="modal-desc">{{ selectedProject.description }}</p>
            <ul v-if="selectedProject.more" class="modal-more">
              <li v-for="(item, i) in selectedProject.more" :key="i">
                <i class="fas fa-chevron-right text-teal-500 text-xs mr-2"></i
                >{{ item }}
              </li>
            </ul>
            <div class="modal-techs">
              <span
                v-for="tech in selectedProject.technologies"
                :key="tech"
                class="tech-badge"
                >{{ tech }}</span
              >
            </div>
            <button
              @click="selectedProject = null"
              class="p-btn p-btn--primary w-full justify-center mt-2"
            >
              {{ t("projects.close") }}
            </button>
          </div>
        </div>
      </Transition>
    </section>

    <!-- Section Compétences -->
    <section id="skills" class="s-section s-section--alt">
      <div class="container mx-auto px-4">
        <div class="s-header scroll-reveal">
          <span class="s-label">02 // {{ t("skills.title") }}</span>
          <h2 class="s-title">{{ t("skills.title") }}</h2>
        </div>

        <!-- Stats -->
        <div class="stats-row">
          <div class="stat scroll-reveal" style="--reveal-delay: 0ms">
            <span class="stat__value">10+</span>
            <span class="stat__label">{{ t("skills.stats.years") }}</span>
          </div>
          <div
            class="stat-sep scroll-reveal"
            style="--reveal-delay: 100ms"
          ></div>
          <div class="stat scroll-reveal" style="--reveal-delay: 150ms">
            <span class="stat__value">50+</span>
            <span class="stat__label">{{ t("skills.stats.projects") }}</span>
          </div>
          <div
            class="stat-sep scroll-reveal"
            style="--reveal-delay: 250ms"
          ></div>
          <div class="stat scroll-reveal" style="--reveal-delay: 300ms">
            <span class="stat__value">20+</span>
            <span class="stat__label">{{ t("skills.stats.techs") }}</span>
          </div>
        </div>

        <!-- AI Feature Card -->
        <div class="ai-card scroll-reveal" style="--reveal-delay: 100ms">
          <div class="ai-card__glow"></div>
          <div class="ai-card__content">
            <div class="ai-card__header">
              <span class="ai-card__icon">✦</span>
              <span class="ai-card__label">{{ t("skills.ai.label") }}</span>
            </div>
            <h3 class="ai-card__title">{{ t("skills.ai.title") }}</h3>
            <p class="ai-card__desc">{{ t("skills.ai.description") }}</p>
            <div class="ai-card__tags">
              <span v-for="tag in aiTags" :key="tag" class="ai-tag">{{
                tag
              }}</span>
            </div>
          </div>
        </div>

        <div class="skills-grid">
          <p class="skills-desc scroll-reveal" style="--reveal-delay: 100ms">
            {{ t("skills.description") }}
          </p>
          <div
            class="tagcloud-wrap scroll-reveal"
            style="--reveal-delay: 200ms"
          >
            <SkillSphere :tags="sphereTags" />
          </div>
        </div>
      </div>
    </section>

    <!-- Section CV -->
    <section id="resume" class="s-section">
      <div class="container mx-auto px-4">
        <div class="s-header scroll-reveal">
          <span class="s-label">03 // {{ t("resume.title") }}</span>
          <h2 class="s-title">{{ t("resume.title") }}</h2>
        </div>

        <div class="resume-grid">
          <a
            href="/CV_2026.pdf"
            target="_blank"
            class="resume-card scroll-reveal"
            style="--reveal-delay: 100ms"
          >
            <div class="resume-card__icon">
              <i class="fas fa-file-pdf"></i>
            </div>
            <div>
              <p class="resume-card__title">PDF</p>
              <p class="resume-card__sub">{{ t("resume.downloadPdf") }}</p>
            </div>
            <i class="fas fa-arrow-down resume-card__arrow"></i>
          </a>
          <a
            href="https://resume.kilalo.io"
            target="_blank"
            class="resume-card scroll-reveal"
            style="--reveal-delay: 200ms"
          >
            <div class="resume-card__icon">
              <i class="fas fa-globe"></i>
            </div>
            <div>
              <p class="resume-card__title">Web</p>
              <p class="resume-card__sub">{{ t("resume.viewOnline") }}</p>
            </div>
            <i class="fas fa-arrow-up-right-from-square resume-card__arrow"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- Section Contact -->
    <section id="contact" class="s-section s-section--alt">
      <div class="container mx-auto px-4">
        <div class="s-header scroll-reveal">
          <span class="s-label">04 // {{ t("contact.title") }}</span>
          <h2 class="s-title">{{ t("contact.title") }}</h2>
        </div>

        <div class="contact-wrap scroll-reveal" style="--reveal-delay: 100ms">
          <p class="contact-desc">{{ t("contact.description") }}</p>
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="contact-form__row">
              <div class="form-field">
                <input
                  v-model="form.name"
                  type="text"
                  :placeholder="t('contact.form.name')"
                  required
                />
              </div>
              <div class="form-field">
                <input
                  v-model="form.email"
                  type="email"
                  :placeholder="t('contact.form.email')"
                  required
                />
              </div>
            </div>
            <div class="form-field">
              <input
                v-model="form.subject"
                type="text"
                :placeholder="t('contact.form.subject')"
                required
              />
            </div>
            <div class="form-field">
              <textarea
                v-model="form.content"
                :placeholder="t('contact.form.message')"
                required
                rows="5"
                maxlength="1500"
              ></textarea>
            </div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="p-btn p-btn--primary w-full justify-center"
            >
              <i class="fas fa-paper-plane mr-2"></i>
              {{
                isSubmitting
                  ? t("contact.form.sending")
                  : t("contact.form.send")
              }}
            </button>
          </form>
        </div>
      </div>

      <!-- Notification -->
      <Transition name="notif">
        <div
          v-if="notification"
          class="notif"
          :class="`notif--${notification.type}`"
        >
          <i
            :class="
              notification.type === 'success'
                ? 'fas fa-check-circle'
                : 'fas fa-exclamation-circle'
            "
          ></i>
          {{ notification.message }}
        </div>
      </Transition>
    </section>
  </div>
</template>

<script setup lang="ts">
interface Project {
  id: number;
  title: string;
  description: string;
  img: string;
  date: string;
  technologies: string[];
  role: string;
  link?: string;
  prod: boolean;
  more?: string[];
}

interface Notification {
  type: "success" | "error";
  message: string;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  content: string;
}

const { t, locale } = useI18n();
const { projects } = useProjects();

useHead({
  title: "Killian Challeau - Développeur Web Freelance",
});

// Hero
const heroVisible = ref(false);
const terminalText = ref("");
const terminalDone = ref(false);
const typewriterText = ref("");

const typewriterPhrases = computed(() =>
  locale.value === "fr"
    ? [
        "Full Stack Engineer",
        "Développeur Freelance",
        "10+ ans d'expérience",
        "Architecte Web",
      ]
    : [
        "Full Stack Engineer",
        "Freelance Developer",
        "10+ years experience",
        "Web Architect",
      ],
);

const typeInto = async (target: Ref<string>, text: string, speed = 55) => {
  target.value = "";
  for (const char of text) {
    target.value += char;
    await new Promise((r) => setTimeout(r, speed));
  }
};

const eraseFrom = async (target: Ref<string>, speed = 30) => {
  while (target.value.length > 0) {
    target.value = target.value.slice(0, -1);
    await new Promise((r) => setTimeout(r, speed));
  }
};

const runTypewriter = async () => {
  let i = 0;
  while (true) {
    await typeInto(typewriterText, typewriterPhrases.value[i]);
    await new Promise((r) => setTimeout(r, 2200));
    await eraseFrom(typewriterText);
    await new Promise((r) => setTimeout(r, 400));
    i = (i + 1) % typewriterPhrases.value.length;
  }
};

const runTerminal = async () => {
  await typeInto(terminalText, "init()", 80);
  terminalDone.value = true;
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
};

const selectedProject = ref<Project | null>(null);
const notification = ref<Notification | null>(null);
const form = ref<ContactForm>({
  name: "",
  email: "",
  subject: "",
  content: "",
});

const aiTags = [
  "Claude API",
  "MCP",
  "LangChain",
  "RAG",
  "Agents",
  "Tool Use",
  "OpenAI",
  "Cursor",
  "Prompt Eng.",
];

const sphereTags = [
  { label: "TypeScript" },
  { label: "Vue" },
  { label: "Nuxt" },
  { label: "React" },
  { label: "Node" },
  { label: "Nest" },
  { label: "Laravel" },
  { label: "Symfony" },
  { label: "Docker" },
  { label: "AWS" },
  { label: "Git" },
  { label: "MySQL" },
  { label: "MongoDB" },
  { label: "REST" },
  { label: "Linux" },
  { label: "Angular" },
  { label: "SASS" },
  { label: "Nginx" },
  { label: "Java" },
  { label: "Claude API", ai: true },
  { label: "MCP", ai: true },
  { label: "LangChain", ai: true },
  { label: "RAG", ai: true },
  { label: "Agents", ai: true },
  { label: "OpenAI", ai: true },
];

const showProject = (project: Project): void => {
  selectedProject.value = project;
};

const isSubmitting = ref(false);

const submitForm = async (): Promise<void> => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: form.value,
    });
    notification.value = {
      type: "success",
      message: t("contact.form.success"),
    };
    form.value = { name: "", email: "", subject: "", content: "" };
  } catch {
    notification.value = {
      type: "error",
      message: t("contact.form.error"),
    };
  } finally {
    isSubmitting.value = false;
    setTimeout(() => {
      notification.value = null;
    }, 3000);
  }
};

onMounted(async () => {
  if (process.client) {
    // Hero
    setTimeout(() => {
      heroVisible.value = true;
    }, 100);
    setTimeout(() => runTerminal(), 300);
    setTimeout(() => runTypewriter(), 900);

    // Scroll reveal
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nextTick(() => {
      document
        .querySelectorAll(".scroll-reveal")
        .forEach((el) => revealObserver.observe(el));
    });
  }
});
</script>

<style scoped>
/* ===================== HERO ===================== */
.hero {
  position: relative;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #0f172a;
}

/* Orbs */
.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.hero-orb--1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(20, 184, 166, 0.18) 0%,
    transparent 70%
  );
  top: -150px;
  left: -100px;
  animation: orbFloat1 12s ease-in-out infinite;
}
.hero-orb--2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.14) 0%,
    transparent 70%
  );
  bottom: -100px;
  right: -80px;
  animation: orbFloat2 15s ease-in-out infinite;
}
.hero-orb--3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(
    circle,
    rgba(20, 184, 166, 0.09) 0%,
    transparent 70%
  );
  top: 40%;
  left: 55%;
  animation: orbFloat3 18s ease-in-out infinite;
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

/* Grid */
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(20, 184, 166, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 184, 166, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(
    ellipse 80% 80% at 50% 50%,
    black 30%,
    transparent 100%
  );
}

/* Content */
.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 1.5rem;
  gap: 1.5rem;
  padding-top: 64px;
}

/* Reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
  transition-delay: var(--delay, 0ms);
}
.hero-content--visible .reveal,
.hero-content--visible.reveal {
  opacity: 1;
  transform: translateY(0);
}

/* Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px 6px 10px;
  background: rgba(20, 184, 166, 0.08);
  border: 1px solid rgba(20, 184, 166, 0.25);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgb(94, 234, 212);
  text-transform: uppercase;
}
.hero-badge__dot {
  width: 7px;
  height: 7px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 6px #10b981;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    box-shadow: 0 0 6px #10b981;
  }
  50% {
    opacity: 0.6;
    box-shadow: 0 0 12px #10b981;
  }
}

/* Terminal */
.hero-terminal {
  font-family: "Courier New", monospace;
  font-size: clamp(13px, 2vw, 15px);
  color: rgba(148, 163, 184, 0.7);
  display: flex;
  align-items: center;
  gap: 2px;
}
.hero-terminal__prompt {
  color: #64748b;
}
.hero-terminal__separator {
  color: #14b8a6;
  margin: 0 2px;
}
.hero-terminal__cmd {
  color: rgb(167, 243, 208);
}
.hero-terminal__cursor {
  color: #14b8a6;
  font-weight: 300;
  opacity: 0;
}
.hero-terminal__cursor.blink {
  animation: blink 1.1s step-end infinite;
}
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Nom */
.hero-name {
  font-size: clamp(3rem, 10vw, 7.5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #e2e8f0 40%,
    #5eead4 75%,
    #14b8a6 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-name__last {
  white-space: nowrap;
}

/* Subtitle typewriter */
.hero-subtitle {
  font-size: clamp(1.1rem, 3.5vw, 1.6rem);
  font-weight: 500;
  color: rgba(148, 163, 184, 0.85);
  height: 2rem;
  display: flex;
  align-items: center;
  gap: 2px;
}
.hero-subtitle__cursor {
  color: #14b8a6;
  animation: blink 1s step-end infinite;
  font-weight: 300;
  margin-left: 1px;
}

/* CTAs */
.hero-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.hero-btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s ease;
  cursor: pointer;
}
.hero-btn--primary {
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  color: #fff;
  box-shadow: 0 4px 24px rgba(20, 184, 166, 0.3);
}
.hero-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(20, 184, 166, 0.45);
}
.hero-btn--secondary {
  background: rgba(255, 255, 255, 0.04);
  color: rgba(226, 232, 240, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.hero-btn--secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(20, 184, 166, 0.4);
  color: #fff;
  transform: translateY(-2px);
}

/* Socials */
.hero-socials {
  display: flex;
  gap: 10px;
}
.hero-social {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(148, 163, 184, 0.7);
  font-size: 15px;
  transition: all 0.2s ease;
}
.hero-social:hover {
  border-color: rgba(20, 184, 166, 0.4);
  color: #14b8a6;
  background: rgba(20, 184, 166, 0.08);
  transform: translateY(-2px);
}

/* Scroll indicator */
.hero-scroll {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 10;
}
.hero-scroll__mouse {
  width: 22px;
  height: 34px;
  border: 2px solid rgba(148, 163, 184, 0.3);
  border-radius: 11px;
  display: flex;
  justify-content: center;
  padding-top: 5px;
}
.hero-scroll__dot {
  width: 3px;
  height: 6px;
  background: #14b8a6;
  border-radius: 2px;
  animation: scrollDot 2s ease-in-out infinite;
}
@keyframes scrollDot {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}
.hero-scroll__label {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.4);
}

/* ===================== SCROLL REVEAL ===================== */
.scroll-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.65s ease,
    transform 0.65s ease;
  transition-delay: var(--reveal-delay, 0ms);
}
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===================== SECTIONS COMMUNES ===================== */
.s-section {
  padding: 7rem 0;
  position: relative;
  background: #0f172a;
}
.s-section--alt {
  background: #0d1526;
}

.s-header {
  text-align: center;
  margin-bottom: 4rem;
}
.s-label {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #14b8a6;
  margin-bottom: 0.75rem;
  opacity: 0.8;
}
.s-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ===================== PROJETS ===================== */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  overflow: hidden;
  transition:
    border-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.project-card:hover {
  border-color: rgba(20, 184, 166, 0.3);
  transform: translateY(-4px);
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(20, 184, 166, 0.1);
}
.project-card__img {
  position: relative;
  background: rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
.project-card__img img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  transition: transform 0.5s ease;
}
.project-card:hover .project-card__img img {
  transform: scale(1.03);
}
.project-card__img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(15, 23, 42, 0.85) 100%
  );
  pointer-events: none;
}
.project-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.project-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.project-card__date {
  font-size: 11px;
  color: #475569;
}
.project-card__role {
  font-size: 11px;
  font-weight: 600;
  color: #14b8a6;
  background: rgba(20, 184, 166, 0.1);
  border: 1px solid rgba(20, 184, 166, 0.2);
  padding: 2px 8px;
  border-radius: 100px;
}
.project-card__title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #f1f5f9;
}
.project-card__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tech-badge {
  font-size: 11px;
  font-weight: 500;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 3px 8px;
  border-radius: 6px;
}
.tech-badge--more {
  color: #14b8a6;
  border-color: rgba(20, 184, 166, 0.2);
  background: rgba(20, 184, 166, 0.05);
}
.project-card__actions {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

/* Boutons partagés */
.p-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  flex: 1;
}
.p-btn--primary {
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  color: #fff;
  box-shadow: 0 2px 12px rgba(20, 184, 166, 0.25);
}
.p-btn--primary:hover:not(:disabled) {
  box-shadow: 0 4px 20px rgba(20, 184, 166, 0.4);
  transform: translateY(-1px);
}
.p-btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.p-btn--ghost {
  background: rgba(255, 255, 255, 0.04);
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex: 0 0 auto;
}
.p-btn--ghost:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #f1f5f9;
  border-color: rgba(255, 255, 255, 0.15);
}
.p-btn--warn {
  background: rgba(249, 115, 22, 0.1);
  color: #fb923c;
  border: 1px solid rgba(249, 115, 22, 0.2);
  pointer-events: none;
}
.p-btn--muted {
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.2);
  pointer-events: none;
}
.w-full {
  width: 100%;
}
.justify-center {
  justify-content: center;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}
.modal-box {
  position: relative;
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #64748b;
  font-size: 13px;
  transition: all 0.2s;
}
.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
}
.modal-role {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #14b8a6;
  text-transform: uppercase;
}
.modal-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #f1f5f9;
}
.modal-date {
  font-size: 12px;
  color: #475569;
}
.modal-desc {
  color: #94a3b8;
  line-height: 1.7;
  font-size: 14px;
}
.modal-more {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.modal-more li {
  font-size: 13px;
  color: #94a3b8;
  display: flex;
  align-items: flex-start;
}
.modal-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-box,
.modal-leave-active .modal-box {
  transition: transform 0.25s ease;
}
.modal-enter-from .modal-box,
.modal-leave-to .modal-box {
  transform: scale(0.95) translateY(10px);
}

/* ===================== SKILLS ===================== */
.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}
.stat {
  text-align: center;
}
.stat__value {
  display: block;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  background: linear-gradient(135deg, #5eead4, #14b8a6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}
.stat__label {
  display: block;
  font-size: 12px;
  color: #475569;
  margin-top: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.stat-sep {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.07);
}
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
  .tagcloud-wrap {
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
}
.skills-desc {
  color: #94a3b8;
  line-height: 1.8;
  font-size: 1rem;
}
.tagcloud-wrap {
  display: flex;
  justify-content: center;
}

/* ===================== RESUME ===================== */
.resume-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}
.resume-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.resume-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.06), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.resume-card:hover {
  border-color: rgba(20, 184, 166, 0.35);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
}
.resume-card:hover::before {
  opacity: 1;
}
.resume-card__icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 184, 166, 0.1);
  border: 1px solid rgba(20, 184, 166, 0.2);
  border-radius: 12px;
  font-size: 1.3rem;
  color: #14b8a6;
  flex-shrink: 0;
  transition: all 0.3s ease;
}
.resume-card:hover .resume-card__icon {
  background: rgba(20, 184, 166, 0.2);
  box-shadow: 0 0 20px rgba(20, 184, 166, 0.2);
}
.resume-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: #f1f5f9;
}
.resume-card__sub {
  font-size: 12px;
  color: #475569;
  margin-top: 2px;
}
.resume-card__arrow {
  margin-left: auto;
  color: #334155;
  font-size: 13px;
  transition: all 0.3s ease;
}
.resume-card:hover .resume-card__arrow {
  color: #14b8a6;
  transform: translate(2px, -2px);
}

/* ===================== CONTACT ===================== */
.contact-wrap {
  max-width: 640px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 2.5rem;
}
.contact-desc {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 2rem;
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.contact-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media (max-width: 540px) {
  .contact-form__row {
    grid-template-columns: 1fr;
  }
  .contact-wrap {
    padding: 1.5rem;
  }
}
.form-field input,
.form-field textarea {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #e2e8f0;
  font-size: 14px;
  font-family: inherit;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  outline: none;
  resize: none;
}
.form-field input::placeholder,
.form-field textarea::placeholder {
  color: #334155;
}
.form-field input:focus,
.form-field textarea:focus {
  border-color: rgba(20, 184, 166, 0.5);
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.08);
}

/* Notification */
.notif {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  z-index: 100;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
.notif--success {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #34d399;
}
.notif--error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
}
.notif-enter-active,
.notif-leave-active {
  transition: all 0.3s ease;
}
.notif-enter-from,
.notif-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.97);
}

/* ===================== AI CARD ===================== */
.ai-card {
  position: relative;
  margin-bottom: 4rem;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(52, 211, 153, 0.2);
  background: linear-gradient(
    135deg,
    rgba(6, 78, 59, 0.12) 0%,
    rgba(15, 23, 42, 0.6) 60%
  );
}
.ai-card__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 60% at 20% 50%,
    rgba(52, 211, 153, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
}
.ai-card__content {
  position: relative;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.ai-card__header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ai-card__icon {
  color: #34d399;
  font-size: 14px;
  animation: starPulse 3s ease-in-out infinite;
}
@keyframes starPulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.3);
  }
}
.ai-card__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #34d399;
  opacity: 0.9;
}
.ai-card__title {
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #6ee7b7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}
.ai-card__desc {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.75;
  max-width: 640px;
}
.ai-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ai-tag {
  font-size: 12px;
  font-weight: 600;
  font-family: "Courier New", monospace;
  padding: 5px 12px;
  border-radius: 8px;
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid rgba(52, 211, 153, 0.25);
  color: #6ee7b7;
  letter-spacing: 0.03em;
  transition: all 0.2s ease;
}
.ai-tag:hover {
  background: rgba(52, 211, 153, 0.15);
  border-color: rgba(52, 211, 153, 0.45);
  color: #a7f3d0;
}
</style>
