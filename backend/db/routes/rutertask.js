//rutertask.js
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskcontroller");
const authMiddleware = require("../midleware/authmidleware");

// Rutas CRUD para tareas
router.post("/", authMiddleware, taskController.createTask); // Crear tarea
router.get("/", authMiddleware, taskController.getTasks); // Obtener todas las tareas
router.put("/:id", authMiddleware, taskController.updateTask); // Actualizar tarea por ID
router.delete("/:id", authMiddleware, taskController.deleteTask); // Eliminar tarea por ID

module.exports = router;