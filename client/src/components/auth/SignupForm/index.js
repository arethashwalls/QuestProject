import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Image from 'react-bootstrap/Image';
import "./style.css";

//Image imports:
import bard from '../../../images/bard.png';
import mage from '../../../images/mage.png';
import warrior from '../../../images/warrior.png';
import cleric from '../../../images/cleric.png';

const pics = {
  bard,
  mage,
  warrior,
  cleric
}

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      class: "Cleric",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/myquest");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  hideInstructions = () => document.querySelector('.instruction-box').classList.add('d-none');

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value }, () => {
      document.documentElement.setAttribute("data-theme", this.state.class);
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      class: this.state.class,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <Container fluid>
        <Row className='my-4'>

          <Col xs={12} md={6} className="form">
            <Form noValidate onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                {errors.name ? (
                  <Alert variant="danger">{errors.name}</Alert>
                ) : (
                    ""
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Character Class:</Form.Label>
                <Form.Control as="select" defaultValue='DEFAULT' onChange={this.onChange} id="class">
                  <option value="DEFAULT" disabled>Select a character class.</option>
                  <option value="Warrior">Warrior</option>
                  <option value="Mage">Mage</option>
                  <option value="Cleric">Cleric</option>
                  <option value="Bard">Bard</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                {errors.email ? (
                  <Alert variant="danger">{errors.email}</Alert>
                ) : (
                    ""
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                {errors.password ? (
                  <Alert variant="danger">{errors.password}</Alert>
                ) : (
                    ""
                  )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm password:</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                {errors.password2 ? (
                  <Alert variant="danger">{errors.password2}</Alert>
                ) : (
                    ""
                  )}
              </Form.Group>
              <Button type='submit' className='float-left'>Your Quest Awaits...</Button>

            </Form>
          </Col>
          <Col xs={12} md={6} className='instruction-col signup-instructions'>
            <div className='instruction-box' onClick={this.hideInstructions}>
              <p className='instruction-text'>
              Welcome, adventurer! Begin your journey by filling out the Scroll of Registration.
              <br /><br />
              Your character class shall color your experience from this day forward...
                  </p>
              <p className="text-right">Click to dismiss.</p>

            </div>
            <Image className='char-portrait' src={pics[this.state.class.toLowerCase()] || mage}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
