import Input from '../components/input/Input';
import Online from '../components/online/Online';
import Daily from '../components/daily/Daily';
import Hourly from '../components/hourly/Hourly';

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
