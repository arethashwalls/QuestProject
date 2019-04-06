import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import './style.css'

class QuestNav extends Component {
    state = {
        adventures: []
    }

    getAdventureList = user => {
        API.getAdventures(user)
        .then(res => {
            this.setState({ adventures: res.data });
        })
        .catch(err => console.log(err))
    }

    onComponentDidMount() {
        console.log('hiii')
        this.setState({adventures: this.getAdventureList(this.props.loggedInUserId)})
        console.log(this.state.adventures)
    }

    render() {
        return <Navbar sticky='top' className='justify-content-between' style={this.props.theme.darkBg}>
            <Container>
                <Navbar.Brand>
                    <Link to='/' className='d-inline-block' >
                        <h2 style={this.props.theme.titleText}>A Quest!</h2>
                    </Link>
                </Navbar.Brand>
                {this.props.username ? <p style={this.props.theme.lightText}>Happy questing, {this.props.username}!</p> : ''}
                {(this.state.adventures.length > 0) 
                    ? <NavDropdown title="My Adventures" id="collasible-nav-dropdown" style={this.props.theme.lightText}>
                        {this.state.adventures.map(adventure => <NavDropdown.Item href="">{adventure.title}</NavDropdown.Item>)}
                    </NavDropdown>
                    : ''
                }
                {this.props.username ?
                    <Button style={this.props.theme.buttons} onClick={this.props.signout}>
                        Sign Off
                </Button>
                    : <div>{window.location.pathname === '/signin' ?
                        <Link to='/signup' style={this.props.theme.lightText}>
                            <Button style={this.props.theme.buttons}>
                                Sign Up
                        </Button>
                        </Link>
                        : <Link to='/signin' style={this.props.theme.lightText}>
                            <Button style={this.props.theme.buttons}>
                                Sign In
                        </Button>
                        </Link>
                    }</div>
                }

            </Container>
        </Navbar>
    }
}

const mapStateToProps = state => {
    return {
        loggedInUserId: state.auth.user.id,
        loggedInUserClass: state.auth.user.class
    };
};

export default connect(
    mapStateToProps,
    null
)(QuestNav);