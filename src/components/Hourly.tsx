import { connect } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import style from '../scss/components/hourly.module.scss'

function Hourly(props: any) {
    const {cityData} = props;
    const temperatursArr: number[] = [];
    const hoursArr: number[] = [];
    const plotDataArr: any[] = [];
    let plotDetail: any = {};

    if (!cityData.loading && !cityData.errorBoolean) {
        cityData.hourlyData.list.forEach((element: any) => {
            temperatursArr.push(Math.floor(element.main.temp));
            const timezone: number = cityData.hourlyData.city.timezone;
            hoursArr.push(element.dt + timezone);
        })
        const newHoursArr: number[] = hoursArr.map(element => element * 1000);
        for (let index: number = 0; index < temperatursArr.length; index++) {
            plotDataArr[index] = [newHoursArr[index], temperatursArr[index]];
        };
        plotDetail = {
            options: {
                chart: {
                    zoom: {
                        enabled: false
                    },
                    foreColor: '#eee'
                },
                dataLabels: {
                    enabled: false,
                },
                title: {
                    text: 'Weather',
                    align: 'left',
                },
                subtitle: {
                    text: 'Hourly',
                    align: 'left',
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                },
                tooltip: {
                    x: {
                        format: 'dd MMM HH:00'
                    },
                },
                markers: {
                    size: 3,
                    colors: ["#0984e3"],
                    strokeWidth: 0,
                    hover: {
                        size: 5,
                    }
                },
            },
            series: [{
                name: "Temperature",
                data: plotDataArr,
            }]
        };
    };

    return (
        <section className={style.hourlyForcast}>
            {cityData.loading || cityData.errorBoolean ? (
                ''
            ) : (
                    <ReactApexChart
                        options={plotDetail.options}
                        series={plotDetail.series}
                        type="area"
                        width="1070"
                        height= "200"
                    />
            )}
        </section>
    );
};

const mapStateToProps = (state: any) => {
    return {
        cityData: state.cityData
    };
};

export default connect(mapStateToProps, null)(Hourly);
