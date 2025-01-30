// controllers/taskcontroller.js
const Task = require("../models/task");
const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  priority: Joi.string().valid('alta', 'media', 'baja').optional(),
  status: Joi.string().valid('Pendiente', 'En Proceso', 'Completada').optional(), // ✅ Agregado
});

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { title, description, dueDate, priority } = req.body;
    const userId = req.user.id; // ID del usuario autenticado
    const newTask = new Task({ title, description, dueDate, priority, userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

// Obtener todas las tareas del usuario
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas", error });
  }
};

// Actualizar una tarea por ID
exports.updateTask = async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Tarea no encontrada" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
};

// Eliminar una tarea por ID
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deletedTask = await Task.findOneAndDelete({ _id: id, userId });

    if (!deletedTask) return res.status(404).json({ message: "Tarea no encontrada" });
    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
};