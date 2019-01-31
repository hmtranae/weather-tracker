import React, { Component } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { token, baseUrl, datasetid } from "../apis/NOAA";
import { Dropdown } from "semantic-ui-react";
import { stateOptions } from "../utils/StateOptions";
import { yearOptions } from "../utils/YearOptions";

const config = {
  headers: { token: token }
};

export default class WeatherHistory extends Component {
  state = {
    yearValue: "",
    stateValue: "",
    stateId: "",
    showStateDropdown: false
  };

  componentDidMount = async () => {};

  onYearChange = (e, { value }) => {
    this.setState({
      yearValue: value,
      showStateDropdown: true
    });
  };

  getMonth = () => {
    let month = "";
    if (new Date().getMonth() < 9) {
      month = `0${new Date().getMonth() + 1}`;
    } else {
      month = `${new Date().getMonth() + 1}`;
    }
    return month;
  };

  onStateChange = async (e, { value }) => {
    const stateData = await axios.get(
      "https://www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=ST&limit=52",
      config
    );
    const stateId = stateData.data.results.filter(
      state => state.name === value
    );

    const month = this.getMonth();
    const beginDate = `${new Date().getFullYear() - this.state.yearValue}-12-${new Date().getDate()}`;
    const endDate = `${new Date().getFullYear()}-${month}-${new Date().getDate()}`;
    const weatherData = await axios.get(`${baseUrl}${datasetid}&locationid=${stateId[0].id}&startdate=${beginDate}&enddate=${endDate}&units=standard&limit=100`,
      config
    );
    console.log(weatherData)
    this.setState({
      stateValue: value,
      stateId: stateId[0].id
    });
  };

  render() {
    return (
      <div>
        <div className="ui divider" />
        <div className="ui one column centered grid">
          <div className="column">
            <div
              style={{ paddingTop: "20px" }}
              className="ui center aligned large header"
            >
              See how the weather has changed over time!
            </div>
            <div
              style={{ paddingTop: "50px", paddingBottom: "150px" }}
              className="ui text container"
            >
              <Dropdown
                style={{ marginBottom: "20px" }}
                placeholder="Data dating back..."
                search
                fluid
                selection
                options={yearOptions}
                onChange={this.onYearChange}
                value={this.state.yearValue}
              />
              {this.state.showStateDropdown ? (
                <Dropdown
                  placeholder="Choose state..."
                  search
                  fluid
                  selection
                  options={stateOptions}
                  onChange={this.onStateChange}
                  value={this.state.stateValue}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
