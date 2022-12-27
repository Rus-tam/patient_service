import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import moment from "moment";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StartPage = () => {
  const navigate = useNavigate();
  const [injectionList, setInjectionList] = useState({
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
  });
  const [inspectionList, setInspectionList] = useState({
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
  });
  useEffect(() => {
    axios.get(`http://localhost:5000/check/current-date-list`).then((resp) => {
      setInjectionList(resp.data.injectionDate);
      setInspectionList(resp.data.nextInspectionDate);
    });
  }, [setInjectionList, setInspectionList]);

  console.log(inspectionList);
  return (
    <div>
      <NavBar />

      <h2 className="mb-3 pt-3">Пациенты на сегодня ({moment(new Date()).format("YYYY-MM-DD")})</h2>
      <hr />

      <div className="d-grid gap-2 pb-3">
        <Button className="btn btn-link" variant="outline-light">
          Link Button
        </Button>
      </div>
    </div>
  );
};

export default StartPage;
