import React from 'react';
import SigninForm from '../../components/SigninForm';
import QuestNav from '../../components/QuestNav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './style.css';

const Signin = props => {
    return <div>
        <QuestNav theme={props.theme} />
        <Container style={props.theme.mainText}>
            <Row className='my-3 text-center' >
                <Col>
                    <h1>Welcome back to <strong style={props.theme.titleText}>A Quest!</strong></h1>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col className='d-none d-lg-block mr-3' >
                    <Image src='https://via.placeholder.com/300x500' fluid />
                </Col>
                <Col xs={12} lg={9}>
                    <SigninForm />
                </Col>
                <Col className='d-block d-lg-none' >
                    <Image src='https://via.placeholder.com/500x300' className='center-block' fluid />
                </Col>
            </Row>
        </Container>
    </div>
}

export default Signin;