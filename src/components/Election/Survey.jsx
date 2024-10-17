import React from "react";
import SurveyForm from "./SurveyForm";
import { useNavigate } from "react-router-dom";

const CreateSurvey = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Create Survey</h1>
      <SurveyForm onSurveyCreated={() => navigate("/manage-surveys")} />
    </div>
  );
};

export default CreateSurvey;
