import { connect } from 'react-redux';
import Days from './Days';
import { v4 as uuidv4 } from 'uuid';
import style from '../scss/components/daily.module.scss';
import { DailyProps } from "../interfaces";

function Daily(props: any) {
    const {cityData} = props;
    return (
        <section className={style.dailyForcast}>
            {cityData.loading || cityData.errorBoolean ? (
                    ''
                ) : (
                    cityData.dailyData.daily.map((element: any, index: number) => {
                        if (index === 0) {
                            return null;
                        } else {
                            const properties: DailyProps = {
                                key: uuidv4(),
                                weekDay: element.dt,
                                maxTemp: element.temp.max,
                                minTemp: element.temp.min,
                                sunrise: element.sunrise,
                                sunset: element.sunset,
                                timezoneOffset: cityData.dailyData.timezone_offset,
                                iconcode: element.weather[0].icon
                            };
                            return (
                                <Days {...properties}/>
                            )}
                        }
                    )
                )}
        </section>
    );
};

const mapStateToProps = (state: any) => {
    return {
        cityData: state.cityData
    };
};

export default connect(mapStateToProps, null)(Daily);
