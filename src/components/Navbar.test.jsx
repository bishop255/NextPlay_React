import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./Navbar";

// 🔧 Mockea el contexto para evitar importar todo
vi.mock("../context/useCarrito.jsx", () => ({
  useCarrito: () => ({ carrito: [] }),
}));

test("renderiza el texto Tienda en el Navbar", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  expect(screen.getByText(/Tienda/i)).toBeInTheDocument();
});
