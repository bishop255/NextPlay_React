import React from "react";
import { useCarrito } from "../context/useCarrito";

export const CartView = ({ isOpen, onClose }) => {
    const { carrito, removeFromCart } = useCarrito();

    const calcularTotal = () =>
        carrito.reduce((acc, item) => acc + item.price, 0);

    return (
        <div
        className={`offcanvas offcanvas-end ${isOpen ? "show" : ""}`}
        tabIndex="-1"
        id="cartOffcanvas"
        aria-labelledby="cartOffcanvasLabel"
        style={{ visibility: isOpen ? "visible" : "hidden" }}
        >
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="cartOffcanvasLabel">
            Tu Carrito
            </h5>
            <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
            ></button>
        </div>
        <div className="offcanvas-body">
            {carrito.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <ul className="list-group">
                    {carrito.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{item.name}</strong>
                                <br />
                                <span>${item.price.toLocaleString("es-CL")}</span>
                            </div>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removeFromCart(index)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {carrito.length > 0 && (
                <div className="mt-3">
                    <h5>Total: ${calcularTotal().toLocaleString("es-CL")}</h5>
                    <button className="btn btn-success w-100 mt-2" onClick={() => alert("Compra realizada con éxito")}>
                        Finalizar compra
                    </button>
                </div>
                )}
            </div>
        </div>
    );
};
