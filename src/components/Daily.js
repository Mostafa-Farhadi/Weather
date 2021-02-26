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
                            time = {element.dt}
                            minTemp={element.temp.min}
                            maxTemp={element.temp.max}
                            weather={element.weather[0].main}
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
