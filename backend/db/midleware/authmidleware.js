// midleware/authmidleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Asegúrate de que la ruta sea correcta

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send({ error: 'Usuario no encontrado.' });
    }
    req.user = user; // Agrega el usuario a la solicitud
    next();
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error);
    res.status(401).send({ error: 'Por favor, autentíquese.' });
  }
};

module.exports = authMiddleware;