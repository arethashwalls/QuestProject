// Imports:
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import QuestNav from './components/QuestNav';
import Quest from './pages/Quest';
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Chart from "./pages/Chart";
import NoMatch from './pages/NoMatch';
import './App.css';

class App extends Component {
  state = {
    signedIn: false
  };

  render() {
    return <div>
    <QuestNav signedIn={this.state.signedIn} />
      <Router>
          <Switch>
            <Route exact path="/" component={this.state.signedIn ? Quest : Welcome} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/chart" component={Chart} />
            <Route component={NoMatch} />
          </Switch>
      </Router>
    </div>
  }
}

export default App;