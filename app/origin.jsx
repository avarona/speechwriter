'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import '../public/sass/layout.scss';
import 'bootstrap/dist/css/bootstrap.css';

const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('origin')
);
