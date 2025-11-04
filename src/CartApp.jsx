import { Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/useCarrito";
import { CatalogView } from "./components/CatalogView";
import { Navbar } from "./components/Navbar";
import { Carrusel } from "./components/Carrusel";
import { LoginSidebar } from "./components/LoginSidebar";
import { Footer } from "./components/Footer";
import { RegistroSidebar } from "./components/RegistroSidebar";
import { Carrito } from "./pages/Carrito";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const CartApp = () => {
  const [isLoginOpen, SetIsLoginOpen] = useState(false);
  const [isRegistroOpen, SetIsRegistroOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpenLogin = () => SetIsLoginOpen(true);
  const handleCloseLogin = () => SetIsLoginOpen(false);
  const handleOpenRegistro = () => SetIsRegistroOpen(true);
  const handleCloseRegistro = () => SetIsRegistroOpen(false);

  const handleSwitchToRegistro = () => {
    SetIsLoginOpen(false);
    SetIsRegistroOpen(true);
  };
  const handleSwitchToLogin = () => {
    SetIsRegistroOpen(false);
    SetIsLoginOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const handlerLogin = ({ username, password }) => {
    if (username === "test" && password === "1234") {
      setUser({ username });
      localStorage.setItem("user", JSON.stringify({ username }));
      return true;
    }
    Swal.fire("Error", "El usuario o la contraseña son incorrectas", "error");
    return false;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <CarritoProvider>
      <nav>
        {user ? (
          <div>
            Bienvenido, {user.username}
            <button onClick={handleLogout} className="btn-neon-red">
              Cerrar sesión
            </button>
          </div>
        ) : null}
        <Navbar onOpenLogin={handleOpenLogin} onOpenRegistro={handleOpenRegistro} />
        <LoginSidebar
          isOpen={isLoginOpen}
          onClose={handleCloseLogin}
          onSwitchToRegistro={handleSwitchToRegistro}
          handlerLogin={handlerLogin}
        />
        <RegistroSidebar
          isOpen={isRegistroOpen}
          onClose={handleCloseRegistro}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </nav>

      <Routes>
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
        <Route
          path="/carrito"
          element={<Carrito onOpenLogin={handleOpenLogin} onOpenRegistro={handleOpenRegistro} />}
        />
      </Routes>

      <footer>
        <Footer />
      </footer>
    </CarritoProvider>
  );
};

export default CartApp;
