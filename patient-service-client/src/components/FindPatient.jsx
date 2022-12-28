import React, { useState } from "react";
import NavBar from "./layout/Navbar";
import { Form, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";

const FindPatient = () => {
  const [patientList, setPatientList] = useState([]);
  const findPatientById = async (e) => {
    e.preventDefault();
    const surname = e.target[0].value.toUpperCase();
    if (surname) {
      const resp = await axios.get(`http://localhost:5000/patient/surname/${surname}`);
      setPatientList(resp.data);
    }

    e.target[0].value = "";
  };

  const patientListTable = (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Дата рождения</th>
          <th>Телефон</th>
          <th>Карта пациента</th>
        </tr>
      </thead>
      <tbody>
        {patientList.map((elem, index) => (
          <tr key={elem.id}>
            <td>{index + 1}</td>
            <td>{elem.surname}</td>
            <td>{elem.name}</td>
            <td>{elem.patronymic}</td>
            <td>{elem.patientBirthDate}</td>
            <td>{elem.phone}</td>
            <td>
              <Link to={{ pathname: `/patient-card/${elem.id}` }}>Открыть</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div>
      <NavBar />
      <h2 className="mb-3 pt-3">Поиск пациента по фамилии</h2>
      <Form className="mb-3" onSubmit={findPatientById}>
        <Form.Group className="mb-3" controlId="findBySurname">
          <Form.Control type="text" placeholder="Введите фамилию пациента"></Form.Control>
        </Form.Group>

        <div className="pt-3">
          <Button variant="primary" type="submit">
            Найти
          </Button>
        </div>
      </Form>
      <hr />
      <h2 className="mb-3 pt-3">Пациенты</h2>
      {patientList.length !== 0 && patientListTable}
    </div>
  );
};

export default FindPatient;
