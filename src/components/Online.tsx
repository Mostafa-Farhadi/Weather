import { connect } from 'react-redux';
import style from '../scss/components/onilne.module.scss';
import { Time } from "../interfaces";

function Online(props: any) {
    const {cityData} = props;
    const dateBuilder = (time: Time): string => {
        const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day: string = days[time.getDay()];
        const date: string = time.getDate();
        const month: string = months[time.getMonth()];
        const year: string = time.getFullYear();
        return `${day} ${date} ${month} ${year}`;
    };
    return (
        <section className={style.onlineForcast}>
            {
                cityData.loading || cityData.errorBoolean ? (
                    ''
                ) : (
                    <div>
                        <p className={style.cityCountary} >{cityData.onlineData.name}, {cityData.onlineData.sys.country}</p>
                        <p className={style.date}>{dateBuilder(new Date())}</p>
                        <p className={style.temprature}>{Math.round(cityData.onlineData.main.temp)}°C</p>
                        <p className={style.weather}>{cityData.onlineData.weather[0].main}</p>
                    </div>
                )
            }
        </section>
    );
};

const mapStateToProps = (state: any) => {
    return {
        cityData: state.cityData
    };
};

export default connect(mapStateToProps, null)(Online);
