import React from 'react'
import "./weatherAppStyle.css";
import clear_bg from '../Assets/sunny.jpg';
import cloud_bg from '../Assets/cloudy.jpg';
import drizzle_bg from '../Assets/Rain.jpg';
import humidity_icon from '../Assets/humidity.png';
import thunder_bg from '../Assets/thunder.jpg';
import snow_bg from '../Assets/snow.jpg';
import haze_bg from '../Assets/haze.jpg';
import wind_icon from '../Assets/wind.png';
import visiblity_icon from '../Assets/eye-solid.svg';
import pressure_icon from '../Assets/pressure.png';
import { useState } from 'react';
import { useEffect } from 'react';

export const WeatherApp = () => {

    const [weather, setWeather] = useState('');
    const [search, setSearch] = useState('');
    const [weatherName, setWeatherName] = useState('');

    async function searchWeather(defaultValue) {
        try {

            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search || defaultValue}&appid=40ed58a2765c4a602efac457943bedcc&units=metric`);
            const data = await res.json();
            setWeather(data)
            setWeatherName(data.weather[0].main)


            // console.log(data)
            // const { feels_like, humidity, pressure, temp} = main;
            // console.log(name, feels_like, humidity, pressure, temp);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        searchWeather("karachi")
    }, [search]);

    // useEffect(() => {
    //     setInterval(() => {
    //         setTime(new Date())
    //     }, 1000);
    // }, []);

    function inputChangeHandler(val) {
        setSearch(val.target.value)
    }

    function setBackground() {
        if (weatherName == 'Haze' || weatherName == 'Mist' || weatherName == 'Smoke' || weatherName == 'Dust' || weatherName == 'Fog' || weatherName == 'Sand' || weatherName == 'Ash' || weatherName == 'Squall' || weatherName == 'Tornado') {
            return (`url(${haze_bg})`)
        } else if (weatherName == 'Rain' || weatherName == 'Drizzle') {
            return (`url(${drizzle_bg})`)
        } else if (weatherName == 'Clouds') {
            return (`url(${cloud_bg})`)
        } else if (weatherName == 'Thunderstorm') {
            return (`url(${thunder_bg})`)
        } else if (weatherName == 'Snow') {
            return (`url(${snow_bg})`)
        } else if (weatherName == 'Clear') {
            return (`url(${clear_bg})`)
        }
    }

    function invertColor() {
        if (weatherName == 'Haze' || weatherName == 'Mist' || weatherName == 'Smoke' || weatherName == 'Dust' || weatherName == 'Fog' || weatherName == 'Sand' || weatherName == 'Ash' || weatherName == 'Squall' || weatherName == 'Tornado' || weatherName == 'Clear') {
            return (`invert(100%)`)
        }
    }

    return (
        <>
            <div className='mainContainer'>
                {weather !== '' ? (
                <div className='container' style={{ backgroundImage: setBackground(),backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                        <div className='searchBar'>
                            <input type={"text"} className='searchInput' placeholder="Search" value={search} onChange={inputChangeHandler} style={{ filter: invertColor() }} />
                            <button className='searchBtn' onClick={searchWeather} style={{ filter: invertColor() }} >Search</button>
                        </div>
                        {
                            weather.cod == "404" ? (
                                <h1>city not found</h1>
                            ) : (
                                <>
                                    <CountryName name={weather?.name ? weather.name : "No data"} fontColor={invertColor()} />
                                    <Temperature tempToday={weather?.main?.temp ? weather.main.temp : 0} fontColor={invertColor()} />
                                    <FeelsLike weatherToday={weather?.weather[0]?.main ? weather?.weather[0]?.main : 0} feelsLike={weather.main.feels_like ? weather.main.feels_like : 0} fontColor={invertColor()} />
                                    <ForecastDeatails windSpeed={weather.wind.speed ? weather.wind.speed : 0} humidityToday={weather.main.humidity ? weather.main.humidity : 0} visibilityToday={weather.visibility ? weather.visibility : 0} pressureToday={weather.main.pressure ? weather.main.pressure : 0} />
                                </>
                            )
                        }

                    </div>
                ) : (<h1>loading</h1>)}
            </div>
        </>
    )
}

function CountryName({ name, fontColor }) {
    return (
        <div>
            <h2 className='city' style={{ filter: fontColor }}>
                {name}
            </h2>
        </div>
    )
};

function Temperature({ tempToday, fontColor }) {
    return (
        <div>
            <h1 className='temp' style={{ filter: fontColor }}>
                {Math.round(tempToday)}<span style={{ fontSize: "65px" }}><sup >o</sup>C</span>
            </h1>
        </div>
    )
};

function FeelsLike({ weatherToday, feelsLike, fontColor }) {
    return (
        <div>
            <p className='feelsLike' style={{ filter: fontColor }}>
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
                    <DetailBox iconName={wind_icon} name={"Wind Speed"} value={windSpeed + " " + "km/h"} />
                    <DetailBox iconName={humidity_icon} name={"Humidity"} value={humidityToday + "%"} />
                    <DetailBox iconName={visiblity_icon} name={"Visibility"} value={visibilityToday + " " + "m"} />
                    <DetailBox iconName={pressure_icon} name={"Pressure"} value={pressureToday + " " + "mBar"} />
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


