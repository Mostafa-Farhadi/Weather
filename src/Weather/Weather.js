import React, {useState} from 'react';

// material ui core components
import { Grid, Paper, Typography, TextField, makeStyles } from '@material-ui/core';

import 'remixicon/fonts/remixicon.css';

// pictures
import warm from './warm.jpg';
import cold from './cold.jpg';


const useStyles = makeStyles ((theme) =>({
    warm: {
        width: theme.spacing(50),
        height: theme.spacing(70),
        backgroundImage: `url(${warm})`,
        color: 'black'
    },
    cold: {
        width: theme.spacing(50),
        height: theme.spacing(70),
        backgroundImage: `url(${cold})`,
        color: 'white'
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
    const [bg, setBg] = useState(true);

    
    const searchPress = event => {
        if (event.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(response => response.json())
            .then(response => {
                setWeather(response);
                setQuery('');
                if (response.main.temp < 10) {
                    setBg(false)
                } else {
                    setBg(true)
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
            <Paper elevation={10} className={`${bg ? classes.warm : classes.cold}`}>
                <Grid container justify="center">
                    <TextField 
                        value={query} 
                        onChange={(event) => setQuery(event.target.value)} 
                        onKeyPress={searchPress} 
                        variant="outlined" 
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
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Typography paragraph className={classes.weather}>
                            {weather.weather[0].main}
                        </Typography>
                    </Grid>
                </Grid>
                ) : ('')}
            </Paper>
        </Grid>
    )
}

export default Weather;
