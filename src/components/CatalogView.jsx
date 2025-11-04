import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { ProductCardView } from "./ProductCardView";
import { useItemsCart } from "../hooks/useItemsCart";

export const CatalogView = () => {
  const [products, setProducts] = useState([]);
  const { handlerAddProductCart } = useItemsCart();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <div className="cards-container">
      {products.map((product) => (
        <ProductCardView
          key={product.id}
          product={product}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          onAddToCart={handlerAddProductCart}
        />
      ))}
    </div>
  );
};
