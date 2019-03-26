import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import './style.css'

const QuestNav = props => {
    return <Navbar sticky='top' className='justify-content-between' bg="dark" variant="dark">
        <Container>
            <Navbar.Brand>
                <Link to='/'>
                    <h2>A Quest!</h2>
                </Link>
                </Navbar.Brand>
            <Button className='btn-nav'>{props.signedIn ? <Link>Sign Off</Link> : <Link to='/signin'>Sign In</Link>}</Button>
        </Container>
    </Navbar>
}

export default QuestNav;