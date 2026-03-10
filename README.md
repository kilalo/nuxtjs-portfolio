# Portfolio Nuxt 3 - One Page

Portfolio développeur web en mode one page avec scroll fluide entre les sections.

## 🚀 Technologies

- **Nuxt 3** - Framework Vue.js
- **Vue 3** - Composition API
- **Tailwind CSS** - Framework CSS utilitaire
- **Docker** - Conteneurisation
- **Font Awesome** - Icônes

## 📦 Installation et démarrage avec Docker

### Mode développement

```bash
# Construire et démarrer le conteneur de développement
docker-compose up portfolio-dev

# Ou en mode détaché
docker-compose up -d portfolio-dev
```

L'application sera accessible sur http://localhost:3002

### Mode production

```bash
# Construire et démarrer le conteneur de production
docker-compose --profile production up portfolio-prod

# Ou en mode détaché
docker-compose --profile production up -d portfolio-prod
```

L'application sera accessible sur http://localhost:3001

### Commandes utiles

```bash
# Arrêter les conteneurs
docker-compose down

# Reconstruire les images
docker-compose build

# Voir les logs
docker-compose logs -f portfolio-dev

# Accéder au shell du conteneur
docker-compose exec portfolio-dev sh
```

## 🛠️ Installation locale (sans Docker)

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

## 📁 Structure du projet

```
.
├── assets/          # Ressources statiques (SCSS, images)
├── layouts/         # Layouts Vue
├── pages/           # Pages de l'application (index.vue en one page)
├── plugins/         # Plugins Nuxt (Vuetify)
├── public/          # Fichiers publics statiques
├── Dockerfile       # Dockerfile pour la production
├── Dockerfile.dev   # Dockerfile pour le développement
└── docker-compose.yml # Configuration Docker Compose
```

## 🎨 Sections du portfolio

1. **Accueil** - Introduction avec animation de code
2. **Projets** - Liste des projets réalisés
3. **Compétences** - Technologies maîtrisées
4. **CV** - Téléchargement et lien vers CV en ligne
5. **Contact** - Formulaire de contact

## 📝 Notes

- La navigation scrolle automatiquement vers les sections
- Le système détecte la section visible et met à jour la navigation
- Design responsive (mobile, tablette, desktop)
- Thème sombre par défaut (Vuetify dark theme)
