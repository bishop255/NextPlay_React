import { CarritoProvider } from "./context/useCarrito";
import { CatalogView } from "./components/CatalogView"
import { Navbar } from "./components/Navbar"
import { Carrusel } from "./components/Carrusel"
import { LoginSidebar } from "./components/LoginSidebar"
import { Footer } from "./components/Footer"
import { useState, useEffect } from "react";
import { RegistroSidebar } from "./components/RegistroSidebar";
import Swal from "sweetalert2";

export const CartApp = () => {
  const [isLoginOpen, SetIsLoginOpen] = useState(false);

  const handleOpenLogin = () => SetIsLoginOpen(true);
  const handleCloseLogin = () => SetIsLoginOpen(false);

  const [IsRegistroOpen, SetIsRegistroOpen] = useState(false);

  const handleOpenRegistro = () => SetIsRegistroOpen(true);
  const handleCloseRegistro = () => SetIsRegistroOpen(false);

  const handleSwitchToRegistro = () => {SetIsLoginOpen(false);
                                      SetIsRegistroOpen(true);
  }

  const handleSwitchToLogin = () => {SetIsRegistroOpen(false)
                                    SetIsLoginOpen(true);
  }

  const [user, setUser] = useState(null);

  const handlerLogin = ({username, password}) => {
    if (username === "test" && password === "1234") {
      setUser({username});
      localStorage.setItem("user", JSON.stringify({username}));
      return true;
    }

    Swal.fire("Error", "El usuario o la contraseña son incorrectas", "error");
  return false
  }

    // Si quieres simular persistencia al recargar, recupera user en useEffect
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Para cerrar sesión
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <CarritoProvider>
      <nav>
      {
        user
          ? <div>
              Bienvenido, {user.username}
              <button onClick={handleLogout} className="btn-neon-red">Cerrar sesión</button>
            </div>
          : null
      }
        <Navbar onOpenLogin={handleOpenLogin} onOpenRegistro={handleOpenRegistro}/>
        <LoginSidebar isOpen={isLoginOpen} onClose={handleCloseLogin} onSwitchToRegistro={handleSwitchToRegistro} handlerLogin={handlerLogin}/>
        <RegistroSidebar isOpen={IsRegistroOpen} onClose={handleCloseRegistro} onSwitchToLogin={handleSwitchToLogin} />
      </nav>

      <div>
        <Carrusel/>
      </div>

      <div className="container">
        <h1 className="productos">Recomendado para ti</h1>
        <CatalogView />
      </div>

      <footer>
        <Footer/>
      </footer>
    </CarritoProvider>
  );
};
