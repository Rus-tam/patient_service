import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

const MedExamById = () => {
  const { medExamId } = useParams();

  const [medExam, setMedExam] = useState({
    createdAt: "",
    AMDType: "",
    visualAcuity: "",
    injectionDate: "",
    nextInspectionDate: "",
    examinationResult: "",
    patient: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/patient/med-exam/${medExamId}`).then((resp) => {
      setMedExam(resp.data);
    });
  }, [setMedExam]);

  console.log(medExam);

  return (
    <div>
      <NavBar />
      <h2 className="mb-3 pt-3">Результаты осмотра</h2>
      <hr />
      <h3>
        {medExam.patient.surname} {medExam.patient.name} {medExam.patient.patronymic}
      </h3>
      <p>
        <strong>Дата осмотра: </strong> {moment(medExam.createdAt).format("YYYY-MM-DD")}
      </p>
      <p>
        <strong>Тип ВМД: </strong> {medExam.AMDType === "dry" ? "Cухая" : "Влажная"}
      </p>
      <p>
        <strong>Острота зрения: </strong> {medExam.visualAcuity}
      </p>
      <p>
        <strong>Назначенная дата инъекции: </strong> {medExam.injectionDate}
      </p>
      <p>
        <strong>Назначенная дата осмотра: </strong> {medExam.nextInspectionDate}
      </p>
      <p>
        <strong>Результаты осмотра: </strong> <br /> {medExam.examinationResult}
      </p>
    </div>
  );
};

export default MedExamById;
