// src/components/CandidateDetails.js
import React from "react";
import "../../styles/candidateDetails.css";

const CandidateDetails = ({ candidate }) => {
  return (
    <div className='candidate-card'>
      {candidate.photo ? (
        <img
          src={candidate.photo}
          alt={`${candidate.fullName}`}
          className='candidate-photo'
        />
      ) : (
        <p>No photo available</p>
      )}

      <h2>{candidate.fullName}</h2>
      <p>
        <strong>Age:</strong> {candidate.age}
      </p>
      <p>
        <strong>Biography:</strong> {candidate.biography}
      </p>
      <p>
        <strong>Campaign Slogan:</strong> {candidate.campaignSlogan}
      </p>
      <div className='contact-info'>
        <p>
          <strong>Email:</strong> {candidate.contactInformation.email}
        </p>
        <p>
          <strong>Twitter:</strong> {candidate.contactInformation.twitter}
        </p>
        <p>
          <strong>Website:</strong> {candidate.contactInformation.website}
        </p>
      </div>
      <p>
        <strong>Education:</strong> {candidate.education}
      </p>
      <p>
        <strong>Location:</strong> {candidate.location}
      </p>
      <p>
        <strong>Party Affiliation:</strong> {candidate.partyAffiliation}
      </p>
      <h3>Policies</h3>
      <ul>
        {candidate.policies.map((policy, index) => (
          <li key={index}>{policy}</li>
        ))}
      </ul>
      <button onClick={() => alert("Voted for " + candidate.fullName)}>
        Vote
      </button>
    </div>
  );
};

export default CandidateDetails;
