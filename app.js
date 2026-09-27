require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const usersRouter = require('./routes/users');
const catwaysRouter = require('./routes/catways');
const viewsRouter = require('./routes/views');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose.connect(process.env.URL_MONGO)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Moteur de vues EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes de pages (vues)
app.use('/', viewsRouter);

// Routes de l'API
app.use('/users', usersRouter);
app.use('/catways', catwaysRouter);

// Gestion des routes non trouvées (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
}

module.exports = app;
