import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Importar PropTypes para validar las props

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

// Validación de props
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
