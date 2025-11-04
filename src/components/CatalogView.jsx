import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { ProductCardView } from "./ProductCardView";

export const CatalogView = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <div className="cards-container">
      {products.map(prod => (
        <ProductCardView
          key={prod.id}
          image={prod.image}
          name={prod.name}
          description={prod.description}
          price={prod.price}
        />
      ))}
    </div>
  );
};
