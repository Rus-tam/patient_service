import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";

const NavBar = () => {
  return (
    <div className="pb-3">
      <Navbar expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <h4>Patient Service</h4>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/new-patient-card">
              <h5>Новый пациент</h5>
            </Nav.Link>
            <Nav.Link href="/seven-days-list">
              <h5>Список на обзвон</h5>
            </Nav.Link>
            <Nav.Link href="missed-list">
              <h5>Список пропустивших прием</h5>
            </Nav.Link>
            <Nav.Link href="/find-patient">
              <h5>Найти пациента</h5>
            </Nav.Link>
            <Nav.Link href="/all-patients">
              <h5>Все пациенты</h5>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
