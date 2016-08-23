import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import Test from './components/Test';

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Test />, document.getElementById('cont'));
