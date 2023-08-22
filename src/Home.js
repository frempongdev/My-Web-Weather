import React from 'react';
import './style/Home.css';

const Home = () => {
  return (
    <div>
        <h1 className="header">WEATHER BUDDY</h1>
        <div className="section headline">
            <p className="intro">
                Please Enter a Cordinate or City
            </p>
        </div>
        <section className="search-bar">
            <input type="text" />
            <input type="button" value="Search" />
        </section>
    </div>
  );
};

export default Home;
