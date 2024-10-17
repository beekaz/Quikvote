// src/modules/QuizList.js
import React from "react";
import { useQuery } from "react-query";
import "../../styles/quizList.css";

const fetchQuizzes = async () => {
  const response = await fetch("/api/quizzes");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const QuizList = () => {
  const { data: quizzes, error, isLoading } = useQuery("quizzes", fetchQuizzes);

  if (isLoading) return <div>Loading quizzes...</div>;
  if (error) return <div>Error loading quizzes: {error.message}</div>;

  return (
    <div className='quiz-list'>
      <h1>Quiz List</h1>
      <div className='quiz-container'>
        {quizzes.map((quiz) => (
          <div className='quiz-card' key={quiz.id}>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <button onClick={() => console.log(`Viewing quiz: ${quiz.id}`)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
