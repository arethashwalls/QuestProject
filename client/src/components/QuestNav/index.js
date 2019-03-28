import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link } from "react-router-dom";
import './style.css'

const QuestNav = props => {
    return <Navbar sticky='top' className='justify-content-between' style={props.theme.darkBg}>
        <Container>
            <Navbar.Brand>
                <Image src='https://via.placeholder.com/60x40' className='d-inline-block align-top mr-3' />
                <Link to='/' className='d-inline-block' >
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