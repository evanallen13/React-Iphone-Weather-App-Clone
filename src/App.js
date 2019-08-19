import React, { Component } from 'react';
import './App.css';
import City from './components/City/City'
import 'bootstrap/dist/css/bootstrap.min.css'
import "weather-icons/css/weather-icons.css";

class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      city : '',
      country : ''
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
        <form>
              <input type='text' id='city' placeholder='Enter City'></input>
              <input type='text' id='country' placeholder='Enter Country'></input>
              <button 
                className='btn btn-success'
                type='button'
                onClick={()=> this.changeState(
                    document.getElementById('city').value,
                    document.getElementById('country').value
                )}
              >Submit</button>
        </form>
        {this.state.city ? 
          (<City
            city = {this.state.city}
            country = {this.state.country}
          ></City>):
          null
          }
      </div>
      
     );
  }
}
 
export default App;