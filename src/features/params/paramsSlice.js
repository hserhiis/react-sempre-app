import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sortType: "rating",
  searchValue: "",
  isSearch: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.searchValue = action.payload.searchValue;
      state.categoryId = action.payload.categoryId;
      state.sortType = action.payload.sortType;
    },
    setIsSearch(state, action) {
      state.isSearch = action.payload;
    }
  },
});

export const { setFilters, setIsSearch } = filterSlice.actions;
export default filterSlice.reducer;
