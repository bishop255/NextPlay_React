import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('carrito');
    if (saved) setCarrito(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const anadirAlCarrito = (nombre, precio) => {
    const existe = carrito.find(p => p.nombre === nombre);
    if (existe && !window.confirm('El juego ya existe. ¿Agregar de nuevo?')) return;
    setCarrito([...carrito, { nombre, precio: Number(precio) }]);
    alert('Se agregó "' + nombre + '" al carrito ✅');
  };

  const eliminarDelCarrito = (index) => setCarrito(carrito.filter((_, i) => i !== index));
  const vaciarCarrito = () => setCarrito([]);
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  return (
    <CarritoContext.Provider value={{ carrito, anadirAlCarrito, eliminarDelCarrito, vaciarCarrito, total }}>
      {children}
    </CarritoContext.Provider>
  );
};
