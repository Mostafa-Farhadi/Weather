import '../assets/style/style.scss';
import Input from '../components/Input';
import Online from '../components/Online';
import Daily from '../components/Daily';
import Hourly from '../components/Hourly';

function Weather() {
    return (
        <main id="main">
            <Input />
            <Online />
            <Daily />
            <Hourly />
        </main>
    );
};

export default Weather;
