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
      tomorrowThree : [],

      tomorrowIcon: undefined,
      tomorrowOneIcon : undefined,
      tomorrowTwoIcon : undefined,
      tomorrowThreeIcon : undefined,
      
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
        // console.log(json.list)
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
  let tomIcon = ''
  let oneIcon = ''
  let twoIcon = ''
  let threeIcon = ''
  json.map((e) => {
    let date = moment.unix(e.dt)._d.getDate()
    if(date === TOMMOROW){
      tomIcon = e.weather[0].id
      tom.push(e.main.temp)
    }else if(date === ONE){
      oneIcon = e.weather[0].id
      one.push(e.main.temp)
    }else if(date === TWO){
      twoIcon = e.weather[0].id
      two.push(e.main.temp)
    }else if(date === THREE){
      threeIcon = e.weather[0].id
      three.push(e.main.temp)
    }
    return null
  })

  that.setState({
    tomorrow: [this.dayArray(tom)[0],this.dayArray(tom)[1]],
    tomorrowOne : [this.dayArray(one)[0],this.dayArray(one)[1]],
    tomorrowTwo : [this.dayArray(two)[0],this.dayArray(two)[1]],
    tomorrowThree : [this.dayArray(three)[0],this.dayArray(three)[1]],
    tomorrowIcon: tomIcon,
    tomorrowOneIcon : oneIcon,
    tomorrowTwoIcon : twoIcon,
    tomorrowThreeIcon : threeIcon,
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
dayOfWeek(plus){
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const current = new Date()
  return days[ current.getDay() + plus ] 
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
            day={this.dayOfWeek(0)}
            icon={weatherFunctions.shared.weatherIcons(this.state.tomorrowIcon)}
          ></TableBody>
          <TableBody
            tempMax={this.state.tomorrowOne}
            day={this.dayOfWeek(1)}
            icon={weatherFunctions.shared.weatherIcons(this.state.oneIcon)}
          ></TableBody>
          <TableBody
            tempMax={this.state.tomorrowTwo}
            day={this.dayOfWeek(2)}
            icon={weatherFunctions.shared.weatherIcons(this.state.twoIcon)}
          ></TableBody>
          <TableBody
            tempMax={this.state.tomorrowThree}
            day={this.dayOfWeek(3)}
            icon={weatherFunctions.shared.weatherIcons(this.state.threeIcon)}
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

