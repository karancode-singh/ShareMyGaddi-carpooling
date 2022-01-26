import React from 'react';

import './Navbar.css'

export default function Navbar(props) {
  return(
        <div id="Navbar-container" >
            Hello {props.name} !            
        </div>
    );
}
