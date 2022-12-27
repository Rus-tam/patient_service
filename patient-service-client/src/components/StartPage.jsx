import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import moment from "moment";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const StartPage = () => {
  const navigate = useNavigate();
  const [injectionList, setInjectionList] = useState([
    {
      name: "",
      surname: "",
      patronymic: "",
      phone: "",
    },
  ]);
  const [inspectionList, setInspectionList] = useState([
    {
      name: "",
      surname: "",
      patronymic: "",
      phone: "",
    },
  ]);
  useEffect(() => {
    axios.get(`http://localhost:5000/check/current-date-list`).then((resp) => {
      setInjectionList(resp.data.injectionDate);
      setInspectionList(resp.data.nextInspectionDate);
    });
  }, [setInjectionList, setInspectionList]);

  if (inspectionList && injectionList) {
    return (
      <div>
        <NavBar />

        <h2 className="mb-3 pt-3">Пациенты на сегодня ({moment(new Date()).format("YYYY-MM-DD")})</h2>
        <hr />
        <h2 className="mb-3 pt-3">Пациенты на инъекцию</h2>
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
            {injectionList.map((elem, index) => (
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

        <h2 className="mb-3 pt-3">Пациенты на осмотр</h2>
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
            {inspectionList.map((elem, index) => (
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

        <div className="d-grid gap-2 pb-3">
          <Button className="btn btn-link" variant="outline-light">
            Link Button
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <h2>Wait</h2>
      </div>
    );
  }
};

export default StartPage;
