import "./App.css";
import { useState } from "react";
import { ClassApp } from "./ClassApp/ClassApp";
import { FunctionalApp } from "./FunctionalApp/FunctionalApp";
import { allCities } from "./utils/all-cities";

function App() {
  const [submittedFormData, setSubmittedFormData] = useState(null);

  return (
    <>
      <div className="all-container">
        <u>
          <h1>Lord of the Forms</h1>
        </u>
        <h4>Your Journey to good form UI Starts Here</h4>
        <h4>Always remember.. One does not simply fill out a react form</h4>
        <div className="forms-container">
          <div className="left">
            <FunctionalApp
              submittedFormData={submittedFormData}
              setSubmittedFormData={setSubmittedFormData}
            />
          </div>
          <div className="right">
            <ClassApp
              submittedFormData={submittedFormData}
              setSubmittedFormData={setSubmittedFormData}
            />
          </div>
        </div>
      </div>
      <datalist id="cities">
        {allCities.map((city) => (
          <option key={city}>{city}</option>
        ))}
      </datalist>
    </>
  );
}

export default App;
