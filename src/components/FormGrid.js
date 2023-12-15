import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function FromGrid() {
  const navigate = useNavigate();
  const [nextPage, setNextPage] = useState(false);
  const [selected1, setSelected1] = useState(
    "Enter the phone number of the  suspect"
  );
  const [selected2, setSelected2] = useState("Select the category of fraud");
  const [selected3, setSelected3] = useState("Select the subcategory of fraud");
  const [type, setType] = useState("text");
  const datetimehandle = () => {
    setType("datetime-local");
  };
  const [dateTime, setDateTime] = useState("");
  const [suspectName, setSuspectName] = useState("");
  const [victimName, setVictimName] = useState("");
  const [locationOfSuspect, setLocationOfSuspect] = useState("");
  const [legalComplaint, setLegalComplaint] = useState();
  const [financialLoss, setFinancialLoss] = useState();
  const [description, setDescription] = useState("");
  const [upload, setUpload] = useState();
  const [suspectContact, setSuspectcontact] = useState("");
  const handleFirstForm = () => {
    localStorage.setItem("datetime", dateTime);
    localStorage.setItem("suspectName", suspectName);
    localStorage.setItem("victimName", victimName);
    localStorage.setItem("locationOfSuspect", locationOfSuspect);

    localStorage.setItem("legalComplaint", legalComplaint);

    localStorage.setItem("financialLoss", financialLoss);
    localStorage.setItem("description", description);
    localStorage.setItem("selected1", selected1);
    localStorage.setItem("selected2", selected2);
    localStorage.setItem("selected3", selected3);
    localStorage.setItem("upload", upload);
    localStorage.setItem("suspectContact", suspectContact);
  };
  const handleNextClick = () => {
    handleFirstForm(); // Save form data to localStorage
    setNextPage(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {!nextPage ? (
        <Grid container>
          <Grid container>
            <Grid item sm={6}>
              <div className="formleft">
                <div>
                  <p className="text-head">Let us help you with this</p>
                </div>
                {/* ... Other form inputs ... */}
              </div>
            </Grid>
            <Grid item sm={6}>
              <div className="formright margin_top">
                {/* ... Other form inputs ... */}
              </div>
            </Grid>
          </Grid>
          <div className="btn-property">
            {/* Modify the "Back" button */}
            <button className="btn-back" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faAngleLeft} />
              Back
            </button>
            {/* Modify the "Next" button */}
            <button className="btn-next" onClick={handleNextClick}>
              Next
              <FontAwesomeIcon icon={faAngleLeft} rotation={180} />
            </button>
          </div>
        </Grid>
      ) : (
        // Display a message instead of Reportfraud2
        <div>
          <p>You have completed the form. Thank you!</p>
          <button onClick={() => setNextPage(false)}>Edit Information</button>
        </div>
      )}
    </Box>
  );
}

