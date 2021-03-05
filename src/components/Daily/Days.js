import React from 'react'

function Days(props) {
    const {weekDay, maxTemp, minTemp, humidity, windSpeed, iconcode} = props
    const futureDays = (millisecond) => {
        const date = new Date(millisecond * 1000)
        let dayNumber = date.getDay()
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let day = days[dayNumber].slice(0,3)
        return `${day}`
    }

    return (
        <div className="daily-container">
            <p className="week-day">{futureDays(weekDay)}</p>
            <div className="temperature-container">
                <p className="max-temperature">{Math.round(maxTemp)}°C</p>
                <p className="min-temperature">{Math.round(minTemp)}°C</p>
            </div>
            <img className="weather-icon" src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="icon"/>
            <p className="humidity">{humidity}%</p>
            <p className="wind-speed">{windSpeed}m/s</p>
        </div>
    )
}

export default Days
