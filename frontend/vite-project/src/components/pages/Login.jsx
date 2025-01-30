import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const LoginComponent = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores

  const handleRegisterClick = () => {
    navigate("/registro"); // Redirige a la página de registro
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Resetea el error antes de hacer la solicitud
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Guarda el token
        navigate("/tasks"); 
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error en el login, verifica tus credenciales");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setError("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div>
      <h1>.</h1>
      {error && <p className="error">{error}</p>} {/* Muestra el mensaje de error si existe */}
      <form onSubmit={handleLogin}>
      <h1>LOGIN</h1>
        <label className="email">Correo electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="password">Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Iniciar sesión</button>
        <br />
        <br />
        <button type="button" onClick={handleRegisterClick}>Registrarse</button>
      </form>
    </div>
  );
};