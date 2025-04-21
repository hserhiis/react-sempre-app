import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
};

const findCartItem = (cart, payload) => {
  return cart.find(
    (item) =>
      item.name === payload.name &&
      item.type === payload.type &&
      item.size === payload.size
  );
};

const filterCartItem = (cart, payload) => {
  return cart.filter(
    (item) =>
      item.name !== payload.name ||
      item.type !== payload.type ||
      item.size !== payload.size
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const cartPizzaObj = findCartItem(state.cart, action.payload);
      if (cartPizzaObj) {
        cartPizzaObj.count += 1;
        cartPizzaObj.total = cartPizzaObj.price * cartPizzaObj.count;
        state.totalPrice += cartPizzaObj.price;
      } else {
        state.cart.push({
          ...action.payload,
          count: 1,
          total: action.payload.price,
        });
        state.totalPrice += action.payload.price;
      }
    },
    removeItem(state, action) {
      const itemToRemove = findCartItem(state.cart, action.payload);

      if (itemToRemove) {
        state.totalPrice -= itemToRemove.total;
        state.cart = filterCartItem(state.cart, action.payload);
      }
    },

    decreaseItem(state, action) {
      const cartPizzaObj = findCartItem(state.cart, action.payload);
      if (cartPizzaObj) {
        cartPizzaObj.count -= 1;
        cartPizzaObj.total = cartPizzaObj.price * cartPizzaObj.count;
        state.totalPrice -= cartPizzaObj.price;
        if (cartPizzaObj.count === 0) {
          state.cart = filterCartItem(state.cart, action.payload);
        }
      }
    },
    clearCart(state) {
      state.cart = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, decreaseItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
