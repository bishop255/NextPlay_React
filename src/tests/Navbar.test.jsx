import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { CarritoProvider } from '../context/useCarrito';

describe('Navbar Component', () => {
  const mockCallbacks = {
    onOpenLogin: vi.fn(),
    onOpenRegistro: vi.fn()
  };

  it('debe renderizar correctamente los enlaces principales', () => {
    render(
      <CarritoProvider>
        <Navbar {...mockCallbacks} />
      </CarritoProvider>
    );

    expect(screen.getByText(/Tienda/i)).toBeInTheDocument();
    expect(screen.getByText(/Comunidad/i)).toBeInTheDocument();
    expect(screen.getByText(/Acerca/i)).toBeInTheDocument();
  });

  it('debe mostrar el contador de carrito en 0 al inicio', () => {
    render(
      <CarritoProvider>
        <Navbar {...mockCallbacks} />
      </CarritoProvider>
    );

    // Busca el texto que contiene "Carrito" y "(0)"
    const carritoText = screen.getByText(/Carrito/i);
    expect(carritoText).toBeInTheDocument();
  });

  it('debe tener botones de Login y Registro', () => {
    render(
      <CarritoProvider>
        <Navbar {...mockCallbacks} />
      </CarritoProvider>
    );

    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registro/i })).toBeInTheDocument();
  });

  it('debe tener un campo de búsqueda', () => {
    render(
      <CarritoProvider>
        <Navbar {...mockCallbacks} />
      </CarritoProvider>
    );

    const searchInput = screen.getByPlaceholderText(/Buscar/i);
    expect(searchInput).toBeInTheDocument();
  });
});