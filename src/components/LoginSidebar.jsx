import { useEffect, useState } from "react";


export const LoginSidebar = ({ isOpen, onClose, OnSwitchToRegistro }) => {
  const [form, setForm] = useState({ email: "", password: "", remember: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Ingrese email y contraseña");
      return;
    }
    alert("Bienvenido de vuelta amigo gamer!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose}></div>
      <div className="sidebar-panel">
        <div className="sidebar-header">
          <h2>Bienvenido Gamer!</h2>
          <button className="btn-close-sidebar" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sidebar-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="sidebar-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="example@email.com"
              />
              <div className="sidebar-hint">Nunca compartiremos tu correo</div>
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="sidebar-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                placeholder="••••••••"
              />
              <div className="sidebar-forgot">
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
              />
              <label className="form-check-label">Mantenerme conectado</label>
            </div>

            <button type="submit" className="btn-neon-green">
              Iniciar Sesión
            </button>

            <div className="sidebar-footer">
              ¿No tienes cuenta?{""}
              <button type="button" className="btn-link-neon" onClick={OnSwitchToRegistro}>
                Regístrate aquí
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
