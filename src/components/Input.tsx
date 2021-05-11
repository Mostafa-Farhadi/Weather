import { useState } from 'react';
import { connect } from 'react-redux';
import { fetchCity } from '../redux/city/cityActions';
import style from '../scss/components/input.module.scss'
import { InputProps, SearchEvent, CityEvent } from "../interfaces";

function Input(props: InputProps) {
    const { fetchCity } = props;
    const [cityName, setCityName] = useState<string>('');
    const cityNameHandler = (event: CityEvent): void => setCityName(event.target.value);
    const searchPressHandler = (event: SearchEvent): void => {
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchCity: (cityName :string): void => dispatch(fetchCity(cityName))
    };
};

export default connect(null, mapDispatchToProps)(Input);
