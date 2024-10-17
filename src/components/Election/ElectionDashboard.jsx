import React from "react";
import CandidateDetails from "./CandidateDetail";

const ElectionDashboard = ({ candidates }) => {
  return (
    <div className='election-dashboard'>
      {candidates.map((candidate) => (
        <CandidateDetails key={candidate.id} candidate={candidate} />
      ))}
    </div>
  );
};

export default ElectionDashboard;
