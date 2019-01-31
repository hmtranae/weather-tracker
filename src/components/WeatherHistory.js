import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts'
import { token } from '../apis/NOAA'

export default class WeatherHistory extends Component {
    componentDidMount = async () => {
        const config = {
            headers: {'token': token}
        }

        const data = await axios.get('https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets', config)
        console.log(data)
    }

    render() {
        return (
            <div>WeatherHistory</div>
        )
    }
}