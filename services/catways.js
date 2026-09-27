const Catway = require('../models/catway');

// Lister tous les catways
exports.getAll = async () => {
  return await Catway.find();
};

// Récupérer un catway par son numéro
exports.getByNumber = async (catwayNumber) => {
  return await Catway.findOne({ catwayNumber: catwayNumber });
};

// Créer un catway
exports.create = async (data) => {
  const catway = new Catway({
    catwayNumber: data.catwayNumber,
    type: data.type,
    catwayState: data.catwayState,
  });
  return await catway.save();
};

// Modifier uniquement la description de l'état d'un catway
exports.updateState = async (catwayNumber, catwayState) => {
  return await Catway.findOneAndUpdate(
    { catwayNumber: catwayNumber },
    { catwayState: catwayState },
    { new: true }
  );
};

// Supprimer un catway
exports.delete = async (catwayNumber) => {
  return await Catway.deleteOne({ catwayNumber: catwayNumber });
};
