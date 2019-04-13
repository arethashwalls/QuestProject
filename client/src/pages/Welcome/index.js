import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "./style.css";

const Welcome = props => {
  document.documentElement.setAttribute("data-theme", '');
  return (
    <Container>
      <Row className="mt-4 mb-2 w-md-75 mx-auto">
        <Col lg={3} xs={0} className="img-col">
          <Image
            src="./images/flourish-left.png"
            className=" d-none d-lg-inline-block"
            fluid
          />
        </Col>
        <Col className="text-center">
          <Image alt="A quest" src={process.env.PUBLIC_URL + "/images/quest.png"} />
        </Col>
        <Col lg={3} xs={0} className="img-col">
          <Image
            src="./images/flourish-right.png"
            className=" d-none d-lg-inline-block"
            fluid
          />
        </Col>
      </Row>
      <Row>
        <Col className="col-12 col-md-6 col-xl-3 pt-5 p-4">
          <div className="fix">
            <img src="images/bard.png" alt="Bard" className="img-fluid" />
            <div className="title">
              <strong>Bard</strong>
            </div>
          </div>
        </Col>

        <Col className="col-12 col-md-6 col-xl-3 pt-5 p-4">
          <div className="fix">
            <img
              src="images/mage.png"
              alt="White_Mage"
              className="img-fluid"
            />
            <div className="title">
              <strong>Mage</strong>
            </div>
          </div>
        </Col>

        <Col className="col-12 col-md-6 col-xl-3 pt-5 p-4">
          <div className="fix">
            <img src="images/warrior.png" alt="Warrior" className="img-fluid" />
            <div className="title">
              <strong>Warrior</strong>
            </div>
          </div>
        </Col>

        <Col className="col-12 col-md-6 col-xl-3 pt-5 p-4">
          <div className="fix">
            <img src="images/cleric.png" alt="Warrior" className="img-fluid" />
            <div className="title">
              <strong>Cleric</strong>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4 mb-3">
        <Col className="text-right">
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </Col>
        <Col className="text-left">
          <Link to="/signin">
            <Button>Sign In</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
