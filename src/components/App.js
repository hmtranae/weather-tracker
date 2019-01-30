import React, { Component } from "react";
import LocationInput from "./LocationInput";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {
        latitude: "",
        longitude: ""
      },
      count: 1
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({
        userLocation: {
          latitude,
          longitude
        }
      });
    });
  }

  render() {
    return (
      <div>
        <LocationInput location={this.state.userLocation} count={this.state.count}/>
      </div>
    );
  }
}
