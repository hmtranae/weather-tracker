import React, { Component } from 'react';
import axios from 'axios';

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
        console.log(this.state.userLocation)
        return (
            <div>App</div>
        )
    }
}