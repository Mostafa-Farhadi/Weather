import React from 'react'
import { connect } from 'react-redux'
import ReactApexChart from 'react-apexcharts'

function Hourly(props) {
    const {cityData} = props;
    let temperatursArr = []
    let hoursArr = []
    let plotDetail = {}
    let plotDataArr = []
    
    if (!cityData.loading && !cityData.errorBoolean) {
        cityData.hourlyData.list.forEach(element => {
            temperatursArr.push(Math.floor(element.main.temp))
            const timezone = cityData.hourlyData.city.timezone
            hoursArr.push(element.dt + timezone)
        })
        let newHoursArr = hoursArr.map(element => element * 1000)
        for (let index = 0; index < temperatursArr.length; index++) {
            plotDataArr[index] = [newHoursArr[index], temperatursArr[index]] 
        }
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
        }
    }

    return (
        cityData.loading || cityData.errorBoolean ? (
            ''
        ) : (
            <section id="hourly-forcast">
                <ReactApexChart
                    className="plot"
                    options={plotDetail.options}
                    series={plotDetail.series}
                    type="area"
                    width="1070"
                    height= "200"
                />
            </section>
        )
    )
}

const mapStateToProps = state => {
    return {
        cityData: state.cityData
    };
};

export default connect(mapStateToProps, null)(Hourly)
