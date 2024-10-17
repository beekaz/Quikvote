import React from "react";
import QuizForm from "./QuizForm";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Create Quiz</h1>
      <QuizForm onQuizCreated={() => navigate("/manage-quizzes")} />{" "}
    </div>
  );
};

export default CreateQuiz;
