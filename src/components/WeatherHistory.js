import React, { Component } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'
import { token } from '../apis/NOAA'
import { Dropdown } from 'semantic-ui-react'
import { stateOptions } from '../utils/StateOptions'
import { yearOptions } from '../utils/YearOptions'

export default class WeatherHistory extends Component {
  state = {
    state: '',
    year: ''
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

  render() {
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
              />
              <Dropdown
                placeholder="Choose state..."
                search
                fluid
                selection
                options={stateOptions}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
