// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import MainComponent from './components/MainComponent';

/**
 * @module module:src/App
 */
function App() {
  return (
    <Router>
      <div>
        <MainComponent />
      </div>
    </Router>
  );
}

export default App;
