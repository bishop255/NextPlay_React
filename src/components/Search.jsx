import { getProducts } from "../services/productService";
import { products } from "../data/products";
import React, { useState } from "react";
import { Navbar } from "./Navbar";

    const [products, setProducts] = useState([]);

    useEffect(
        () => {
            setProducts(getProducts());
        }, []);
export const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra productos según searchTerm
  const filteredProducts = productos.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      {/* Aquí renderizas la lista o tabla filtrada con filteredProducts */}
      <div className="container mt-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <div key={prod.id}>
              <h5>{prod.name}</h5>
              <p>{prod.description}</p>
              <p>${prod.price}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </>
  );
};
