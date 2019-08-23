import React, { Component } from 'react';
import './Homepage.css'

function keyEvent(e){
    if(e.key === 'Enter' && document.getElementById("cityInput").value !== '' && document.getElementById("countryInput").value !== '' ){
        console.log(this.props.cities)
    }
}

const Homepage = (props) =>{
    return ( 
        <div id="homepage">
            <div id="homepageTitle">
                <h4 id="homepageTitleDegrees">F&deg;/C&deg;</h4>
                <h4 id="homepageTitleAddBtn"
                    onClick={()=>{
                        if(document.getElementById('inputDiv').style.display === 'none'){
                            document.getElementById('inputDiv').style.display = 'block'
                        }
                        else {
                            document.getElementById('inputDiv').style.display = 'none'
                        }
                    }}
                >+</h4>
            </div>
            <div id='inputDiv'>
                <input id="cityInput" type="text" placeholder="City"
                    onKeyPress = {(e) => {
                        if(e.key === 'Enter' && document.getElementById("cityInput").value !== '' && document.getElementById("countryInput").value !== '' ){
                            props.event(document.getElementById("cityInput").value,document.getElementById("countryInput").value)
                        }
                        }
                    }
                ></input>
                <input id="countryInput" type="text" placeholder='Country'
                    onKeyPress = {(e) => {
                        if(e.key === 'Enter' && document.getElementById("cityInput").value !== '' && document.getElementById("countryInput").value !== '' ){
                            props.addEvent(document.getElementById("cityInput").value,document.getElementById("countryInput").value)
                        }
                        }
                    }
                ></input>
            </div>
            {props.cities.map((e)=> 
                <div className="homepageCity">
                    <h4 
                        className="homepageCityTitle"
                        onClick = {
                            ()=> window.location.href = `/${e.key}`
                        }
                        >{e.city}</h4>
                    <h4 className="homepageCityTitle">{80}&deg;</h4>
                    <h4 className="deleteBtn"> &times; </h4>
                </div>
            )
            }
        </div>
     );
}


 
export default Homepage;