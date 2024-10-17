import React, { useState } from "react";
import { db } from "../../Firebase/index";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../../styles/poll.css";

const PollForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "polls"), {
        question,
        options: options.map((option) => ({ option, votes: 0 })),
        createdAt: serverTimestamp(),
      });
      alert("Poll created successfully!");
      setQuestion("");
      setOptions(["", "", "", ""]);
    } catch (error) {
      console.error("Error creating poll: ", error);
      alert("Error creating poll.");
    }
  };

  return (
    <div className='poll-form-container'>
      <h2 className='text-center'>Create a Poll</h2>
      <form onSubmit={handleSubmit} className='poll-form'>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Poll Question'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        {options.map((option, index) => (
          <div className='form-group' key={index}>
            <input
              type='text'
              className='form-control'
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required={index < 2} // Make the first two options required
            />
          </div>
        ))}
        <button type='submit' className='btn btn-primary btn-block'>
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default PollForm;
