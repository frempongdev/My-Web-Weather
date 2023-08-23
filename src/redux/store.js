import { configureStore } from '@reduxjs/toolkit';
import geolocationReducer from './Geolocation/GeolocationSlice';
import weatherReducer from './weather/WeatherSlice';

const store = configureStore({
  reducer: {
    location: geolocationReducer,
    weather: weatherReducer,
  },
});

export default store;
