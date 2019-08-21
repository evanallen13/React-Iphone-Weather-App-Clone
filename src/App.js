import React, { Component } from 'react';
import './App.css';
import City from './components/City/City'
import 'bootstrap/dist/css/bootstrap.min.css'
import "weather-icons/css/weather-icons.css";
import Homepage from './components/Homepage/Homepage'
import Footer from './components/Footer/footer'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      cities : [
        {
          key: 1,
          city: 'Los Angeles',
          country: 'US'
        },
      ]
     }
     this.addToState = this.addToState.bind(this)
     this.deleteFromState = this.deleteFromState.bind(this)
  }
  addToState(City,Country){
    let len = this.state.cities.length + 1
    let previous = this.state.cities

    previous.push({
      key : len,
      city : City,
      country : Country
    })
    this.setState({
      cities : previous
    })
  }
  deleteFromState(key){
    console.log(`Delete: ${key}`)
  }

  render() { 
    return ( 
      <div className='App'>
        {console.log(this.state)}
        <Router>
          <Route exact path="/" component= {() => 
              <Homepage 
                key = {'cities'}
                cities = {this.state.cities}
                addEvent = {this.addToState}
              ></Homepage>}></Route>
          <Switch>
          {
            this.state.cities.map((e) => 
            <Route exact path={"/" + e.key} component={() => 
                <City 
                    key = {e.key} 
                    city = {e.city} 
                    country = {e.country} 
                ></City>}></Route>
          )}
          </Switch>

        </Router>
        <Footer></Footer>
      </div>
        
      
     );
  }
}
 
export default App;