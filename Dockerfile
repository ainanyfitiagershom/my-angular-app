# Utilisation de l'image Node.js
FROM node:18

# Définition du dossier de travail dans le conteneur
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package.json package-lock.json ./


RUN npm install --legacy-peer-deps

# Copier le reste du projet
COPY . .

EXPOSE 4200

# Exécuter Angular en mode développement
CMD ["npm", "start"]

