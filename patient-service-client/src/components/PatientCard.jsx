import React, { useEffect, useState } from "react";
import NavBar from "./layout/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const PatientCard = () => {
  const param = useParams();
  const id = param.id;
  const [patientData, setPatientData] = useState();
  useEffect(() => {
    axios.get(`http://localhost:5000/patient/${id}`).then((resp) => {
      setPatientData(resp.data);
    });
  }, [setPatientData]);

  return (
    <div>
      <NavBar />
      <h1>Hello</h1>
    </div>
  );
};

export default PatientCard;
