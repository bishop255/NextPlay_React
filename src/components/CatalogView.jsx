import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import { ProductCardView } from "./ProductCardView";
import Swal from "sweetalert2";

export const CatalogView = ({ refreshCatalog }) => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const findAll = async () => {
    try {
      const prods = await getProducts();
      setProducts(prods);
    } catch (e) {
      Swal.fire("Error", "No se pudieron cargar los productos", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findAll();
  }, [refreshCatalog]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      Swal.fire("Eliminado", "El producto fue eliminado", "success");
    } catch (e) {
      Swal.fire("Error", "No se pudo eliminar el producto", "error");
    }
  };

  return (
    <>
      {isLoading && (
        <div className="alert alert-info">Cargando ...</div>
      )}

      <div className="row">
        {products.map(prod => (
          <ProductCardView
            key={prod.id}
            product={prod}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};
