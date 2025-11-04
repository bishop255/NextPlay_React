import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCarrito } from "../context/useCarrito.jsx";

export const Navbar = ({ onSearch, onOpenLogin, onOpenRegistro }) => {
  const { carrito } = useCarrito();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Hook para navegación

  // Función para manejar el clic en el botón carrito
  const handleCarritoClick = () => {
    navigate("/carrito"); // Ruta a la página del carrito
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* Tu código de navbar, logo, menú, buscador… */}

      <div className="d-flex align-items-center">
        <button className="btn btn-outline-light me-2" onClick={handleCarritoClick}>
          <i className="bi bi-cart"></i> Carrito ({carrito?.length || 0})
        </button>
        {/* Botones Login y Registro */}
        <button className="btn btn-outline-light me-2" onClick={onOpenLogin}>
          Login
        </button>
        <button className="btn btn-success" onClick={onOpenRegistro}>
          Registro
        </button>
      </div>
    </nav>
  );
};
