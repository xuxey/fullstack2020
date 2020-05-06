import React, {useEffect, useState} from "react";
import axios from "axios";

const Weather = ({country}) => {
    const capital = country.capital.replace(' ', '%20');
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        axios.get("http://api.weatherstack.com/current?access_key=" + API_KEY + "&query=" + capital)
            .then(response => setWeather(response.data))
    }, [API_KEY, capital]);
    if (weather == null) return <h2>Weather not available</h2>;
    return (
        <div>
            <h2>Weather for {weather.request.query}</h2>
            <div><b>{weather.current.weather_descriptions[0]}</b></div>
            <div>Temperature: {weather.current.temperature}</div>
            <div>Wind: {weather.current.wind_speed}mph {weather.current.wind_dir}</div>
            <div><img src={weather.current.weather_icons[0]} alt=''/></div>
        </div>
    )
};

export default Weather;
