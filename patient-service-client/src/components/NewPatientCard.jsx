import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavBar from "./layout/Navbar";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPatientCard = () => {
  const navigate = useNavigate();
  const savePatientCard = async (e) => {
    e.preventDefault();

    try {
      const request = await axios.post("http://localhost:5000/patient/create", {
        name: e.target[0].value,
        surname: e.target[1].value,
        patronymic: e.target[2].value,
        patientBirthDate: moment(e.target[3].value).toDate(),
        phone: e.target[4].value,
      });

      if (request.status === 201) {
        navigate(`/patient-card/${request.data.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />

      <h2 className="mb-3 pt-3">Введите данные пациента</h2>

      <div>
        <Form onSubmit={savePatientCard}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Имя</Form.Label>
            <Form.Control type="text" placeholder="Введите имя пациента" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control type="text" placeholder="Введите фамилию пациента" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="patronymic">
            <Form.Label>Отчество</Form.Label>
            <Form.Control type="text" placeholder="Введите отчество пациента" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="birthdate">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control type="date" name="birthdate" placeholder="Birth date" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Номер телефона</Form.Label>
            <Form.Control type="tel" name="phone" placeholder="Номер телефона" />
          </Form.Group>

          <div className="pt-3">
            <Button variant="primary" type="submit">
              Создать запись
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewPatientCard;
