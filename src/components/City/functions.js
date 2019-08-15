class weatherFunctions{
    weatherIcons = (weatherIcon) => {
        let result;
        if(weatherIcon >= 200 && weatherIcon < 232){
            result =  "wi-thunderstorm"
        }else if(weatherIcon >= 300 && weatherIcon < 321){
            result = 'wi-sleet'
        }
        else if(weatherIcon >= 500 && weatherIcon < 521){
            result = 'wi-storm-showers'
        }else if(weatherIcon >= 600 && weatherIcon < 622){
            result = 'wi-snow'
        }else if(weatherIcon >= 701 && weatherIcon < 781){
            result = "wi-fog"
        }else if(weatherIcon === 800){
            result = "wi-day-sunny"
        }else if(weatherIcon >= 801 && weatherIcon <= 804){
            result = "wi-day-fog"
        }else{
            result = "wi-day-sunny";
        }
        return result
    }
    convertTime = (time) => {
        let date = new Date(time * 1000)      
        let hour = date.getHours()
        let result;
        if(hour > 12){
            hour = date.getHours() - 12
            result = `${hour}:${date.getMinutes()}0pm`
        }else{
            result = `${hour}:${date.getMinutes()}0am`
        }
        return result;
    }
    convertTemp = (temp) => {
        let TEMP = Math.floor(((temp - 273.15) * 9/5) + 32)
        return TEMP;
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
  
}
weatherFunctions.shared = new weatherFunctions();
export default weatherFunctions;