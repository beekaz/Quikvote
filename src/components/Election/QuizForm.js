import React, { useState } from "react";
import { db } from "../../Firebase/index";
import { collection, addDoc } from "firebase/firestore";

const QuizForm = ({ onQuizCreated }) => {
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
      await addDoc(collection(db, "quizzes"), {
        title,
        questions: questions.map((q) => ({
          text: q,
          options: [],
          correctAnswer: "",
        })),
        createdAt: new Date(),
      });
      if (onQuizCreated) onQuizCreated();
      setTitle("");
      setQuestions([""]);
    } catch (err) {
      console.error("Error creating quiz:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Quiz Title:</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Quiz Questions:</label>
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
      <button type='submit'>Create Quiz</button>
    </form>
  );
};

export default QuizForm;
