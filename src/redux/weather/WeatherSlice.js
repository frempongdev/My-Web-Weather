import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  weatherDetails: {},
  isLoading: false,
};

export const fetchWeather = createAsyncThunk('fetch/fetchWeather', async (payload) => {
  const { latitude, longitude } = payload;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cc885dd3877084c87abb1055d2ab813c`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(url);
  // console.log(typeof iconID);
  return data;
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(fetchWeather.fulfilled, (state, { payload }) => (
        { ...state, isLoading: false, weatherDetails: payload }))
      .addCase(fetchWeather.rejected, (state) => ({ ...state, isLoading: true }));
  },
});

export default weatherSlice.reducer;
