import React, { useState, useEffect } from "react";
import Fetch from './Fetch/Fetch.jsx'
import WeatherCard from './CurrWeather/Curr_Weather.jsx';
import TodaysHighlights from "./TodaysHighlights/TodaysHighlights.jsx";
import Block from "./TodaysHighlights/Block.jsx";
import HourlyWeather from "./Hourly Weather/Hourly.jsx";
import DailyWeather from "./DailyWeather/DailyWeather.jsx";
import Searchbar from "./Searchbar/Searchbar.js";
import NavBar from "../Home/NavBar.jsx";


const Forecast = () => {

    const [city, setCity] = useState("Kolkata,IN")
    // console.log(city)
    const [currentWeather, setCurrentWeather] = useState({
        name: "Loading...",
        weather: [{ description: "Loading...", icon: '01d' }],
        main: { temp: 0, humidity: 0 },
        wind: { speed: 0 },
    });

    useEffect(() => {
        const fetchWeatherData = async () => {
            const weatherData = await Fetch(city, "currentWeather");
            if (weatherData) {
                setCurrentWeather(weatherData);
            }
        };

        fetchWeatherData();
        console.log(currentWeather);
    }, [city]);

    /* Use any one way as per given data */
    // const data = Fetch("Palakkad","airPollution");
    //const data = Fetch(null, "currentWeather",10.7681928,76.6521319);

    return (
        <div style={{backgroundColor:'rgb(53, 52, 52)'}}>
            <NavBar/>
            <Searchbar setCity={(city)=>setCity(city)}/>
            <WeatherCard 
                PlaceName={city.slice(0,city.length - 3)}
                Weather={currentWeather.weather[0].description}
                Temperature={Math.round(currentWeather.main.temp)} // Already in Celsius
                Humidity={currentWeather.main.humidity}
                WindSpeed={currentWeather.wind.speed}
                Icon={currentWeather.weather[0].icon}
                />
            <TodaysHighlights />
            <Block />
            <HourlyWeather city={city}/>
            <DailyWeather/>

        </div>
    );
};

export default Forecast;
