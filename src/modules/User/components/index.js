import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Button, FormControl, InputLabel } from '@material-ui/core';

function Vote({ position, user }) {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  // useEffect(() => {
  //   // Fetch the list of candidates from your database
  //   // This is a placeholder and should be replaced with your actual fetch function
  //   fetchCandidates(position).then(setCandidates);

  //   // Check if the user has already voted for this position
  //   // This is a placeholder and should be replaced with your actual fetch function
  //   fetchUserVote(user, position).then(setHasVoted);
  // }, [position, user]);

  // const handleVote = () => {
  //   // Send a request to your backend to store the vote
  //   // This is a placeholder and should be replaced with your actual fetch function
  //   castVote(user, selectedCandidate, position).then(() => {
  //     setHasVoted(true);
  //   });
  // };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="candidate-label">Candidate</InputLabel>
        <Select
          labelId="candidate-label"
          id="candidate-select"
          value={selectedCandidate}
          onChange={(e) => setSelectedCandidate(e.target.value)}
          disabled={hasVoted}
        >
          {candidates.map((candidate) => (
            <MenuItem key={candidate.id} value={candidate.id}>
              {candidate.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <Button onClick={handleVote} disabled={hasVoted}>
        Vote
      </Button> */}
      {hasVoted && <p>You have already voted for this position.</p>}
    </div>
  );
}

export default Vote;
