const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('./users');

// Vérifie l'email et le mot de passe, renvoie un token si c'est valide
exports.authenticate = async (email, password) => {
  const user = await userService.getByEmail(email);
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );

  return token;
};
