import sun from '../assets/img/sun.png';
import moon from '../assets/img/moon.png';
import style from '../scss/components/days.module.scss';

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
    const futureDays = (millisecond: number): string => {
        const date: Date = new Date(millisecond * 1000);
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
        <div className={style.dailyContainer}>
            <p className="week-day">{futureDays(weekDay)}</p>
            <div className={style.temperatureContainer}>
                <p className={style.maxTemperature}>{Math.round(maxTemp)}°C</p>
                <p className={style.minTemperature}>{Math.round(minTemp)}°C</p>
            </div>
            <img src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="icon"/>
            <div className={style.sunriseContainer}>
                <img src={sun} alt="sun" className={style.sunMoonIcon} />
                <p>{sunriseHour}:{seuriseMinute}</p>
            </div>
            <div className="sunset-container">
                <img src={moon} alt="moon" className={style.sunMoonIcon} />
                <p>{sunsetHour}:{seuserMinute}</p>
            </div>
        </div>
    );
};

export default Days;
