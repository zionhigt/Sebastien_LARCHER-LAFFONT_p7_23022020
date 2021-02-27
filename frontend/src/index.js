import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';


document.addEventListener('DOMContentLoaded', function() {
    const elemDropDown = document.querySelectorAll('.dropdown-trigger');
    const dropDown = M.Dropdown.init(elemDropDown, {coverTrigger: false, alignment: 'right'});
    
  });

ReactDOM.render(<App/>, document.getElementById('root'))