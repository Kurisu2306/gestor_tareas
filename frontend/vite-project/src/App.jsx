import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginComponent } from "./components/pages/Login";
import { Contacto } from "./components/pages/Contacto";
import { Registro } from "./components/pages/Registro.JSX";
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/Header";
import TaskManager from "./components/pages/Taskmanager";
import PrivateRoute from "./components/pages/PrivateRoutes";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LoginComponent />} /> 
          <Route path="/registro" element={<Registro />} /> 
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/tasks" element={<PrivateRoute><TaskManager /></PrivateRoute>} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
