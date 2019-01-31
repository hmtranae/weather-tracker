import React, { Component } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'
import { token } from '../apis/NOAA'
import { Dropdown } from 'semantic-ui-react'
import { stateOptions } from '../utils/StateOptions'
import { yearOptions } from '../utils/YearOptions'

export default class WeatherHistory extends Component {
  state = {
    yearValue: '',
    stateValue: ''
  }

  componentDidMount = async () => {
    const config = {
      headers: { token: token }
    }
    const states = await axios.get(
      'https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=ST&limit=52',
      config
    )
    console.log(states)
    const data = await axios.get(
      'https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets',
      config
    )
    console.log(data)
  }

  onYearChange = (e, { value }) => {
    this.setState({
      yearValue: value
    })
  }

  onStateChange = (e, { value }) => {
    this.setState({
      stateValue: value
    })
  }

  render() {
    console.log(this.state.yearValue)
    console.log(this.state.stateValue)
    return (
      <div>
        <div className="ui divider" />
        <div className="ui one column centered grid">
          <div className="column">
            <div style={{paddingTop: '20px'}} className='ui center aligned large header'>See how the weather has changed over time!</div>
            <div
              style={{ paddingTop: '50px', paddingBottom: '150px' }}
              className="ui text container"
            >
              <Dropdown
                style={{marginBottom: '20px'}}
                placeholder='Data dating back...'
                search
                fluid
                selection
                options={yearOptions}
                onChange={this.onYearChange}
                value={this.state.yearValue}
              />
              <Dropdown
                placeholder="Choose state..."
                search
                fluid
                selection
                options={stateOptions}
                onChange={this.onStateChange}
                value={this.state.stateValue}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
