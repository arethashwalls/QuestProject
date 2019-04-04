import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/PrivateRoute';
import Quest from './pages/Quest';
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import NoMatch from './pages/NoMatch';
import themes from './utils/themes'
import './App.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './signin';
  }
}
// Imports:


class App extends Component {
  state = {
    theme: themes('redGreen')
  };

  render() {
    document.getElementById('root').style.backgroundColor = this.state.theme.lightBg.backgroundColor;
    return <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/welcome' render={() => <Welcome theme={this.state.theme} />} />
          <Route exact path='/signup' render={() => <Signup theme={this.state.theme} />} />
          <Route exact path='/signin' render={() => <Signin theme={this.state.theme} />} />
          <PrivateRoute exact path='/' component={Quest} theme={this.state.theme}  />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </Provider>
  }
}
export default App;
