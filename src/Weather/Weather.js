import React, {useState} from 'react';

// material ui core components
import { Grid, Paper, Typography, TextField, makeStyles } from '@material-ui/core';

import 'remixicon/fonts/remixicon.css';

// pictures
import clear from './clear.png';
import clouds from './clouds.png';
import rain from './rain.png';
import snow from './snow.png';
import haze from './haze.png';
import mist from './mist.png';

const useStyles = makeStyles ((theme) =>({
    default: {
        width: theme.spacing(50),
        height: theme.spacing(70),
        backgroundColor: '#ff7979',
        color: 'white'
    },
    clear: {
        width: theme.spacing(50),
        height: theme.spacing(70),
        backgroundImage: `url(${clear})`,
        color: '#FC427B'
    },
    clouds: {
        width: theme.spacing(50),
        height: theme.spacing(70),
        backgroundImage: `url(${clouds})`,
        color: '#FC427B'
    },
    rain: {
        width: theme.spacing(50),
        height: theme.spacing(70),
        backgroundImage: `url(${rain})`,
        color: '#FC427B'
    },
    snow: {
        width: theme.spacing(50),
        height: theme.spacing(70),
        backgroundImage: `url(${snow})`,
        color: '#FC427B'
    },
    haze: {
        width: theme.spacing(50),
        height: theme.spacing(70),
        backgroundImage: `url(${haze})`,
        color: '#FC427B'
    },
    mist: {
        width: theme.spacing(50),
        height: theme.spacing(70),
        backgroundImage: `url(${mist})`,
        color: '#FC427B'
    },
    input: {
        width: theme.spacing(35),
        marginTop: theme.spacing(2),
    },
    show: {
        width: theme.spacing(13),
        height: theme.spacing(7),
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1),
        color: '#ecf0f1',
        backgroundColor: '#222f3e',
        '&:hover': {
            backgroundColor: "#576574",
        },
    },
    city: {
        marginTop: theme.spacing(5),
        fontSize: 30,
    },
    date: {
        marginTop: theme.spacing(1),
        fontSize: 20,
    },
    temperature: {
        marginTop: theme.spacing(7),
        fontSize: 60,
    },
    weather: {
        marginTop: theme.spacing(1),
        fontSize: 40,
    },
    weatheIcon: {
        fontSize: 40,
        marginLeft: 10,
        marginTop: 15,
    }
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
                    setIcon('ri-cloud-line');
                    setBackground(classes.clouds);
                }else if (data.weather[0].main === 'Clear') {
                    setIcon('ri-sun-line');
                    setBackground(classes.clear);
                }else if (data.weather[0].main === 'Snow') {
                    setIcon('ri-snowy-line');
                    setBackground(classes.snow);
                }else if (data.weather[0].main === 'Rain') {
                    setIcon('ri-rainy-line');
                    setBackground(classes.rain);
                }else if (data.weather[0].main === 'Haze') {
                    setIcon('ri-haze-line');
                    setBackground(classes.haze);
                }else if (data.weather[0].main === 'Mist') {
                    setIcon('ri-mist-line');
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
        <Grid container justify="center">
            <Paper elevation={10} className={background}>
                <Grid container justify="center">
                    <TextField 
                        label="City name..."
                        value={query} 
                        onChange={(event) => setQuery(event.target.value)} 
                        onKeyPress={searchPress} 
                        autoFocus
                        variant="standard" 
                        className={classes.input} />
                </Grid>
                {(typeof weather.main != "undefined") ? (
                <Grid>
                    <Grid container justify="center" alignItems="center">
                        <Typography paragraph className={classes.city}>
                            {weather.name}, {weather.sys.country}
                        </Typography>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <Typography paragraph className={classes.date}>
                            {dateBuilder(new Date())}
                        </Typography>
                    </Grid>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Typography paragraph className={classes.temperature}>
                            {Math.round(weather.main.temp)}°C {/*Alt 0176*/}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Typography paragraph className={classes.weather}>
                            {weather.weather[0].main}
                        </Typography>
                        <Typography paragraph className={classes.weatheIcon}>
                            <i className={icon}></i>
                        </Typography>
                    </Grid>
                </Grid>
                ) : ('')}
            </Paper>
        </Grid>
    )
}

export default Weather;
