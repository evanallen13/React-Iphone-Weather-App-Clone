import React, { Component } from 'react';
import './City.css'
import TableHeaders from './tableHeaders'
import TableBody from './tableBody'
import weatherFunctions from './functions'
import moment from 'moment'

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
      tomorrow: [],
      tomorrowOne : [],
      tomorrowTwo : [],
      tomorrowThree : []
    }
    this.getWeather(this.props)
  }
  getWeather = (props) => {
    const APIkey = '02f67365df77b06141b7abcc012fabd7';
    const that = this;
    const request = async () => {
        const response = await fetch(`//api.openweathermap.org/data/2.5/forecast?q=${props.city},${props.country}&appid=${APIkey}`)
        const json = await response.json()
        this.weatherByDays(json.list,that)
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
weatherByDays(json,that){
  const TOMMOROW = new Date().getDate() + 1
  const ONE = new Date().getDate() + 2
  const TWO = new Date().getDate() + 3
  const THREE = new Date().getDate() + 4
  let tom = []
  let one = []
  let two = []
  let three = []
  json.map(function(e){
    let date = moment.unix(e.dt)._d.getDate()
    if(date === TOMMOROW){
      tom.push(e.main.temp)
    }else if(date === ONE){
      one.push(e.main.temp)
    }else if(date === TWO){
      two.push(e.main.temp)
    }else if(date === THREE){
      three.push(e.main.temp)
    }
  })
  that.setState({
    tomorrow: [this.dayArray(tom)[0],this.dayArray(tom)[1]],
    tomorrowOne : [this.dayArray(one)[0],this.dayArray(one)[1]],
    tomorrowTwo : [this.dayArray(two)[0],this.dayArray(two)[1]],
    tomorrowThree : [this.dayArray(three)[0],this.dayArray(three)[1]]
  })
}
dayArray(array){
  let min = 999;
  let max = 0;
  array.forEach(element => {
    if(element > max){
      max = element
    }
    if(element < min){
      min = element
    }
  });
  return [weatherFunctions.shared.convertTemp(max),weatherFunctions.shared.convertTemp(min)]
}
  render() { 
    if(this.state.zero.time !== undefined){
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
          <TableBody
            tempMax={this.state.tomorrow}
          ></TableBody>
          <TableBody
            tempMax={this.state.tomorrowOne}
          ></TableBody>
          <TableBody
            tempMax={this.state.tomorrowTwo}
          ></TableBody>
          <TableBody
            tempMax={this.state.tomorrowThree}
          ></TableBody>
    </table>
    </React.Fragment>
  )
  }else{
    return (
    <div></div>
    )
  }
  }
}

export default Table;

