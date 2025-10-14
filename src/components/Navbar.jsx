import React, { useState } from "react";

export const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Llama al callback con el texto para filtrar productos
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="index.html">
            <img src="/img/logo_web1.png" alt="Logo" className="logo-index" />
          </a>

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

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="index.html">
                  Tienda
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="servicios.html">
                  Comunidad
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="acerca.html">
                  Acerca De
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="soporte.html">
                  Soporte
                </a>
              </li>
            </ul>

            <form className="search-index" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar..."
                aria-label="Buscar"
                value={searchTerm}
                onChange={handleChange}
              />
            </form>

            <div className="d-flex align-items-center">
              <a className="btn btn-outline-light me-2" href="carrito.html">
                <i className="bi bi-cart"></i> Carrito
              </a>
              <a className="btn btn-outline-light me-2" href="sesion.html">
                Login
              </a>
              <a className="btn btn-success" href="registro.html">
                Registro
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
