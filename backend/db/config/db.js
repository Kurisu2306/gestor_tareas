// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Puedes eliminar estas opciones si estás usando la versión 4.0.0 o superior
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar a MongoDB Atlas:', error);
    process.exit(1); // Salir del proceso si hay un error
  }
};

module.exports = connectDB;