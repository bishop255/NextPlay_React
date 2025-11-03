export const PageTemplate = ({ title, onOpenLogin, onOpenRegistro }) => (
  <>
    <Navbar onOpenLogin={onOpenLogin} onOpenRegistro={onOpenRegistro} />
    <div style={{textAlign: 'center', marginTop: '100px'}}>
      <h1 style={{fontFamily: 'Orbitron', fontSize: '50px', color: 'white'}}>{title}</h1>
      <p style={{fontFamily: 'Orbitron', fontSize: '20px', marginTop: '50px'}}>Página en mantenimiento</p>
    </div>
    <Footer />
  </>
);