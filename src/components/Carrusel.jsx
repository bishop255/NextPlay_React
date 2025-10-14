import Carousel from 'react-bootstrap/Carousel';

export const Carrusel = () => {
  const anadirAlCarrito = (producto, precio) => {
    console.log(`Añadido: ${producto} por $${precio}`);
  };

  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="/img/ea.png" alt="EA Sports" />
        <Carousel.Caption>
          <h3>$52.990</h3>
          <button className="btn-carrusel" onClick={() => anadirAlCarrito("EA SPORTS FC Ultimate Edition", 52990)}>
            RESERVA YA!
          </button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="img/battle.png" alt="Battlefield 6" />
        <Carousel.Caption>
          <h3>$56.990</h3>
          <button className="btn-carrusel" onClick={() => anadirAlCarrito("Battlefield 6", 56990)}>
            RESERVA YA!
          </button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="img/scarlet-violet-169-en.jpg" alt="Pokémon Scarlet" />
        <Carousel.Caption>
          <h3>$29.990</h3>
          <button className="btn-carrusel" onClick={() => anadirAlCarrito("Pokémon Scarlet (Nintendo Switch)", 29990)}>
            COMPRAR YA!
          </button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
