import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import "./task.css"

const TaskForm = ({ onSubmit, existingTask = null }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Media',  // Ajusta si es necesario
    status: 'Pendiente', // ✅ Ahora coincide con el backend
  });
  
  useEffect(() => {
    if (existingTask) {
      setTask({
        title: existingTask.title || '',
        description: existingTask.description || '',
        dueDate: existingTask.dueDate ? existingTask.dueDate.split('T')[0] : '',
        priority: existingTask.priority || 'media',
        status: existingTask.status || 'pendiente',
      });
    }
  }, [existingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'media',
      status: 'pendiente',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Gestión de Tareas</h1>
      <div>
        <label>Título:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fecha de Vencimiento:</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Prioridad:</label>
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>
     <div>
  <label>Estado:</label>
  <select name="status" value={task.status} onChange={handleChange}>
    <option value="Pendiente">Pendiente</option>
    <option value="En Proceso">En Proceso</option>
    <option value="Completada">Completada</option>
  </select>
</div>

      <button type="submit">{existingTask ? 'Actualizar Tarea' : 'Crear Tarea'}</button>
    </form>
  );
};



TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Validación de la función onSubmit
  existingTask: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default TaskForm;

