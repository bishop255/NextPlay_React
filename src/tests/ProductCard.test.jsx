import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCardView from "../components/ProductCardView";
import { CarritoProvider } from '../context/useCarrito';

const renderWithCarrito = (component) => {
  return render(
    <CarritoProvider>
      {component}
    </CarritoProvider>
  );
};

describe('ProductCardView Component', () => {
  const productoMock = {
    id: 1,
    image: '/img/test.jpg',
    name: 'Juego de Prueba',
    price: 29990,
    description: 'Descripción del juego de prueba'
  };

  it('debe renderizar la información del producto correctamente', () => {
    renderWithCarrito(<ProductCardView {...productoMock} />);
    
    expect(screen.getByText('Juego de Prueba')).toBeInTheDocument();
    expect(screen.getByText('Descripción del juego de prueba')).toBeInTheDocument();
  });

  it('debe renderizar la imagen del producto', () => {
    renderWithCarrito(<ProductCardView {...productoMock} />);
    
    const imagen = screen.getByAltText('Juego de Prueba');
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('src', '/img/test.jpg');
  });

  it('debe tener un botón de añadir al carrito', () => {
    renderWithCarrito(<ProductCardView {...productoMock} />);
    
    const boton = screen.getByRole('button', { name: /añadir al carrito/i });
    expect(boton).toBeInTheDocument();
  });

  it('debe mostrar alerta al agregar producto', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderWithCarrito(<ProductCardView {...productoMock} />);
    
    const boton = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(boton);
    
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining('Juego de Prueba')
    );
    
    alertMock.mockRestore();
  });
});
