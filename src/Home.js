import React, { useState } from 'react';
import './style/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocation } from './redux/Geolocation/GeolocationSlice';

const Home = () => {
  const [inputValue, setinputValue] = useState('');
  const { location } = useSelector((state) => state.location);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setinputValue(e.target.value);
    dispatch(fetchLocation(e.target.value));
  };
  return (
    <div>
      <h1 className="header">WEATHER BUDDY</h1>
      <div className="section headline">
        <p className="intro">
          Please Enter a Cordinate or City
        </p>
      </div>
      <section className="search-bar">
        <input type="text" className="search-box" onChange={handleChange} value={inputValue} />
        <input type="button" value="Search" className="search-btn" />
        <div className="results-box">
          {
            location.length > 0 ? (

              location.map((city) => (
                <p className="city-name" key={city.lat}>{`${city?.name}, ${city?.country}`}</p>
              ))

            ) : <p />
}
        </div>
      </section>
    </div>
  );
};

export default Home;
