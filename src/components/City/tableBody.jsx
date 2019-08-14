import React, { Component } from 'react';

class TableBody extends Component {
    constructor(props){
        super(props)
        this.state = { 
            max : this.props.tempMax
         }
    }
    render() { 
        return(
            <tbody>
                <tr>
                <td>
                    <h6>Monday</h6>
                </td>
                <td>
                    <i className= {`wi wi-thunderstorm display-4`} style={{fontSize: 20 + "px"}}></i>
                </td>
                <td>
                    <p>{this.props.tempMax[0]}&deg;</p>
                </td>
                <td>
                    <p>70&deg;</p>
                </td>
            </tr>
            </tbody>
        )
    }      
}

 
export default TableBody;