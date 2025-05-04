import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  categoryName: "Wszystkie",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setCategoryName(state, action) {
      state.categoryName = action.payload;
    },
  },
});

export const selectCategoryId = (state) => state.category;
export const selectCategoryName = (state) => state.category;

export const { setCategoryId, setCategoryName } = categorySlice.actions;
export default categorySlice.reducer;
