import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchLocation = createAsyncThunk('location/fetchLocation', async (city) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=cc885dd3877084c87abb1055d2ab813c`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(url);
  // console.log(data);
  return data;
});

const initialState = {
  location: [],
  isLoading: false,
};

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.location = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(fetchLocation.fulfilled, (state, { payload }) => (
        { ...state, isLoading: false, location: payload }))
      .addCase(fetchLocation.rejected, (state) => ({ ...state, isLoading: false }));
  },

});

export const { clearSearchResults } = geolocationSlice.actions;
export default geolocationSlice.reducer;
