import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import moment from "moment";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TableComp from "./layout/Table";

const StartPage = () => {
  const navigate = useNavigate();
  const [injectionList, setInjectionList] = useState([
    {
      name: "",
      surname: "",
      patronymic: "",
      phone: "",
    },
  ]);
  const [inspectionList, setInspectionList] = useState([
    {
      name: "",
      surname: "",
      patronymic: "",
      phone: "",
    },
  ]);
  useEffect(() => {
    axios.get(`http://localhost:5000/check/current-date-list`).then((resp) => {
      setInjectionList(resp.data.injectionDate);
      setInspectionList(resp.data.nextInspectionDate);
    });
  }, [setInjectionList, setInspectionList]);

  if (inspectionList && injectionList) {
    return (
      <div>
        <NavBar />

        <h2 className="mb-3 pt-3">Пациенты на сегодня ({moment(new Date()).format("YYYY-MM-DD")})</h2>
        <hr />
        <h3 className="mb-3 pt-3">Пациенты на инъекцию</h3>
        <TableComp list={injectionList} />

        <h3 className="mb-3 pt-3">Пациенты на осмотр</h3>
        <TableComp list={inspectionList} />
      </div>
    );
  } else {
    return (
      <div>
        <NavBar />
        <h2>Wait</h2>
      </div>
    );
  }
};

export default StartPage;
