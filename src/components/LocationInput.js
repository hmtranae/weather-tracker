import React, { Component } from 'react'
import axios from 'axios';
import _ from 'lodash';

export default class LocationInput extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="ui stackable two column grid">
        <div className="column">
          <div className="ui segment">
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
          <div className="ui segment">dasd</div>
        </div>
      </div>
    )
  }
}
