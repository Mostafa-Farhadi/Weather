import { connect } from 'react-redux';

interface Itime {
    getDay: Function;
    getDate: Function;
    getMonth: Function;
    getFullYear: Function;
};

function Online(props: any) {
    const {cityData} = props;
    const dateBuilder = (time: Itime) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = days[time.getDay()];
        const date = time.getDate();
        const month = months[time.getMonth()];
        const year = time.getFullYear();
        return `${day} ${date} ${month} ${year}`;
    };
    return (
        <section id="online-forcast">
            {
                cityData.loading || cityData.errorBoolean ? (
                    ''
                ) : (
                    <div>
                        <p className="city-countary" >{cityData.onlineData.name}, {cityData.onlineData.sys.country}</p>
                        <p className="date">{dateBuilder(new Date())}</p>
                        <p className="temprature">{Math.round(cityData.onlineData.main.temp)}°C</p>
                        <p className="weather">{cityData.onlineData.weather[0].main}</p>
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
