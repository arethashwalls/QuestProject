import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/authActions';
import classnames from 'classnames';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './style.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      class: 'Warrior',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/myquest');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value }, () => {
      console.log(this.state)
      this.props.setTheme(this.state.class)
    })
  };
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

          <Col xs={12} lg={8} className = "form">
            <Form noValidate onSubmit={this.onSubmit}>
              <Form.Group >
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id='name'
                  type='text'
                  className={classnames('', {
                    invalid: errors.name
                  })}
                />
                { errors.name ?
                  <Alert variant='danger'>
                    {errors.name}
                  </Alert>
                  : ''
                }
              </Form.Group>
              <Form.Group >
                <Form.Label>Character Class:</Form.Label>
                <Form.Control
                  as='select'
                  onChange={this.onChange}
                  id='class'
            
                >
                  <option value='Warrior'>Warrior</option>
                  <option value='Mage'>Mage</option>
                  <option value='Cleric'>Cleric</option>
                  <option value='Bard'>Bard</option>
                </Form.Control>
              </Form.Group>
              <Form.Group >
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id='email'
                  type='email'
                  className={classnames('', {
                    invalid: errors.email
                  })}
                />
                { errors.email ?
                  <Alert variant='danger'>
                    {errors.email}
                  </Alert>
                  : ''
                }
              </Form.Group>
              <Form.Group >
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id='password'
                  type='password'
                  className={classnames('', {
                    invalid: errors.password
                  })}
                />
                { errors.password ?
                  <Alert variant='danger'>
                    {errors.password}
                  </Alert>
                  : ''
                }
              </Form.Group>
              <Form.Group >
                <Form.Label>Confirm password:</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id='password2'
                  type='password'
                  className={classnames('', {
                    invalid: errors.password2
                  })}
                />
                { errors.password2 ?
                  <Alert variant='danger'>
                    {errors.password2}
                  </Alert>
                  : ''
                }
              </Form.Group>
              <Button type='submit' className='float-left' style={this.props.theme.buttons}>Your Quest Awaits...</Button>
            </Form>
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
