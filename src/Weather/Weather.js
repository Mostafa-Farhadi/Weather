import React, {useState} from 'react';

// icons
import clouds from '../assets/img/clouds.png';
import clear from '../assets/img/clear.png';
import snow from '../assets/img/snow.png';
import rain from '../assets/img/rain.png';
import haze from '../assets/img/haze.png';
import mist from '../assets/img/mist.png';
import fog from '../assets/img/fog.png';

import '../assets/css/style.css';

const api = {
    key: '26eb107ac36fa5a8381d27d5206ad752',
    base: 'https://api.openweathermap.org/data/2.5/'
};

function Weather() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [icon, setIcon] = useState('')

    
    const searchPress = event => {
        if (event.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                setQuery('');
                if (data === !null) {
                    setIcon(true)
                }
                if (data.weather[0].main === 'Clouds') {
                    setIcon(clouds);
                }else if (data.weather[0].main === 'Clear') {
                    setIcon(clear);
                }else if (data.weather[0].main === 'Snow') {
                    setIcon(snow);
                }else if (data.weather[0].main === 'Rain') {
                    setIcon(rain);
                }else if (data.weather[0].main === 'Haze') {
                    setIcon(haze);
                }else if (data.weather[0].main === 'Mist') {
                    setIcon(mist);
                }else if (data.weather[0].main === 'Fog') {
                    setIcon(fog);
                }
                else {
                    setIcon('');
                }
            })
            .catch((err) => {
                alert("Incorrect city!")
            });
            
        };
    };

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`
    };

    return (
        <div className="root">
            <input 
                type="text" 
                placeholder="City..." 
                value={query} 
                onChange={(event) => setQuery(event.target.value)}
                onKeyPress={searchPress}
                className="input"
                autoFocus
            />
            {typeof weather.main != "undefined" ? (
                <>
                    <p className="city">
                        {weather.name}, {weather.sys.country}
                    </p>
                    <p className="date">
                        {dateBuilder(new Date())}
                    </p>
                    <p className="temprature">
                        {Math.round(weather.main.temp)}°C {/*Alt 0176*/}
                    </p>
                    <div className="weather">
                        <p>{weather.weather[0].main}</p>
                        <img src={icon} alt="weather" className="weather-icon"/>
                    </div>
                </>
            ) : (' ')}
        </div>
    )
}

export default Weather;
