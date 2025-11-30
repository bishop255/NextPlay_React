import { useState } from "react";
import Swal from "sweetalert2";

const initialLoginForm = {
  email: "",
  password: "",
};

export const LoginSidebar = ({ isOpen, onClose, onSwitchToRegistro }) => {
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { email, password } = loginForm;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      Swal.fire("Error", "Debes ingresar correo y contraseña", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        Swal.fire("Error", "Credenciales invalidas", "error");
        return;
      }

      const user = await response.json();
      Swal.fire("Bienvenido", 'Hola Gamer ${user.email}', "success");

      onClose();
      setLoginForm(initialLoginForm);

    } catch (error) {
      Swal.fire("Error", "No se pudo conectar al servidor", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose}></div>
      <div className="sidebar-panel">
        <div className="sidebar-header">
          <h2 style={{ fontFamily: "Orbitron", color: "#00ff9d", margin: 0 }}>
            Iniciar Sesión
          </h2>
          <button className="btn-close-sidebar" onClick={onClose}>✕</button>
        </div>
        <div className="sidebar-body">
          <form onSubmit={onSubmit}>

            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                name="email"
                placeholder="email@example.com"
                className="form-control sidebar-input"
                value={email}
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
            <button className="btn-link-neon" onClick={onSwitchToRegistro}>
              Regístrate aquí
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
