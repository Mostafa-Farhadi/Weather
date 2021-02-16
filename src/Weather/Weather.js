import React, {useState, useEffect} from 'react';

// icons
import clouds from '../assets/img/clouds.png';
import clear from '../assets/img/clear.png';
import snow from '../assets/img/snow.png';
import rain from '../assets/img/rain.png';
import haze from '../assets/img/haze.png';
import mist from '../assets/img/mist.png';
import fog from '../assets/img/fog.png';

import '../assets/css/style.css';

function Weather() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [icon, setIcon] = useState('')

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                location => {
                    fetch(`https://api.opencagedata.com/geocode/v1/json?key=39429049e03b4a9caebbfef891d072ab&q=${encodeURIComponent(location.coords.latitude + ',' + location.coords.longitude)}&pretty=1&no_annotations=1`)
                    .then(response => response.json())
                    .then (data => 
                        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data.results[0].components.city}&units=metric&APPID=26eb107ac36fa5a8381d27d5206ad752`)
                        .then(response => response.data())
                        .then(data => {
                            setWeather(data);
                            if (data === !null) {
                                setIcon('')
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
                    )
                }
            )
        }else {
            alert("Geolocation is not supported by this browser.")
        }
    }, [])

    
    const searchPress = event => {
        if (event.key === 'Enter') {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=26eb107ac36fa5a8381d27d5206ad752`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                setQuery('');
                if (data === !null) {
                    setIcon('')
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