import React, { useState } from 'react'
import { connect } from 'react-redux'
import { fetchCity } from '../redux/city/cityActions'

function Input(props) {
    const [cityName, setCityName] = useState('')
    const cityNameHandler = event => setCityName(event.target.value)
    const {fetchCity} = props
    const searchPressHandler = event => {
        if (event.key === "Enter") {
            fetchCity(cityName)
            setCityName('')
        }
    }

    return (
        <section>
            <input
            type="text"
            placeholder="City..."
            id="input"
            autoFocus
            value={cityName}
            onChange={cityNameHandler}
            onKeyPress={searchPressHandler}
            />
        </section>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCity: (cityName) => dispatch(fetchCity(cityName))
    }
}

export default connect(null, mapDispatchToProps)(Input)
