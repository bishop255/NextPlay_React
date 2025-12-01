import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Swal from "sweetalert2";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { CarritoProvider } from "./context/useCarrito";

import { Navbar } from "./components/Navbar";
import { LoginSidebar } from "./components/LoginSidebar";
import { RegistroSidebar } from "./components/RegistroSidebar";
import { CatalogView } from "./components/CatalogView";
import { Carrusel } from "./components/Carrusel";
import { Footer } from "./components/Footer";
import { Carrito } from "./pages/Carrito";
import { PageTemplate } from "./pages/PageTemplate";
import { CartSidebar } from "./components/CartSidebar";
import { CreateProductView } from "./components/CreateProduct";

const CartAppInner = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistroOpen, setIsRegistroOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [refreshCatalog, setRefreshCatalog] = useState(0);

  const { user } = useContext(AuthContext); // 👈 usuario con role

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const openRegistro = () => setIsRegistroOpen(true);
  const closeRegistro = () => setIsRegistroOpen(false);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const handleProductCreated = () => {
    setRefreshCatalog(prev => prev + 1);
    Swal.fire({
      icon: "success",
      title: "¡Producto creado!",
      text: "El producto se ha agregado exitosamente al catálogo",
      timer: 2000,
    });
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <CarritoProvider onNotify={(msg) => Swal.fire(msg)}>

      <Navbar
        onOpenLogin={openLogin}
        onOpenRegistro={openRegistro}
        onOpenCart={handleOpenCart}
      />

      <LoginSidebar
        isOpen={isLoginOpen}
        onClose={closeLogin}
      />

      <RegistroSidebar
        isOpen={isRegistroOpen}
        onClose={closeRegistro}
        onSwitchToLogin={() => {
          closeRegistro();
          openLogin();
        }}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={handleCloseCart}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carrusel />
              <div className="container">
                <div className="my-4">
                  {isAdmin && (
                    <CreateProductView onProductCreated={handleProductCreated} />
                  )}
                </div>

                <h1 className="productos">Recomendado para ti</h1>
                <CatalogView
                  refreshCatalog={refreshCatalog}
                  isAdmin={isAdmin}
                />
              </div>
            </>
          }
        />

        <Route
          path="/carrito"
          element={<Carrito onOpenLogin={openLogin} onOpenRegistro={openRegistro} />}
        />

        <Route path="/comunidad" element={<PageTemplate title="Comunidad" />} />
        <Route path="/acerca" element={<PageTemplate title="Acerca De" />} />
        <Route path="/soporte" element={<PageTemplate title="Soporte" />} />
      </Routes>

      <Footer />
    </CarritoProvider>
  );
};

const CartApp = () => (
  <AuthProvider>
    <CartAppInner />
  </AuthProvider>
);

export default CartApp;
