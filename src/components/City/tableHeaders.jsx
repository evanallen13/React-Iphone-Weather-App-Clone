import React from 'react';

const TableHeader = (props) =>{
    return(
        <th scope="col">
            <p>{props.time}</p>
            <i className={`wi ${props.icon} display-4`} style={{fontSize: 20 + "px"}}></i>
            <p>{props.temp}</p>
        </th>
    );
}

 
export default TableHeader;
 