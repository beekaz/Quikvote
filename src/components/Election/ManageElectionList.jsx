import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import "../../styles/manageElection.css";
import ElectionList from "./ElectionList";
import VotingComponent from "../VotingComponent/Voting";
import { db } from "../../Firebase/index";

const ManageElectionsList = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchElections = async () => {
      setLoading(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchElections();
  }, []);
  if (loading) {
    return <p>Loading elections...</p>;
  }

  return (
    <div className='container mt-4'>
      <h2>Manage Elections</h2>
      <div className='card-deck'>
        <div className='card text-center'>
          <div className='card-body'>
            <h5 className='card-title'>View Election Results</h5>
            <p className='card-text'>
              Check how the election is progressing and view the results.
            </p>
            {loading ? (
              <p>Loading elections...</p>
            ) : (
              <ElectionList elections={elections} />
            )}
            <Link to='/election-results' className='btn btn-primary'>
              View Results
            </Link>
          </div>
        </div>

        <div className='card text-center'>
          <div className='card-body'>
            <h5 className='card-title'>Edit Election / View Candidates</h5>
            <p className='card-text'>
              Edit election details or view the list of candidates and their
              details.
            </p>
            <Link to='/edit-election' className='btn btn-secondary'>
              Edit Election
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageElectionsList;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../../styles/manageElection.css";
// import CandidateDetails from "./CandidateDetail";
// import getElections  from "../../services/electionService";
// import ElectionList from "./ElectionList";
// import VotingComponent from "../VotingComponent/Voting";

// const ManageElectionsList = () => {
//   // const [elections, setElections] = useState([]);

//   // useEffect(() => {
//   //   const fetchElections = async () => {
//   //     try {
//   //       const data = await getElections();
//   //       setElections(data);
//   //     } catch (error) {
//   //       console.error("Failed to fetch elections", error);
//   //     }
//   //   };

//   //   fetchElections();
//   // }, []);

//    const [elections, setElections] = useState([]);

//    useEffect(() => {
//      const fetchElections = async () => {
//        try {
//          const electionsCollection = collection(db, "elections");
//          const electionSnapshot = await getDocs(electionsCollection);
//          const electionList = electionSnapshot.docs.map((doc) => ({
//            id: doc.id,
//            ...doc.data(),
//          }));
//          setElections(electionList);
//        } catch (error) {
//          console.error("Error fetching elections: ", error);
//        }
//      };
//      fetchElections();
//    }, []);
//   return (
//     <div className='container mt-4'>
//       <h2>Manage Elections</h2>
//       <div className='card-deck'>
//         <div className='card text-center'>
//           <div className='card-body'>
//             <h5 className='card-title'>View Election Results</h5>
//             <p className='card-text'>
//               Check how the election is progressing and view the results.
//             </p>
//             <ElectionList elections={elections} />
//             <Link to='/election-results' className='btn btn-primary'>
//               {/* <CandidateDetails candidate={someCandidateObject} />  */}
//               View Results
//             </Link>
//           </div>
//         </div>

//         <div className='card text-center'>
//           <div className='card-body'>
//             <h5 className='card-title'>Edit Election / View Candidates</h5>
//             <p className='card-text'>
//               Edit election details or view the list of candidates and their
//               details.
//             </p>
//             <Link to='/edit-election' className='btn btn-secondary'>
//               <VotingComponent />
//               Edit Election
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Optional: List of elections fetched from Firestore */}
//       {/* <div className='mt-4'>
//         <h3>Current Elections</h3>
//         <ul className='list-group'>
//           {elections.map((election) => (
//             <li key={election.id} className='list-group-item'>
//               <h5>{election.fullName}</h5>
//               <p>Position: {election.position}</p>
//               <p>Party: {election.partyAffiliation}</p>
//               <Link
//                 to={`/edit-election/${election.id}`}
//                 className='btn btn-info'
//               >
//                 Edit
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div> */}
//     </div>
//   );
// };

// export default ManageElectionsList;

// import React from "react";
// import { Link } from "react-router-dom";
// import "../../styles/manageElectionlist";
// import CandidateDetails from "./CandidateDetail";

// const ManageElectionList = () => {
//   return (
//     <div className='container mt-4'>
//       <h2>Manage Election</h2>
//       <div className='card-deck'>
//         <div className='card text-center'>
//           <div className='card-body'>
//             <h5 className='card-title'>View Election Results</h5>
//             <p className='card-text'>
//               Check how the election is progressing and view the results.
//             </p>
//             <Link to='/election-results' className='btn btn-primary'>
//               <CandidateDetails/> View Results
//             </Link>
//           </div>
//         </div>

//         <div className='card text-center'>
//           <div className='card-body'>
//             <h5 className='card-title'>Edit Election / View Candidates</h5>
//             <p className='card-text'>
//               Edit election details or view the list of candidates and their
//               details.
//             </p>
//             <Link to='/edit-election' className='btn btn-secondary'>
//               Edit Election
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageElectionList;
//
