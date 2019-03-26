import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import './style.css'

const QuestNav = props => {
    return <Navbar sticky='top' className='justify-content-between' style={props.theme.darkBg}>
        <Container>
            <Navbar.Brand>
                <Link to='/'>
                    <h2 style={props.theme.titleText}>A Quest!</h2>
                </Link>
                </Navbar.Brand>
            <Button  style={props.theme.buttons} className='btn-nav'>{props.signedIn ? 
                <Link style={props.theme.lightText}>Sign Off</Link> 
                : <Link style={props.theme.lightText} to='/signin'>Sign In</Link>}
            </Button>
        </Container>
    </Navbar>
}

export default QuestNav;