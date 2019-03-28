import React from 'react';
import QuestNav from '../../components/QuestNav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import SignupForm from '../../components/auth/SignupForm'

const Signup = props => {
    return <div>
        <QuestNav theme={props.theme} signedIn={props.signedIn} />
        <Container style={props.theme.mainText}>
            <Row className='my-3 text-center' >
                <Col>
                    <h1>Welcome to <strong style={props.theme.titleText}>A Quest!</strong></h1>
                    <hr />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col className='d-none d-lg-block mr-3' >
                    <Image src='https://via.placeholder.com/300x500' fluid />
                </Col>
                <Col xs={12} lg={9} >
                    <SignupForm theme={props.theme} />
                </Col>
                <Col className='d-block d-lg-none' >
                    <Image src='https://via.placeholder.com/500x300' className='center-block' fluid />
                </Col>
            </Row>
        </Container>
    </div>
}

export default Signup;