import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "../apis/APIXU";

export default class LocationInput extends Component {
  state = {
    city: "",
    currentCity: {}
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.location !== this.props.location) {
      const { latitude, longitude } = this.props.location;
      const data = await axios.get(
        `${baseUrl}&q=${latitude},${longitude}`
      );
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
      let data = await axios.get(`${baseUrl}?q=${city}`);
      console.log(data);
    }
  };

  render() {
    console.log(this.state.currentCity)
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
            </div>
          )}
        </div>
        <div className="column">
          <div
            style={{ marginTop: "5px", marginRight: "10px" }}
            className="ui segment"
          >
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
        </div>
      </div>
    );
  }
}
