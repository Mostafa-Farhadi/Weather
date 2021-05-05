import sun from '../../assets/img/sun.png';
import moon from '../../assets/img/moon.png';

interface IProps {
    weekDay: number;
    maxTemp: number;
    minTemp: number;
    sunrise: number;
    sunset: number;
    timezoneOffset: number;
    iconcode: string;
};

function Days(props: IProps) {
    const {weekDay, maxTemp, minTemp, sunrise, sunset, timezoneOffset, iconcode} = props;
    const futureDays: Function = (millisecond: number) => {
        const date = new Date(millisecond * 1000);
        const dayNumber: number = date.getDay();
        const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day: string = days[dayNumber].slice(0,3);
        return `${day}`;
    };
    const sunriseDate: Date = new Date((sunrise + timezoneOffset) * 1000);
    const sunriseHour: number = sunriseDate.getUTCHours();
    const seuriseMinute: number = sunriseDate.getUTCMinutes();
    const sunsetDate: Date = new Date((sunset + timezoneOffset) * 1000);
    const sunsetHour: number = sunsetDate.getUTCHours();
    const seuserMinute: number = sunsetDate.getUTCMinutes();

    return (
        <div className="daily-container">
            <p className="week-day">{futureDays(weekDay)}</p>
            <div className="temperature-container">
                <p className="max-temperature">{Math.round(maxTemp)}°C</p>
                <p className="min-temperature">{Math.round(minTemp)}°C</p>
            </div>
            <img className="weather-icon" src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="icon"/>
            <div className="sunrise-container">
                <img src={sun} alt="sun" className="sun-moon-icon" />
                <p>{sunriseHour}:{seuriseMinute}</p>
            </div>
            <div className="sunset-container">
                <img src={moon} alt="moon" className="sun-moon-icon" />
                <p>{sunsetHour}:{seuserMinute}</p>
            </div>
        </div>
    );
};

export default Days;
