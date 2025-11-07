import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginSidebar } from '../components/LoginSidebar';

describe('LoginSidebar Component', () => {
  it('no debe renderizar cuando isOpen es false', () => {
    const { container } = render(
      <LoginSidebar isOpen={false} onClose={() => {}} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('debe renderizar cuando isOpen es true', () => {
    render(<LoginSidebar isOpen={true} onClose={() => {}} />);
    
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
  });

  it('debe tener campos de email y contraseña', () => {
    render(<LoginSidebar isOpen={true} onClose={() => {}} />);
    
    // Buscar por placeholder o label
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('debe tener botón para cerrar el sidebar', () => {
    const onCloseMock = vi.fn();
    
    render(<LoginSidebar isOpen={true} onClose={onCloseMock} />);
    
    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalled();
  });
});