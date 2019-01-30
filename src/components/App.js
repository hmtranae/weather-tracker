import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
        })
    }

    render() {
        return (
            <div>App</div>
        )
    }
}