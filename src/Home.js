import React, { useEffect, useState } from 'react';
import './style/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocation, clearSearchResults } from './redux/Geolocation/GeolocationSlice';
import { fetchWeather } from './redux/weather/WeatherSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        setCoordinates({ userLat, userLon });
      });
    }
  }, []);

  const [inputValue, setinputValue] = useState('');
  const [latitude, setLatituded] = useState(coordinates?.userLat);
  const [longitude, setLongitude] = useState(coordinates?.userLon);

  useEffect(() => {
    setLatituded(coordinates.userLat);
    setLongitude(coordinates.userLon);
  }, [coordinates]);

  const { location } = useSelector((state) => state.location);
  const { weatherDetails } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather({ latitude, longitude }));
  }, [latitude, longitude, dispatch]);

  const handleChange = (e) => {
    if (e.target.value.includes('.')) {
      const coordArr = e.target.value.split(',');
      setLatituded(coordArr[0]);
      setLongitude(coordArr[1]);
    }
    setinputValue(e.target.value);
    dispatch(fetchLocation(e.target.value));
  };

  const handleCitySelect = (name, country, lat, lon) => {
    setinputValue(`${name}, ${country}`);
    setLatituded(lat);
    setLongitude(lon);
    dispatch(clearSearchResults());
  };

  const handleSearchSubmit = async () => {
    dispatch(fetchWeather({ latitude, longitude }));
  };

  return (
    <div>
      <h1 className="header">Atmosphere 360</h1>
      <div className="section headline">
        <p className="intro">
          Please Enter a Coordinate(separated by comma(,)) or City
        </p>
      </div>
      <section className="search-bar">
        <input type="text" className="search-box" onChange={handleChange} value={inputValue} placeholder="ex.  48.75,2.32   OR   London" />
        <input type="button" value="Search" className="search-btn" onClick={handleSearchSubmit} />
        <div className="results-box">
          {
            location.length > 0 ? (

              location.map((city) => (
                // eslint-disable-next-line max-len
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                <p className="city-name" key={city.lat} onClick={() => handleCitySelect(city?.name, city?.country, city?.lat, city?.lon)}>{`${city?.name}, ${city?.country}`}</p>
              ))

            ) : <p />
          }
        </div>
      </section>
      <section className="srch-wthr-wrapper">
        {
        weatherDetails?.name && (
        <div className="found-city">
          <h2>
            {`${weatherDetails?.name}, ${weatherDetails?.sys?.country}`}
          </h2>
          <img src={`https://openweathermap.org/img/wn/${weatherDetails?.weather[0].icon}@2x.png`} alt="" className="icon" />
          <div className="temp-desc-box">
            <span className="temp-desc">
              {weatherDetails?.weather[0]?.description}
            </span>
          </div>
          <div className="w-details">
            <div className="temp">
              <span className="temperature">
                {(weatherDetails?.main?.temp - 273.15).toFixed(0)}
              </span>
              <span className="degree">&deg;C</span>
            </div>

            <div className="right">
              <div className="w-info">
                <span>
                  {weatherDetails?.main?.humidity}
                  %
                </span>
                <span className="w-info-detail">Humidity</span>
              </div>
              <div className="w-info">
                <span>
                  {weatherDetails?.wind?.speed}
                  {' '}
                  m/s
                </span>
                <span className="w-info-detail">Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
        )
        }
      </section>
    </div>
  );
};

export default Home;
