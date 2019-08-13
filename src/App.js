import React, { Component } from 'react';
import './App.css';
import City from './components/City/City'
import 'bootstrap/dist/css/bootstrap.min.css'
//import '../src/weather_icons.css'
//import 'weather-icons/css/weather-icons.css'

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div className='App'>
          <City
            city='San Francisco'
            country='us'
          ></City>
      </div>
     );
  }
}
 
export default App;