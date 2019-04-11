import React from "react";
import QuestNav from "../../components/QuestNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import SignupForm from "../../components/auth/SignupForm";

const Signup = props => {
  return (
    <div>
      <Container style={props.theme.mainText}>
        <Row className="my-3">
          <Col className="mx-5">
            <img src={process.env.PUBLIC_URL + "/images/quest.png"} />
            <img src={process.env.PUBLIC_URL + "/images/dot.png"} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} lg={9}>
            <SignupForm theme={props.theme} setTheme={props.setTheme} />
          </Col>
          {/* <Col className="d-block d-lg-none">
            <Image
              src="https://via.placeholder.com/600x300"
              className="center-block"
              fluid
            />
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
