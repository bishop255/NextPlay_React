import React, { useState } from "react";
import { createProduct } from "../services/productService";

export const CreateProductView = ({ onProductCreated }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(form);
      setForm({ name: "", description: "", price: 0, image: "" });

      if (onProductCreated) {
        onProductCreated();
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <h3>Crear Producto</h3>
      <form className="w-50" onSubmit={onSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={onChange}
        />

        <input
          className="form-control mb-2"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={onChange}
        />

        <input
          className="form-control mb-2"
          name="price"
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={onChange}
        />

        <input
          className="form-control mb-2"
          name="image"
          placeholder="URL de la imagen"
          value={form.image}
          onChange={onChange}
        />

        <button className="btn btn-primary" type="submit">
          Guardar Producto
        </button>
      </form>
    </div>
  );
};
