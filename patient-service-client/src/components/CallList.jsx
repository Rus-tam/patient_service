import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import moment from "moment";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableComp from "./layout/Table";

const CallList = () => {
  const [plusSevenDaysInjectionList, setPlusSevenDaysInjectionList] = useState([]);
  const [plusSevenDaysInspectionList, setPlusSevenDaysInspectionList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/check/seven-days-list").then((resp) => {
      setPlusSevenDaysInjectionList(resp.data.injectionDate);
      setPlusSevenDaysInspectionList(resp.data.nextInspectionDate);
    });
  }, [setPlusSevenDaysInjectionList, setPlusSevenDaysInspectionList]);

  return (
    <div>
      <NavBar />

      <h2 className="mb-3 pt-3">
        Список пациентов на {moment(new Date()).add(7, "days").format("YYYY-MM-DD").toString()}
      </h2>
      <hr />

      <h3 className="mb-3 pt-3">Пициенты на инъекцию</h3>
      <TableComp list={plusSevenDaysInjectionList} />
      <hr />

      <h3 className="mb-3 pt-3">Пациенты на осмотр</h3>
      <TableComp list={plusSevenDaysInspectionList} />
    </div>
  );
};

export default CallList;
