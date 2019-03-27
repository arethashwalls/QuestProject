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
        <Row className='my-4'>
            <Col>
                <Image src='./images/flourish-left.png' />
                <h1 className='text-center homepage-title' style={props.theme.titleText}><strong>A Quest!</strong></h1>
                <Image />
            </Col>
        </Row>
        <Row>
            <Col>
                <Image src='https://via.placeholder.com/900x400' className='center-block' fluid />
            </Col>
        </Row>
        <Row className='mt-4 mb-3'>
            <Col className='text-right'>
                <Button style={props.theme.buttons}>
                    <Link style={props.theme.lightText} to='/signup'>Sign Up</Link>
                </Button> 
            </Col>
            <Col>
                <Image src='./images/flourish.png' fluid />
            </Col>
            <Col className='text-left'>
                <Button style={props.theme.buttons}>
                    <Link style={props.theme.lightText} to='/signin'>Sign In</Link>
                </Button> 
            </Col>
        </Row>
    </Container>
}

export default Welcome;