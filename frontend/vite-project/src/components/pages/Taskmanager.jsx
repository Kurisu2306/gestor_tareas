import React, { useState, useEffect } from "react";
import TaskForm from "./Taskform";


const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores
  const token = localStorage.getItem("token");

  // Función para obtener las tareas
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Error al obtener tareas:", response.statusText);
        setError("Error al obtener tareas.");
      }
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      setError("Error al obtener tareas.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Crear o actualizar una tarea
  const handleCreateOrUpdateTask = async (taskData) => {
    try {
      const url = editingTask
        ? `http://localhost:8000/api/tasks/${editingTask._id}`
        : "http://localhost:8000/api/tasks";

      const method = editingTask ? "PUT" : "POST";

      console.log("Token:", token);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
      }

      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error al crear o actualizar la tarea:", error);
      setError("Error al crear o actualizar la tarea.");
    }
  };

  // Editar una tarea
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Eliminar una tarea
  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      setError("Error al eliminar la tarea.");
    }
  };

  return (
    <div>
      <h1>.</h1>
      {error && <p className="error">{error}</p>}
      <TaskForm onSubmit={handleCreateOrUpdateTask} existingTask={editingTask} />
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Fecha de Vencimiento: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Prioridad: {task.priority}</p>
            <p>Estado: {task.status}</p>
            <button onClick={() => handleEditTask(task)}>Editar</button>
            <button onClick={() => handleDeleteTask(task._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
