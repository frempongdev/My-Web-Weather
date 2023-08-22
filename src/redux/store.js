import { configureStore } from '@reduxjs/toolkit';
import geolocationReducer from './Geolocation/GeolocationSlice';

const store = configureStore({
  reducer: {
    location: geolocationReducer,
  },
});

export default store;
