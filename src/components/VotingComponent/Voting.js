import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/index";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const VotingComponent = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const electionsCollection = collection(db, "elections");
        const electionSnapshot = await getDocs(electionsCollection);
        const electionList = electionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setElections(electionList);
      } catch (error) {
        console.error("Error fetching elections: ", error);
        setErrorMessage("Error fetching elections. Please try again.");
      }
    };
    fetchElections();
  }, []);

  const handleVote = async (candidateId) => {
    if (!selectedElection) return;

    const updatedCandidates = selectedElection.candidates.map((candidate) =>
      candidate.id === candidateId
        ? { ...candidate, votes: candidate.votes + 1 }
        : candidate
    );

    const electionRef = doc(db, "elections", selectedElection.id);

    try {
      await updateDoc(electionRef, {
        candidates: updatedCandidates,
      });
      alert("Vote recorded successfully!");
    } catch (error) {
      console.error("Error voting: ", error);
      setErrorMessage("Error recording vote. Please try again.");
    }
  };

  return (
    <div>
      <h2>Vote for Candidates</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <select
        onChange={(e) =>
          setSelectedElection(elections.find((e) => e.id === e.target.value))
        }
      >
        <option value=''>Select an Election</option>
        {elections.map((election) => (
          <option key={election.id} value={election.id}>
            {election.title}
          </option>
        ))}
      </select>
      {selectedElection && (
        <div>
          <h3>{selectedElection.title}</h3>
          {selectedElection.candidates.map((candidate, index) => (
            <div key={index}>
              <span>
                {candidate.name} ({candidate.position})
              </span>
              <button onClick={() => handleVote(candidate.id)}>Vote</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VotingComponent;
