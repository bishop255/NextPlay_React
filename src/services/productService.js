/**
 * Funcion para obtener productos
 * @return json(products)
 * @since 30-11-2025
 * @author Andres Moreno
 */

export const getProducts = async() => {
    const response = await fetch('http://localhost:8081/products');
    const products = await response.json();

    return products;
}

export const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

export const deleteProduct = async(id) => {
    await fetch(`http://localhost:8081/products/${id}`, {
        method: 'DELETE'
    });
}

export const createProduct = async(product) => {
    const response = await fetch('http://localhost:8081/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Error al crear el producto');
    }

    return await response.json();
}