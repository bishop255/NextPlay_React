import React, { useState } from "react";
import Swal from "sweetalert2";

export const RegistroSidebar = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    address: "",
    city: "",
    gender: "Seleccione Género",
    terms: false
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = {};
    if (!form.email.trim()) err.email = true;
    if (!form.password.trim()) err.password = true;
    if (!form.address.trim()) err.address = true;
    if (!form.city.trim()) err.city = true;
    if (form.gender === "Seleccione Género") err.gender = true;
    if (!form.terms) err.terms = true;

    if (Object.keys(err).length > 0) {
      setErrors(err);
      Swal.fire("Error", "Completa todos los campos", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        Swal.fire("Error", "El correo ya está en uso", "error");
        return;
      }

      Swal.fire("Registro exitoso", "Bienvenido a NextPlay 🎮", "success");

      onClose();
      setForm({ email: "", password: "", address: "", city: "", gender: "Seleccione Género", terms: false });

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
            Registro
          </h2>
          <button className="btn-close-sidebar" onClick={onClose}>✕</button>
        </div>

        <div className="sidebar-body">
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className={"mb-3 " + (errors.email ? "error" : "")}>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control sidebar-input"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setErrors({ ...errors, email: false });
                }}
                placeholder="email@example.com"
              />
            </div>

            {/* Password */}
            <div className={"mb-3 " + (errors.password ? "error" : "")}>
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control sidebar-input"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  setErrors({ ...errors, password: false });
                }}
                placeholder="•••••••"
              />
            </div>

            {/* Dirección */}
            <div className={"mb-3 " + (errors.address ? "error" : "")}>
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control sidebar-input"
                value={form.address}
                onChange={(e) => {
                  setForm({ ...form, address: e.target.value });
                  setErrors({ ...errors, address: false });
                }}
                placeholder="Calle 1234"
              />
            </div>

            {/* Comuna */}
            <div className={"mb-3 " + (errors.city ? "error" : "")}>
              <label className="form-label">Comuna</label>
              <input
                type="text"
                className="form-control sidebar-input"
                value={form.city}
                onChange={(e) => {
                  setForm({ ...form, city: e.target.value });
                  setErrors({ ...errors, city: false });
                }}
                placeholder="Santiago"
              />
            </div>

            {/* Género */}
            <div className={"mb-3 " + (errors.gender ? "error" : "")}>
              <label className="form-label">Género</label>
              <select
                className="form-select sidebar-input"
                value={form.gender}
                onChange={(e) => {
                  setForm({ ...form, gender: e.target.value });
                  setErrors({ ...errors, gender: false });
                }}
              >
                <option>Seleccione Género</option>
                <option>Femenino</option>
                <option>Masculino</option>
                <option>Otros</option>
              </select>
            </div>

            {/* Terms */}
            <div className={"mb-3 form-check " + (errors.terms ? "error" : "")}>
              <input
                type="checkbox"
                className="form-check-input"
                checked={form.terms}
                onChange={(e) => {
                  setForm({ ...form, terms: e.target.checked });
                  setErrors({ ...errors, terms: false });
                }}
              />
              <label className="form-check-label">
                Acepto los Términos y Condiciones
              </label>
            </div>

            <button type="submit" className="btn btn-neon-green w-100 mb-3">
              Registrarse
            </button>

            <div style={{ textAlign: "center" }}>
              ¿Ya tienes cuenta?{" "}
              <button className="btn-link-neon" onClick={onSwitchToLogin}>
                Inicia sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
