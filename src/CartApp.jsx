import { CarritoProvider } from "./context/useCarrito";
import { CatalogView } from "./components/CatalogView"
import { Navbar } from "./components/Navbar"
import { Carrusel } from "./components/Carrusel"
import { LoginSidebar } from "./components/LoginSidebar"
import { Footer } from "./components/Footer"
import { useState } from "react"
import { RegistroSidebar } from "./components/RegistroSidebar";

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

  return (
    <CarritoProvider>
      <nav>
        <Navbar onOpenLogin={handleOpenLogin} onOpenRegistro={handleOpenRegistro}/>
        <LoginSidebar isOpen={isLoginOpen} onClose={handleCloseLogin} OnSwitchToRegistro={handleSwitchToRegistro}/>
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
