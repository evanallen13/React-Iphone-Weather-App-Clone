import React, { Component } from 'react';
import './App.css';
import City from './components/City/City'
import 'bootstrap/dist/css/bootstrap.min.css'
import "weather-icons/css/weather-icons.css";

class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      city : 'los angeles',
      country : 'us'
     }
     this.changeState = this.changeState.bind(this)
  }

  changeState(CITY,COUNTRY){
    this.setState({
      city : CITY,
      country : COUNTRY
    })
  }
  render() { 
    return ( 
      <div className='App'>
        {this.state.city ? 
          (<City
            city = {this.state.city}
            country = {this.state.country}
          ></City>):null}
{/* 
          <form>
            <div className="form-group">
              <input id='cityInput' type="text" className="form-control"  placeholder="City"></input>
              <input id='countryInput' type="text" className="form-control"  placeholder="Country"></input>
              <button 
                type="submit" 
                className="btn btn-primary" 
                onClick={()=> {
                  const city = document.getElementById('cityInput').value
                  const country = document.getElementById('countryInput').value
                  if(city && country){
                    this.changeState(city,country)
                  }
                }}
                >Submit</button>
            </div>
          </form> */}
      </div>
     );
  }
}
 
export default App;