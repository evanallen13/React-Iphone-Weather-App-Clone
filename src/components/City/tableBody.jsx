import React from 'react';

const TableBody = (props) => {
    return(
        <tr>
            <td>
                <h6>Monday</h6>
            </td>
            <td>
                <i className= {`wi wi-thunderstorm display-4`} style={{fontSize: 20 + "px"}}></i>
            </td>
            <td>
                <p>80&deg;</p>
            </td>
            <td>
                <p>70&deg;</p>
            </td>
        </tr>
    )
}

export default TableBody;