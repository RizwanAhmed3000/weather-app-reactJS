import React from 'react'
import "./weatherAppStyle.css";
// import clear_icon from '../Assets/clear.png';
// import cloud_icon from '../Assets/cloud.png';
// import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
// import rain_icon from '../Assets/rain.png';
// import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import { useState } from 'react';
import { useEffect } from 'react';

export const WeatherApp = () => {

    const [weather, setWeather] = useState('');
    const [search, setSearch] = useState('');

    async function searchWeather(defaultValue) {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search || defaultValue }&appid=40ed58a2765c4a602efac457943bedcc&units=metric`);
        const data = await res.json();
        setWeather(data)
        // console.log(data)
        // const { feels_like, humidity, pressure, temp} = main;
        // console.log(name, feels_like, humidity, pressure, temp);
    }

    useEffect(()=>{
        searchWeather("karachi")
    }, []);

    function inputChangeHandler(val) {
        setSearch(val.target.value)
    }

    return (
        <>
            {weather !== '' ? (
                <div className='container'>
            <div className='searchBar'>
                <input type={"text"} className='searchInput' placeholder="Search" value={search} onChange={inputChangeHandler} />
                <button className='searchBtn' onClick={searchWeather}>Search</button>
            </div>
            <CountryName name={weather?.name ? weather.name : "No data"}/>
            <Temperature tempToday={weather?.main?.temp ? weather.main.temp : 0} />
            <FeelsLike weatherToday={weather?.weather[0]?.main ? weather?.weather[0]?.main : 0} feelsLike={weather.main.feels_like ? weather.main.feels_like : 0}/>
            <ForecastDeatails windSpeed={weather.wind.speed ? weather.wind.speed : 0} humidityToday={weather.main.humidity ? weather.main.humidity : 0} visibilityToday={weather.visibility ? weather.visibility : 0} pressureToday={weather.main.pressure ? weather.main.pressure : 0}/>
        </div>
        ) : (<h1>loading</h1>)}
        </>
    )
}

function CountryName({name}) {
    return (
        <div>
            <h2 className='city'>
                {name}
            </h2>
        </div>
    )
};

function Temperature({ tempToday }) {
    return (
        <div>
            <h1 className='temp'>
                {Math.round(tempToday)}<span style={{ fontSize: "65px" }}><sup >o</sup>C</span>
            </h1>
        </div>
    )
};

function FeelsLike({ weatherToday, feelsLike}) {
    return (
        <div>
            <p className='feelsLike'>
                <span>{weatherToday},</span> Feels like: <span>{Math.round(feelsLike)}<sup>o</sup></span>
            </p>
        </div>
    )
};

function ForecastDeatails({ windSpeed, humidityToday, visibilityToday, pressureToday }) {
    return (
        <div style={{ width: "100% ", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 5px 0px 5px" }}>
            <div className='detailContainer'>
                <p style={{ textAlign: "left", fontWeight: "normal", fontSize: "small", marginBottom: "10px" }}>
                    Forecast Details
                </p>
                <div className='boxes'>
                    <DetailBox iconName={wind_icon} name={"Wind Speed"} value = {windSpeed}/>
                    <DetailBox iconName={humidity_icon} name={"Humidity"} value={humidityToday} />
                    <DetailBox name={"Visibility"} value={visibilityToday} />
                    <DetailBox name={"Pressure"} value={pressureToday} />
                </div>
            </div>
        </div>
    )
};

function DetailBox({ iconName, name, value }) {
    return (
        <div className='detailBox'>
            <img src={iconName} alt="" style={{ width: "40px" }} />
            <p>{name}</p>
            <p>{value}</p>
        </div>
    )
};


