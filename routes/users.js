const express = require('express');
const router = express.Router();
const userService = require('../services/users');
const authService = require('../services/auth');
const { checkJWT } = require('../middlewares/private');

// Connexion (authentification)
router.post('/authenticate', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.authenticate(email, password);
    if (!token) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    res.status(200).json({ token: token, message: 'Connexion réussie' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Créer un utilisateur (protégé)
router.post('/', checkJWT, async (req, res) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer un utilisateur par id (protégé)
router.get('/:id', checkJWT, async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier un utilisateur (protégé)
router.put('/:id', checkJWT, async (req, res) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un utilisateur (protégé)
router.delete('/:id', checkJWT, async (req, res) => {
  try {
    await userService.delete(req.params.id);
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
