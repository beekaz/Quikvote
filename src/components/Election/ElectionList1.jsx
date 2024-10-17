// // src/ElectionList.js
// import React, { useEffect, useState } from "react";
// import { db } from "../../Firebase/index";
// import { collection, getDocs, orderBy, query } from "firebase/firestore";

// const ElectionList = () => {
//   const [elections, setElections] = useState([]);

//   useEffect(() => {
//     const fetchElections = async () => {
//       const electionsCollection = query(
//         collection(db, "elections"),
//         orderBy("createdAt", "desc")
//       );
//       const electionSnapshot = await getDocs(electionsCollection);
//       const electionList = electionSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setElections(electionList);
//     };
//     fetchElections();
//   }, []);

//   return (
//     <div>
//       {elections.length > 0 ? (
//         elections.map((election) => (
//           <div key={election.id}>
//             <h3>{election.title}</h3>
//             <p>Start Date: {election.startDate}</p>
//             <p>End Date: {election.endDate}</p>
//             {election.candidates.map((cand, index) => (
//               <p key={index}>
//                 {cand.candidate} - {cand.votes} votes
//               </p>
//             ))}
//           </div>
//         ))
//       ) : (
//         <p>No elections available.</p>
//       )}
//     </div>
//   );
// };

// export default ElectionList;




// src/ElectionForm.js
import React, { useState } from 'react';
import { db } from '../../Firebase/index';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ElectionForm = () => {
    const [title, setTitle] = useState('');
    const [candidates, setCandidates] = useState([{ name: '', position: '' }]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCandidateChange = (index, field, value) => {
        const newCandidates = [...candidates];
        newCandidates[index][field] = value;
        setCandidates(newCandidates);
    };

    const addCandidate = () => {
        setCandidates([...candidates, { name: '', position: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        const filteredCandidates = candidates.filter(c => c.name.trim() !== '' && c.position.trim() !== '');
        if (filteredCandidates.length < 2) {
            setErrorMessage('Please provide at least two candidates with positions.');
            return;
        }

        if (!startDate || !endDate) {
            setErrorMessage('Please set both start and end dates.');
            return;
        }

        try {
            await addDoc(collection(db, 'elections'), {
                title,
                candidates: filteredCandidates.map(candidate => ({ 
                    name: candidate.name, 
                    position: candidate.position, 
                    votes: 0 
                })),
                startDate,
                endDate,
                createdAt: serverTimestamp(),
            });
            alert('Election created successfully!');
            setTitle('');
            setCandidates([{ name: '', position: '' }]);
            setStartDate('');
            setEndDate('');
        } catch (error) {
            console.error("Error creating election: ", error);
            setErrorMessage('Error creating election. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Election Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            {candidates.map((candidate, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder={`Candidate Name`}
                        value={candidate.name}
                        onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder={`Position`}
                        value={candidate.position}
                        onChange={(e) => handleCandidateChange(index, 'position', e.target.value)}
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={addCandidate}>Add Candidate</button>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
            />
            <button type="submit">Create Election</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    );
};

export default ElectionForm;