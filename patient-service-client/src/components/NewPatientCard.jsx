import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavBar from "./layout/Navbar";

const NewPatientCard = () => {
  return (
    <div>
      <NavBar />

      <div>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Имя</Form.Label>
            <Form.Control type="text" placeholder="Введите имя пациента" />
            {/*<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>*/}
          </Form.Group>

          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control type="text" placeholder="Введите фамилию пациента" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="patronymic">
            <Form.Label>Отчество</Form.Label>
            <Form.Control type="text" placeholder="Введите отчество пациента" />
          </Form.Group>

          <Form.Group controlId="birthdate">
            <Form.Control type="date" name="birthdate" placeholder="Birth date" value={0} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewPatientCard;
