import axios from 'axios'

import {FETCH_CITY_REQUEST, FETCH_CITY_SUCCESS, FETCH_CITY_FAILURE} from './cityTypes'

const fetchCityRequest = () => {
    return {
        type: FETCH_CITY_REQUEST
    }
}

const fetchCitySeuccess = (onlineData, dailyData, hourlyData) => {
    return {
        type: FETCH_CITY_SUCCESS,
        onlineData: onlineData,
        dailyData: dailyData,
        hourlyData: hourlyData
    }
}

const fetchCityFailure = error => {
    return {
        type: FETCH_CITY_FAILURE,
        error: error
    }
}

export const fetchCity = (cityName) => {
    return (dispatch) => {
        dispatch(fetchCityRequest)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=26eb107ac36fa5a8381d27d5206ad752`)
        .then(response => {    
            const onlineData = response.data 
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${onlineData.coord.lat}&lon=${onlineData.coord.lon}&units=metric&exclude=minutely,alerts&appid=8277afc975ef94a282c1e6077eb4320c`)
            .then(response => {
                const dailyData = response.data
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${dailyData.lat}&lon=${dailyData.lon}&units=metric&cnt=16&appid=26eb107ac36fa5a8381d27d5206ad752`)
                .then(response => {
                    const hourlyData = response.data
                    dispatch(fetchCitySeuccess(onlineData, dailyData, hourlyData))
                })
                .catch(error => {
                    const errorMsg = error.message
                    dispatch(fetchCityFailure(errorMsg))
                })
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchCityFailure(errorMsg))
            })
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchCityFailure(errorMsg))
        })
    }
}
