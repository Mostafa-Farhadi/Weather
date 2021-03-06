import React from 'react'
import sun from './sun.png'
import moon from './moon.png'

function Days(props) {
    const {weekDay, maxTemp, minTemp, sunrise, sunset, timezoneOffset, iconcode} = props
    const futureDays = (millisecond) => {
        const date = new Date(millisecond * 1000)
        let dayNumber = date.getDay()
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let day = days[dayNumber].slice(0,3)
        return `${day}`
    }

    const sunriseDate = new Date((sunrise + timezoneOffset) * 1000)
    const sunriseHour = sunriseDate.getUTCHours()
    const seuriseMinute = sunriseDate.getUTCMinutes()

    const sunsetDate = new Date((sunset + timezoneOffset) * 1000)
    const sunsetHour = sunsetDate.getUTCHours()
    const seuserMinute = sunsetDate.getUTCMinutes()

    return (
        <div className="daily-container">
            <p className="week-day">{futureDays(weekDay)}</p>
            <div className="temperature-container">
                <p className="max-temperature">{Math.round(maxTemp)}°C</p>
                <p className="min-temperature">{Math.round(minTemp)}°C</p>
            </div>
            <img className="weather-icon" src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="icon"/>
            <div className="sunrise-container">
                <img src={sun} alt="sun" className="sun-moon-icon" />
                <p>{sunriseHour}:{seuriseMinute}</p>
            </div>
            <div className="sunset-container">
                <img src={moon} alt="moon" className="sun-moon-icon" />
                <p>{sunsetHour}:{seuserMinute}</p>
            </div>
        </div>
    )
}

export default Days
