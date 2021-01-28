import React, {useState} from 'react';

// material ui core components
import { Grid, Paper, Typography, TextField, makeStyles } from '@material-ui/core';

// icons
import clouds from '../assets/img/icons/clouds.png';
import clear from '../assets/img/icons/clear.png';
import snow from '../assets/img/icons/snow.png';
import rain from '../assets/img/icons/rain.png';
import haze from '../assets/img/icons/haze.png';
import mist from '../assets/img/icons/mist.png';
import fog from '../assets/img/icons/fog.png';



const useStyles = makeStyles ((theme) =>({
    root: {
        marginTop: 80,
    },
    default: {
        backgroundColor: '#40739e',
    },
    clear: {
        backgroundColor: '#f1c40f',
    },
    clouds: {
        backgroundColor: '#273c75',
    },
    rain: {
        backgroundColor: '#16a085',
    },
    snow: {
        backgroundColor: '#f5f6fa',
    },
    haze: {
        backgroundColor: '#95a5a6',
    },
    mist: {
        backgroundColor: '#8e44ad',
    },
    input: {
        width: 300,
        marginTop: 10,
    },
    city: {
        marginTop: 50,
    },
    date: {
        marginTop: 40,
    },
    temperature: {
        marginTop: 50,
    },
    weather: {
        marginTop: 50,
    },
    weatheIcon: {
        marginLeft: 10,
        marginTop: 55,
    },
}));

const api = {
    key: '26eb107ac36fa5a8381d27d5206ad752',
    base: 'https://api.openweathermap.org/data/2.5/'
};

function Weather() {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [background, setBackground] = useState(classes.default);
    const [icon, setIcon] = useState('')

    
    const searchPress = event => {
        if (event.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                setQuery('');
                if (data === !null) {
                    setIcon(true)
                }
                if (data.weather[0].main === 'Clouds') {
                    setIcon(clouds);
                    setBackground(classes.clouds);
                }else if (data.weather[0].main === 'Clear') {
                    setIcon(clear);
                    setBackground(classes.clear);
                }else if (data.weather[0].main === 'Snow') {
                    setIcon(snow);
                    setBackground(classes.snow);
                }else if (data.weather[0].main === 'Rain') {
                    setIcon(rain);
                    setBackground(classes.rain);
                }else if (data.weather[0].main === 'Haze') {
                    setIcon(haze);
                    setBackground(classes.haze);
                }else if (data.weather[0].main === 'Mist') {
                    setIcon(mist);
                    setBackground(classes.mist);
                }else if (data.weather[0].main === 'Fog') {
                    setIcon(fog);
                    setBackground(classes.mist);
                }
                else {
                    setIcon('');
                    setBackground(classes.default);
                }
            })
            .catch((err) => {
                alert("Incorrect city!")
            });
            
        };
    };

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`
    };

    return (
        <Grid container justify="center" className={classes.root}>
            <Paper elevation={10} className={background} style={{width: 400, height: 600, color: '#e84118',}}>
                <Grid container justify="center">
                    <TextField 
                        label="City name..."
                        value={query}
                        color="secondary"
                        onChange={(event) => setQuery(event.target.value)} 
                        onKeyPress={searchPress} 
                        autoFocus
                        variant="standard" 
                        className={classes.input} />
                </Grid>
                {(typeof weather.main != "undefined") ? (
                <Grid>
                    <Grid container justify="center" alignItems="center">
                        <Typography paragraph variant="h4" className={classes.city}>
                            {weather.name}, {weather.sys.country}
                        </Typography>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <Typography paragraph variant="h6" className={classes.date}>
                            {dateBuilder(new Date())}
                        </Typography>
                    </Grid>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Typography paragraph variant="h2" className={classes.temperature}>
                            {Math.round(weather.main.temp)}°C {/*Alt 0176*/}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Typography paragraph variant="h5" className={classes.weather}>
                            {weather.weather[0].main}
                        </Typography>
                        <Typography paragraph variant="h5" className={classes.weatheIcon}>
                            <img src={icon} alt="weather"/>
                        </Typography>
                    </Grid>
                </Grid>
                ) : ('')}
            </Paper>
        </Grid>
    )
}

export default Weather;
