import React from "react";
import { useCarrito } from "../context/useCarrito";

export const ProductCardView = ({ product, onDelete, isAdmin }) => {
  const { addToCart } = useCarrito();

  if (!product) {
    return <div className="alert alert-warning">Producto no disponible</div>;
  }

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <div style={{ height: "250px", overflow: "hidden", position: "relative" }}>
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {isAdmin && onDelete && (
            <button
              className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
              onClick={() => onDelete(product.id)}
              title="Eliminar producto"
            >
              ❌
            </button>
          )}
        </div>

        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title text-center">{product.name}</h5>
          <p className="card-text text-muted text-center">{product.description}</p>
          <p className="card-text fw-bold text-center mb-3">
            Precio: ${product.price.toLocaleString("es-CL")}
          </p>

          <button
            className="btn btn-success mt-auto"
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
