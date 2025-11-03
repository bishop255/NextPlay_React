export const Carrito = ({ onOpenLogin, onOpenRegistro }) => {
  const { carrito, eliminarDelCarrito, vaciarCarrito, total } = useCarrito();
  
  const handlePagar = () => {
    if (carrito.length === 0) {
      alert("Carrito vacío");
      return;
    }
    if (window.confirm("¿Finalizar compra?")) {
      alert("🎉 ¡Felicidades por su compra! 🎉");
      vaciarCarrito();
    }
  };

  return (
    <>
      <Navbar onOpenLogin={onOpenLogin} onOpenRegistro={onOpenRegistro} />
      <div style={{textAlign: 'center', margin: '20px 0'}}>
        <h2>🛒 Carrito de Compras</h2>
      </div>
      <div style={{maxWidth: '900px', margin: '0 auto', padding: '20px'}}>
        <table className="table table-hover">
          <thead>
            <tr><th>Producto</th><th className="text-center">Precio</th><th className="text-center">Eliminar</th></tr>
          </thead>
          <tbody>
            {carrito.length === 0 ? (
              <tr><td colSpan="3" className="text-center">No hay productos</td></tr>
            ) : (
              carrito.map((p, i) => (
                <tr key={i}>
                  <td>{p.nombre}</td>
                  <td className="text-center">{p.precio.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</td>
                  <td className="text-center">
                    <button className="btn btn-warning btn-sm" onClick={() => eliminarDelCarrito(i)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p className="fs-4 text-center">TOTAL: {total.toLocaleString('es-CL', {style: 'currency', currency: 'CLP'})}</p>
        <div className="d-flex gap-2 justify-content-center">
          <a href="/" className="btn btn-outline-primary">Seguir comprando</a>
          <button className="btn btn-success" onClick={handlePagar}>Finalizar Compra</button>
        </div>
      </div>
      <Footer />
    </>
  );
};