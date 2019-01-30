import React, { Component } from 'react'
import axios from 'axios';
import _ from 'lodash';
import { API_KEY, baseUrl } from '../apis/OpenWeatherMap';

export default class LocationInput extends Component {
  componentDidUpdate = async () => {
      if (_.isEmpty(this.props) === false) {
        const { latitude, longitude } = this.props.location
        let data = await axios.get(`${baseUrl}?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`)
        console.log(data);
      }
  }

  render() {
    return (
      <div className="ui stackable two column grid">
        <div className="column">
          <div style={{marginTop: '10px', marginLeft: '10px'}} className="ui segment">
            <div className="ui center aligned header">
              Current Weather and Forecast for Your Location
            </div>
          </div>
          {_.isEmpty(this.props) ? (
            <span style={{paddingLeft: '20px', color: 'red'}}>Please enable your location in order to see the current conditions and forecast for your area!</span>
          ) : (
            <div style={{textAlign: 'center'}}>Here's your info!</div>
          )}
        </div>
        <div className="column">
          <div style={{marginTop: '5px', marginRight: '10px'}} className="ui segment">
            <div className='ui fluid input'>
                <input type='text' placeholder='Enter city name...'/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
