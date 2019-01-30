import React, { Component } from 'react'
import LocationInput from './LocationInput'
import ReactAnimatedWeather from 'react-animated-weather'

export default class App extends Component {
  state = {
    userLocation: {
      latitude: null,
      longitude: null
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      const userLocation = {
        latitude: latitude,
        longitude: longitude
      }
      this.setState({
        userLocation
      })
    })
  }

  render() {
    return (
      <div>
          <LocationInput location={this.state.userLocation} />
      </div>
    )
  }
}
