import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const QuestNav = props => {
  return (
    <Navbar
      sticky="top"
      className="justify-content-between"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand>Quest App</Navbar.Brand>
        <Button className="btn-nav">
          {props.signedIn ? "Sign Off" : "Sign In"}
        </Button>
      </Container>
    </Navbar>
  );
};

export default QuestNav;
