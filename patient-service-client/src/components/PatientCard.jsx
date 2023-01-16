import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "./layout/Navbar";
import axios from "axios";
import { Table } from "react-bootstrap";
import moment from "moment";
import Button from "react-bootstrap/Button";

const PatientCard = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [patientData, setPatientData] = useState({
    id: "",
    name: "",
    surname: "",
    patronymic: "",
    patientBirthDate: "",
    phone: "",
    kinsmenPhone: "",
    medicalExaminations: [],
    tomography: [],
  });
  const id = param.id;
  useEffect(() => {
    axios.get(`http://localhost:5000/patient/${id}`).then((resp) => {
      if (resp.status === 200) {
        setPatientData(resp.data);
      } else {
        alert("Произошла ошибка");
      }
    });
  }, [setPatientData]);

  // Поиск последних результатов осмотра
  let examinationId = 0;
  let lastExamination = {};
  patientData.medicalExaminations.forEach((examination) => {
    // eslint-disable-next-line no-unused-expressions
    examination.id > examinationId ? (lastExamination = examination) : null;
  });
  if (lastExamination.AMDType === "dry") {
    lastExamination.AMDType = "dry";
  } else if (lastExamination.AMDType === "wet") {
    lastExamination.AMDType = "wet";
  }

  // Переадресация на страницу с данными медиц. осмотра
  const navigateToMedExam = (medExamId) => {
    navigate({
      pathname: `/medexam/${medExamId}`,
    });
  };

  // Загрузка результатов томографии
  const downloadAndRedirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
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
        <strong>Телефон родственника: </strong>
        {patientData.kinsmenPhone}
      </p>
      {lastExamination.AMDType !== undefined && (
        <p>
          <strong>Тип ВМД: </strong>
          {lastExamination.AMDType === "wet" ? "Влажная" : "Сухая"}
        </p>
      )}
      {/*<div>*/}
      {/*  <p>*/}
      {/*    <strong>Острота зрения: </strong>*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>OD: </strong>*/}
      {/*    {lastExamination.visualAcuityOD}*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>OS: </strong>*/}
      {/*    {lastExamination.visualAcuityOS}*/}
      {/*  </p>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <p>*/}
      {/*    <strong>Тонометрия, мм.рт.ст.: </strong>*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>OD: </strong>*/}
      {/*    {lastExamination.tonometryOD}*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>OS: </strong>*/}
      {/*    {lastExamination.tonometryOS}*/}
      {/*  </p>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <p>*/}
      {/*    <strong>Рефрактометрия: </strong>*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>OD: </strong> {lastExamination.refractometryODsph} sph, {lastExamination.refractometryODcyl} cyl,{" "}*/}
      {/*    {lastExamination.refractometryODax} ax*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>OS: </strong> {lastExamination.refractometryOSsph} sph, {lastExamination.refractometryOScyl} cyl,{" "}*/}
      {/*    {lastExamination.refractometryOSax} ax*/}
      {/*  </p>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <p>*/}
      {/*    <strong>Биомикроскопия: </strong>*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>OD: </strong> {lastExamination.biomicroscopyOD}*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>OS: </strong> {lastExamination.biomicroscopyOS}*/}
      {/*  </p>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <p>*/}
      {/*    <strong>Глазное дно: </strong>*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>OD: </strong> {lastExamination.eyeBottomOD}*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>OS: </strong> {lastExamination.eyeBottomOS}*/}
      {/*  </p>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <p>*/}
      {/*    <strong>Дополнительные исследования: </strong>*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    <strong>OD: </strong>*/}
      {/*  </p>*/}
      {/*  <p>{lastExamination.additionalExamOD}</p>*/}
      {/*  <p>*/}
      {/*    <strong>OS: </strong>*/}
      {/*  </p>*/}
      {/*  <p>{lastExamination.additionalExamOS}</p>*/}
      {/*</div>*/}

      {lastExamination.AMDType === "wet" && (
        <p>
          <strong>Назначенная дата инъекции: </strong>
          {lastExamination.nextInjectionDate}
        </p>
      )}

      <p>
        <strong>Назначенная дата осмотра: </strong>
        {lastExamination.nextInspectionDate}
      </p>

      {lastExamination.AMDType === "dry" && (
        <div>
          <p>
            <strong>Форма заболевания: </strong>
            {lastExamination.formOfDisease ? "Исход влажной формы" : "Не является исходом влажной формы"}
          </p>
          {/*<p>*/}
          {/*  <strong>Данные по ранее проводимой анти-VEGF терапии: </strong> <br />*/}
          {/*  {lastExamination.VEGFTherapyHistory}*/}
          {/*</p>*/}
        </div>
      )}

      {/*<p>*/}
      {/*  <strong>Результаты осмотра: </strong> <br />*/}
      {/*  {lastExamination.examinationResult}*/}
      {/*</p>*/}
      <Button className="me-3" onClick={() => navigate({ pathname: `/patient/med-examination/${id}` })}>
        Новое обследование
      </Button>
      <Button onClick={() => navigate({ pathname: `/patient-card/${id}/update` })}>Редактировать личные данные</Button>
      <hr />

      <h2 className="mb-3 pt-3">История осмотров: </h2>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Дата осмотра</th>
            <th>Результаты осмотра</th>
          </tr>
        </thead>
        <tbody>
          {patientData.medicalExaminations.map((elem, index) => (
            <tr key={elem.id}>
              <td>{index + 1}</td>
              <td>{moment(elem.createdAt).format("YYYY-MM-DD HH:MM")}</td>
              <td>
                <Link to={{ pathname: `/medexam/${elem.id}` }}>Открыть</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {lastExamination.AMDType === "wet" && (
        <>
          <h2 className="mb-3 pt-3">История инъекция</h2>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th className="pe-5">Дата инъекции</th>
                <th>Препарат для инъекции</th>
              </tr>
            </thead>
            <tbody>
              {patientData.medicalExaminations.map((elem, index) => (
                <tr key={elem.id}>
                  <td>{index + 1}</td>
                  <td>{moment(elem.injectionDate).format("YYYY-MM-DD HH:MM")}</td>
                  <td>{elem.drugName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <h2 className="mb-3 pt-3">Снимки томографии: </h2>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Дата томографии</th>
            <th>Результат томографии</th>
          </tr>
        </thead>
        <tbody>
          {patientData.tomography.map((elem, index) => (
            <tr key={elem.id}>
              <td>{index + 1}</td>
              <td>{moment(elem.createdDate).format("YYYY-MM-DD HH:MM")}</td>
              <td>
                <Link
                  to={""}
                  onClick={() => downloadAndRedirect(`http://localhost:5000/patient/tomography/${elem.id}/download`)}
                >
                  Загрузить
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientCard;
