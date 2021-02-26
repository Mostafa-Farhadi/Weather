import { combineReducers } from 'redux'
import cityReducer from './city/cityReducer'

const rootReducer = combineReducers({
    cityData: cityReducer
})

export default rootReducer