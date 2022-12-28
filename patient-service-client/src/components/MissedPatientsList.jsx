import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const MissedPatientsList = () => {
  const [missedInjectionList, setMissedInjectionList] = useState([]);
  const [missedInspectionList, setMissedInspectionList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/check/get-missed-list").then((resp) => {
      setMissedInjectionList(resp.data.injectionDate);
      setMissedInspectionList(resp.data.nextInspectionDate);
    });
  }, [setMissedInjectionList, setMissedInspectionList]);

  return (
    <div>
      <NavBar />

      <h2 className="mb-3 pt-3">Список пациентов пропустивших прием</h2>
      <hr />

      <h3 className="mb-3 pt-3">Пациенты на инъекцию</h3>

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
          {missedInjectionList.map((elem, index) => (
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
      <hr />

      <h3 className="mb-3 pt-3">Пациенты на обследование</h3>
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
          {missedInspectionList.map((elem, index) => (
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
    </div>
  );
};

export default MissedPatientsList;
