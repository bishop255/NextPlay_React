import { useState } from "react";
import { useCarrito } from "../context/useCarrito.jsx";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = ({ onSearch, onOpenLogin, onOpenRegistro, user, onLogout, onOpenCart }) => {
  const { carrito } = useCarrito();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // no esta disponible esta funcion xD // 
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value);
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/img/logo_web1.png"
            alt="Logo"
            className="logo-index"
            style={{ width: "90px", height: "90px", objectFit: "contain" }}
          />
        </Link>

        
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
            <li className="nav-item"><Link className="nav-link active" to="/">Tienda</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/comunidad">Comunidad</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/acerca">Acerca De</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/soporte">Soporte</Link></li>
          </ul>

          //no disponible//
          <form className="search-index me-3" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control"
              type="search"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleChange}
            />
          </form>

        
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-light me-2"
              onClick={onOpenCart}
            >
              <i className="bi bi-cart"></i> Carrito ({carrito?.length || 0})
            </button>

            {user ? (
              <>
                <span className="text-light me-3">Hola, {user.username}</span>
                <button className="btn btn-danger" onClick={onLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-light me-2"
                  onClick={onOpenLogin}
                >
                  Login
                </button>
                <button
                  className="btn btn-success"
                  onClick={onOpenRegistro}
                >
                  Registro
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
