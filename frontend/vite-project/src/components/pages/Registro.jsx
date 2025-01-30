import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Registro.css";

export const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetea el error antes de hacer la solicitud

    // Validaciones
    if (!nombre || !email || !contraseña) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // Log de los datos que se enviarán
    console.log({ username: nombre, email, password: contraseña });

    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: nombre, email, password: contraseña }), // Asegúrate de que el nombre de la propiedad sea correcto
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Mensaje de éxito desde el backend
        navigate('/login'); // Redirige al inicio de sesión
      } else {
        const errorData = await response.json();
        console.error('Error en el registro:', errorData.error); // Manejo del mensaje de error
        setError(errorData.error); // Establece el mensaje de error
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Hubo un problema al conectar con el servidor.'); // Establece un mensaje de error genérico
    }
  };

  return (
    <div>
      <h1>.</h1>
       
      {error && <p className="error">{error}</p>} {/* Muestra el mensaje de error si existe */}
      <form onSubmit={handleSubmit}>
      <h1>Regístrate</h1>
        <label className="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label className="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="password">Contraseña:</label>
        <input
          type="password"
          name="contraseña" // Este nombre no se utiliza en el backend
          id="idcontraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};