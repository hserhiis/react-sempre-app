import cartReducer, { addItem, removeItem, decreaseItem, clearCart } from './features/cart/cartSlice';

const pizzaItem = {
  name: "Quattro Formaggi",
  types: [
    "cienkie",
    "francuskie",
    "pełnoziarniste"
  ],
  sizes: [
    "26 cm",
    "30 cm",
    "35 cm"
  ],
  price: 39.99,
  image: "https://media.dodostatic.com/image/r:584x584/11eee23f6e2e1634b8788fab140d56b7.avif",
  category: 1,
  rating: 10
}

describe('Cart Reducer', () => {
  it('should return the initial state', () => {
    expect(cartReducer(undefined, {type: '@@INIT'})).toEqual({
      cart: [],
      totalPrice: 0
    });
  });
  it('should add item to cart', () => {
    const state = cartReducer(undefined, addItem(pizzaItem));
    expect(state.cart.length).toEqual(1);
    expect(state.cart[0].name).toEqual(pizzaItem.name);
    expect(state.cart[0].price).toEqual(pizzaItem.price);
  });
  it('should decrease item from cart', () => {
    const state = cartReducer(undefined, addItem(pizzaItem));
    const state2 = cartReducer(state, addItem(pizzaItem));
    const state3 = cartReducer(state2, decreaseItem(pizzaItem));
    expect(state3.cart.length).toEqual(1);
  });
  it('should remove item from cart', () => {
    const state = cartReducer(undefined, addItem(pizzaItem));
    const state2 = cartReducer(state, removeItem(pizzaItem));
    expect(state2.cart.length).toEqual(0);
  });
})