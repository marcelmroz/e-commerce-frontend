import React from 'react';
import RoutesComponent from './Routes';
import Header from './components/Header.js';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Header />
      <RoutesComponent />
    </Router>
  );
};

export default App;
