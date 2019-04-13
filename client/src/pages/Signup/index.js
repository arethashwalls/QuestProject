import React from "react";
import QuestNav from "../../components/QuestNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import SignupForm from "../../components/auth/SignupForm";
import "./style.css";

const Signup = props => {
    return <div>
        <QuestNav signedIn={props.signedIn} />
        <Container>
            <Row className='mt-3 mb-2 text-center' >
                <Col>
                    <h1 className='d-inline'>Welcome to</h1> <Image className='d-inline ml-2' src={process.env.PUBLIC_URL + "/images/quest.png"} />
                    <hr />
                </Col>
            </Row>
            <Row className='mb-3'>
            
                <Col xs={12} lg={9} >
                    <SignupForm />
                </Col>
                <Col className='d-block d-lg-none' >
                    <Image src='https://via.placeholder.com/600x300' className='center-block' fluid />
                </Col>
            </Row>
        </Container>
    </div>
};

export default Signup;
