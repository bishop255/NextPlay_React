import { Routes, Route, Navigate } from "react-router-dom";
import { CatalogView } from "../components/CatalogView";
import { CartView } from "../components/CartView";
import { useCarrito } from "../context/useCarrito.jsx";

export const CartRoutes = () => {
  const { carrito, handlerAddProductCart, handlerDeleteProductCart } = useCarrito();

  return (
    <Routes>
      <Route
        path="/catalog"
        element={<CatalogView handler={handlerAddProductCart} />}
      />
      <Route
        path="/carrito"
        element={
          carrito.length === 0 ? (
            <div className="alert alert-warning text-center mt-5">
              No hay productos en el carrito de compras!
            </div>
          ) : (
            <CartView
              items={carrito}
              handlerDelete={handlerDeleteProductCart}
            />
          )
        }
      />
      <Route path="*" element={<Navigate to="/catalog" replace />} />
    </Routes>
  );
};
