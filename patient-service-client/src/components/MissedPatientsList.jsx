import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import axios from "axios";
import TableComp from "./layout/Table";

const MissedPatientsList = () => {
  const [missedInjectionList, setMissedInjectionList] = useState([]);
  const [missedInspectionList, setMissedInspectionList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/check/get-missed-list").then((resp) => {
      setMissedInjectionList(resp.data.injectionDate);
      setMissedInspectionList(resp.data.nextInspectionDate);
    });
  }, [setMissedInjectionList, setMissedInspectionList]);

  return (
    <div>
      <NavBar />

      <h2 className="mb-3 pt-3">Список пациентов пропустивших прием</h2>
      <hr />

      <h3 className="mb-3 pt-3">Пациенты на инъекцию</h3>
      <TableComp list={missedInjectionList} />
      <hr />

      <h3 className="mb-3 pt-3">Пациенты на обследование</h3>
      <TableComp list={missedInspectionList} />
    </div>
  );
};

export default MissedPatientsList;
