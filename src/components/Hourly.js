import React from 'react'
import { connect } from 'react-redux'
import ReactApexChart from 'react-apexcharts'

function Hourly(props) {
    const {cityData} = props;
    let temperatursArr = []
    let hoursArr = []
    let object = {}
    let dataArr = []
    
    if (cityData.loading) {
        temperatursArr = []
        hoursArr = []
        object = {}
        dataArr = []
    } else {
        cityData.hourlyData.list.forEach(element => {
            temperatursArr.push(Math.floor(element.main.temp))
            hoursArr.push(element.dt)
        })
        let newHoursArr = hoursArr.map(element => element * 1000)
        for (let index = 0; index < temperatursArr.length; index++) {
            dataArr[index] = [newHoursArr[index], temperatursArr[index]] 
        }
        object = {
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
                        format: 'dd MMMM hh:00'
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
                data: dataArr,
            }]
        }
    }

    return (
        cityData.loading ? (
            ''
        ) : (
            <div className="weather-hourly">
                <ReactApexChart
                    className="plot"
                    options={object.options}
                    series={object.series}
                    type="area"
                    width="1070"
                    height= "200"
                />
            </div>
        )
    )
}

const mapStateToProps = state => {
    return {
        cityData: state.cityData
    };
};

export default connect(mapStateToProps, null)(Hourly)
