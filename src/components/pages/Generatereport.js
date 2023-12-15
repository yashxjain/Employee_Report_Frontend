
import React from "react";
import { useLocation } from "react-router-dom";
import EmployeeEvaluationForm from "../EmployeeEvaluationForm"; 
import Generatereport2 from "./Generatereport2";

const Generatereport = () => {
  const location = useLocation();


  const isStepOne = location.pathname === "/generatereport-step-one" || location.pathname === "/generatereport-step-two";

  return (
    <div className="card">
     {isStepOne ? <EmployeeEvaluationForm /> : <Generatereport2 />}
    </div>
  );
};

export default Generatereport;




