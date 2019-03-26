import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './style.css';

const Welcome = () => {
    return <Container>
        <Row className='my-3'>
            <Col>
                <h1 className='text-center homepage-title'><strong>A Quest!</strong></h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Image src='https://via.placeholder.com/600x400' className='center-block' fluid />
            </Col>
        </Row>
        <Row className='mt-4 mb-3'>
            <Col className='text-center'>
                <Button>
                    <Link to='/signup'>Sign In</Link>
                </Button> 
            </Col>
            <Col className='text-center'>
                <Button>
                    <Link to='/signin'>Sign In</Link>
                </Button> 
            </Col>
        </Row>
    </Container>
}

export default Welcome;