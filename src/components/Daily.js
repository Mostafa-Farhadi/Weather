import React from 'react'
import { connect } from 'react-redux'
import Days from '../components/Daily/Days'
import { v4 as uuidv4 } from 'uuid'

function Daily(props) {
    const {cityData} = props
    
    return (
        cityData.loading ? (
            ''
        ) : (
            <div className="daily-forcast">
                {cityData.dailyData.daily.map((element, index) => {
                    if (index === 0) {
                        return null
                    }
                    const properties = {
                        key: uuidv4(),
                        weekDay: element.dt,
                        maxTemp: element.temp.max,
                        minTemp: element.temp.min,
                        sunrise: element.sunrise,
                        sunset: element.sunset,
                        timezoneOffset: cityData.dailyData.timezone_offset,
                        iconcode: element.weather[0].icon
                    }
                    return (
                        <Days {...properties}/>
                    )}
                )}
            </div>
        )
    )
}

const mapStateToProps = state => {
    return {
        cityData: state.cityData
    }
}

export default connect(mapStateToProps, null)(Daily)
