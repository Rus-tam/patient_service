import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./layout/Navbar";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";
import Button from "react-bootstrap/Button";

const PatientCard = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [patientData, setPatientData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    patientBirthDate: "",
    phone: "",
    medicalExaminations: [],
    tomography: [],
  });
  const id = param.id;
  useEffect(() => {
    axios.get(`http://localhost:5000/patient/${id}`).then((resp) => {
      setPatientData(resp.data);
    });
  }, [setPatientData]);

  console.log(patientData);

  // Поиск последних результатов осмотра
  let examinationId = 0;
  let lastExamination = {};
  patientData.medicalExaminations.forEach((examination) => {
    // eslint-disable-next-line no-unused-expressions
    examination.id > examinationId ? (lastExamination = examination) : null;
  });

  // Переадресация на страницу с данными медиц. осмотра
  const navigateToMedExam = (medExamId, id) => {
    navigate({
      pathname: `/patient-card/${id}/medexam/${medExamId}`,
    });
  };

  return (
    <div>
      <NavBar />

      <h2 className="mb-3 pt-3">Карта пациента</h2>
      <hr />
      <p>
        <strong>Имя пациента: </strong>
        {patientData.name}
      </p>
      <p>
        <strong>Фимилия пациента: </strong>
        {patientData.surname}
      </p>
      <p>
        <strong>Отчество пациента: </strong>
        {patientData.patronymic}
      </p>
      <p>
        <strong>Дата рождения пациента: </strong> {patientData.patientBirthDate}
      </p>
      <p>
        <strong>Телефон пациента: </strong>
        {patientData.phone}
      </p>
      <p>
        <strong>Тип ВМД: </strong>
        {lastExamination.AMDType === "dry" ? "сухая" : "влажная"}
      </p>
      <p>
        <strong>Острота зрения: </strong>
        {lastExamination.visualAcuity}
      </p>
      <p>
        <strong>Назначенная дата инъекции: </strong>
        {lastExamination.injectionDate}
      </p>
      <p>
        <strong>Назначенная дата осмотра: </strong>
        {lastExamination.nextInspectionDate}
      </p>
      <p>
        <strong>Результаты осмотра: </strong> <br />
        {lastExamination.examinationResult}
      </p>
      <hr />

      <h2 className="mb-3 pt-3">История осмотров: </h2>

      {/*<div className="d-flex align-items-center">*/}
      {/*  <div className="row text-center mb-4">*/}
      {/*    <div className="col-md-4">*/}
      {/*      <h4>Первый столбец</h4>*/}
      {/*    </div>*/}
      {/*    <div className="col-md-4">*/}
      {/*      <h4>Второй столбец</h4>*/}
      {/*    </div>*/}
      {/*    <div className="col-md-4">*/}
      {/*      <h4>Третий столбец</h4>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Container>
        <Row className="justify-content-md-center">
          <Col className="pb-2">
            <strong>Дата осмотра: </strong>
          </Col>
          <Col className="pb-2">
            <strong>Дата томографии: </strong>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            <ul>
              {patientData.medicalExaminations.map((element) => (
                <li key={element.id} className="pb-2">
                  <Button variant="outline-success">{moment(element.createdAt).format("YYYY-MM-DD").toString()}</Button>
                </li>
              ))}
            </ul>
          </Col>

          <Col>
            <ul>
              {patientData.tomography.map((element) => (
                <li key={element.id} className="pb-2">
                  <Button variant="outline-success">{moment(element.createdAt).format("YYYY-MM-DD").toString()}</Button>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PatientCard;
