export interface DailyProps {
    key: string;
    weekDay: number;
    maxTemp: number;
    minTemp: number;
    sunrise: number;
    sunset: number;
    timezoneOffset: number;
    iconcode: string;
};

export interface DaysProps {
    weekDay: number;
    maxTemp: number;
    minTemp: number;
    sunrise: number;
    sunset: number;
    timezoneOffset: number;
    iconcode: string;
};

export interface InputProps {
    fetchCity: Function;
};

export interface Time {
    getDay: Function;
    getDate: Function;
    getMonth: Function;
    getFullYear: Function;
};

export interface CityEvent {
    target: {
        value: string
    }
};

export interface SearchEvent {
    key: string
};