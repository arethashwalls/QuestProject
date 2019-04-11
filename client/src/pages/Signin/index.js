import React from "react";
// import SigninForm from '../../components/SigninForm';
import SigninForm from "../../components/auth/SigninForm";
// import QuestNav from "../../components/QuestNav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Quest from "../../../public/images";
import Image from "react-bootstrap/Image";
import "./style.css";

const Signin = props => {
  return (
    <div>
      <Container>
        <Row className="my-3">
          <Col className="mx-5">
            <img alt="A Quest" src={process.env.PUBLIC_URL + "/images/quest.png"} />
            <img alt="..." src={process.env.PUBLIC_URL + "/images/dot.png"} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} lg={9}>
          <SigninForm />
          </Col>
          <Col className="d-block d-lg-none">
            <Image
              src="https://via.placeholder.com/600x300"
              className="center-block"
              fluid
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
