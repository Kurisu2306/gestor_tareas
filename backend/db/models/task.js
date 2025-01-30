const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ["alta", "media", "baja"], default: "media" },
  status: { type: String, enum: ["Pendiente", "En Proceso", "Completada"], default: "Pendiente" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relación con usuarios
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
