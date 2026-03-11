# Utiliser l'image officielle Node.js
FROM node:20-alpine AS base

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier tous les fichiers du projet
COPY . .

# Builder l'application
RUN npm run build

# Étape de production
FROM node:20-alpine AS production

WORKDIR /app

# Copier les fichiers nécessaires depuis l'étape de build
COPY --from=base /app/.output /app/.output
COPY --from=base /app/package*.json ./

# Installer uniquement les dépendances de production (nodemailer, etc.)
RUN npm ci --omit=dev

# Exposer le port
EXPOSE 3000

# Variable d'environnement pour la production
ENV NODE_ENV=production

# Lancer l'application
CMD ["node", ".output/server/index.mjs"]
