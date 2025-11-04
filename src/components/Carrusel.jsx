import Carousel from 'react-bootstrap/Carousel';
import { useCarrito } from "../context/useCarrito"; 

export const Carrusel = () => {
  const { addToCart } = useCarrito(); // 

  // Productos del carrusel //
  const juegosCarrusel = [
    {
      id: 7,
      name: "EA SPORTS FC Ultimate Edition",
      price: 52990,
      image: "/img/ea.png"
    },
    {
      id: 8,
      name: "Battlefield 6",
      price: 56990,
      image: "/img/battle.png"
    },
    {
      id: 9,
      name: "Pokémon Scarlet (Nintendo Switch)",
      price: 29990,
      image: "/img/scarlet-violet-169-en.jpg"
    }
  ];

  return (
    <Carousel>
      {juegosCarrusel.map((juego) => (
        <Carousel.Item key={juego.id}>
          <img className="d-block w-100" src={juego.image} alt={juego.name} />
          <Carousel.Caption>
            <h3>${juego.price.toLocaleString("es-CL")}</h3>
            <button
              className="btn-carrusel"
              onClick={() => addToCart(juego)} // 
            >
              {juego.name.includes("Pokémon") ? "COMPRAR YA!" : "RESERVA YA!"}
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
