import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './style.css';

const Welcome = props => {
    return <Container>
        <Row className='mt-4 mb-2 w-md-75 mx-auto'>
            <Col md={3} className='img-col' >
                <   Image src='./images/flourish-left.png' className=' d-none d-md-inline-block' fluid />
            </Col>
            <Col>
                <h1 className='text-center homepage-title' style={props.theme.titleText}><strong>A Quest!</strong></h1>
            </Col>
            <Col md={3} className='img-col' >
                <Image src='./images/flourish-right.png' className='d-none d-md-inline-block' fluid />
            </Col>
        </Row>
        <Row>
            <Col>
                <Image src='https://via.placeholder.com/900x400' className='center-block' fluid />
            </Col>
        </Row>
        <Row className='mt-4 mb-3'>
            <Col className='text-right'>
                <Link style={props.theme.lightText} to='/signup'>
                    <Button style={props.theme.buttons}>
                     Sign Up
                    </Button>
                </Link>
            </Col>
            <Col>
                <Image src='./images/flourish.png' fluid />
            </Col>
            <Col className='text-left'>
                <Link style={props.theme.lightText} to='/signin'>
                    <Button style={props.theme.buttons}>
                        Sign In
                    </Button> 
                </Link>
            </Col>
        </Row>
    </Container >
}

export default Welcome;