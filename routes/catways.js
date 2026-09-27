const express = require('express');
const router = express.Router();
const catwayService = require('../services/catways');
const reservationService = require('../services/reservations');
const { checkJWT } = require('../middlewares/private');

// Lister tous les catways (protégé)
router.get('/', checkJWT, async (req, res) => {
  try {
    const catways = await catwayService.getAll();
    res.status(200).json(catways);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Détails d'un catway (protégé)
router.get('/:id', checkJWT, async (req, res) => {
  try {
    const catway = await catwayService.getByNumber(req.params.id);
    if (!catway) {
      return res.status(404).json({ error: 'Catway non trouvé' });
    }
    res.status(200).json(catway);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Créer un catway (protégé)
router.post('/', checkJWT, async (req, res) => {
  try {
    const catway = await catwayService.create(req.body);
    res.status(201).json(catway);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier l'état d'un catway - PUT (protégé)
router.put('/:id', checkJWT, async (req, res) => {
  try {
    const catway = await catwayService.updateState(req.params.id, req.body.catwayState);
    if (!catway) {
      return res.status(404).json({ error: 'Catway non trouvé' });
    }
    res.status(200).json(catway);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modifier l'état d'un catway - PATCH (protégé)
router.patch('/:id', checkJWT, async (req, res) => {
  try {
    const catway = await catwayService.updateState(req.params.id, req.body.catwayState);
    if (!catway) {
      return res.status(404).json({ error: 'Catway non trouvé' });
    }
    res.status(200).json(catway);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un catway (protégé)
router.delete('/:id', checkJWT, async (req, res) => {
  try {
    await catwayService.delete(req.params.id);
    res.status(200).json({ message: 'Catway supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Sous-ressource : réservations d'un catway ---

// Lister les réservations d'un catway (protégé)
router.get('/:id/reservations', checkJWT, async (req, res) => {
  try {
    const reservations = await reservationService.getAllByCatway(req.params.id);
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Détails d'une réservation d'un catway (protégé)
router.get('/:id/reservations/:idReservation', checkJWT, async (req, res) => {
  try {
    const reservation = await reservationService.getById(req.params.idReservation);
    if (!reservation) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Créer une réservation pour un catway (protégé)
router.post('/:id/reservations', checkJWT, async (req, res) => {
  try {
    const data = { ...req.body, catwayNumber: req.params.id };
    const reservation = await reservationService.create(data);
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer une réservation d'un catway (protégé)
router.delete('/:id/reservations/:idReservation', checkJWT, async (req, res) => {
  try {
    await reservationService.delete(req.params.idReservation);
    res.status(200).json({ message: 'Réservation supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
