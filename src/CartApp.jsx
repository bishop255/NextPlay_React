import { CarritoProvider } from "./context/useCarrito";
import { CatalogView } from "./components/CatalogView"
import { Navbar } from "./components/Navbar"
import { Carrusel } from "./components/Carrusel"
import { LoginSidebar } from "./components/LoginSidebar"
import { Footer } from "./components/Footer"
import { useState } from "react"

export const CartApp = () => {
  const [isLoginOpen, SetIsLoginOpen] = useState(false);

  const handleOpenLogin = () => SetIsLoginOpen(true);
  const handleCloseLogin = () => SetIsLoginOpen(false);

  return (
    <CarritoProvider>
      <nav>
        <Navbar onOpenLogin={handleOpenLogin}/>
        <LoginSidebar isOpen={isLoginOpen} onClose={handleCloseLogin}/>
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
