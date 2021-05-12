import {FETCH_CITY_REQUEST, FETCH_CITY_SUCCESS, FETCH_CITY_FAILURE} from './cityTypes';

const fetchCityRequest = () => {
    return {
        type: FETCH_CITY_REQUEST
    };
};

const fetchCitySeuccess = (onlineData: object, dailyData: object, hourlyData: object) => {
    return {
        type: FETCH_CITY_SUCCESS,
        onlineData: onlineData,
        dailyData: dailyData,
        hourlyData: hourlyData
    };
};

const fetchCityFailure = (error: string) => {
    return {
        type: FETCH_CITY_FAILURE,
        error: error
    };
};

export const fetchCity = (cityName: string) => async (dispatch: any) => {
    dispatch(fetchCityRequest);
    try {
        const onlineDataResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=26eb107ac36fa5a8381d27d5206ad752`);
        const onlineData = await onlineDataResponse.json();
        const dailyDataResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${onlineData.coord.lat}&lon=${onlineData.coord.lon}&units=metric&exclude=minutely,alerts&appid=8277afc975ef94a282c1e6077eb4320c`);
        const dailyData = await dailyDataResponse.json();
        const hourlyDataResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${dailyData.lat}&lon=${dailyData.lon}&units=metric&cnt=16&appid=26eb107ac36fa5a8381d27d5206ad752`);
        const hourlyData = await hourlyDataResponse.json();
        dispatch(fetchCitySeuccess(onlineData, dailyData, hourlyData));
    }
    catch(error) {
        const errorMsg = error.message
        dispatch(fetchCityFailure(errorMsg))
    };
};
