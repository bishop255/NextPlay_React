import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const initialLoginForm = {
  username: "",
  password: "",
};

export const LoginSidebar = ({ isOpen, onClose, handlerLogin, onSwitchToRegistro }) => {
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  // enviar al formualrio
  const onSubmit = (event) => {
    event.preventDefault();

    // Validación sencilla con SweetAlert
    if (!username || !password) {
      Swal.fire("Error de validación", "Username y password requeridos", "error");
      return;
    }

    handlerLogin({ username, password });

    // Limpia formulario y cierra el sidebar
    setLoginForm(initialLoginForm);
    onClose();
  };

  // No renderiza si el sidebar está cerrado
  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose}></div>
      <div className="sidebar-panel">
        <div className="sidebar-header">
          <h2 style={{ fontFamily: "Orbitron", color: "#00ff9d", margin: 0 }}>Iniciar Sesión</h2>
          <button className="btn-close-sidebar" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="sidebar-body">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input
                name="username"
                placeholder="Username"
                className="form-control sidebar-input"
                value={username}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="form-control sidebar-input"
                value={password}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn-neon-green w-100 mb-3">
              Iniciar Sesión
            </button>
          </form>

          <div className="sidebar-footer">
            ¿No tienes cuenta?{" "}
            <button type="button" className="btn-link-neon" onClick={onSwitchToRegistro}>
              Regístrate aquí
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
