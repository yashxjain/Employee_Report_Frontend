import React, { useState } from "react";

import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { useHistory, useNavigate } from "react-router-dom";
import axios from "axios";

const cellStyles = {
  border: "1px solid #ddd",
  padding: "8px",
  overflow: "hidden",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  wordBreak: "break-all",
  Height: "30px", // Limit the height to the fixed height
};

const columnWidths = {
  col1: "130px", // Set the width for the first column
  col2: "50px", // Set the width for the second column
  col3: "130px", // Set the width for the third column
  col4: "180px", // Set the width for the fourth column
};

const EmployeeEvaluationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    title: "",
    supervisor: "",
    reviewto: "",
    reviewfrom: "",
    coreValuesAndObjectives: [
      {
        qualityofwork: {
          rating: null,
          comments: "",
        },
        attendanceandPunctuality: {
          rating: null,
          comments: "",
        },
        reliability: {
          rating: null,
          comments: "",
        },
        communicationSkills: {
          rating: null,
          comments: "",
        },
        judgement: {
          rating: null,
          comments: "",
        },
      },
    ],
  });

  const handleChange = (e, section, fieldName, fieldType) => {
    const { value } = e.target;

    if (section === "employeeInfo") {
      setFormData({ ...formData, [fieldName]: value });
    } else if (section === "qualityOfWork") {
      const updatedFormData = { ...formData };
      if (
        fieldName === "qualityofwork" ||
        fieldName === "attendanceandPunctuality" ||
        fieldName === "reliability" ||
        fieldName === "communicationSkills" ||
        fieldName === "judgement"
      ) {
        if (fieldType === "rating") {
          updatedFormData.coreValuesAndObjectives[0][fieldName][fieldType] =
            value;
          const intValue = parseInt(value);
          if (value.trim() !== "" && (isNaN(intValue) || intValue > 10)) {
            console.error("Rating should be a number less than or equal to 10");
          }
        } else {
          updatedFormData.coreValuesAndObjectives[0][fieldName][fieldType] =
            value;
        }
      }
      setFormData(updatedFormData);
    }
  };

  const error =
    formData.coreValuesAndObjectives[0]?.qualityofwork?.rating !== null &&
    (isNaN(
      parseInt(formData.coreValuesAndObjectives[0]?.qualityofwork?.rating)
    ) ||
      parseInt(formData.coreValuesAndObjectives[0]?.qualityofwork?.rating) >
        10);

  const attendancePunctualityError =
    formData.coreValuesAndObjectives[0]?.attendanceandPunctuality?.rating !==
      null &&
    (isNaN(
      parseInt(
        formData.coreValuesAndObjectives[0]?.attendanceandPunctuality?.rating
      )
    ) ||
      parseInt(
        formData.coreValuesAndObjectives[0]?.attendanceandPunctuality?.rating
      ) > 10);

  const reliabilityError =
    formData.coreValuesAndObjectives[0]?.reliability?.rating !== null &&
    (isNaN(
      parseInt(formData.coreValuesAndObjectives[0]?.reliability?.rating)
    ) ||
      parseInt(formData.coreValuesAndObjectives[0]?.reliability?.rating) > 10);

  const communicationSkillsError =
    formData.coreValuesAndObjectives[0]?.communicationSkills?.rating !== null &&
    (isNaN(
      parseInt(formData.coreValuesAndObjectives[0]?.communicationSkills?.rating)
    ) ||
      parseInt(
        formData.coreValuesAndObjectives[0]?.communicationSkills?.rating
      ) > 10);
  const judgementError =
    formData.coreValuesAndObjectives[0]?.judgement?.rating !== null &&
    (isNaN(parseInt(formData.coreValuesAndObjectives[0]?.judgement?.rating)) ||
      parseInt(formData.coreValuesAndObjectives[0]?.judgement?.rating) > 10);

  const [errors, setErrors] = useState({
    date: "",
    name: "",
    supervisor: "",
    title: "",
    reviewfrom: "",
    reviewto: "",
    qualityOfWork: {
      qualityofwork: "",
      attendanceandPunctuality: "",
      reliability: "",
      communicationSkills: "",
      judgement: "",
    },
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validation logic for date, name, supervisor, title, reviewfrom, reviewto

    if (!formData.date.trim()) {
      newErrors.date = "This field is required";
      valid = false;
    } else {
      newErrors.date = "";
    }
    if (!formData.name.trim()) {
      newErrors.name = "This field is required";
      valid = false;
    } else {
      newErrors.name = "";
    }
    if (!formData.title.trim()) {
      newErrors.title = "This field is required";
      valid = false;
    } else {
      newErrors.title = "";
    }
    if (!formData.supervisor.trim()) {
      newErrors.supervisor = "This field is required";
      valid = false;
    } else {
      newErrors.supervisor = "";
    }

    // Apply similar validation logic for other fields...

    // Validation logic for quality of work categories
    const qualityOfWorkErrors = { ...errors.qualityOfWork };

    for (const key in formData.coreValuesAndObjectives[0]) {
      if (formData.coreValuesAndObjectives[0].hasOwnProperty(key)) {
        const category = formData.coreValuesAndObjectives[0][key];
        if (category.rating === null || category.rating === "") {
          qualityOfWorkErrors[key] = "This field is required";
          valid = false;
        } else if (
          isNaN(parseInt(category.rating)) ||
          parseInt(category.rating) > 10
        ) {
          qualityOfWorkErrors[key] =
            "Rating should be a number less than or equal to 10";
          valid = false;
        } else {
          qualityOfWorkErrors[key] = "";
        }
      }
    }

    newErrors.qualityOfWork = qualityOfWorkErrors;

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    let fieldsFilled = true;

    // Check if any rating or comments field is empty
    // for (const key in formData.coreValuesAndObjectives[0]) {
    //   const category = formData.coreValuesAndObjectives[0][key];
    //   if (
    //     category.rating === null ||
    //     category.rating === "" ||
    //     category.comments.trim() === ""
    //   ) {
    //     fieldsFilled = false;
    //     console.error("Please fill in all rating and comments fields.");
    //     break; // Break the loop if any field is empty
    //   }
    // }

    if (fieldsFilled && validateForm()) {
      localStorage.setItem("formData", JSON.stringify(formData));
      navigate("/generatereport-step-two");
    }
  };

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "20%" }}>
                <Box p={1} mt={-24}>
                  <Typography variant="h5" gutterBottom>
                    Date
                  </Typography>
                  <input
                    type="date"
                    name="date"
                    id="Date"
                    label="Date"
                    value={formData.date}
                    onChange={(e) => handleChange(e, "employeeInfo", "date")}
                    style={{ width: "150px", height: "50px" }}
                    error={!!errors.date}
                    helperText={errors.date}
                  />
                </Box>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography variant="h5" gutterBottom>
                  Employee Information
                </Typography>
                <Box p={2}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6" gutterBottom>
                              Employee Name
                            </Typography>

                            <TextField
                              fullWidth
                              id="employeeName"
                              name="name" // Update the name to match the state property
                              label="Employee Name"
                              placeholder="Employee Name"
                              value={formData.name} // Bind value to the state
                              onChange={(e) =>
                                handleChange(e, "employeeInfo", "name")
                              }
                              error={!!errors.name}
                              helperText={errors.name}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" gutterBottom>
                              Job Title
                            </Typography>
                            <TextField
                              fullWidth
                              id="jobTitle"
                              name="title"
                              label="Job Title"
                              placeholder="Job Title"
                              value={formData.title}
                              onChange={(e) =>
                                handleChange(e, "employeeInfo", "title")
                              }
                              error={!!errors.title} // Check if there's an error for Employee Name
                              helperText={errors.title}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6" gutterBottom>
                              Supervisor
                            </Typography>
                            <TextField
                              fullWidth
                              id="supervisor"
                              name="supervisor"
                              label="Supervisor"
                              placeholder="Supervisor"
                              value={formData.supervisor}
                              onChange={(e) =>
                                handleChange(e, "employeeInfo", "supervisor")
                              }
                              error={!!errors.supervisor}
                              helperText={errors.supervisor}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" gutterBottom>
                              Review From Date
                            </Typography>
                            <input
                              type="date"
                              id="reviewfrom"
                              name="reviewfrom"
                              label="review from"
                              placeholder="review from"
                              value={formData.reviewfrom}
                              onChange={(e) =>
                                handleChange(e, "employeeInfo", "reviewfrom")
                              }
                              style={{ width: "150px", height: "50px" }}
                              error={!!errors.reviewfrom} // Check if there's an error for Employee Name
                              helperText={errors.reviewfrom}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6" gutterBottom>
                              Review To Date
                            </Typography>
                            <input
                              type="date"
                              id="dateTo"
                              name="reviewto"
                              label="review to"
                              placeholder="review to"
                              value={formData.reviewto}
                              onChange={(e) =>
                                handleChange(e, "employeeInfo", "reviewto")
                              }
                              style={{ width: "150px", height: "50px" }}
                              error={!!errors.reviewto} // Check if there's an error for Employee Name
                              helperText={errors.reviewto}
                            />
                          </TableCell>

                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ ...cellStyles, width: columnWidths.col1 }}
                align="center"
                colSpan={4}
              >
                <h2>Core Values And Objectives</h2>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
                <strong>PERFORMANCE CATEGORY</strong>
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col2 }}>
                <strong> RATING</strong>
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col3 }}>
                <strong> COMMENTS AND EXAMPLES</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
                <div>
                  <strong>Quality of Work:</strong>
                </div>
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col2 }}>
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.qualityofwork?.rating
                  }
                  onChange={(e) =>
                    handleChange(e, "qualityOfWork", "qualityofwork", "rating")
                  }
                  error={error} // Set this to true when there's a validation error
                  helperText={
                    error
                      ? "Rating should be a number less than or equal to 10"
                      : ""
                  }
                  // Other props...
                />
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col3 }}>
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.qualityofwork?.comments
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      "qualityOfWork",
                      "qualityofwork",
                      "comments"
                    )
                  }
                  inputProps={{ maxLength: 300 }}
                  fullWidth
                  multiline
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
                <div>
                  <strong>Attendance and Punctuality:</strong>
                </div>
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col2 }}>
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]
                      ?.attendanceandPunctuality?.rating
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      "qualityOfWork",
                      "attendanceandPunctuality",
                      "rating"
                    )
                  }
                  error={attendancePunctualityError} // Set this to true when there's a validation error
                  helperText={
                    attendancePunctualityError
                      ? "Rating should be a number less than or equal to 10"
                      : ""
                  }
                />
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col3 }}>
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]
                      ?.attendanceandPunctuality?.comments
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      "qualityOfWork",
                      "attendanceandPunctuality",
                      "comments"
                    )
                  }
                  inputProps={{ maxLength: 300 }}
                  fullWidth
                  multiline
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
                <div>
                  <strong>Reliability:</strong>
                </div>
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col2 }}>
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.reliability?.rating
                  }
                  onChange={(e) =>
                    handleChange(e, "qualityOfWork", "reliability", "rating")
                  }
                  error={reliabilityError} // Set this to true when there's a validation error
                  helperText={
                    reliabilityError
                      ? "Rating should be a number less than or equal to 10"
                      : ""
                  }
                />
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col3 }}>
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.reliability?.comments
                  }
                  onChange={(e) =>
                    handleChange(e, "qualityOfWork", "reliability", "comments")
                  }
                  inputProps={{ maxLength: 300 }}
                  fullWidth
                  multiline
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
                <div>
                  <strong>Communication and Skills:</strong>
                </div>
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col2 }}>
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.communicationSkills
                      ?.rating
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      "qualityOfWork",
                      "communicationSkills",
                      "rating"
                    )
                  }
                  error={communicationSkillsError} // Set this to true when there's a validation error
                  helperText={
                    communicationSkillsError
                      ? "Rating should be a number less than or equal to 10"
                      : ""
                  }
                />
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col3 }}>
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.communicationSkills
                      ?.comments
                  }
                  onChange={(e) =>
                    handleChange(
                      e,
                      "qualityOfWork",
                      "communicationSkills",
                      "comments"
                    )
                  }
                  inputProps={{ maxLength: 300 }}
                  fullWidth
                  multiline
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ ...cellStyles, width: columnWidths.col1 }}>
                <div>
                  <strong>Judgement and Decission Making:</strong>
                </div>
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col2 }}>
                <TextField
                  value={formData.coreValuesAndObjectives[0]?.judgement?.rating}
                  onChange={(e) =>
                    handleChange(e, "qualityOfWork", "judgement", "rating")
                  }
                  error={judgementError} // Set this to true when there's a validation error
                  helperText={
                    judgementError
                      ? "Rating should be a number less than or equal to 10"
                      : ""
                  }
                />
              </TableCell>
              <TableCell style={{ ...cellStyles, width: columnWidths.col3 }}>
                <TextField
                  value={
                    formData.coreValuesAndObjectives[0]?.judgement?.comments
                  }
                  onChange={(e) =>
                    handleChange(e, "qualityOfWork", "judgement", "comments")
                  }
                  inputProps={{ maxLength: 300 }}
                  fullWidth
                  multiline
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNextClick}
        style={{ marginTop: "20px" }}
      >
        Next
      </Button>
    </Container>
  );
};

export default EmployeeEvaluationForm;
