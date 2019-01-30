import React, { Component } from 'react'
import axios from 'axios'
import LocationInput from './LocationInput'

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
        App
        {this.state.userLocation.latitude ? (
          <LocationInput location={this.state.location} />
        ) : (
          <LocationInput />
        )}
      </div>
    )
  }
}
