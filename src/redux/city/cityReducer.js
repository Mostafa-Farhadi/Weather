import {FETCH_CITY_REQUEST, FETCH_CITY_SUCCESS, FETCH_CITY_FAILURE} from './cityTypes'

const initialState = {
    loading: true,
    onlineData: '',
    dailyData: '',
    hourlyData: '',
    error: ''
}

const cityReducer = (state = initialState,  action) => {
    switch (action.type) {
        case FETCH_CITY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_CITY_SUCCESS:
            return {
                loading: false,
                onlineData: action.onlineData,
                dailyData: action.dailyData,
                hourlyData: action.hourlyData,
                error: ''
            }

        case FETCH_CITY_FAILURE:
            return {
                loading: false,
                onlineData: '',
                dailyData: '',
                hourlyData: '',
                error: action.error
            }

        default: return state
    }
}

export default cityReducer