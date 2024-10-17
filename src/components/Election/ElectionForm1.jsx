import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ElectionForm = () => {
  const [title, setTitle] = useState("");
  const [candidates, setCandidates] = useState(["", ""]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCandidateChange = (index, value) => {
    const newCandidates = [...candidates];
    newCandidates[index] = value;
    setCandidates(newCandidates);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    // Validate that there are at least two candidates and start/end dates
    const filteredCandidates = candidates.filter((cand) => cand.trim() !== "");
    if (filteredCandidates.length < 2) {
      setErrorMessage("Please provide at least two candidates.");
      return;
    }

    if (!startDate || !endDate) {
      setErrorMessage("Please set both start and end dates.");
      return;
    }

    try {
      await addDoc(collection(db, "elections"), {
        title,
        candidates: filteredCandidates.map((candidate) => ({
          candidate,
          votes: 0,
        })),
        startDate,
        endDate,
        createdAt: serverTimestamp(),
      });
      alert("Election created successfully!");
      setTitle("");
      setCandidates(["", ""]);
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Error creating election: ", error);
      setErrorMessage("Error creating election. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Election Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {candidates.map((candidate, index) => (
        <input
          key={index}
          type='text'
          placeholder={`Candidate ${index + 1}`}
          value={candidate}
          onChange={(e) => handleCandidateChange(index, e.target.value)}
          required
        />
      ))}
      <button type='button' onClick={() => setCandidates([...candidates, ""])}>
        Add Candidate
      </button>
      <input
        type='date'
        placeholder='Start Date'
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type='date'
        placeholder='End Date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <button type='submit'>Create Election</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
    </form>
  );
};

export default ElectionForm;
