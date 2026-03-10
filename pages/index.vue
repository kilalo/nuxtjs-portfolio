<template>
  <div class="scroll-smooth">
    <!-- Section Accueil -->
    <section id="home" class="h-screen flex items-center justify-center pt-16">
      <div class="container mx-auto px-4 text-center">
        <div class="mt-[80px] content">
          <div class="content__container">
            <ul class="content__container__list">
              <li class="content__container__list__item">
                console.log("Hello World")
              </li>
              <li class="content__container__list__item">
                echo("Hello World")
              </li>
              <li class="content__container__list__item">
                System.out.println("Hello World")
              </li>
              <li class="content__container__list__item">
                std::cout << "Hello World"
              </li>
            </ul>
          </div>
        </div>
        <h1 class="text-4xl md:text-7xl lg:text-8xl font-bold mb-8">
          <span class="font-signature sparkle">Killian Challeau</span>
        </h1>
        <h2 class="mt-[120px] text-3xl md:text-5xl lg:text-6xl font-bold">
          <span class="text-teal-500 font-signature sparkle-teal">
            {{ $t('home.subtitle') }}
          </span>
        </h2>
      </div>
    </section>

    <!-- Section Projets -->
    <section id="projects" class="py-20">
      <div class="container mx-auto px-4">
        <h2
          class="text-5xl md:text-6xl lg:text-7xl font-bold text-center text-teal-500 mb-16 font-signature"
        >
          {{ $t('projects.title') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="project in projects"
            :key="project.id"
            class="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200"
          >
            <img
              :src="project.img"
              :alt="project.title"
              class="w-full h-64 object-cover"
            />
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-2">{{ project.title }}</h3>
              <p class="text-gray-400 text-sm mb-2">{{ project.date }}</p>
              <p class="text-teal-500 text-sm mb-4">{{ project.role }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-gray-700 rounded-full text-xs"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-2">
                <a
                  v-if="project.link"
                  :href="project.link"
                  target="_blank"
                  class="flex-1 px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded text-center text-sm transition-colors"
                >
                  <i class="fas fa-link mr-2"></i>{{ $t('projects.access') }}
                </a>
                <button
                  v-else-if="!project.prod"
                  class="flex-1 px-4 py-2 bg-orange-500 rounded text-sm"
                  disabled
                >
                  <i class="fas fa-wrench mr-2"></i>{{ $t('projects.notDeployed') }}
                </button>
                <button
                  v-else
                  class="flex-1 px-4 py-2 bg-red-500 rounded text-sm"
                  disabled
                >
                  <i class="fas fa-lock mr-2"></i>{{ $t('projects.private') }}
                </button>
                <button
                  @click="showProject(project)"
                  class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                >
                  {{ $t('projects.viewMore') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Projet -->
      <div
        v-if="selectedProject"
        @click="selectedProject = null"
        class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      >
        <div
          @click.stop
          class="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
        >
          <h3 class="text-3xl font-bold mb-2">{{ selectedProject.title }}</h3>
          <p class="text-gray-400 mb-2">{{ selectedProject.date }}</p>
          <p class="text-teal-500 mb-4">{{ selectedProject.role }}</p>
          <p class="mb-4">{{ selectedProject.description }}</p>
          <ul
            v-if="selectedProject.more"
            class="list-disc list-inside mb-4 space-y-1"
          >
            <li v-for="(item, index) in selectedProject.more" :key="index">
              {{ item }}
            </li>
          </ul>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tech in selectedProject.technologies"
              :key="tech"
              class="px-3 py-1 bg-gray-700 rounded-full text-sm"
            >
              {{ tech }}
            </span>
          </div>
          <button
            @click="selectedProject = null"
            class="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded transition-colors"
          >
            {{ $t('projects.close') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Section Compétences -->
    <section id="skills" class="py-20 bg-gray-800/50">
      <div class="container mx-auto px-4">
        <h2
          class="text-5xl md:text-6xl lg:text-7xl font-bold text-center text-teal-500 mb-16 font-signature"
        >
          {{ $t('skills.title') }}
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="flex items-center">
            <p class="text-gray-300 leading-relaxed text-lg">
              {{ $t('skills.description') }}
            </p>
          </div>
          <div class="flex justify-center items-center">
            <div class="tagcloud" style="width: 400px; height: 400px"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section CV -->
    <section id="resume" class="py-20">
      <div class="container mx-auto px-4">
        <h2
          class="text-5xl md:text-6xl lg:text-7xl font-bold text-center text-teal-500 mb-16 font-signature"
        >
          {{ $t('resume.title') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <a
            href="/CV_KC_2022.pdf"
            target="_blank"
            class="p-8 rounded-lg text-center transition-colors group"
          >
            <i
              class="fas fa-file-pdf text-6xl text-teal-500 mb-4 group-hover:scale-110 transition-transform inline-block"
            ></i>
            <p class="text-lg">{{ $t('resume.downloadPdf') }}</p>
          </a>
          <a
            href="https://resume.kilalo.io"
            target="_blank"
            class="p-8 rounded-lg text-center transition-colors group"
          >
            <i
              class="fas fa-globe text-6xl text-teal-500 mb-4 group-hover:scale-110 transition-transform inline-block"
            ></i>
            <p class="text-lg">{{ $t('resume.viewOnline') }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Section Contact -->
    <section id="contact" class="py-20 bg-gray-800/50">
      <div class="container mx-auto px-4">
        <h2
          class="text-5xl md:text-6xl lg:text-7xl font-bold text-center text-teal-500 mb-12 font-signature"
        >
          {{ $t('contact.title') }}
        </h2>
        <p class="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
          {{ $t('contact.description') }}
        </p>
        <form @submit.prevent="submitForm" class="max-w-2xl mx-auto space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model="form.name"
              type="text"
              :placeholder="$t('contact.form.name')"
              required
              class="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
            />
            <input
              v-model="form.email"
              type="email"
              :placeholder="$t('contact.form.email')"
              required
              class="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
            />
          </div>
          <input
            v-model="form.subject"
            type="text"
            :placeholder="$t('contact.form.subject')"
            required
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
          <textarea
            v-model="form.content"
            :placeholder="$t('contact.form.message')"
            required
            rows="5"
            maxlength="1500"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
          ></textarea>
          <button
            type="submit"
            class="w-full px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold transition-colors"
          >
            {{ $t('contact.form.send') }}
          </button>
        </form>

        <!-- Notifications -->
        <div
          v-if="notification"
          class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg"
          :class="
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          "
        >
          {{ notification.message }}
        </div>
      </div>
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

const { t } = useI18n();
const { projects } = useProjects();

useHead({
  title: "Killian Challeau - Développeur Web Freelance",
});

const selectedProject = ref<Project | null>(null);
const notification = ref<Notification | null>(null);
const form = ref<ContactForm>({
  name: "",
  email: "",
  subject: "",
  content: "",
});

const skills: string[] = [
  "HTML5",
  "CSS3",
  "Javascript",
  "Typescript",
  "Vue",
  "Nuxt",
  "React",
  "Symfony",
  "Laravel",
  "Git",
  "Docker",
  "REST",
  "MySQL",
  "jQuery",
  "SASS",
  "Apache",
  "Nginx",
  "Linux",
  "Java",
  "Nest",
  "Node",
  "Angular",
  "MongoDB",
  "AWS",
];

const showProject = (project: Project): void => {
  selectedProject.value = project;
};

const submitForm = (): void => {
  notification.value = {
    type: "success",
    message: t('contact.form.success'),
  };
  form.value = { name: "", email: "", subject: "", content: "" };
  setTimeout(() => {
    notification.value = null;
  }, 3000);
};

onMounted(async () => {
  if (process.client) {
    try {
      const TagCloudModule = await import("TagCloud");
      const TagCloudFunc = TagCloudModule.default || TagCloudModule;

      const container = ".tagcloud";
      const texts = skills;
      const options = {
        radius: 200,
        maxSpeed: "slow",
      };

      const cloud = TagCloudFunc(container, texts, options);

      // Appliquer les styles après l'initialisation
      setTimeout(() => {
        const tagCloudEl = document.querySelector(".tagcloud") as HTMLElement;
        if (tagCloudEl) {
          tagCloudEl.style.cssText =
            "margin: auto; position: relative; width: 400px; height: 400px";

          // Appliquer la couleur aux items
          const items = tagCloudEl.querySelectorAll("span");
          items.forEach((item) => {
            (item as HTMLElement).style.color = "#5F9EA0";
          });
        }
      }, 100);
    } catch (error) {
      console.error("Error loading TagCloud:", error);
    }
  }
});
</script>

<style scoped>
.content {
  position: absolute;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  height: 50px;
  overflow: hidden;
  font-family: "Courier New", Courier, monospace;
  font-size: 22px;
  line-height: 40px;
  color: #ecf0f1;
}

.content__container {
  font-weight: 600;
  overflow: hidden;
  height: 40px;
  padding: 0 60px;
}

.content__container:before {
  content: "[";
  left: 0;
}

.content__container:after {
  content: "]";
  position: absolute;
  right: 0;
}

.content__container:after,
.content__container:before {
  position: absolute;
  top: 0;
  color: #5f9ea0;
  font-size: 50px;
  line-height: 40px;
  -webkit-animation-name: opacity;
  -webkit-animation-duration: 2s;
  -webkit-animation-iteration-count: infinite;
  animation-name: opacity;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

.content__container__text {
  display: inline;
  margin: 0;
}

.content__container__list {
  margin-top: 0;
  text-align: left;
  list-style: none;
  -webkit-animation-name: change;
  -webkit-animation-duration: 10s;
  -webkit-animation-iteration-count: infinite;
  animation-name: change;
  animation-duration: 10s;
  animation-iteration-count: infinite;
}

.content__container__list__item {
  line-height: 40px;
  margin: 0;
  margin-top: 3px;
}

@media screen and (max-width: 350px) {
  .content {
    font-size: 11px !important;
  }
}

@media screen and (min-width: 351px) and (max-width: 500px) {
  .content {
    font-size: 13px !important;
  }
}

@media screen and (min-width: 450px) and (max-width: 600px) {
  .content {
    font-size: 17px !important;
  }
}

@media screen and (max-width: 600px) {
  .content__container:after,
  .content__container:before {
    font-size: 35px !important;
  }
}

@-webkit-keyframes opacity {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@-webkit-keyframes change {
  0%,
  12.66%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  16.66%,
  29.32% {
    transform: translate3d(0, -25%, 0);
  }
  33.32%,
  45.98% {
    transform: translate3d(0, -50%, 0);
  }
  49.98%,
  62.64% {
    transform: translate3d(0, -75%, 0);
  }
  66.64%,
  79.3% {
    transform: translate3d(0, -50%, 0);
  }
  83.3%,
  95.96% {
    transform: translate3d(0, -25%, 0);
  }
}

@keyframes opacity {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@keyframes change {
  0%,
  12.66%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  16.66%,
  29.32% {
    transform: translate3d(0, -25%, 0);
  }
  33.32%,
  45.98% {
    transform: translate3d(0, -50%, 0);
  }
  49.98%,
  62.64% {
    transform: translate3d(0, -75%, 0);
  }
  66.64%,
  79.3% {
    transform: translate3d(0, -50%, 0);
  }
  83.3%,
  95.96% {
    transform: translate3d(0, -25%, 0);
  }
}

.tagcloud {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.tagcloud--item {
  color: #5f9ea0;
  cursor: pointer;
  transition: color 0.3s ease;
}

.tagcloud--item:hover {
  color: #14b8a6;
}
</style>
