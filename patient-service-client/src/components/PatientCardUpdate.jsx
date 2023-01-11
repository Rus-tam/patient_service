import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PatientCardUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patientInfo, setPatientInfo] = useState({
    name: "",
    surname: "",
    patronymic: "",
    patientBirthDate: "",
    phone: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/patient/${id}`).then((resp) => {
      if (resp.status === 200) {
        const patientData = {
          name: resp.data.name,
          surname: resp.data.surname,
          patronymic: resp.data.patronymic,
          patientBirthDate: resp.data.patientBirthDate,
          phone: resp.data.phone,
          kinsmenPhone: resp.data.kinsmenPhone,
        };
        setPatientInfo(patientData);
      } else {
        alert("Не удалось получить данные пациента с сервера");
      }
    });
  }, [setPatientInfo]);

  const updatePatientCard = async (e) => {
    e.preventDefault();

    const update = {
      name: e.target[0].value.toUpperCase(),
      surname: e.target[1].value.toUpperCase(),
      patronymic: e.target[2].value.toUpperCase(),
      patientBirthDate: e.target[3].value,
      phone: e.target[4].value,
      kinsmenPhone: e.target[5].value,
    };

    const resp = await axios.put(`http://localhost:5000/patient/${id}/update`, update);

    if (resp.status === 200) {
      navigate({
        pathname: `/patient-card/${id}`,
      });
    } else {
      alert("Обновление не удалось");
    }
  };

  const deletePatientCard = async () => {
    const resp = await axios.delete(`http://localhost:5000/patient/delete/${id}`);

    if (resp.status === 200) {
      alert("Карточка пациента удалена");
      navigate({ pathname: "/" });
    } else {
      alert("Не удалось удалить карточку пациента");
    }
  };

  return (
    <div>
      <NavBar />

      <h2 className="mb-3 pt-3">Данные пациента</h2>

      <div>
        <Form onSubmit={updatePatientCard}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Имя</Form.Label>
            <Form.Control type="text" placeholder="Введите имя пациента" defaultValue={patientInfo.name} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control type="text" placeholder="Введите фамилию пациента" defaultValue={patientInfo.surname} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="patronymic">
            <Form.Label>Отчество</Form.Label>
            <Form.Control type="text" placeholder="Введите отчество пациента" defaultValue={patientInfo.patronymic} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="birthdate">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              placeholder="Введите дату рождения"
              defaultValue={patientInfo.patientBirthDate}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Номер телефона в формате +7XXXXXXXXXX</Form.Label>
            <Form.Control type="tel" name="phone" placeholder="Номер телефона" defaultValue={patientInfo.phone} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="kinsmenPhone">
            <Form.Label>Номер телефона родственника в формате +7XXXXXXXXXX</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Номер телефона"
              defaultValue={patientInfo.kinsmenPhone}
            />
          </Form.Group>

          <div className="pt-3">
            <Button variant="primary" type="submit">
              Обновить данные
            </Button>
          </div>
        </Form>

        <Button variant="danger" className="mt-3" onClick={deletePatientCard}>
          Удалить данные
        </Button>
      </div>
    </div>
  );
};

export default PatientCardUpdate;
