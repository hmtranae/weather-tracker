import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { currentBaseUrl, forecastBaseUrl } from "../apis/APIXU";

export default class LocationInput extends Component {
  state = {
    city: "",
    currentCity: {},
    selectedCity: {}
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.location !== this.props.location) {
      const { latitude, longitude } = this.props.location;
      const currentWeather = await axios.get(`${currentBaseUrl}&q=${latitude},${longitude}`);
      const forecastWeather = await axios.get(`${forecastBaseUrl}&q=${latitude},${longitude}&days=4`)
      this.setState({
        currentCity: {
          currentWeather: currentWeather.data,
          forecastWeather: forecastWeather.data
        }
      });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = async e => {
    if (e.key === "Enter") {
      const { city } = this.state;
      const currentWeather = await axios.get(`${currentBaseUrl}&q=${city}`);
      const forecastWeather = await axios.get(`${forecastBaseUrl}&q=${city}&days=4`);
      this.setState({
        selectedCity: {
          currentWeather: currentWeather.data,
          forecastWeather: forecastWeather.data
        },
        city: ''
      });
    }
  };

  render() {
    const { currentWeather: currentActual, forecastWeather: forecastActual } = this.state.currentCity;
    const { currentWeather: currentSelected, forecastWeather: forecastSelected } = this.state.selectedCity;
    console.log(forecastActual);
    return (
      <div className="ui stackable two column grid">
        <div className="column">
          <div
            style={{ marginTop: "10px", marginLeft: "10px" }}
            className="ui segment"
          >
            <div className="ui center aligned header">
              Current Weather and Forecast for Your Location
            </div>
          </div>
          {this.props.location.latitude === "" ? (
            <span style={{ paddingLeft: "20px", color: "red" }}>
              Please enable your location in order to see the current conditions
              and forecast for your area!
              {this.props.location.latitude}
            </span>
          ) : (
            <div>
              <div style={{ textAlign: "center" }}>Here's your info!</div>
              {_.isEmpty(currentActual) === false ? (
                <div>
                  <div className="ui center aligned header">
                    {currentActual.location.name}, {currentActual.location.region}{" "}
                  </div>
                  <div className="ui segment">
                    <div className="ui statistics">
                      <div className="statistic">
                        <div className="value">
                          <img
                            className="ui circular inline image"
                            alt="current weather"
                            src={currentActual.current.condition.icon}
                          />
                          {currentActual.current.temp_f} &deg;F
                        </div>
                        <div className="label">
                          {currentActual.current.condition.text}
                        </div>
                      </div>
                      <div className="ui statistic">
                        <div className="value">
                          {currentActual.current.wind_mph} mph
                        </div>
                        <div className="label">Wind Speed</div>
                      </div>
                      <div className="ui statistic">
                        <div className="value">
                          {currentActual.current.feelslike_f} &deg;F
                        </div>
                        <div className="label">Feels like</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
        <div className="column">
          <div
            style={{ marginTop: "5px", marginRight: "10px" }}
            className="ui segment"
          >
            <div className="ui center aligned header">
              Current Weather and Forecast for Location
            </div>

            <div className="ui fluid input">
              <input
                onKeyPress={this.onSubmit}
                onChange={this.onChange}
                name="city"
                type="text"
                placeholder="Enter city name..."
                value={this.state.city}
              />
            </div>
          </div>
          {_.isEmpty(currentSelected) === false ? (
            <div>
              <div className="ui center aligned header">
                {currentSelected.location.name}, {currentSelected.location.region}
              </div>
              <div className="ui segment">
                <div className="ui statistics">
                  <div className="statistic">
                    <div className="value">
                      <img
                        className="ui circular inline image"
                        alt="current weather "
                        src={currentSelected.current.condition.icon}
                      />
                      {currentSelected.current.temp_f} F
                    </div>
                    <div className="label">
                      {currentSelected.current.condition.text}
                    </div>
                  </div>
                  <div className="ui statistic">
                    <div className="value">
                      {currentSelected.current.wind_mph} mph
                    </div>
                    <div className="label">Wind Speed</div>
                  </div>
                  <div className="ui statistic">
                    <div className="value">
                      {currentSelected.current.feelslike_f} &deg;F
                    </div>
                    <div className="label">Feels like</div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
