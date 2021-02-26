import React from 'react'
import { connect } from "react-redux"

function Online(props) {
    const {cityData} = props
    const dateBuilder = (time) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let day = days[time.getDay()]
        let date = time.getDate()
        let month = months[time.getMonth()]
        let year = time.getFullYear()
        return `${day} ${date} ${month} ${year}`
    };

    return (
        <div className="online">
            {
                cityData.loading ? (
                    ''
                ) : (
                    <div>
                        <p className="city-countary" >{cityData.onlineData.name}, {cityData.onlineData.sys.country}</p>
                        <p className="date">{dateBuilder(new Date())}</p>
                        <p className="temprature">{Math.round(cityData.onlineData.main.temp)}°C</p>
                        <p className="weather">{cityData.onlineData.weather[0].main}</p>
                    </div>
                )
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cityData: state.cityData
    }
}

export default connect(mapStateToProps, null)(Online)
