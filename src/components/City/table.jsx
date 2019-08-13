import React, { Component } from 'react';
import './City.css'
import TableHeaders from './tableHeaders'
import TableBody from './tableBody'
import weatherFunctions from './functions'

class Table extends Component {
  constructor(props){
    super(props)
    this.state={
      zero:{
        time: undefined,
        temp:undefined,
        icon: undefined
      },
      one:{
        time:undefined,
        high: undefined,
        low: undefined,
        icon: undefined
      },
      two:{
        time:undefined,
        high: undefined,
        low: undefined,
        icon: undefined
      },
    }
    this.getWeather(this.props)
  }
  getWeather = (props) => {
    const APIkey = '02f67365df77b06141b7abcc012fabd7';
    const that = this;
    const request = async () => {
        const response = await fetch(`//api.openweathermap.org/data/2.5/forecast?q=${'Long Beach'},${'Us'}&appid=${APIkey}`)
        const json = await response.json()
        //console.log(json.list)
        that.setState({
          zero:{
            time: weatherFunctions.shared.convertTime(json.list[0].dt),
            temp: weatherFunctions.shared.convertTemp(json.list[0].main.temp),
            icon: weatherFunctions.shared.weatherIcons(json.list[0].weather[0].id)
          },
          one:{
            time: weatherFunctions.shared.convertTime(json.list[1].dt),
            temp: weatherFunctions.shared.convertTemp(json.list[1].main.temp),
            icon: weatherFunctions.shared.weatherIcons(json.list[1].weather[0].id)
          },
          two:{
            time: weatherFunctions.shared.convertTime(json.list[2].dt),
            temp: weatherFunctions.shared.convertTemp(json.list[2].main.temp),
            icon: weatherFunctions.shared.weatherIcons(json.list[2].weather[0].id)
          },
        })
        
    }
    request();
}
  render() { 
    return (
      <React.Fragment>
      <table className="table table-borderless">
      <thead>
        <tr>
          <TableHeaders icon={this.props.currentIcon} temp={this.props.temp} time={'Now'}></TableHeaders>
          <TableHeaders icon={this.state.zero.icon}  temp={this.state.zero.temp} time={this.state.zero.time}></TableHeaders>
          <TableHeaders icon={this.state.one.icon}  temp={this.state.one.temp} time={this.state.one.time}></TableHeaders>
          <TableHeaders icon={this.state.two.icon}  temp={this.state.two.temp} time={this.state.two.time}></TableHeaders>
        </tr>
      </thead>
      <tbody>
          <TableBody></TableBody>
          <TableBody></TableBody>
          <TableBody></TableBody>
          <TableBody></TableBody>
          <TableBody></TableBody>
      </tbody>
    </table>
    </React.Fragment>
  )
  }
}
 
export default Table;

