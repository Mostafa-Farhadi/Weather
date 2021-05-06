import { useState } from 'react';
import { connect } from 'react-redux';
import { fetchCity } from '../redux/city/cityActions';

import style from '../scss/components/input.module.scss'

interface Iprops {
    fetchCity: Function;
};

function Input(props: Iprops) {
    const [cityName, setCityName] = useState<string>('');
    const cityNameHandler = (event: any): void => setCityName(event.target.value);
    const {fetchCity} = props;
    const searchPressHandler = (event: any): void => {
        if (event.key === "Enter") {
            fetchCity(cityName);
            setCityName('');
        };
    };
    
    return (
        <section className={style.inputSection}>
            <input
            type="text"
            placeholder="City..."
            className={style.input}
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
        fetchCity: (cityName :string): void => dispatch(fetchCity(cityName))
    };
};

export default connect(null, mapDispatchToProps)(Input);
