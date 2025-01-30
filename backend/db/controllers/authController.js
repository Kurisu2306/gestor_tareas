// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser  = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser  = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser .save(); // Guarda el usuario en la base de datos
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser  });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
  }
};

exports.loginUser  = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
  }
};