import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./components/StartPage";
import NewPatientCard from "./components/NewPatientCard";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route exact path="/" element={<StartPage />}></Route>
          <Route path="/new-patient-card" element={<NewPatientCard />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
