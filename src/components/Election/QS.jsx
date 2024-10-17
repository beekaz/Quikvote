import React from "react";
import Quiz from "./Quiz";
import Survey from "./Survey";

const QS = () => {
  const quizData = {
    title: "Sample Quiz",
    questions: [
      {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars",
      },
    ],
  };

  const surveyData = {
    title: "Customer Feedback Survey",
    questions: [
      {
        id: "q1",
        question: "How satisfied are you with our service?",
        type: "multiple-choice",
        options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"],
      },
      {
        id: "q2",
        question: "Please provide any additional feedback:",
        type: "text",
      },
    ],
  };

  return (
    <div>
      <h1>Polling and Survey App</h1>
      <Quiz quizData={quizData} />
      <Survey surveyData={surveyData} />
    </div>
  );
};

export default QS;
