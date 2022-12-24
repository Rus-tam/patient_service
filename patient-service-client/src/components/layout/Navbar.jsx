import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";

const NavBar = () => {
  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <h4>Patient Service</h4>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">
              <h4>Домой</h4>
            </Nav.Link>
            <Nav.Link href="/new-patient-card">
              <h4>Новый пациент</h4>
            </Nav.Link>
            <Nav.Link href="/find-patient">
              <h4>Найти пациента</h4>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
