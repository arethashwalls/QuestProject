import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class newQuest extends React.Component {
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
        <h1>New Objective!!</h1>
        <label>
        <br />
        Title:
        <input
          name="title"
          type="number"
          value={this.state.title}
          onChange={this.handleInputChange} />
      </label>
        <br />
        <br />
        Tasks:
        <textarea rows="4" cols="30">
        <input
            name="textbox"
            type="number"
            size="large"
            value={this.state.textbox}
            onChange={this.handleInputChange}/> 
        </textarea>
        <br />
        <br />
        <input 
        name="submit"
        type="submit" 
        value="Submit" />


      </div>
      );
    }
  }
  
export default newQuest;
  