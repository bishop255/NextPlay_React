import {
  AddProductCart,
  ClearCart,
  DeleteProductCart,
  UpdateQuantityProductCart,
} from './itemsActions';

export const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case AddProductCart:
      // Agregar nuevo producto
      return [
        ...state,
        {
          product: action.payload,
          quantity: 1,
          total: action.payload.price,
        },
      ];

    case UpdateQuantityProductCart:
      // Si el producto ya existe, aumenta la cantidad
      return state.map((item) =>
        item.product.id === action.payload.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: item.total + item.product.price,
            }
          : item
      );

    case DeleteProductCart:
      // Eliminar producto por id
      return state.filter((item) => item.product.id !== action.payload);

    case ClearCart:
        return[];

    default:
      return state;
  }
};
