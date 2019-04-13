import React from 'react';

class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
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
              type="text"
              value={this.state.password}
              onChange={this.handleInputChange} />
          </label>
        </form>
      </div>
      );
    }
  }
  
export default Signup