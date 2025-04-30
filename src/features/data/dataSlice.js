import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";

export const fetchData = createAsyncThunk(
  'data/fetchDataStatus',
  async (params) => {
    const { data } = await axios.get(`${API_BASE_URL}?${params}`);
    return data;
  }
);

const initialState = {
  data: [],
  status: 'pending'
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'pending';
        state.data = [];
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'rejected';
        state.data = [];
        fetchData();
      });
  }
});

export default dataSlice.reducer;
