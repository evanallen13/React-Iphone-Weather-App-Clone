import React, { Component } from 'react';
import './City.css'
import Table from './table'
import weatherFunctions from './functions'

class City extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            city: undefined,
            country: undefined,
            temp: undefined,
            main: undefined,
            high: undefined,
            low: undefined,
            icon: undefined,
            iconCode: undefined
        }
    }
    changeBackground = () => {
        let icon = this.state.iconCode
        switch(true){
            case icon >= 200 && icon < 232:
                document.body.style.backgroundImage = "url(../imgs/thunder.jpg)";
                break;
            case icon >= 300 && icon <= 321:
                document.body.style.backgroundImage = "url(../imgs/rain.jpg)";
                break;
            case icon >= 500 && icon < 521:
                document.body.style.backgroundImage = "url(../imgs/rain.jpg)";
                break;
            case icon >= 600 && icon <= 622:
                document.body.style.backgroundImage = "url(../imgs/snow.jpg)";
                break;
            case icon >= 701 && icon <= 781:
                document.body.style.backgroundImage = "url(../imgs/fog.png)";
                break;
            case icon === 800:
                document.body.style.backgroundImage = "url(../imgs/sun.jpg)";
                break;
            case icon >= 801 && icon <= 804:
                document.body.style.backgroundImage = "url(../imgs/cloud.jpg)";
                break;
        }
    }
    componentDidMount(){
            const APIkey = '02f67365df77b06141b7abcc012fabd7';
            const that = this;
            const request = async () => {
                const response = await fetch(`//api.openweathermap.org/data/2.5/weather?q=${this.props.city},${this.props.country}&appid=${APIkey}`)
                //const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.city},${this.props.country}&appid=${APIkey}`)
                const json = await response.json()
                console.log(json.weather[0].id)
                    that.setState({
                    city: this.props.city,
                    country: this.props.country,
                    temp: weatherFunctions.shared.convertTemp(json.main.temp),
                    main: json.weather[0].main,
                    high: weatherFunctions.shared.convertTemp(json.main.temp_max),
                    low: weatherFunctions.shared.convertTemp(json.main.temp_min),
                    icon: weatherFunctions.shared.weatherIcons(json.weather[0].id),
                    iconCode: json.weather[0].id
                    })
                    this.changeBackground()
            }
            request();
    }
    render() { 
        return(
            <div className="container">
                <div className="cards">
                    {/* City and Country name */}
                    <div className="cityName">
                        <h1>{this.state.city}</h1>
                    </div>
    
                    {/* Weather Description */}
                    <h4>{this.state.main}</h4>
    
                    {/* Degree */}
                    <h1>{this.state.temp}&deg;</h1>
                    <div className='tableTitle'>
                        <h4 className='dayOfWeek'>{dayOfWeek()}</h4>
                        {/* Max and Min Temp */}
                        <h4 className='minAndMax'>{this.state.high}&deg;/{this.state.low}&deg;</h4>
                    </div>
                    <Table
                        currentIcon={this.state.icon}
                        city={this.state.city}
                        country={this.state.country}
                        temp={this.state.temp}
                    ></Table>
                    <div className='footer'>
                        <p>...</p>
                        <img src="./imgs/hb.png" alt=""/>
                    </div>
                    
                </div>
            </div>
        )
    }
}
function dayOfWeek(){
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const day = new Date()
    return days[ day.getDay() ] 
}
 
export default City;

