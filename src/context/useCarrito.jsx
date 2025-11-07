import React, { createContext, useContext, useState } from "react";

//Crear el contexto del carrito
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

  
  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    try {
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    } catch (error) {
      console.error("⚠️ No se pudo guardar el carrito:", error);
    }
  };

  //  Agregar producto 
  const addToCart = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);
    if (existe) {
      const confirmar = window.confirm(
        `El producto "${producto.name}" ya está en el carrito. ¿Agregar de nuevo?`
      );
      if (!confirmar) return;
    }

    const nuevo = [...carrito, producto];
    guardarCarrito(nuevo);

    // Evita alertas en entorno de test
    if (import.meta.env.MODE !== "test") {
      alert(`✅ Se agregó "${producto.name}" al carrito`);
    }
  };

  //  Eliminar producto por ID (más seguro que por índice)
  const removeFromCart = (id) => {
    const nuevo = carrito.filter((p) => p.id !== id);
    guardarCarrito(nuevo);
  };

  //  Vaciar carrito
  const clearCart = () => {
    guardarCarrito([]);
  };

  //  Calcular total automáticamente
  const total = carrito.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        addToCart,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
