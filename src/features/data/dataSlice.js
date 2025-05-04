import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";

export const fetchData = createAsyncThunk(
  'data/fetchDataStatus',
  async (params, thunkAPI) => {
    const { data } = await axios.get(`${API_BASE_URL}?${params}`);
    if(data.length === 0)
      thunkAPI.rejectWithValue(
        'No data found'
      )
    return thunkAPI.fulfillWithValue(data);
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

export const selectData = (state) => state.data;

export default dataSlice.reducer;
