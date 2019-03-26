import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Signin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        username: 1
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'label' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <div>
        <form>
          <label>
            Welcome back! Type in your username and password to continue with your quest.
          <br /></label>
          <br />
          <label>
            Username:
            <input
              name="usermane"
              type="text"
              value={this.state.username}
              onChange={this.handleInputChange} />
          </label>
        </form>
        <br />
        <form>
            <label> 
          <br />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleInputChange} />
          </label>
        </form>
            </div>
      );
    }
  }
  
  export default Signin;