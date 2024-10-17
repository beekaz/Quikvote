import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import "../../styles/manageElection.css";

const ManageElection = () => {
  const navigate = useNavigate();
  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      delay: 300,
      distance: "50px",
      duration: 800,
      easing: "ease-out",
      origin: "right",
      reset: true,
    });
  }, []);
  return (
    <div className='manage-activities'>
      <h1>Manage Activities</h1>
      <div className='reveal card-container'>
        <div className='card' onClick={() => navigate("/manage-polls")}>
          <h2>Manage Polls</h2>
          <p>View and manage all polls.</p>
        </div>
        <div className='card' onClick={() => navigate("/manage-surveys")}>
          <h2>Manage Surveys</h2>
          <p>View and manage all surveys.</p>
        </div>
        <div className='card' onClick={() => navigate("/manage-quizzes")}>
          <h2>Manage Quizzes</h2>
          <p>View and manage all quizzes.</p>
        </div>
        <div className='card' onClick={() => navigate("/manage-elections")}>
          <h2>Manage Elections</h2>
          <p>View and manage all elections.</p>
        </div>
      </div>
    </div>
  );
};

export default ManageElection;
