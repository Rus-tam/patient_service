import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./components/StartPage";
import NewPatientCard from "./components/NewPatientCard";
import PatientCard from "./components/PatientCard";
import MedExam from "./components/MedExam";
import MedExamById from "./components/MedExamById";
import FindPatient from "./components/FindPatient";
import CallList from "./components/CallList";
import MissedPatientsList from "./components/MissedPatientsList";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route exact path="/" element={<StartPage />}></Route>
          <Route path="/new-patient-card" element={<NewPatientCard />}></Route>
          <Route path="/patient-card/:id" element={<PatientCard />}></Route>
          <Route path="patient/med-examination/:id" element={<MedExam />}></Route>
          <Route path="/medexam/:medExamId" element={<MedExamById />}></Route>
          <Route path="/find-patient" element={<FindPatient />}></Route>
          <Route path="/seven-days-list" element={<CallList />}></Route>
          <Route path="/missed-list" element={<MissedPatientsList />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
