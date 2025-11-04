import React, { createContext, useContext, useState } from "react";

// se crea el contexto
const CarritoContext = createContext();


export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return context;
};


export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    try {
      const saved = localStorage.getItem("carrito");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("❌ Error al cargar carrito desde localStorage:", error);
      return [];
    }
  });

  // se guarda cada vez que se genere un cambio
  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  // Agregar producto
  const addToCart = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);
    if (existe) {
      const confirmar = window.confirm(`El producto "${producto.name}" ya está en el carrito. ¿Agregar de nuevo?`);
      if (!confirmar) return;
    }
    const nuevo = [...carrito, producto];
    guardarCarrito(nuevo);
    alert(`✅ Se agregó "${producto.name}" al carrito`);
  };

  // Eliminar producto
  const removeFromCart = (index) => {
    const nuevo = carrito.filter((_, i) => i !== index);
    guardarCarrito(nuevo);
  };

  // Vaciar carrito
  const clearCart = () => {
    guardarCarrito([]);
  };

  // Total
  const total = carrito.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <CarritoContext.Provider
      value={{ carrito, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

