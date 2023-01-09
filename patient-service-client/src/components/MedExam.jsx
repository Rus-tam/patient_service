import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment from "moment";

const MedExam = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let AMDType = "";
  const [patientData, setPatientData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    patientBirthDate: "",
    phone: "",
    medicalExaminations: [],
    tomography: [],
  });
  const [additionalFields, setAdditionalFields] = useState("wet");
  useEffect(() => {
    axios.get(`http://localhost:5000/patient/${id}`).then((resp) => {
      setPatientData(resp.data);
    });
  }, [setPatientData]);

  const dryAMD = (e) => {
    setAdditionalFields(e.target.value);
  };

  // Фрагмент
  const fragment = (
    <div>
      <Form.Group className="mb-3" controlId="formOfDisease">
        <Form.Label>
          <strong>Форма заболевания: </strong>
        </Form.Label>
        <Form.Check
          type="radio"
          label="Первичная"
          name="formOfDisease"
          value="primary"
          // checked={additionalFields === "primary"}
          // onChange={dryAMD}
        />
        <Form.Check
          type="radio"
          label="Вторичная"
          name="formOfDisease"
          value="secondary"
          // checked={additionalFields === "dry"}
          // onChange={dryAMD}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="VEGFTherapyHistory">
        <Form.Label>
          <strong>Данные по ранее проводимой анти-VEGF терапия,</strong>
        </Form.Label>
        <Form.Control as="textarea" rows={4} placeholder="Введите результаты" />
      </Form.Group>
    </div>
  );

  const uploadMedExams = async (e) => {
    e.preventDefault();

    if (e.target[0].checked) {
      AMDType = "wet";
    } else {
      AMDType = "dry";
    }
    const tomographyFile = e.target[6].files[0];

    const medExams = {
      AMDType: AMDType,
      visualAcuity: e.target[2].value,
      injectionDate: moment(e.target[3].value).format("YYYY-MM-DD").toString(),
      nextInspectionDate: moment(e.target[4].value).format("YYYY-MM-DD").toString(),
      examinationResult: e.target[5].value,
    };

    const formData = new FormData();
    formData.append("file", tomographyFile);
    try {
      const medExamRes = await axios.post(`http://localhost:5000/patient/${id}/examinations`, medExams);
      const tomographyRes = await axios.post(`http://localhost:5000/patient/${id}/tomography`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (medExamRes.status === 201 && tomographyRes.status === 201) {
        navigate({
          pathname: `/patient-card/${id}`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavBar />

      <h2 className="mb-3 pt-3">Результаты осмотра</h2>
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
        <Form.Group className="mb-3" controlId="AMDType">
          <Form.Label>
            <strong>Тип ВМД: </strong>
          </Form.Label>
          <Form.Check
            type="radio"
            label="Влажная"
            name="AMDType"
            value="wet"
            checked={additionalFields === "wet"}
            onChange={dryAMD}
          />
          <Form.Check
            type="radio"
            label="Сухая"
            name="AMDType"
            value="dry"
            checked={additionalFields === "dry"}
            onChange={dryAMD}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="visualAcuity">
          <Form.Label>
            <strong>Острота зрения: </strong>
          </Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="Введите данные по остроте зрения" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="injectionDate">
          <Form.Label>
            <strong>Дата инъекции: </strong>
          </Form.Label>
          <Form.Control type="date" name="injectionDate" placeholder="Дата инъекции" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="nextInspectionDate">
          <Form.Label>
            <strong>Дата следующего осмотра: </strong>
          </Form.Label>
          <Form.Control type="date" name="nextInspectionDate" placeholder="Дата следующего осмотра" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="medicalexam">
          <Form.Label>
            <strong>Результаты осмотра: </strong>
          </Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Введите результаты осмотра" />
        </Form.Group>

        {additionalFields === "dry" && fragment}

        <Form.Group controlId="tomography" className="mb-3">
          <Form.Label>
            <strong>Введите файл снимка: </strong>
          </Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <div className="d-grid gap-2 pb-3">
          <Button variant="primary" type="submit" size="lg">
            Загрузить в базу данных
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MedExam;
