// Imports:
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuestNav from './components/QuestNav';
import Quest from './pages/Quest';
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import NoMatch from './pages/NoMatch';
import themes from './utils/themes'
import './App.css';

class App extends Component {
  state = {
    signedIn: false,
    theme: themes.red
  };

  render() {
    document.getElementById('root').style.backgroundColor = this.state.theme.lightBg.backgroundColor;

    return <Router>
      <QuestNav signedIn={this.state.signedIn} theme={this.state.theme} />
      <Switch>
        <Route exact path="/" render={() => this.state.signedIn ?  Quest  : <Welcome theme={this.state.theme}/>} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route component={NoMatch} />
      </Switch>
    </Router>

  }
}

export default App;