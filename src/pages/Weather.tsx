import Input from '../components/Input';
import Online from '../components/Online';
import Daily from '../components/Daily';
import Hourly from '../components/Hourly';
import style from '../scss/pages/weather.module.scss';

function Weather() {
    return (
        <main className={style.main}>
            <Input />
            <Online />
            <Daily />
            <Hourly />
        </main>
    );
};

export default Weather;
