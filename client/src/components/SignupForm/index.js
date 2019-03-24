import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isGoing: true,
        username: 1
      };
  
    }
  
    handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
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
            May include letters,numbers, dashes, and underscores.
          <br /></label>
          <br />
          <label>
            Username:
            <input

              name="usermane"
              type="text"
              required
              value={this.state.username}
              onChange={this.handleInputChange} />
          </label>
        </form>

        <br />

        <form>
          <label>
            Must be at least 8 characters long.
            </label> 
          <br />
          <label>
            Password:
            <input
              name="password"
              type="number"
              value={this.state.password}
              onChange={this.handleInputChange} />
          </label>
        </form>
      </div>
      );
    }
  }
  
export default Signup