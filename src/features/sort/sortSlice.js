import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortType: "rating",
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const selectSortType = (state) => state.sort;

export const { setSortType } = sortSlice.actions;
export default sortSlice.reducer;
