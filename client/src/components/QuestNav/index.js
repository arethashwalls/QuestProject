import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import './style.css'

const QuestNav = props => {
    return <Navbar sticky='top' className='justify-content-between'>
        <Container>
            <Navbar.Brand>
                <Link to='/' className='d-inline-block' >
                    <Image alt="A Quest" src={process.env.PUBLIC_URL + "/images/quest.png"} />
                </Link>
            </Navbar.Brand>
            {props.username ? <p>Happy questing, {props.username}!</p> : ''}
            {props.username ?
                <Button onClick={props.signout}>
                    Sign Off
                </Button>
                : <div>{window.location.pathname === '/signin' ?
                    <Link to='/signup'>
                        <Button>
                            Sign Up
                        </Button>
                    </Link>
                    : <Link to='/signin'>
                        <Button>
                            Sign In
                        </Button>
                    </Link>
                }</div>
            }

        </Container>
    </Navbar>
}

export default QuestNav;