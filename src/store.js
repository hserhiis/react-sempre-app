import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/search/searchSlice";
import categoryReducer from "./features/category/categorySlice";
import sortReducer from "./features/sort/sortSlice";
import cartReducer from "./features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    category: categoryReducer,
    sort: sortReducer,
    cart: cartReducer,
  },
});
