import React, {useState} from 'react';

// material ui core components
import { Grid, Paper, Typography, TextField, Button, makeStyles } from '@material-ui/core';

// material ui lab components
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles ((theme) =>({
    paper: {
        width: theme.spacing(50),
        height: theme.spacing(70),
        background: '#2ecc71',
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
    const classes = useStyles()
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const searchPress = event => {
        if (event.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(response => response.json())
            .then(response => {
                setWeather(response);
                setQuery('');
                console.log(response);
            });
        };
    };

    const searchClick = () => {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(response => response.json())
            .then(response => {
                setWeather(response);
                setQuery('');
                console.log(response);
            });
    };

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        console.log(d);
    
        return `${day} ${date} ${month} ${year}`
    }

    return (
        <Grid container spacing={1} direction="row" justify="center" alignItems="center" alignContent="center" wrap="nowrap">
            <Paper elevation={3} className={classes.paper}>
                <Grid container direction="row" justify="center" alignItems="center">
                <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.city}
                    className={classes.input}
                    onInputChange={(event, newQuery) => {setQuery(newQuery);}}
                    inputValue={query}
                    onKeyPress={searchPress}
                    renderInput={(params) => <TextField  {...params} label="City" variant="outlined" />}
                    />
                    <Button onClick={searchClick} className={classes.show} variant="contained" color="primary">show</Button>
                </Grid>
                {(typeof weather.main != "undefined") ? (
                <Grid>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Typography paragraph color="initial" className={classes.city}>
                            {weather.name}, {weather.sys.country}
                        </Typography>
                    </Grid>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Typography paragraph color="initial" className={classes.date}>
                            {dateBuilder(new Date())}
                        </Typography>
                    </Grid>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Typography paragraph color="initial" className={classes.temperature}>
                            {Math.round(weather.main.temp)}°C {/*Alt 0176*/}
                        </Typography>
                    </Grid>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Typography paragraph color="initial" className={classes.weather}>
                            {weather.weather[0].main}
                        </Typography>
                    </Grid>
                </Grid>
                ) : ('')}
            </Paper>
        </Grid>
    )
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const cities = [
    {city: "Kabul"},
    {city: "Tirana"},
    {city: "Alger"},
    {city: "Fagatogo"},
    {city: "Andorra la Vella"},
    {city: "Luanda"},
    {city: "The Valley"},
    {city: "Saint John's"},
    {city: "Buenos Aires"},
    {city: "Yerevan"},
    {city: "Oranjestad"},
    {city: "Canberra"},
    {city: "Wien"},
    {city: "Baku"},
    {city: "Nassau"},
    {city: "al-Manama"},
    {city: "Dhaka"},
    {city: "Bridgetown"},
    {city: "Minsk"},
    {city: "Bruxelles"},
    {city: "Belmopan"},
    {city: "Porto-Novo"},
    {city: "Hamilton"},
    {city: "Thimphu"},
    {city: "La Paz"},
    {city: "Sarajevo"},
    {city: "Gaborone"},
    {city: "Brasília"},
    {city: "Bandar Seri Begawan"},
    {city: "Sofia"},
    {city: "Ouagadougou"},
    {city: "Bujumbura"},
    {city: "Phnom Penh"},
    {city: "Yaound"},
    {city: "Ottawa"},
    {city: "Praia"},
    {city: "George Town"},
    {city: "Bangui"},
    {city: "N'Djam"},
    {city: "Santiago de Chile"},
    {city: "Peking"},
    {city: "Flying Fish Cove"},
    {city: "West Island"},
    {city: "Santaf"},
    {city: "Moroni"},
    {city: "Brazzaville"},
    {city: "Avarua"},
    {city: "San Jos"},
    {city: "Zagreb"},
    {city: "La Habana"},
    {city: "Nicosia"},
    {city: "Praha"},
    {city: "Copenhagen"},
    {city: "Djibouti"},
    {city: "Roseau"},
    {city: "Santo Domingo de Guzm"},
    {city: "Dili"},
    {city: "Quito"},
    {city: "Cairo"},
    {city: "San Salvador"},
    {city: "London"},
    {city: "Malabo"},
    {city: "Asmara"},
    {city: "Tallinn"},
    {city: "Addis Abeba"},
    {city: "Stanley"},
    {city: "Tórshavn"},
    {city: "Suva"},
    {city: "Helsinki"},
    {city: "Paris"},
    {city: "Cayenne"},
    {city: "Papeete"},
    {city: "Libreville"},
    {city: "Banjul"},
    {city: "Tbilisi"},
    {city: "Berlin"},
    {city: "Accra"},
    {city: "Gibraltar"},
    {city: "Athenai"},
    {city: "Nuuk"},
    {city: "Saint George's"},
    {city: "Basse-Terre"},
    {city: "Aga"},
    {city: "Ciudad de Guatemala"},
    {city: "Conakry"},
    {city: "Bissau"},
    {city: "Georgetown"},
    {city: "Port-au-Prince"},
    {city: "Citt"},
    {city: "Tegucigalpa"},
    {city: "Victoria"},
    {city: "Budapest"},
    {city: "Reykjav"},
    {city: "New Delhi"},
    {city: "Jakarta"},
    {city: "Tehran"},
    {city: "Baghdad"},
    {city: "Dublin"},
    {city: "Jerusalem"},
    {city: "Roma"},
    {city: "Yamoussoukro"},
    {city: "Kingston"},
    {city: "Tokyo"},
    {city: "Amman"},
    {city: "Astana"},
    {city: "Nairobi"},
    {city: "Bairiki"},
    {city: "Kuwait"},
    {city: "Bishkek"},
    {city: "Vientiane"},
    {city: "Riga"},
    {city: "Beirut"},
    {city: "Maseru"},
    {city: "Monrovia"},
    {city: "Tripoli"},
    {city: "Vaduz"},
    {city: "Vilnius"},
    {city: "Luxembourg"},
    {city: "Macao"},
    {city: "Skopje"},
    {city: "Antananarivo"},
    {city: "Lilongwe"},
    {city: "Kuala Lumpur"},
    {city: "Male"},
    {city: "Bamako"},
    {city: "Valletta"},
    {city: "Dalap-Uliga-Darrit"},
    {city: "Fort-de-France"},
    {city: "Nouakchott"},
    {city: "Port-Louis"},
    {city: "Mamoutzou"},
    {city: "Ciudad de M"},
    {city: "Palikir"},
    {city: "Chisinau"},
    {city: "Monaco-Ville"},
    {city: "Ulan Bator"},
    {city: "Podgorica"},
    {city: "Plymouth"},
    {city: "Rabat"},
    {city: "Maputo"},
    {city: "Rangoon (Yangon)"},
    {city: "Windhoek"},
    {city: "Yaren"},
    {city: "Kathmandu"},
    {city: "Amsterdam"},
    {city: "Willemstad"},
    {city: "Noum"},
    {city: "Wellington"},
    {city: "Managua"},
    {city: "Niamey"},
    {city: "Abuja"},
    {city: "Alofi"},
    {city: "Kingston"},
    {city: "Pyongyang"},
    {city: "Belfast"},
    {city: "Garapan"},
    {city: "Oslo"},
    {city: "Masqat"},
    {city: "Islamabad"},
    {city: "Koror"},
    {city: "Gaza"},
    {city: "Ciudad de Panam"},
    {city: "Port Moresby"},
    {city: "Asunci"},
    {city: "Lima"},
    {city: "Manila"},
    {city: "Adamstown"},
    {city: "Warszawa"},
    {city: "Lisboa"},
    {city: "San Juan"},
    {city: "Doha"},
    {city: "Saint-Denis"},
    {city: "Bucuresti"},
    {city: "Moscow"},
    {city: "Kigali"},
    {city: "Jamestown"},
    {city: "Basseterre"},
    {city: "Castries"},
    {city: "Saint-Pierre"},
    {city: "Kingstown"},
    {city: "Apia"},
    {city: "San Marino"},
    {city: "S"},
    {city: "Riyadh"},
    {city: "Edinburgh"},
    {city: "Dakar"},
    {city: "Belgrade"},
    {city: "Victoria"},
    {city: "Freetown"},
    {city: "Singapore"},
    {city: "Bratislava"},
    {city: "Ljubljana"},
    {city: "Honiara"},
    {city: "Mogadishu"},
    {city: "Pretoria"},
    {city: "Seoul"},
    {city: "Juba"},
    {city: "Madrid"},
    {city: "Khartum"},
    {city: "Paramaribo"},
    {city: "Longyearbyen"},
    {city: "Mbabane"},
    {city: "Stockholm"},
    {city: "Bern"},
    {city: "Damascus"},
    {city: "Dushanbe"},
    {city: "Dodoma"},
    {city: "Bangkok"},
    {city: "Kinshasa"},
    {city: "Lom"},
    {city: "Fakaofo"},
    {city: "Nuku'alofa"},
    {city: "Port-of-Spain"},
    {city: "Tunis"},
    {city: "Ankara"},
    {city: "Ashgabat"},
    {city: "Cockburn Town"},
    {city: "Funafuti"},
    {city: "Kampala"},
    {city: "Kyiv"},
    {city: "Abu Dhabi"},
    {city: "London"},
    {city: "Washington"},
    {city: "Montevideo"},
    {city: "Toskent"},
    {city: "Port-Vila"},
    {city: "Caracas"},
    {city: "Hanoi"},
    {city: "Road Town"},
    {city: "Charlotte Amalie"},
    {city: "Cardiff"},
    {city: "Mata-Utu"},
    {city: "El-Aai"},
    {city: "Sanaa"},
    {city: "Lusaka"},
    {city: "Harare"
    }
];

export default Weather;
