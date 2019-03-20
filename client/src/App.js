// Imports:
import React, { Component } from 'react';
import api from './utils/api'
import './App.css';

class App extends Component {
  state = {
    userId: '',
    username: ''
  }

  componentDidMount() {
    api.getUser(this.state.userId)
  }

  render() {
    return <div>
      <p>{this.state.username}</p>
    </div>
  }
}

export default App;
