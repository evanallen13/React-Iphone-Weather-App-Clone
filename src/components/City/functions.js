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
        let TEMP = Math.floor(((temp - 273.15) * 1.8) + 32)
        return TEMP;
    }
}
weatherFunctions.shared = new weatherFunctions();
export default weatherFunctions;