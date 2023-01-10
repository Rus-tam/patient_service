import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";

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
    formOfDisease: "",
    VEGFTherapyHistory: "",
  });

  const [injectionDate, setInjectionDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [nextInspectionDate, setNextInspectionDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  useEffect(() => {
    axios.get(`http://localhost:5000/patient/med-exam/${medExamId}`).then((resp) => {
      setMedExam(resp.data);
      setInjectionDate(resp.data.injectionDate);
      setNextInspectionDate(resp.data.nextInspectionDate);
    });
  }, [setMedExam, setInjectionDate, setNextInspectionDate]);

  const saveChanges = (e) => {};

  const setInjection = (e) => {
    setInjectionDate(e.target.value);
  };

  const setInspection = (e) => {
    setNextInspectionDate(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <h2 className="mb-3 pt-3">Результаты осмотра</h2>
      <hr />
      <h2 className="pb-4">
        {medExam.patient.surname} {medExam.patient.name} {medExam.patient.patronymic}
      </h2>
      <p>
        <strong>Тип ВМД: </strong> {medExam.AMDType === "dry" ? "Cухая" : "Влажная"}
      </p>

      <Form onSubmit={saveChanges}>
        <Form.Group className="mb-3" controlId="visualAcuity">
          <Form.Label>
            <strong>Острота зрения: </strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Введите данные по остроте зрения"
            defaultValue={medExam.visualAcuity}
          />
        </Form.Group>

        {medExam.AMDType === "wet" && (
          <Form.Group className="mb-3" controlId="injectionDate">
            <Form.Label>
              <strong>Дата инъекции: </strong>
            </Form.Label>
            <Form.Control type="date" name="injectionDate" placeholder="Дата инъекции" defaultValue={injectionDate} />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="nextInspectionDate">
          <Form.Label>
            <strong>Дата следующего осмотра: </strong>
          </Form.Label>
          <Form.Control
            type="date"
            name="nextInspectionDate"
            placeholder="Дата следующего осмотра"
            defaultValue={nextInspectionDate}
            onChange={setInspection}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="medicalexam">
          <Form.Label>
            <strong>Результаты осмотра: </strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Введите результаты осмотра"
            defaultValue={medExam.examinationResult}
          />
        </Form.Group>

        {medExam.AMDType === "dry" && (
          <div>
            <p>
              <strong>Форма заболевания: {medExam.formOfDisease === "primary" ? "Первичная" : "Вторичная"}</strong>
            </p>

            <Form.Group className="mb-3" controlId="VEGFTherapyHistory">
              <Form.Label>
                <strong>Данные по ранее проводимой анти-VEGF терапия,</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Введите результаты"
                value={medExam.VEGFTherapyHistory}
              />
            </Form.Group>
          </div>
        )}

        <div className="d-grid gap-2 pb-3">
          <Button variant="primary" type="submit" size="lg">
            Сохранить изменения
          </Button>
        </div>
      </Form>

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
