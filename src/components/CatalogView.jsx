import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { ProductCardView } from "./ProductCardView";

// se muestra los productos del catalogo
export const CatalogView = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <div className="cards-container row">
      {}
      {products.map((prod) => (
        <ProductCardView key={prod.id} product={prod} />
      ))}
    </div>
  );
};

