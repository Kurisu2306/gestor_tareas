const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./db/config/db");
const authRouter = require("./db/routes/auth");
const taskRoutes = require("./db/routes/rutertask");



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Conectar a la base de datos
connectDB()
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
