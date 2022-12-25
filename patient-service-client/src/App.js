import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./components/StartPage";
import NewPatientCard from "./components/NewPatientCard";
import PatientCard from "./components/MedExam";
import MedExam from "./components/MedExam";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route exact path="/" element={<StartPage />}></Route>
          <Route path="/new-patient-card" element={<NewPatientCard />}></Route>
          <Route path="/med-examination/:id" element={<MedExam />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
