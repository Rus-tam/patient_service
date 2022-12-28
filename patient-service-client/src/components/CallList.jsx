import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import moment from "moment";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const CallList = () => {
  const [plusSevenDaysInjectionList, setPlusSevenDaysInjectionList] = useState([]);
  const [plusSevenDaysInspectionList, setPlusSevenDaysInspectionList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/check/seven-days-list").then((resp) => {
      setPlusSevenDaysInjectionList(resp.data.injectionDate);
      setPlusSevenDaysInspectionList(resp.data.nextInspectionDate);
    });
  }, [setPlusSevenDaysInjectionList, setPlusSevenDaysInspectionList]);

  console.log(plusSevenDaysInjectionList);
  console.log(plusSevenDaysInspectionList);

  return (
    <div>
      <NavBar />

      <h2 className="mb-3 pt-3">
        Список пациентов на {moment(new Date()).add(7, "days").format("YYYY-MM-DD").toString()}
      </h2>
      <hr />

      <h3 className="mb-3 pt-3">Пициенты на инъекцию</h3>

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
          {plusSevenDaysInjectionList.map((elem, index) => (
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

      <h3 className="mb-3 pt-3">Пациенты на осмотр</h3>
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
          {plusSevenDaysInspectionList.map((elem, index) => (
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

export default CallList;
