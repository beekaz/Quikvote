// src/modules/SurveyList.js
import React from "react";
import { useQuery } from "react-query";
import "../../styles/surveyList.css";

const fetchSurveys = async () => {
  const response = await fetch("/api/surveys");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const SurveyList = () => {
  const { data: surveys, error, isLoading } = useQuery("surveys", fetchSurveys);

  if (isLoading) return <div>Loading surveys...</div>;
  if (error) return <div>Error loading surveys: {error.message}</div>;

  return (
    <div className='survey-list'>
      <h1>Survey List</h1>
      <div className='survey-container'>
        {surveys.map((survey) => (
          <div className='survey-card' key={survey.id}>
            <h2>{survey.title}</h2>
            <p>{survey.description}</p>
            <button onClick={() => console.log(`Viewing survey: ${survey.id}`)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyList;
