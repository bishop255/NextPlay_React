import React from "react";
import { useCarrito } from "../context/useCarrito";

export const CartSidebar = ({ isOpen, onClose }) => {
  const { carrito, removeFromCart, clearCart, total } = useCarrito();

  const handleFinalizarCompra = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const confirmar = confirm(
      "¿Estás seguro de que quieres finalizar la compra?"
    );
    if (confirmar) {
      alert("🎉 Felicidades por su compra 🎮");
      clearCart();
      onClose();
    }
  };

  return (
    <div
      className={`offcanvas offcanvas-end ${isOpen ? "show" : ""}`}
      tabIndex="-1"
      id="cartOffcanvas"
      style={{
        visibility: isOpen ? "visible" : "hidden",
        backgroundColor: "#1a1a1a",
        color: "white",
      }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">🛒 Tu Carrito</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={onClose}
        ></button>
      </div>

      <div className="offcanvas-body">
        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul className="list-group">
            {carrito.map((producto) => (
              <li
                key={producto.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{producto.name}</span>
                <span>${producto.price.toLocaleString("es-CL")}</span>
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => removeFromCart(producto.id)}  // 👈 eliminar por id
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        <hr />
        <h5>Total: ${total.toLocaleString("es-CL")}</h5>

        <button
          className="btn btn-success mt-3 w-100"
          onClick={handleFinalizarCompra}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
};
