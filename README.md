# API Port de Plaisance Russell

API REST de gestion des réservations de catways pour la capitainerie du port de plaisance de Russell.

## Application en ligne
https://une-api-pour-le-port-de-plaisance-russell.onrender.com

## Compte de test
- Email : admin@port-russell.com
- Mot de passe : motdepasse123

## Documentation de l'API
https://une-api-pour-le-port-de-plaisance-russell.onrender.com/documentation

## Installation en local
\`\`\`bash
npm install
npm run dev
\`\`\`

Créez un fichier `.env` à la racine avec :
\`\`\`
PORT=3000
URL_MONGO=<votre_chaine_de_connexion_mongodb>
SECRET_KEY=<votre_cle_secrete>
\`\`\`

## Tests
\`\`\`bash
npm test
\`\`\`

## Stack technique
Node.js, Express, MongoDB (Mongoose), JWT, EJS, Mocha
