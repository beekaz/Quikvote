import React, { useState } from "react";
import CreateElectionForm from "./ElectionForm";
import ElectionDashboard from "./ElectionDashboard";
import ElectionList from "./ElectionList";

const ElectionPage = () => {
  const [candidates, setCandidates] = useState([]);

  const handleCreateElection = (newCandidate) => {
    setCandidates([
      ...candidates,
      { ...newCandidate, id: `candidate_${Date.now()}` },
    ]);
  };

  return (
    <div>
      <h1>Create Election</h1>
      {/* <CreateElectionForm onSubmit={handleCreateElection} /> */}
      <ElectionList onSubmit={handleCreateElection} />

      <ElectionDashboard candidates={candidates} />
    </div>
  );
};

export default ElectionPage;
