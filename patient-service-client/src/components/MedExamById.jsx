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
    visualAcuityOD: "",
    visualAcuityOS: "",
    tonometryOD: "",
    tonometryOS: "",
    refractometryODsph: "",
    refractometryODcyl: "",
    refractometryODax: "",
    refractometryOSsph: "",
    refractometryOScyl: "",
    refractometryOSax: "",
    biomicroscopyOD: "",
    biomicroscopyOS: "",
    eyeBottomOD: "",
    eyeBottomOS: "",
    additionalExamOD: "",
    additionalExamOS: "",
    nextInjectionDate: "",
    nextInspectionDate: "",
    examinationResult: "",
    patient: "",
    formOfDisease: "",
    VEGFTherapyHistory: "",
  });

  const [nextInjectionDate, setNextInjectionDate] = useState();
  const [nextInspectionDate, setNextInspectionDate] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/patient/med-exam/${medExamId}`).then((resp) => {
      setMedExam(resp.data);
      setNextInjectionDate(resp.data.nextInjectionDate);
      setNextInspectionDate(resp.data.nextInspectionDate);
    });
  }, [setMedExam, setNextInjectionDate, setNextInspectionDate]);

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
        visualAcuityOD: e.target[0].value,
        visualAcuityOS: e.target[1].value,
        tonometryOD: e.target[2].value,
        tonometryOS: e.target[3].value,
        refractometryODsph: e.target[4].value,
        refractometryODcyl: e.target[5].value,
        refractometryODax: e.target[6].value,
        refractometryOSsph: e.target[7].value,
        refractometryOScyl: e.target[8].value,
        refractometryOSax: e.target[9].value,
        biomicroscopyOD: e.target[10].value,
        biomicroscopyOS: e.target[11].value,
        eyeBottomOD: e.target[12].value,
        eyeBottomOS: e.target[13].value,
        additionalExamOD: e.target[14].value,
        additionalExamOS: e.target[15].value,
        nextInjectionDate: e.target[16].value,
        nextInspectionDate: e.target[17].value,
        examinationResult: e.target[18].value,
      };

      await updateMedExam(update);
    } else {
      const update = {
        visualAcuityOD: e.target[0].value,
        visualAcuityOS: e.target[1].value,
        tonometryOD: e.target[2].value,
        tonometryOS: e.target[3].value,
        refractometryODsph: e.target[4].value,
        refractometryODcyl: e.target[5].value,
        refractometryODax: e.target[6].value,
        refractometryOSsph: e.target[7].value,
        refractometryOScyl: e.target[8].value,
        refractometryOSax: e.target[9].value,
        biomicroscopyOD: e.target[10].value,
        biomicroscopyOS: e.target[11].value,
        eyeBottomOD: e.target[12].value,
        eyeBottomOS: e.target[13].value,
        additionalExamOD: e.target[14].value,
        additionalExamOS: e.target[15].value,
        nextInspectionDate: e.target[16].value,
        examinationResult: e.target[18].value,
        VEGFTherapyHistory: e.target[19].value,
      };

      await updateMedExam(update);
    }
  };

  const setInjection = (e) => {
    setNextInjectionDate(e.target.value);
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
          <p>
            <strong>Острота зрения: </strong>
          </p>
          <Form.Label>OD</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OD" defaultValue={medExam.visualAcuityOD} />
          <Form.Label>OS</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OS" defaultValue={medExam.visualAcuityOS} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="tonometry">
          <p>
            <strong>Тонометрия: </strong>
          </p>
          <Form.Label>OD</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OD, мм.рт.ст." defaultValue={medExam.tonometryOD} />
          <Form.Label>OS</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OS, мм.рт.ст." defaultValue={medExam.tonometryOS} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="refractometry">
          <p>
            <strong>Рефрактометрия: </strong>
          </p>
          <p>
            <strong>OD: </strong>
          </p>
          <Form.Label>sph</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OD, sph" defaultValue={medExam.refractometryODsph} />
          <Form.Label>cyl</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OD, cyl" defaultValue={medExam.refractometryODcyl} />
          <Form.Label>ax</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OD, ax" defaultValue={medExam.refractometryODax} />
          <p className="mt-2">
            <strong>OS: </strong>
          </p>
          <Form.Label>sph</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OS, sph" defaultValue={medExam.refractometryOSsph} />
          <Form.Label>cyl</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OS, cyl" defaultValue={medExam.refractometryOScyl} />
          <Form.Label>ax</Form.Label>
          <Form.Control as="textarea" rows={1} placeholder="OS, ax" defaultValue={medExam.refractometryOSax} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="biomicroscopy">
          <p>
            <strong>Биомикроскопия: </strong>
          </p>
          <Form.Label>OD</Form.Label>
          <Form.Control as="textarea" rows={8} placeholder="Биомикроскопия OD" defaultValue={medExam.biomicroscopyOD} />
          <Form.Label>OS</Form.Label>
          <Form.Control as="textarea" rows={8} placeholder="Биомикроскопия OS" defaultValue={medExam.biomicroscopyOS} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="eyeBottom">
          <p>
            <strong>Глазное дно: </strong>
          </p>
          <Form.Label>OD</Form.Label>
          <Form.Control as="textarea" rows={6} placeholder="Глазное дно OD" defaultValue={medExam.eyeBottomOD} />
          <Form.Label>OS</Form.Label>
          <Form.Control as="textarea" rows={6} placeholder="Глазное дно OS" defaultValue={medExam.eyeBottomOS} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="additionalExamination">
          <p>
            <strong>Дополнительные исследования: </strong>
          </p>
          <Form.Label>OD</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            placeholder="Дополнительные исследования OD"
            defaultValue={medExam.additionalExamOD}
          />
          <Form.Label>OS</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            placeholder="Дополнительные исследования OS"
            defaultValue={medExam.additionalExamOS}
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
