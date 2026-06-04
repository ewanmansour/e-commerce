export const cloneCart = (cartItems = {}) => structuredClone(cartItems);

export const cartItemsToLines = (cartItems = {}, products = []) => {
  return Object.entries(cartItems).flatMap(([productId, sizes]) => {
    const product = products.find((item) => item._id === productId);

    if (!product) {
      return [];
    }

    return Object.entries(sizes)
      .filter(([, quantity]) => Number(quantity) > 0)
      .map(([size, quantity]) => ({
        ...product,
        size,
        quantity: Number(quantity),
      }));
  });
};

export const calculateCartAmount = (cartItems = {}, products = []) => {
  return cartItemsToLines(cartItems, products).reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
};
