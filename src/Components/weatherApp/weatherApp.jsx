import React from 'react'
import "./weatherAppStyle.css";
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import { useState } from 'react';
import { useEffect } from 'react';

export const WeatherApp = () => {

    const [weather, setWeather] = useState();

    async function searchWeather() {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=40ed58a2765c4a602efac457943bedcc&units=metric`);
        const data = await res.json();
        console.log(data);
    }

    useEffect(()=>{
        searchWeather()
    }, []);

    return (
        <div className='container'>
            <div className='searchBar'>
                <input type={"text"} className='searchInput' placeholder="Search" />
                <button className='searchBtn' onClick={searchWeather}>Search</button>
            </div>
            <CountryName />
            <Temperature />
            <FeelsLike />
            <ForecastDeatails />
        </div>
    )
}

function CountryName() {
    return (
        <div>
            <h2 className='city'>
                City Name
            </h2>
        </div>
    )
};

function Temperature() {
    return (
        <div>
            <h1 className='temp'>
                30<span style={{ fontSize: "65px" }}><sup >o</sup>C</span>
            </h1>
        </div>
    )
};

function FeelsLike() {
    return (
        <div>
            <p className='feelsLike'>
                <span>Haze,</span> Feels like: <span>32<sup>o</sup></span>
            </p>
        </div>
    )
};

function ForecastDeatails() {
    return (
        <div style={{ width: "100% ", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 5px 0px 5px" }}>
            <div className='detailContainer'>
                <p style={{ textAlign: "left", fontWeight: "normal", fontSize: "small", marginBottom: "10px" }}>
                    Forecast Details
                </p>
                <div className='boxes'>
                    <DetailBox iconName={wind_icon} name={"Wind Speed"} value = {"abc"}/>
                    <DetailBox iconName={humidity_icon} name={"Humidity"} value = {"abc"} />
                    <DetailBox name={"Visibility"} value = {"abc"} />
                    <DetailBox name={"Pressure"} value = {"abc"} />
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


