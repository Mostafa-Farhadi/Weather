import { useState } from 'react';
import { connect } from 'react-redux';
import { fetchCity } from '../../redux/city/cityActions';

interface Iprops {
    fetchCity: Function;
};

function Input(props: Iprops) {
    const [cityName, setCityName] = useState<string>('');
    const cityNameHandler = (event: any) => setCityName(event.target.value);
    const {fetchCity} = props;
    const searchPressHandler = (event: any) => {
        if (event.key === "Enter") {
            fetchCity(cityName);
            setCityName('');
        };
    };
    
    return (
        <section id="input-city">
            <input
            type="text"
            placeholder="City..."
            className="input"
            autoFocus
            value={cityName}
            onChange={cityNameHandler}
            onKeyPress={searchPressHandler}
            />
        </section>
    );
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        fetchCity: (cityName :string) => dispatch(fetchCity(cityName))
    };
};

export default connect(null, mapDispatchToProps)(Input);
