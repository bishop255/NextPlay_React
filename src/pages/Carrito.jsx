import React from "react";
import { useCarrito } from "../context/useCarrito";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";

export const Carrito = ({ onOpenLogin, onOpenRegistro, onNotify }) => {
  const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, total } = useCarrito();
  const navigate = useNavigate();

  const handleSeguirComprando = () => {
    navigate("/");
  }

  const handlePagar = () => {
    if (carrito.length === 0) {
      onNotify && onNotify("Carrito vacío");
      return;
    }
    if (window.confirm("¿Finalizar compra?")) {
      onNotify && onNotify("🎉 ¡Felicidades por su compra! 🎉");
      vaciarCarrito();
    }
  };

  const handleCantidadChange = (id, e) => {
    const cantidad = Number(e.target.value);
    if (!isNaN(cantidad) && cantidad > 0) {
      actualizarCantidad(id, cantidad);
    }
  };

  return (
    <>
      
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h2>🛒 Carrito de Compras</h2>
      </div>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-center">Precio</th>
              <th className="text-center">Cantidad</th>
              <th className="text-center">Subtotal</th>
              <th className="text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {carrito.length === 0 ? (
              <tr><td colSpan="5" className="text-center">No hay productos</td></tr>
            ) : (
              carrito.map(({ id, nombre, precio, cantidad }) => (
                <tr key={id}>
                  <td>{nombre}</td>
                  <td className="text-center">{precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                  <td className="text-center">
                    <input 
                      type="number" 
                      min="1" 
                      value={cantidad} 
                      onChange={(e) => handleCantidadChange(id, e)} 
                      style={{ width: '60px', textAlign: 'center' }}
                    />
                  </td>
                  <td className="text-center">{(precio * cantidad).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                  <td className="text-center">
                    <button className="btn btn-warning btn-sm" onClick={() => eliminarDelCarrito(id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p className="fs-4 text-center">TOTAL: {total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
        <div className="d-flex gap-2 justify-content-center">
          <a className="btn btn-outline-primary" onClick={handleSeguirComprando}>Seguir comprando</a>
          <button className="btn btn-success" onClick={handlePagar}>Finalizar Compra</button>
        </div>
      </div>
    </>
  );
};