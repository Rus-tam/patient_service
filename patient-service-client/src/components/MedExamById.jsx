import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Button from "react-bootstrap/Button";

const MedExamById = () => {
  const navigate = useNavigate();
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
      <h2 className="pb-4">
        {medExam.patient.surname} {medExam.patient.name} {medExam.patient.patronymic}
      </h2>
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

      <Button
        onClick={() =>
          navigate({
            pathname: `/patient-card/${medExam.patient.id}`,
          })
        }
        variant="primary"
      >
        Назад
      </Button>
    </div>
  );
};

export default MedExamById;
