import React from 'react'

function Days(props) {
    const {time, minTemp, maxTemp, weather} = props
    const futureDays = (millisecond) => {
        const date = new Date(millisecond * 1000)
        let dayNumber = date.getDay()
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let day = days[dayNumber]
        return `${day}`
    }

    return (
        <div className="weather-forecast">
            <p className="day">{futureDays(time)}</p>
            <p className="min">{Math.round(minTemp)}</p>
            <p className="max">{Math.round(maxTemp)}</p>
            <p className="weather-forecast">{weather}</p>
        </div>
    )
}

export default Days
