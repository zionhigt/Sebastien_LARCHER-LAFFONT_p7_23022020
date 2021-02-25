import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';


document.addEventListener('DOMContentLoaded', function() {
    const elemDropDown = document.querySelectorAll('.dropdown-trigger');
    const container = document.getElementById('onlineContainer');
    const dropDown = M.Dropdown.init(elemDropDown, {coverTrigger: false, alignment: 'right', container: container});
  });

ReactDOM.render(<App/>, document.getElementById('root'))