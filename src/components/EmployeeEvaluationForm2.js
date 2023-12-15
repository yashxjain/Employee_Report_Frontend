import Checkbox from "@material-ui/core/Checkbox";
import React, { useState, useEffect } from "react";

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
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cellStyles = {
  border: "1px solid #ddd",
  padding: "8px",
  overflow: "hidden",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  wordBreak: "break-all",
  maxHeight: "30px",
};

const columnWidths = {
  col1: "130px",
  col2: "50px",
  col3: "120px",
  col4: "180px",
};
const columnWidths1 = {
  col5: "50px",
  col6: "50px",
  col7: "50px",
  col8: "50px",
};

const EmployeeEvaluationForm2 = () => {
  const [formDataFromStorage, setFormDataFromStorage] = useState(null);
  const navigate = useNavigate();

  const [formData1, setFormData1] = useState({
    jobspecificperformancecriteria: [
      {
        knowledgeofposition: {
          rating: "",
          comments: "",
        },
        workconsistency: {
          rating: "",
          comments: "",
        },
      },
    ],
    performancegoals: "",
    overallrating: "",
    positive: "",
    negative: "",
  });

  const [exceedsExpectations, setExceedsExpectations] = useState(false);
  const [meetsExpectations, setMeetsExpectations] = useState(false);
  const [needsImprovement, setNeedsImprovement] = useState(false);
  const [unacceptable, setUnacceptable] = useState(false);

  const handleOverallRatingChange = (rating) => {
    setExceedsExpectations(rating === "exceedsExpectations");
    setMeetsExpectations(rating === "meetsExpectations");
    setNeedsImprovement(rating === "needsImprovement");
    setUnacceptable(rating === "unacceptable");

    setFormData1((prevFormData) => ({
      ...prevFormData,
      overallrating:
        rating === "exceedsExpectations"
          ? "EXCEEDS EXPECTATIONS"
          : rating === "meetsExpectations"
          ? "MEETS EXPECTATIONS"
          : rating === "needsImprovement"
          ? "NEEDS IMPROVEMENT"
          : "UNACCEPTABLE",
    }));
  };

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormDataFromStorage(JSON.parse(storedFormData));
    }
  }, []);

  const [positiveError, setPositiveError] = useState("");
  const [negativeError, setNegativeError] = useState("");
  const [performanceGoalsError, setPerformanceGoalsError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [knowledgeRatingError, setKnowledgeRatingError] = useState(false);
  const [workConsistencyRatingError, setWorkConsistencyRatingError] =
    useState(false);

  const handleChange = (e, section, fieldName, fieldType) => {
    const { value } = e.target;

    setFormData1((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      if (section === "knowledgeofposition") {
        if (
          fieldName === "knowledgeofposition" ||
          fieldName === "workconsistency"
        ) {
          if (fieldType === "rating") {
            updatedFormData.jobspecificperformancecriteria[0][fieldName][
              fieldType
            ] = value;
            const intValue = parseInt(value);
            if (value.trim() !== "" && (isNaN(intValue) || intValue > 10)) {
              console.error(
                "Rating should be a number less than or equal to 10"
              );
              if (fieldName === "knowledgeofposition") {
                setKnowledgeRatingError(
                  "Rating should be a number less than or equal to 10"
                );
              } else if (fieldName === "workconsistency") {
                setWorkConsistencyRatingError(
                  "Rating should be a number less than or equal to 10"
                );
              }
            } else {
              if (fieldName === "knowledgeofposition") {
                setKnowledgeRatingError("");
              } else if (fieldName === "workconsistency") {
                setWorkConsistencyRatingError("");
              }
            }
          } else {
            updatedFormData.jobspecificperformancecriteria[0][fieldName][
              fieldType
            ] = value;
          }
        }
      } else if (section === "performancegoals") {
        updatedFormData.performancegoals = value;
        setPerformanceGoalsError(
          value.trim() === "" ? "This field is required" : ""
        );
      } else if (section === "positive") {
        updatedFormData.positive = value;
        setPositiveError(value.trim() === "" ? "This field is required" : "");
      } else if (section === "negative") {
        updatedFormData.negative = value;
        setNegativeError(value.trim() === "" ? "This field is required" : "");
      }

      return updatedFormData;
    });
  };
  const error =
    formData1.jobspecificperformancecriteria[0]?.knowledgeofposition?.rating !==
      null &&
    (isNaN(
      parseInt(
        formData1.jobspecificperformancecriteria[0]?.knowledgeofposition?.rating
      )
    ) ||
      parseInt(
        formData1.jobspecificperformancecriteria[0]?.knowledgeofposition?.rating
      ) > 10);

  const workconsistencyError =
    formData1.jobspecificperformancecriteria[0]?.workconsistency?.rating !==
      null &&
    (isNaN(
      parseInt(
        formData1.jobspecificperformancecriteria[0]?.workconsistency?.rating
      )
    ) ||
      parseInt(
        formData1.jobspecificperformancecriteria[0]?.workconsistency?.rating
      ) > 10);

  const handleSubmitForm2 = () => {
    if (
      formData1.positive.trim() === "" ||
      formData1.negative.trim() === "" ||
      formData1.performancegoals.trim() === ""
    ) {
      setPositiveError(
        formData1.positive.trim() === "" ? "This field is required" : ""
      );
      setNegativeError(
        formData1.negative.trim() === "" ? "This field is required" : ""
      );
      return;
    }

    const combinedFormData = {
      ...formData1,
      ...formDataFromStorage,
    };

    console.log("Data to be submitted:", combinedFormData);

    axios
      .post("http://localhost:2033/report/post", combinedFormData)
      .then((response) => {
        console.log("Data sent successfully");
        console.log("API Response:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom></Typography>
        <form>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                    align="center"
                    colSpan={4}
                  >
                    <h2>JOB-SPECIFIC PERFORMANCE CRITERIA</h2>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                  >
                    <strong>PERFORMANCE CATEGORY</strong>
                  </TableCell>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col2 }}
                  >
                    <strong> RATING</strong>
                  </TableCell>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col3 }}
                  >
                    <strong> COMMENTS AND EXAMPLES</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                  >
                    <div>
                      <strong> Knowledge of Position:</strong>
                    </div>
                  </TableCell>

                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col2 }}
                  >
                    <TextField
                      value={
                        formData1.jobspecificperformancecriteria[0]
                          ?.knowledgeofposition?.rating || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          e,
                          "knowledgeofposition",
                          "knowledgeofposition",
                          "rating"
                        )
                      }
                      error={knowledgeRatingError} // Set this to true when there's a validation error
                      helperText={
                        knowledgeRatingError
                          ? "Rating should be a number less than or equal to 10"
                          : ""
                      }
                    />
                  </TableCell>

                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col3 }}
                  >
                    <TextField
                      value={
                        formData1.jobspecificperformancecriteria[0]
                          ?.knowledgeofposition?.comments
                      }
                      onChange={(e) =>
                        handleChange(
                          e,
                          "knowledgeofposition",
                          "knowledgeofposition",
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
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                  >
                    <div>
                      <strong>Work Consistency:</strong>
                    </div>
                  </TableCell>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col2 }}
                  >
                    <TextField
                      value={
                        formData1.jobspecificperformancecriteria[0]
                          ?.workconsistency?.rating || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          e,
                          "knowledgeofposition",
                          "workconsistency",
                          "rating"
                        )
                      }
                      error={workConsistencyRatingError} // Set this to true when there's a validation error
                      helperText={
                        workConsistencyRatingError
                          ? "Rating should be a number less than or equal to 10"
                          : ""
                      }
                    />
                  </TableCell>

                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col3 }}
                  >
                    <TextField
                      value={
                        formData1.jobspecificperformancecriteria[0]
                          ?.workconsistency?.comments
                      }
                      onChange={(e) =>
                        handleChange(
                          e,
                          "knowledgeofposition",
                          "workconsistency",
                          "comments"
                        )
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

          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                    align="center"
                    colSpan={4}
                  >
                    <h2> PERFORMANCE GOALS</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{ ...cellStyles, width: columnWidths.col1 }}
                  >
                    <TextField
                      fullWidth
                      id="PerformanceGoals"
                      name="performancegoals"
                      label="Performance goals"
                      placeholder="Performance goals"
                      value={formData1.performancegoals}
                      onChange={(e) => handleChange(e, "performancegoals")}
                      error={!!performanceGoalsError}
                      helperText={performanceGoalsError}
                      multiline
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
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
                    <h2>Overall Ratings</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{
                      ...cellStyles,
                      width: columnWidths1.col5,
                      height: "150px",
                    }}
                  >
                    <div style={{ position: "relative", height: "100%" }}>
                      <Checkbox
                        checked={exceedsExpectations}
                        onChange={() =>
                          handleOverallRatingChange("exceedsExpectations")
                        }
                        color="primary"
                      />
                      <Typography
                        style={{ position: "absolute", top: 10, left: 33 }}
                      >
                        EXCEEDS EXPECTATIONS
                      </Typography>
                    </div>
                  </TableCell>

                  <TableCell
                    style={{
                      ...cellStyles,
                      width: columnWidths1.col6,
                      height: "150px",
                    }}
                  >
                    <div style={{ position: "relative", height: "100%" }}>
                      <Checkbox
                        checked={meetsExpectations}
                        onChange={() =>
                          handleOverallRatingChange("meetsExpectations")
                        }
                        color="primary"
                      />
                      <Typography
                        style={{ position: "absolute", top: 10, left: 33 }}
                      >
                        MEETS EXPECTATIONS
                      </Typography>
                      {/* Cell Content */}
                    </div>
                  </TableCell>
                  <TableCell
                    style={{
                      ...cellStyles,
                      width: columnWidths1.col7,
                      height: "150px",
                    }}
                  >
                    <div style={{ position: "relative", height: "100%" }}>
                      <Checkbox
                        checked={needsImprovement}
                        onChange={() =>
                          handleOverallRatingChange("needsImprovement")
                        }
                        color="primary"
                      />
                      <Typography
                        style={{ position: "absolute", top: 10, left: 33 }}
                      >
                        NEEDS IMPROVEMENT
                      </Typography>
                      {/* Cell Content */}
                    </div>
                  </TableCell>
                  <TableCell
                    style={{
                      ...cellStyles,
                      width: columnWidths1.col8,
                      height: "150px",
                    }}
                  >
                    <div style={{ position: "relative", height: "100%" }}>
                      <Checkbox
                        checked={unacceptable}
                        onChange={() =>
                          handleOverallRatingChange("unacceptable")
                        }
                        color="primary"
                      />
                      <Typography
                        style={{ position: "absolute", top: 10, left: 33 }}
                      >
                        UNACCEPTABLE
                      </Typography>
                      {/* Cell Content */}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ height: "150px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      {/* First set of data at the top */}
                      <div style={{ lineHeight: "1.5" }}>
                        <br />
                        <TextField
                          id="positive"
                          name="positive"
                          label="Positive"
                          placeholder="Positive"
                          value={formData1.positive}
                          onChange={(e) => handleChange(e, "positive")}
                          error={!!positiveError}
                          helperText={positiveError}
                          multiline
                          fullWidth
                        />
                      </div>
                      {/* Second set of data at the bottom */}
                      <div style={{ lineHeight: "1.5" }}>
                        <br />
                        <TextField
                          id="negative"
                          name="negative"
                          label="Negative"
                          placeholder="Negative"
                          value={formData1.negative}
                          onChange={(e) => handleChange(e, "negative")}
                          error={!!negativeError}
                          helperText={negativeError}
                          multiline
                          fullWidth
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </form>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitForm2}
            style={{
              marginTop: "10px",
              backgroundColor: "blue",
              fontSize: "16px",
              borderRadius: "7px",
            }}
          >
            Submit
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default EmployeeEvaluationForm2;
