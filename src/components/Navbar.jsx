import { useEffect, useState } from "react";
import { useCarrito } from "../context/useCarrito.jsx";


export const Navbar = ({ onSearch, onOpenLogin, onOpenRegistro }) => {
  const { carrito } = useCarrito();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="/img/logo_web1.png"
            alt="Logo"
            className="logo-index"
            style={{ width: "90px", height: "90px", objectFit: "contain" }}
          />
        </a>

        {/* Botón de colapso */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Menú principal */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link active" href="/">Tienda</a></li>
            <li className="nav-item"><a className="nav-link" href="/comunidad">Comunidad</a></li>
            <li className="nav-item"><a className="nav-link" href="/acerca">Acerca De</a></li>
            <li className="nav-item"><a className="nav-link" href="/soporte">Soporte</a></li>
          </ul>

          {/* Buscador */}
          <form className="search-index me-3" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control"
              type="search"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleChange}
            />
          </form>

          {/* Botones */}
          <div className="d-flex align-items-center">
            <a className="btn btn-outline-light me-2" href="/carrito">
              <i className="bi bi-cart"></i> Carrito ({carrito?.length || 0})
            </a>
            <button className="btn btn-outline-light me-2" onClick={onOpenLogin}>
              Login
            </button>
            <button className="btn btn-success" onClick={onOpenRegistro}>
              Registro
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
