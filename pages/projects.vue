<template>
  <v-container>
    <div class="grid h100 mb-5">
      <div
        v-for="project in projects"
        :key="project.id"
        class="my-5 pa-5 g12 g6--tablet g4--wide"
      >
        <v-card class="ma" max-width="374">
          <v-img height="240" :src="project.img">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-title class="pb-2">
            {{ project.title }}
          </v-card-title>
          <v-card-text color="amber">
            <v-row align="center" class="mx-0">
              <div class="">{{ project.date }}</div>
            </v-row>
            <div class="subtitle-1 txt-color my-2">
              {{ project.role }}
            </div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>Technologies</v-card-title>
          <v-card-text>
            <v-chip-group class="txt-color" active-class="white--text" column>
              <v-chip
                v-for="techno in project.technologies"
                :key="project.title + '-' + techno"
              >
                {{ techno }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              v-if="project.link"
              class="ma"
              color="#5F9EA0"
              :href="project.link"
              target="_blank"
              text
              :ripple="false"
            >
              <v-icon class="mr-2 fzm"> mdi-link </v-icon>
              <span class="fzxs"> Accéder </span>
            </v-btn>
            <v-btn
              v-else-if="!project.prod"
              class="ma"
              color="orange"
              text
              :ripple="false"
            >
              <v-icon class="fzm mr-2"> mdi-wrench </v-icon>
              <span class="fzxs"> Non déployé </span>
            </v-btn>
            <v-btn v-else class="ma" color="red" text :ripple="false">
              <v-icon class="fzm mr-2"> mdi-cancel </v-icon>
              <span class="fzxs"> Privé </span>
            </v-btn>
            <v-btn
              class="ma"
              color="#5F9EA0"
              text
              :ripple="false"
              @click="more(project.id)"
            >
              <span class="fzxs"> Voir plus </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <v-dialog v-model="modal" persistent max-width="800">
      <v-card class="ma">
        <v-card-title class="pb-2">
          {{ current.title }}
        </v-card-title>
        <v-card-text color="amber">
          <v-row align="center" class="mx-0">
            <div class="">{{ current.date }}</div>
          </v-row>
          <div class="subtitle-1 txt-color my-2">
            {{ current.role }}
          </div>
          <div>
            {{ current.description }}
          </div>
          <div class="mt-5" v-if="current.more">
            <ul>
              <li v-for="(i, index) in current.more" :key="index">
                {{ i }}
              </li>
            </ul>
          </div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-title>Technologies</v-card-title>
        <v-card-text>
          <v-chip-group class="txt-color" active-class="white--text" column>
            <v-chip
              v-for="techno in current.technologies"
              :key="current.title + '-' + techno"
            >
              {{ techno }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
          <v-btn
            class="ma"
            color="#5F9EA0"
            text
            :ripple="false"
            @click="close()"
          >
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  head: {
    title: "Projets",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Liste non exhaustive des projets que j'ai pu réaliser au cours de ma carrière en tant que développeur.",
      },
    ],
  },
  data() {
    return {
      modal: false,
      current: {},
      projects: [
        {
          id: 8,
          title: "Flit Sport",
          description:
            "Développement from scratch d'une web app avec une volonté mobile first qui a pour objet de générer intelligement des plans d'entrainement pour la course à pied. L'idée était de mettre en place une interface qui se chargait de synchroniser les données de l'app de run STRAVA et de les envoyer à une API développé en Python afin de récupérer les plans d'entrainement générés. Durant ce projet, sur lequel j'ai travaillé pendant 8-9 mois, j'étais également en charge du deploiement et de l'intégration continue (CI/CD) via les services de AWS et Github.",
          img: "/flit-project.jpg",
          date: "Octobre 2021 - Juin 2022",
          technologies: ["Nest", "Angular", "Docker", "AWS"],
          role: "Développeur Full-stack",
          link: "https://coach.flit-sport.com/",
          prod: true,
        },
        {
          id: 7,
          title: "HGuitare",
          description:
            "Refonte d'une web app dont la thématique principale est les cours de guitare en ligne. L'objectif ici était de développer un CMS custom autour des cours en ligne afin de rendre l'utilisateur indépendant dans la maintenance de son site ainsi que de proposer les services de la web app sous la forme d'un SaaS (système d'abonnement mensuel afin de pouvoir profiter des outils spécifiques au CMS). Un système de paiement et d'abonnement a également été intégré avec le système de paiement en ligne Stripe. Cette mission était ma première en tant que freelance pour une durée de 9 mois.",
          img: "/hguitare-project.jpg",
          date: "Novembre 2020 - Juin 2021",
          technologies: ["Laravel", "Jquery", "Stripe"],
          role: "Développeur Full-stack",
          link: "https://www.hguitare.com/",
          prod: true,
        },
        {
          id: 6,
          title: "Creuch",
          description:
            "CREUCH c'est une plateforme de vente en circuit court pour les artisans et les producteurs. Le référent en local anime sa plateforme, trouve, aide les fournisseurs et propose ses ventes. Le consommateur achète en ligne et vient chercher dans un point relai.\n Puisque j'étais le seul développeur sur ce projet, j'étais en charge de la conception du sytème d'information, du développement du site ainsi que de son déploiement. Il est à noter également que j'ai pu configurer l'application pour qu'elle soit compatible avec Mangopay, celèbre moyen de paiement électronique luxembourgeois. La V1 de la plateforme était fonctionnelle en environ 2 mois de travail. ",
          img: "/creuch-project.jpg",
          date: "Juin 2020",
          technologies: ["Laravel", "Vue", "Mangopay"],
          role: "Lead Développeur",
          link: "https://creuch.fr",
          prod: true,
        },
        {
          id: 1,
          title: "Portfolio",
          description:
            "Création d’un site Portfolio permettant de mettre en avant mes expériences et projets en tant que développeur. Ce projet est aussi l'occasion de faire le point sur l'ensemble des compétences que j'ai pu acquérir et ainsi décider ce vers quoi je souhaite m'orienter pour la suite de ma carrière professionnelle",
          img: "/kilalo-project.jpg",
          date: "Avril 2020",
          technologies: ["Vue", "Nuxt"],
          role: "Développeur Front-end",
          link: "https://kilalo.io",
          prod: true,
        },
        {
          id: 2,
          title: "Movies App",
          description:
            "Dans une volonté de vouloir se former pendant la crise du COVID-19, cette application est le fruit de la mise en pratique de la formation React Native disponible sur le site d’openclassroom. L’app permet de rechercher des films, consulter les nouveautés et d’en ajouter à sa liste de favoris.",
          img: "/movies-project.jpg",
          date: "Mars 2020",
          technologies: ["React", "React Native"],
          role: "Développeur Front-end",
          prod: false,
        },
        {
          id: 3,
          title: "Sports Village",
          description:
            "Intégration de l’équipe de développeurs de l’entreprise Monkey Monk afin de développer un site d’e-commerce de vente d'équipement sportif. L’enjeu ici était de pouvoir proposer à l’utilisateur une plateforme tout en un permettant de :",
          img: "/sv-project.jpg",
          date: "Juillet 2019 - Août 2020",
          technologies: ["Vue", "Nuxt", "Laravel", "Docker"],
          role: "Développeur Full-stack",
          more: [
            "Créer sa propre boutique en ligne",
            "Personnaliser les produits du catalogue (outil de personnalisation développé avec l’utilisation de canvas)",
            "Gérer le tunnel d’achat depuis le paiement jusqu’à la livraison en passant par les fournisseurs",
            "Créer des évènements associés à un agenda",
          ],
          link: "https://sports-village.com",
          prod: true,
        },
        {
          id: 4,
          title: "Miuseec",
          description:
            "MIUSEEC est un intranet proposant d’un côté un outil de gestion de tiers lieu (réservation de salle, déclaration d’incidents, annuaire, agenda…) et de l’autre un outil de datavisualisation métrologique. Le parti pris est d’afficher des données mesurées ainsi que des références ou cibles permettant aux usagers de comparer les consommations énergétiques réelles avec des valeurs « objectifs ». Pour chaque valeur mesurée, une référence ou valeur cible est donc calculée. Mon rôle au cours de ce projet professionnel était la refonte graphique, le développement d’un timeline ainsi que la conception de sa V2.",
          img: "/miuseec-project.jpg",
          date: "Mai 2018 - Septembre 2019",
          technologies: ["Symfony", "jQuery"],
          role: "Développeur Full-stack",
          prod: true,
        },
        {
          id: 5,
          title: "Study Share",
          description:
            "Création d’une plateforme permettant un accès rapide et facile à toutes les annales, cours, TD ainsi que les corrections selon les formations post BAC pour tous les étudiants de France. L’enjeu était donc de référencer les documents universitaires sur une seule et unique plateforme dans le but d’aider les étudiants à bien préparer leurs examens. Ce projet était dans le cadre de l’application du module « Méthodes Agiles » de ma deuxième année de MASTER MIAGE, c'était l'ocassion parfaite de m\initier au framework Angular.",
          img: "/studyshare-project.jpg",
          date: "Avril 2019",
          technologies: ["Angular", "Laravel"],
          role: "Développeur Back-end",
          prod: false,
        },
      ],
    };
  },
  methods: {
    more(current_id) {
      this.current = this.projects.find((element) => element.id == current_id);
      this.modal = true;
    },
    close() {
      this.modal = false;
      this.current = {};
    },
  },
};
</script>
