import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const TableComp = ({ list }) => {
  if (list.length !== 0) {
    return (
      <div>
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
            {list.map((elem, index) => (
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
  } else {
    return (
      <div>
        <h5>Список пуст</h5>
      </div>
    );
  }
};

export default TableComp;
