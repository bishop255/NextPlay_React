import Carousel from 'react-bootstrap/Carousel';
import { useItemsCart } from '../hooks/useItemsCart';

export const Carrusel = () => {
  const { handlerAddProductCart } = useItemsCart();

  const productosCarrusel = [
    {
      id: 1,
      nombre: 'EA SPORTS FC Ultimate Edition',
      precio: 52990,
      imagen: '/img/ea.png'
    },
    {
      id: 2,
      nombre: 'Battlefield 6',
      precio: 56990,
      imagen: '/img/battle.png'
    },
    {
      id: 3,
      nombre: 'Pokémon Scarlet (Nintendo Switch)',
      precio: 29990,
      imagen: '/img/scarlet-violet-169-en.jpg'
    }
  ];

  return (
    <Carousel>
      {productosCarrusel.map((producto) => (
        <Carousel.Item key={producto.id}>
          <img
            className="d-block w-100"
            src={producto.imagen}
            alt={producto.nombre}
          />
          <Carousel.Caption>
            <h3>${producto.precio.toLocaleString()}</h3>
            <button
              className="btn-carrusel"
              onClick={() => handlerAddProductCart(producto)}
            >
              RESERVA YA!
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
