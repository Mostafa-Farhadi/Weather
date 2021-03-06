import {FETCH_CITY_REQUEST, FETCH_CITY_SUCCESS, FETCH_CITY_FAILURE} from './cityTypes';

interface ICity {
    type?: string;
    loading: boolean,
    onlineData: object,
    dailyData: object,
    hourlyData: object,
    error: string,
    errorBoolean: boolean
};

const initialState: ICity = {
    loading: true,
    onlineData: {},
    dailyData: {},
    hourlyData: {},
    error: '',
    errorBoolean: false
};

const cityReducer = (state = initialState,  action: ICity) => {
    switch (action.type) {
        case FETCH_CITY_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FETCH_CITY_SUCCESS:
            return {
                loading: false,
                onlineData: action.onlineData,
                dailyData: action.dailyData,
                hourlyData: action.hourlyData,
                error: '',
                errorBoolean: false
            };

        case FETCH_CITY_FAILURE:
            return {
                loading: false,
                onlineData: {},
                dailyData: {},
                hourlyData: {},
                error: action.error,
                errorBoolean: true
            };

        default: return state;
    };
};

export default cityReducer;
