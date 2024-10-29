// src/modules/Election/CreateElectionPage.js
import React from "react";
import CreateElectionForm from "../../components/Election/ElectionForm";
import { saveElection } from "../../services/electionService";

const CreateElectionPage = () => {
  const handleFormSubmit = async (formData) => {
    await saveElection(formData);
    // Optionally handle post-submission actions, e.g., reset the form or show a success message
    console.log("Election created:", formData);
  };

  return (
    <div>
      <CreateElectionForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default CreateElectionPage;
