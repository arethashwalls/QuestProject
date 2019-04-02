import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/authActions';
import classnames from 'classnames';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './style.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/'); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);

    
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
      <Container fluid>
        <Row className='my-4'>
          <Col xs={12} lg={4}>
            <h4>Sign In</h4>
            <p>Don't have an account?
              <Link to='/signup' style={this.props.theme.lightText} className='ml-2 d-md-block ml-md-0 mt-md-2'>
                <Button style={this.props.theme.buttons}>
                  Sign Up
                </Button>
              </Link>
            </p>
          </Col>
          <Col xs={12} lg={8}>
            <Form noValidate onSubmit={this.onSubmit}>
              <Form.Group >
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id='email'
                  type='email'
                  className={classnames('', {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                { errors.email || errors.emailnotfound ?
                  <Alert variant='danger'>
                    {errors.email}
                    {errors.emailnotfound}
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
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                { errors.password || errors.passwordincorrect ?
                  <Alert variant='danger'>
                    {errors.password}
                    {errors.passwordincorrect}
                  </Alert>
                  : ''
                }
              </Form.Group>
              <Button type='submit' className='float-right' style={this.props.theme.buttons}>Sign In</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default withRouter(connect(
  mapStateToProps,
  { loginUser }
)(Login));
