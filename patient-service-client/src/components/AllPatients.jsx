import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./layout/Navbar";
import TableComp from "./layout/Table";

const AllPatients = () => {
  const [patientList, setPatientList] = useState([
    {
      name: "",
      surname: "",
      patronymic: "",
      phone: "",
    },
  ]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/patient/cards-min-info`)
      .then((resp) => {
        setPatientList(resp.data);
      })
      .catch((err) => {
        alert("Проблемы с доступом к базе данных");
      });
  }, [setPatientList]);

  if (patientList) {
    return (
      <div>
        <NavBar />

        <TableComp list={patientList} />
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

export default AllPatients;
