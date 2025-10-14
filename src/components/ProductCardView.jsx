export const ProductCardView = ({ name, description, price, image, onAddToCart }) => {
  return (
    <div className="card" style={{ width: "20rem" }}>
      <div style={{ height: "px", overflow: "hidden" }}>
        <img
          src={image}
          alt={name}
          className="card-img-top"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Precio: $ {price}</p>
        <p className="card-text">{description}</p>
        <button
          type="button"
          className="btn btn-success"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

