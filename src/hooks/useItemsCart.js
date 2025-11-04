import { useCarrito } from "../context/useCarrito";

export const useItemsCart = () => {
  const { carrito, anadirAlCarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito, total } = useCarrito();

  const handlerAddProductCart = (producto) => {
    const { id, name, precio } = producto;
    anadirAlCarrito(id, name || producto.nombre, precio || producto.price);
  };

  return {
    carrito,
    handlerAddProductCart,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    total,
  };
};
