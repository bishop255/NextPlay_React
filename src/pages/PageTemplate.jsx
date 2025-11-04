import React from "react";


export const PageTemplate = ({ title, onOpenLogin, onOpenRegistro }) => (
  <>
    
    <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>
      <h1 style={{ fontFamily: 'Orbitron', fontSize: '50px' }}>{title}</h1>
      <p style={{ fontFamily: 'Orbitron', fontSize: '20px', marginTop: '50px' }}>
        Página en mantenimiento
      </p>
    </div>
    
  </>
);
