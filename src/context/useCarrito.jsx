import React, { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return context;
};

export const CarritoProvider = ({ children, user, onNotify }) => {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("carrito");
    if (saved) setCarrito(JSON.parse(saved));
  }, []);

  // Guardar carrito en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Vaciar carrito cuando user cambia (log in/log out)
  useEffect(() => {
    setCarrito([]);
  }, [user]);

  const anadirAlCarrito = (id, nombre, precio) => {
    const index = carrito.findIndex((p) => p.id === id);
    if (index !== -1) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito[index].cantidad += 1;
      setCarrito(nuevoCarrito);
      onNotify && onNotify(`Cantidad incrementada de "${nombre}" ✅`);
    } else {
      setCarrito([...carrito, { id, nombre, precio: Number(precio), cantidad: 1 }]);
      onNotify && onNotify(`Se agregó "${nombre}" al carrito ✅`);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((p) => p.id !== id));
    onNotify && onNotify("Producto eliminado del carrito 🗑️");
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad < 1) return;
    const nuevoCarrito = carrito.map((p) => (p.id === id ? { ...p, cantidad } : p));
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    onNotify && onNotify("Carrito vacío 🧹");
  };

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        anadirAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
