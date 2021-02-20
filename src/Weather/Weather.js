import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../assets/css/style.css'
import ReactApexChart from "react-apexcharts";

// icons
import clouds from '../assets/img/clouds.png';
import clear from '../assets/img/clear.png';
import snow from '../assets/img/snow.png';
import rain from '../assets/img/rain.png';
import haze from '../assets/img/haze.png';
import mist from '../assets/img/mist.png';
import fog from '../assets/img/fog.png';

function Weather() {
    const [query, setQuery] = useState('');
    const [icon, setIcon] = useState('')
    const [details, setDetails] = useState({
        temperature: '',
        weather: '',
        firstDay: {min: '', max: '', weather: ''},
        secondDay: {min: '', max: '', weather: ''},
        thirdDay: {min: '', max: '', weather: ''},
        forthDay: {min: '', max: '', weather: ''},
        fifthDay: {min: '', max: '', weather: ''},
        sixthDay: {min: '', max: '', weather: ''},
        seventhDay: {min: '', max: '', weather: ''},
    })

    const [cityName, setCityName] = useState({
        city: '',
        country: '',
    })

    const [datas, setDatas] = useState({
        options: {
            xaxis: {
                categories: []
            },
        },
        
        series: [{
                data: [],
            }],
    })

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`
    };

    const futureDays = (dayNum) => {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        if (dayNum > 6) {
            dayNum = dayNum - 7
        }
        let day = days[dayNum];
        return `${day}`
    }

    const d =  new Date()
    const dateObj = {
        firstDay: d.getDay() + 1,
        secondDay: d.getDay() + 2,
        thirdDay: d.getDay() + 3,
        forthDay: d.getDay() + 4,
        fifthDay: d.getDay() + 5,
        sixthDay: d.getDay() + 6,
        seventhDay: d.getDay() + 7,
    }

    // When for the first time page is loaded
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                location => {
                    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${encodeURIComponent(location.coords.latitude)}&lon=${encodeURIComponent(location.coords.longitude)}&units=metric&exclude=minutely,alerts&appid=8277afc975ef94a282c1e6077eb4320c`)
                    .then(response => {
                        setDetails({
                            temperature: response.data.current.temp,
                            weather: response.data.current.weather[0].main,
                            firstDay: {min: response.data.daily[1].temp.min, max: response.data.daily[1].temp.max, weather: response.data.daily[1].weather[0].main},
                            secondDay: {min: response.data.daily[2].temp.min, max: response.data.daily[2].temp.max, weather: response.data.daily[2].weather[0].main},
                            thirdDay: {min: response.data.daily[3].temp.min, max: response.data.daily[3].temp.max, weather: response.data.daily[3].weather[0].main},
                            forthDay: {min: response.data.daily[4].temp.min, max: response.data.daily[4].temp.max, weather: response.data.daily[4].weather[0].main},
                            fifthDay: {min: response.data.daily[5].temp.min, max: response.data.daily[5].temp.max, weather: response.data.daily[5].weather[0].main},
                            sixthDay: {min: response.data.daily[6].temp.min, max: response.data.daily[6].temp.max, weather: response.data.daily[6].weather[0].main},
                            seventhDay: {min: response.data.daily[7].temp.min, max: response.data.daily[7].temp.max, weather: response.data.daily[7].weather[0].main},
                        })
                        if (response.data === !null) {
                            setIcon('')
                        }
                        if (response.data.current.weather[0].main === 'Clouds') {
                            setIcon(clouds);
                        }else if (response.data.current.weather[0].main === 'Clear') {
                            setIcon(clear);
                        }else if (response.data.current.weather[0].main === 'Snow') {
                            setIcon(snow);
                        }else if (response.data.current.weather[0].main === 'Rain') {
                            setIcon(rain);
                        }else if (response.data.current.weather[0].main === 'Haze') {
                            setIcon(haze);
                        }else if (response.data.current.weather[0].main === 'Mist') {
                            setIcon(mist);
                        }else if (response.data.current.weather[0].main === 'Fog') {
                            setIcon(fog);
                        }
                        else {
                            setIcon('');
                        }
                    })

                    axios.get(`https://api.opencagedata.com/geocode/v1/json?key=39429049e03b4a9caebbfef891d072ab&q=${encodeURIComponent(location.coords.latitude + ',' + location.coords.longitude)}&language=en&pretty=1&no_annotations=1`)
                    .then(response => {
                        setCityName({
                            city: response.data.results[0].components.city,
                            country: response.data.results[0].components.country,
                        })
                        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${response.data.results[0].components.city}&units=metric&cnt=16&appid=8277afc975ef94a282c1e6077eb4320c`)
                        .then(response => {
                        let temperatursArr = []
                        let hoursArr = []

                        response.data.list.forEach(element => {
                            temperatursArr.push(Math.floor(element.main.temp))
                            hoursArr.push(element.dt_txt)
                        })

                        setDatas({
                            options: {
                                chart: {
                                    zoom: {
                                        enabled: false
                                    },
                                    foreColor: '#eee',
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                title: {
                                    text: 'Weather',
                                    align: 'left',
                                },
                                subtitle: {
                                    text: 'Hourly',
                                    align: 'left',
                                },
                                stroke: {
                                    curve: 'smooth'
                                },
                                xaxis: {
                                    type: 'datetime',
                                    categories: hoursArr,
                                },
                                tooltip: {
                                    x: {
                                        format: 'dd MMMM hh:00'
                                    },
                                },
                                markers: {
                                    size: 4,
                                    colors: ["#2e86de"],
                                    strokeWidth: 0,
                                    hover: {
                                        size: 7,
                                    }
                                },
                            },

                            series: [{
                                name: "Temperature",
                                    data: temperatursArr,
                                }],
                            })
                        })
                    })
                })}      
    }, [])

    //  When user write name of a city and click on 'ENTER' button
    const searchPress = event => {
        if (event.key === 'Enter') {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=26eb107ac36fa5a8381d27d5206ad752`)
            .then(response => {
                const lat = response.data.coord.lat
                const lon = response.data.coord.lon
                axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&units=metric&exclude=minutely,alerts&appid=8277afc975ef94a282c1e6077eb4320c`)
                .then(response => {
                    setDetails({
                        temperature: response.data.current.temp,
                        weather: response.data.current.weather[0].main,
                        firstDay: {min: response.data.daily[1].temp.min, max: response.data.daily[1].temp.max, weather: response.data.daily[1].weather[0].main},
                        secondDay: {min: response.data.daily[2].temp.min, max: response.data.daily[2].temp.max, weather: response.data.daily[2].weather[0].main},
                        thirdDay: {min: response.data.daily[3].temp.min, max: response.data.daily[3].temp.max, weather: response.data.daily[3].weather[0].main},
                        forthDay: {min: response.data.daily[4].temp.min, max: response.data.daily[4].temp.max, weather: response.data.daily[4].weather[0].main},
                        fifthDay: {min: response.data.daily[5].temp.min, max: response.data.daily[5].temp.max, weather: response.data.daily[5].weather[0].main},
                        sixthDay: {min: response.data.daily[6].temp.min, max: response.data.daily[6].temp.max, weather: response.data.daily[6].weather[0].main},
                        seventhDay: {min: response.data.daily[7].temp.min, max: response.data.daily[7].temp.max, weather: response.data.daily[7].weather[0].main},
                    })
                })

                axios.get(`https://api.opencagedata.com/geocode/v1/json?key=39429049e03b4a9caebbfef891d072ab&q=${encodeURIComponent(lat + ',' + lon)}&language=en&pretty=1&no_annotations=1`)
                .then(response => {
                    setCityName({
                        city: response.data.results[0].components.city,
                        country: response.data.results[0].components.country,
                    })
                })
                setQuery('');
                if (response.data === !null) {
                    setIcon('')
                }
                if (response.data.weather[0].main === 'Clouds') {
                    setIcon(clouds);
                }else if (response.data.weather[0].main === 'Clear') {
                    setIcon(clear);
                }else if (response.data.weather[0].main === 'Snow') {
                    setIcon(snow);
                }else if (response.data.weather[0].main === 'Rain') {
                    setIcon(rain);
                }else if (response.data.weather[0].main === 'Haze') {
                    setIcon(haze);
                }else if (response.data.weather[0].main === 'Mist') {
                    setIcon(mist);
                }else if (response.data.weather[0].main === 'Fog') {
                    setIcon(fog);
                }
                else {
                    setIcon('');
                }
            })
            .catch((err) => {
                alert("Incorrect city!")
            });

            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&cnt=16&appid=8277afc975ef94a282c1e6077eb4320c`)
            .then(response => {

            let temperatursArr = []
            let hoursArr = []

            response.data.list.forEach(element => {
                temperatursArr.push(Math.floor(element.main.temp))
                hoursArr.push(element.dt_txt)
            })

            setDatas({
                options: {
                    chart: {
                        zoom: {
                            enabled: false
                        },
                        foreColor: '#eee'
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    title: {
                        text: 'Weather',
                        align: 'left',
                    },
                    subtitle: {
                        text: 'Hourly',
                        align: 'left',
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: hoursArr,
                    },
                    tooltip: {
                        x: {
                            format: 'dd MMMM hh:00'
                        },
                    },
                    markers: {
                        size: 4,
                        colors: ["#2e86de"],
                        strokeWidth: 0,
                        hover: {
                            size: 7,
                        }
                    },
                },

                series: [{
                    name: "Temperature",
                        data: temperatursArr,
                    }],
            })
        })

        };
    };

    let weatherHourlyPlot = ''
    if (datas.options.xaxis.categories[0]) {
        weatherHourlyPlot = (
                <ReactApexChart
                    className="plot"
                    options={datas.options}
                    series={datas.series}
                    type="area"
                    width="1070"
                    height= "200"
                />
        )
    }

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
            <p className="city">{cityName.city}, {cityName.country}</p>
            <p className="date">{dateBuilder(new Date())}</p>
            <p className="temprature">{Math.round(details.temperature)}°C {/*Alt 0176*/}</p>
            <p className="weather">{details.weather} <img src={icon} alt="weather" className="weather-icon"/></p>
            <div className="forecast">
                <div>{futureDays(dateObj.firstDay)} <p className="min">{Math.round(details.firstDay.min)}</p> <p className="max">{Math.round(details.firstDay.max)}</p> <p className="weather-forecast">{details.firstDay.weather}</p> </div>
                <div>{futureDays(dateObj.secondDay)} <p className="min">{Math.round(details.secondDay.min)}</p> <p className="max">{Math.round(details.secondDay.max)}</p><p className="weather-forecast">{details.secondDay.weather}</p> </div>
                <div>{futureDays(dateObj.thirdDay)} <p className="min">{Math.round(details.thirdDay.min)}</p> <p className="max">{Math.round(details.thirdDay.max)}</p><p className="weather-forecast">{details.thirdDay.weather}</p> </div>
                <div>{futureDays(dateObj.forthDay)} <p className="min">{Math.round(details.forthDay.min)}</p> <p className="max">{Math.round(details.forthDay.max)}</p><p className="weather-forecast">{details.forthDay.weather}</p> </div>
                <div>{futureDays(dateObj.fifthDay)} <p className="min">{Math.round(details.fifthDay.min)}</p> <p className="max">{Math.round(details.fifthDay.max)}</p><p className="weather-forecast">{details.fifthDay.weather}</p> </div>
                <div>{futureDays(dateObj.sixthDay)} <p className="min">{Math.round(details.sixthDay.min)}</p> <p className="max">{Math.round(details.sixthDay.max)}</p><p className="weather-forecast">{details.sixthDay.weather}</p> </div>
                <div>{futureDays(dateObj.seventhDay)} <p className="min">{Math.round(details.seventhDay.min)}</p> <p className="max">{Math.round(details.seventhDay.max)}</p><p className="weather-forecast">{details.seventhDay.weather}</p> </div>
            </div>
            <div className="weather-hourly">
                {weatherHourlyPlot}
            </div>
        </div>
    )
}

export default Weather