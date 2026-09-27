const Reservation = require('../models/reservation');

// Lister toutes les réservations d'un catway
exports.getAllByCatway = async (catwayNumber) => {
  return await Reservation.find({ catwayNumber: catwayNumber });
};

// Lister toutes les réservations (toutes confondues)
exports.getAll = async () => {
  return await Reservation.find();
};

// Récupérer une réservation par son id
exports.getById = async (id) => {
  return await Reservation.findOne({ _id: id });
};

// Créer une réservation
exports.create = async (data) => {
  const reservation = new Reservation({
    catwayNumber: data.catwayNumber,
    clientName: data.clientName,
    boatName: data.boatName,
    checkIn: data.checkIn,
    checkOut: data.checkOut,
  });
  return await reservation.save();
};

// Supprimer une réservation
exports.delete = async (id) => {
  return await Reservation.deleteOne({ _id: id });
};
