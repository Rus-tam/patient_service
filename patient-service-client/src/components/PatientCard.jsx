import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./layout/Navbar";
import axios from "axios";

const PatientCard = () => {
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
    </div>
  );
};

export default PatientCard;
