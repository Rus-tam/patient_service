import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment from "moment";
import DryAMDFormFragment from "./layout/DryAMDFormFragment";

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

  const uploadMedExams = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let tomographyFile;
    let medExams = {};
    let formOfDisease = "";

    e.target[0].checked ? (AMDType = "wet") : (AMDType = "dry");

    if (AMDType === "wet") {
      tomographyFile = e.target[22].files[0];

      medExams = {
        AMDType: AMDType,
        visualAcuityOD: e.target[2].value,
        visualAcuityOS: e.target[3].value,
        tonometryOD: e.target[4].value,
        tonometryOS: e.target[5].value,
        refractometryODsph: e.target[6].value,
        refractometryODcyl: e.target[7].value,
        refractometryODax: e.target[8].value,
        refractometryOSsph: e.target[9].value,
        refractometryOScyl: e.target[10].value,
        refractometryOSax: e.target[11].value,
        biomicroscopyOD: e.target[12].value,
        biomicroscopyOS: e.target[13].value,
        eyeBottomOD: e.target[14].value,
        eyeBottomOS: e.target[15].value,
        additionalExamOD: e.target[16].value,
        additionalExamOS: e.target[17].value,
        nextInjectionDate: moment(e.target[19].value).format("YYYY-MM-DD").toString(),
        nextInspectionDate: moment(e.target[20].value).format("YYYY-MM-DD").toString(),
        injectionDate: moment(new Date()).format("YYYY-MM-DD HH:MM").toString(),
        drugName: e.target[18].value,
        examinationResult: e.target[21].value,
      };

      formData.append("file", tomographyFile);
    } else {
      tomographyFile = e.target[22].files[0];

      e.target[20].checked ? (formOfDisease = true) : (formOfDisease = false);

      medExams = {
        AMDType: AMDType,
        visualAcuityOD: e.target[2].value,
        visualAcuityOS: e.target[3].value,
        tonometryOD: e.target[4].value,
        tonometryOS: e.target[5].value,
        refractometryODsph: e.target[6].value,
        refractometryODcyl: e.target[7].value,
        refractometryODax: e.target[8].value,
        refractometryOSsph: e.target[9].value,
        refractometryOScyl: e.target[10].value,
        refractometryOSax: e.target[11].value,
        biomicroscopyOD: e.target[12].value,
        biomicroscopyOS: e.target[13].value,
        eyeBottomOD: e.target[14].value,
        eyeBottomOS: e.target[15].value,
        additionalExamOD: e.target[16].value,
        additionalExamOS: e.target[17].value,
        nextInspectionDate: moment(e.target[18].value).format("YYYY-MM-DD").toString(),
        drugName: e.target[18].value,
        formOfDisease,
        examinationResult: e.target[19].value,
        VEGFTherapyHistory: e.target[21].value,
      };

      formData.append("file", tomographyFile);
    }

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
      alert("Произошла ошибка");
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
          <p>
            <strong>Острота зрения: </strong>
          </p>
          <Form.Label>OD</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OD" />
          <Form.Label>OS</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OS" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="tonometry">
          <p>
            <strong>Тонометрия: </strong>
          </p>
          <Form.Label>OD</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OD, мм.рт.ст." />
          <Form.Label>OS</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OS, мм.рт.ст." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="refractometry">
          <p>
            <strong>Рефрактометрия: </strong>
          </p>
          <p>
            <strong>OD: </strong>
          </p>
          <Form.Label>sph</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OD, sph" />
          <Form.Label>cyl</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OD, cyl" />
          <Form.Label>ax</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OD, ax" />
          <p className="mt-2">
            <strong>OS: </strong>
          </p>
          <Form.Label>sph</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OS, sph" />
          <Form.Label>cyl</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OS, cyl" />
          <Form.Label>ax</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OS, ax" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="biomicroscopy">
          <p>
            <strong>Биомикроскопия: </strong>
          </p>
          <Form.Label>OD</Form.Label>
          <Form.Control as="textarea" rows={8} placeholder="Биомикроскопия OD" />
          <Form.Label>OS</Form.Label>
          <Form.Control as="textarea" rows={8} placeholder="Биомикроскопия OS" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="eyeBottom">
          <p>
            <strong>Глазное дно: </strong>
          </p>
          <Form.Label>OD</Form.Label>
          <Form.Control as="textarea" rows={6} placeholder="Глазное дно OD" />
          <Form.Label>OS</Form.Label>
          <Form.Control as="textarea" rows={6} placeholder="Глазное дно OS" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="additionalExamination">
          <p>
            <strong>Дополнительные исследования: </strong>
          </p>
          <Form.Label>OD</Form.Label>
          <Form.Control as="textarea" rows={15} placeholder="Дополнительные исследования OD" />
          <Form.Label>OS</Form.Label>
          <Form.Control as="textarea" rows={15} placeholder="Дополнительные исследования OS" />
        </Form.Group>

        {additionalFields === "wet" && (
          <>
            <Form.Group className="mb-3" controlId="drugName">
              <Form.Label>
                <strong>Наименование препарата для инъекции: </strong>
              </Form.Label>
              <Form.Control as="textarea" rows={1} placeholder="Введите наименование препарата" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="nextInjectionDate">
              <Form.Label>
                <strong>Дата следующей инъекции: </strong>
              </Form.Label>
              <Form.Control type="date" name="nextInjectionDate" placeholder="Дата инъекции" />
            </Form.Group>
          </>
        )}

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

        {additionalFields === "dry" && DryAMDFormFragment}

        <Form.Group controlId="tomography" className="mb-3">
          <Form.Label>
            <strong>Введите файл снимка: </strong>
          </Form.Label>
          <Form.Control type="file" />
        </Form.Group>

        <div className="d-grid gap-2 pb-3">
          {additionalFields === "wet" && (
            <Button variant="success" size="lg">
              Сформировать приглашение
            </Button>
          )}
          <Button variant="primary" type="submit" size="lg">
            Загрузить в базу данных
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MedExam;
