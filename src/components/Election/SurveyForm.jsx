// src/modules/Surveys/SurveyForm.js
import React, { useState } from "react";
import { db } from "../../Firebase/index";
import { collection, addDoc } from "firebase/firestore";

const SurveyForm = ({ onSurveyCreated }) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([""]);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "surveys"), {
        title,
        questions: questions.map((q) => ({ text: q, answers: [] })),
        createdAt: new Date(),
      });
      if (onSurveyCreated) onSurveyCreated();
      setTitle("");
      setQuestions([""]);
    } catch (err) {
      console.error("Error creating survey:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Survey Title:</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Survey Questions:</label>
        {questions.map((question, index) => (
          <input
            key={index}
            type='text'
            value={question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            required
          />
        ))}
      </div>
      <button type='button' onClick={handleAddQuestion}>
        Add Question
      </button>
      <button type='submit'>Create Survey</button>
    </form>
  );
};

export default SurveyForm;
