import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Routes, Route } from "react-router-dom";

import { CarritoProvider } from "./context/useCarrito";
import { Navbar } from "./components/Navbar";
import { LoginSidebar } from "./components/LoginSidebar";
import { RegistroSidebar } from "./components/RegistroSidebar";
import { CatalogView } from "./components/CatalogView";
import { Carrusel } from "./components/Carrusel";
import { Footer } from "./components/Footer";
import { Carrito } from "./pages/Carrito";
import { PageTemplate } from "./pages/PageTemplate"; // asegúrate que exista en src/pages/PageTemplate.jsx

const CartApp = () => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistroOpen, setIsRegistroOpen] = useState(false);

  // 🔄 Recuperar usuario del localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // 🔐 Login
  const handlerLogin = ({ username, password }) => {
    if (username === "test" && password === "1234") {
      setUser({ username });
      localStorage.setItem("user", JSON.stringify({ username }));
      return true;
    }
    Swal.fire("Error", "El usuario o la contraseña son incorrectas", "error");
    return false;
  };

  // 🚪 Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 🔧 Handlers para abrir/cerrar modales
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const openRegistro = () => setIsRegistroOpen(true);
  const closeRegistro = () => setIsRegistroOpen(false);

  return (
    <CarritoProvider user={user} onNotify={(msg) => Swal.fire(msg)}>
      {/* NAVBAR */}
      <Navbar
        onOpenLogin={openLogin}
        onOpenRegistro={openRegistro}
        user={user}
        onLogout={handleLogout}
      />

      {/* SIDEBARS */}
      <LoginSidebar
        isOpen={isLoginOpen}
        onClose={closeLogin}
        handlerLogin={handlerLogin}
        onSwitchToRegistro={() => {
          closeLogin();
          openRegistro();
        }}
      />

      <RegistroSidebar
        isOpen={isRegistroOpen}
        onClose={closeRegistro}
        onSwitchToLogin={() => {
          closeRegistro();
          openLogin();
        }}
      />

      {/* RUTAS */}
      <Routes>
        {/* Página principal */}
        <Route
          path="/"
          element={
            <>
              <Carrusel />
              <div className="container">
                <h1 className="productos">Recomendado para ti</h1>
                <CatalogView />
              </div>
            </>
          }
        />

        {/* Carrito */}
        <Route
          path="/carrito"
          element={<Carrito onOpenLogin={openLogin} onOpenRegistro={openRegistro} />}
        />

        {/* Otras secciones */}
        <Route
          path="/comunidad"
          element={<PageTemplate title="Comunidad" onOpenLogin={openLogin} onOpenRegistro={openRegistro} />}
        />
        <Route
          path="/acerca"
          element={<PageTemplate title="Acerca De" onOpenLogin={openLogin} onOpenRegistro={openRegistro} />}
        />
        <Route
          path="/soporte"
          element={<PageTemplate title="Soporte" onOpenLogin={openLogin} onOpenRegistro={openRegistro} />}
        />
      </Routes>

      {/* FOOTER */}
      <Footer />
    </CarritoProvider>
  );
};

export default CartApp;

