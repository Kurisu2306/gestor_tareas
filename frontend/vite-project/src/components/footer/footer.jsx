import React from "react";
import "./footer.css";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col">
            <p>Copyright © 2025 Tu Empresa. Todos los derechos reservados.</p>
          </div>
          <div className="col">
            <h3>Enlaces útiles</h3>
            <ul>
              <li>
                <a href="#">Acerca de nosotros</a>
              </li>
              <li>
                <a href="../pages/contacto.jsx">Contacto</a>
              </li>
              <li>
                <a href="#">Política de privacidad</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h3>Síguenos en:</h3>
            <ul className="social-icons">
              <li>
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

<Footer />
 
