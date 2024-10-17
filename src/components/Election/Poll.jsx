// import React, { useState } from "react";
// import "./poll.css";

// const Poll = ({ pollData }) => {
//   const [pollOptions, setPollOptions] = useState(pollData.options);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);

//   // Handle option selection
//   const handleOptionChange = (event) => {
//     setSelectedOption(parseInt(event.target.value));
//   };

//   // Handle vote submission
//   const handleVoteSubmit = (event) => {
//     event.preventDefault();
//     if (selectedOption !== null) {
//       const updatedOptions = pollOptions.map((option) => {
//         if (option.id === selectedOption) {
//           return { ...option, votes: option.votes + 1 };
//         }
//         return option;
//       });
//       setPollOptions(updatedOptions);
//       setHasVoted(true);
//     } else {
//       alert("Please select an option before voting.");
//     }
//   };

//   // Calculate the total votes
//   const totalVotes = pollOptions.reduce(
//     (total, option) => total + option.votes,
//     0
//   );

//   // Get the highest voted option
//   const highestVote = Math.max(...pollOptions.map((option) => option.votes));
//   const highestOption = pollOptions.find(
//     (option) => option.votes === highestVote
//   );

//   return (
//     <div className='poll-container'>
//       <h2>{pollData.question}</h2>

//       {!hasVoted ? (
//         <form onSubmit={handleVoteSubmit}>
//           {pollOptions.map((option) => (
//             <div key={option.id} className='poll-option'>
//               <label>
//                 <input
//                   type='radio'
//                   name='poll'
//                   value={option.id}
//                   onChange={handleOptionChange}
//                 />
//                 {option.option}
//               </label>
//             </div>
//           ))}
//           <button type='submit' className='btn btn-primary'>
//             Vote
//           </button>
//         </form>
//       ) : (
//         <div className='poll-results'>
//           <h3>Poll Results</h3>
//           <p>
//             Highest Voted:{" "}
//             <strong>{highestOption?.option || "No votes yet"}</strong>
//           </p>
//           {pollOptions.map((option) => (
//             <div key={option.id} className='poll-result'>
//               <span>{option.option}: </span>
//               <span>{option.votes} vote(s)</span>
//               {totalVotes > 0 && (
//                 <div className='progress-bar'>
//                   <div
//                     className='progress'
//                     style={{ width: `${(option.votes / totalVotes) * 100}%` }}
//                   ></div>
//                   <span>{((option.votes / totalVotes) * 100).toFixed(2)}%</span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Poll;

import React, { useState, useEffect } from "react";
import "./poll.css";

const Poll = ({ pollData }) => {
  const [pollOptions, setPollOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (pollData && pollData.options) {
      setPollOptions(pollData.options);
    }
  }, [pollData]);

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };

  const handleVoteSubmit = (event) => {
    event.preventDefault();
    if (selectedOption !== null) {
      const updatedOptions = pollOptions.map((option) => {
        if (option.id === selectedOption) {
          return { ...option, votes: option.votes + 1 };
        }
        return option;
      });
      setPollOptions(updatedOptions);
      setHasVoted(true);
    } else {
      alert("Please select an option before voting.");
    }
  };

  const totalVotes = pollOptions.reduce(
    (total, option) => total + option.votes,
    0
  );

  const highestVote = Math.max(...pollOptions.map((option) => option.votes));
  const highestOption = pollOptions.find(
    (option) => option.votes === highestVote
  );

  return (
    <div className='poll-container'>
      <h2>{pollData?.question || "No question available"}</h2>

      {!hasVoted ? (
        <form onSubmit={handleVoteSubmit}>
          {pollOptions.length > 0 ? (
            pollOptions.map((option) => (
              <div key={option.id} className='poll-option'>
                <label>
                  <input
                    type='radio'
                    name='poll'
                    value={option.id}
                    onChange={handleOptionChange}
                  />
                  {option.option}
                </label>
              </div>
            ))
          ) : (
            <p>No options available for this poll.</p>
          )}
          <button type='submit' className='btn btn-primary'>
            Vote
          </button>
        </form>
      ) : (
        <div className='poll-results'>
          <h3>Poll Results</h3>
          <p>
            Highest Voted:{" "}
            <strong>{highestOption?.option || "No votes yet"}</strong>
          </p>
          {pollOptions.map((option) => (
            <div key={option.id} className='poll-result'>
              <span>{option.option}: </span>
              <span>{option.votes} vote(s)</span>
              {totalVotes > 0 && (
                <div className='progress-bar'>
                  <div
                    className='progress'
                    style={{ width: `${(option.votes / totalVotes) * 100}%` }}
                  ></div>
                  <span>{((option.votes / totalVotes) * 100).toFixed(2)}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Poll;
