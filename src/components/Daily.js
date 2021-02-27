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
                    return (
                        <Days
                            key = {uuidv4()}
                            weekDay = {element.dt}
                            maxTemp={element.temp.max}
                            minTemp={element.temp.min}
                            weatherIcon={element.weather[0].main}
                            humidity={element.humidity}
                            windSpeed={element.wind_speed}
                        />
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
