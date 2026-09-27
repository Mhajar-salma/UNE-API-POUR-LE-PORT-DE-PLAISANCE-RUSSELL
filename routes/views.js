const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

router.get('/catways-list', (req, res) => {
  res.render('catways');
});

router.get('/reservations-list', (req, res) => {
  res.render('reservations');
});

router.get('/catway-detail', (req, res) => {
  res.render('catway');
});

router.get('/reservation-detail', (req, res) => {
  res.render('reservation');
});

router.get('/documentation', (req, res) => {
  res.render('documentation');
});

module.exports = router;
