import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CarritoProvider, useCarrito } from '../context/useCarrito';

describe('useCarrito Hook', () => {
  // 🔹 Limpia localStorage antes de cada prueba
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks(); // limpia mocks como alert o confirm
  });

  // 🔹 Wrapper para renderHook
  const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;

  it('debe iniciar con carrito vacío', () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });

    expect(result.current.carrito).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it('debe agregar un producto al carrito', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {}); // silencia alert
    vi.spyOn(window, 'confirm').mockReturnValue(true); // confirma siempre

    const { result } = renderHook(() => useCarrito(), { wrapper });

    const producto = { id: 1, name: 'Juego Test', price: 10000 };

    act(() => {
      result.current.addToCart(producto);
    });

    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].name).toBe('Juego Test');
    expect(result.current.total).toBe(10000);
  });

  it('debe eliminar un producto del carrito', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    const { result } = renderHook(() => useCarrito(), { wrapper });

    const producto1 = { id: 1, name: 'Juego 1', price: 10000 };
    const producto2 = { id: 2, name: 'Juego 2', price: 20000 };

    act(() => {
      result.current.addToCart(producto1);
      result.current.addToCart(producto2);
    });

    expect(result.current.carrito).toHaveLength(2);

    act(() => {
      result.current.removeFromCart(1); // eliminar por ID
    });

    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].id).toBe(2);
  });

  it('debe vaciar el carrito completamente', () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    const { result } = renderHook(() => useCarrito(), { wrapper });

    const producto1 = { id: 1, name: 'Juego 1', price: 10000 };
    const producto2 = { id: 2, name: 'Juego 2', price: 20000 };

    act(() => {
      result.current.addToCart(producto1);
      result.current.addToCart(producto2);
    });

    expect(result.current.carrito).toHaveLength(2);
    expect(result.current.total).toBe(30000);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.carrito).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });
});
