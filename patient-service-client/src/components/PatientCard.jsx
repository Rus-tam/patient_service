import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PatientCard = () => {
  const param = useParams();
  const [tomographyFile, setTomographyFile] = useState("");
  const id = param.id;
  const [patientData, setPatientData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    patientBirthDate: "",
    phone: "",
    medicalExaminations: [],
    tomography: [],
  });
  useEffect(() => {
    axios.get(`http://localhost:5000/patient/${id}`).then((resp) => {
      setPatientData(resp.data);
    });
  }, [setPatientData]);

  const uploadMedExams = async (e) => {
    e.preventDefault();

    const medExam = e.target[0].value;
    setTomographyFile(e.target[1].files[0]);

    console.log(tomographyFile);

    const formData = new FormData();
    formData.append("file", tomographyFile);
    try {
      const response = await axios.post(`http://localhost:5000/patient/${id}/tomography`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
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

      <Form onSubmit={uploadMedExams}>
        <Form.Group className="mb-3" controlId="medicalexam">
          <Form.Label>
            <strong>Результаты осмотра: </strong>
          </Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Введите результаты осмотра" />
        </Form.Group>

        <Form.Group controlId="tomography" className="mb-3">
          <Form.Label>
            <strong>Введите файл снимка: </strong>
          </Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" size="lg">
            Загрузить в базу данных
          </Button>
        </div>
      </Form>
      <hr />
      <h2 className="mb-3 pt-3">Результаты осмотра</h2>
    </div>
  );
};

export default PatientCard;
