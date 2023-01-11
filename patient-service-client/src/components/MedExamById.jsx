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
    nextInjectionDate: "",
    nextInspectionDate: "",
    examinationResult: "",
    patient: "",
    formOfDisease: "",
    VEGFTherapyHistory: "",
  });

  const [nextInjectionDate, setnextInjectionDate] = useState();
  const [nextInspectionDate, setNextInspectionDate] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/patient/med-exam/${medExamId}`).then((resp) => {
      setMedExam(resp.data);
      setnextInjectionDate(resp.data.nextInjectionDate);
      setNextInspectionDate(resp.data.nextInspectionDate);
    });
  }, [setMedExam, setnextInjectionDate, setNextInspectionDate]);

  const updateMedExam = async (update) => {
    const resp = await axios.put(`http://localhost:5000/patient/med-exam/${medExamId}/update`, update);
    if (resp.status === 200) {
      navigate({
        pathname: `/patient-card/${medExam.patient.id}`,
      });
    } else {
      alert("Произошла ошибка");
    }
  };

  const saveChanges = async (e) => {
    e.preventDefault();

    if (medExam.AMDType === "wet") {
      const update = {
        visualAcuity: e.target[0].value,
        nextInjectionDate: e.target[1].value,
        nextInspectionDate: e.target[2].value,
        examinationResult: e.target[3].value,
      };

      await updateMedExam(update);
    } else {
      const update = {
        visualAcuity: e.target[0].value,
        nextInspectionDate: e.target[1].value,
        examinationResult: e.target[2].value,
        VEGFTherapyHistory: e.target[3].value,
      };

      await updateMedExam(update);
    }
  };

  const setInjection = (e) => {
    setnextInjectionDate(e.target.value);
  };

  const setInspection = (e) => {
    setNextInspectionDate(e.target.value);
  };

  return (
    <div>
      <NavBar />
      <h2 className="mb-3 pt-3">Результаты осмотра {moment(medExam.createdAt).format("YYYY-MM-DD").toString()}</h2>
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
          <Form.Group className="mb-3" controlId="nextInjectionDate">
            <Form.Label>
              <strong>Дата следующей инъекции: </strong>
            </Form.Label>
            <Form.Control
              type="date"
              name="nextInjectionDate"
              placeholder="Дата инъекции"
              onChange={setInjection}
              defaultValue={nextInjectionDate}
            />
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
                defaultValue={medExam.VEGFTherapyHistory}
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
        className="mb-3"
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
