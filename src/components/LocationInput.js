import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { baseUrl } from "../apis/APIXU";

export default class LocationInput extends Component {
  state = {
    city: "",
    currentCity: {},
    selectedCity: {}
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.location !== this.props.location) {
      const { latitude, longitude } = this.props.location;
      const data = await axios.get(`${baseUrl}&q=${latitude},${longitude}`);
      this.setState({
        currentCity: data.data
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
      const data = await axios.get(`${baseUrl}&q=${city}`);
      this.setState({
        selectedCity: data.data
      });
    }
  };

  render() {
    const { currentCity, selectedCity } = this.state;
    console.log(currentCity);
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
              {_.isEmpty(currentCity) === false ? (
                <div>
                  <div className="ui center aligned header">
                    {currentCity.location.name}, {currentCity.location.region}{" "}
                  </div>
                  <div className="ui segment">
                    <div className="ui statistics">
                      <div className="statistic">
                        <div className="value">
                          <img
                            className="ui circular inline image"
                            alt="current weather "
                            src={currentCity.current.condition.icon}
                          />
                          {currentCity.current.temp_f} &deg;F
                        </div>
                        <div className="label">
                          {currentCity.current.condition.text}
                        </div>
                      </div>
                      <div className="ui statistic">
                        <div className="value">
                          {currentCity.current.feelslike_f} &deg;F
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
              />
            </div>
          </div>
          {_.isEmpty(selectedCity) === false ? (
            <div>
              <div className="ui center aligned header">
                {selectedCity.location.name}, {selectedCity.location.region}
              </div>
              <div className="ui segment">
                <div className="ui statistics">
                  <div className="statistic">
                    <div className="value">
                      <img
                        className="ui circular inline image"
                        alt="current weather "
                        src={selectedCity.current.condition.icon}
                      />
                      {selectedCity.current.temp_f} F
                    </div>
                    <div className="label">
                      {selectedCity.current.condition.text}
                    </div>
                  </div>
                  <div className="ui statistic">
                    <div className="value">
                      {selectedCity.current.feelslike_f} &deg;F
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
