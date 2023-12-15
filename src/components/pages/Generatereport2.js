import React from "react";
import EmployeeEvaluationForm2 from "../EmployeeEvaluationForm2";

const Generatereport2 = (props) => {
  console.log(props.setNextPage);
  return (
    <div className="card">
      <EmployeeEvaluationForm2 setNextPage={props.setNextPage} />
    </div>
  );
};

export default Generatereport2;

