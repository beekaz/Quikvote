// import React, { useState } from "react";
// import Poll from "./Poll";

// const PollVote = () => {
//   const [pollData, setPollData] = useState(null);

//   // Example of how to set the poll data dynamically
//   const createPoll = () => {
//     const newPollData = {
//       question: "What's your favorite fruit?",
//       options: [
//         { id: 1, option: "Apple", votes: 0 },
//         { id: 2, option: "Banana", votes: 0 },
//         { id: 3, option: "Orange", votes: 0 },
//         { id: 4, option: "Grapes", votes: 0 },
//       ],
//     };
//     setPollData(newPollData);
//   };

//   return (
//     <div>
//       <button onClick={createPoll}>Create Poll</button>
//       {pollData && <Poll pollData={pollData} />}
//     </div>
//   );
// };

// export default PollVote



// src/App.js
import React from 'react';
import PollForm from './PollForm';
import PollList from './PollList';

const PollVote = () => {
    return (
        <div>
            <h1>Create a Poll</h1>
            <PollForm />
            <PollList />
        </div>
    );
};

export default PollVote;