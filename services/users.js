const User = require('../models/user');
const bcrypt = require('bcrypt');

// Récupérer un utilisateur par son id
exports.getById = async (id) => {
  return await User.findOne({ _id: id });
};

// Récupérer un utilisateur par son email
exports.getByEmail = async (email) => {
  return await User.findOne({ email: email });
};

// Créer un utilisateur (le mot de passe est haché avant sauvegarde)
exports.create = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });
  return await user.save();
};

// Mettre à jour un utilisateur
exports.update = async (id, data) => {
  const updateData = {
    name: data.name,
    email: data.email,
  };
  // Si un nouveau mot de passe est fourni, on le hache
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }
  return await User.findOneAndUpdate({ _id: id }, updateData, { new: true });
};

// Supprimer un utilisateur
exports.delete = async (id) => {
  return await User.deleteOne({ _id: id });
};
