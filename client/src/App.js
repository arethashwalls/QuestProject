// Imports:
import React, { Component } from 'react';
import api from './utils/api'
import './App.css';

class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    api.getAllUsers()
    .then(res => {
      this.setState({users: res.data})
    })
    .catch(err => console.log(err));
  }

  render() {
    return <div>
      <h1>{this.state.users.map(user => user.username + ', ')}</h1>
    </div>
  }
}

export default App;
