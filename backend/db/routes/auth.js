// routes/auth.js
const express = require('express');
const { registerUser , loginUser  } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', registerUser ); // Ruta para registrar un usuario
router.post('/login', loginUser ); // Ruta para iniciar sesión

module.exports = router;