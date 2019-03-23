// Imports:
import React, { Component } from 'react';
import Navbar from './components/Navbar'
import './App.css';

class App extends Component {
  state = {};

  render() {
    return <Navbar signedIn={false} />
  }
}

export default App;