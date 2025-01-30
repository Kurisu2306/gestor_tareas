import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import "./header.css";

export const Header = () => {
  return (
    <header className="header">
      <h1>GESTOR DE TAREAS EN EQUIPO</h1>
      <nav>
        <ul>
          <li><Link to="/">INICIO</Link></li>
          
          <li><Link to="/contacto">CONTACTO</Link></li>
          
        </ul>
      </nav>
    </header>
  );
} 