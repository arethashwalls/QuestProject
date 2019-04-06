import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './style.css'

const QuestNav = props => {
    console.log(props)
    return <Navbar sticky='top' className='justify-content-between' style={props.theme.darkBg}>
        <Container>
            <Navbar.Brand>
                <Link to='/' className='d-inline-block' >
                    <h2 style={props.theme.titleText}>A Quest!</h2>
                </Link>
            </Navbar.Brand>
            {props.username ? <p style={props.theme.lightText}>Happy questing, {props.username}!</p> : ''}
            {props.username ?
                <Button style={props.theme.buttons} onClick={props.signout}>
                    Sign Off
                </Button>
                : <div>{window.location.pathname === '/signin' ?
                    <Link to='/signup' style={props.theme.lightText}>
                        <Button style={props.theme.buttons}>
                            Sign Up
                        </Button>
                    </Link>
                    : <Link to='/signin' style={props.theme.lightText}>
                        <Button style={props.theme.buttons}>
                            Sign In
                        </Button>
                    </Link>
                }</div>
            }

        </Container>
    </Navbar>
}

export default QuestNav;