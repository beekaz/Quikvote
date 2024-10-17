// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const VotingInfo = () => {
//   const [showVoters, setShowVoters] = useState(false);
//   const [showAdmins, setShowAdmins] = useState(false);

//   const toggleVoters = () => setShowVoters(!showVoters);
//   const toggleAdmins = () => setShowAdmins(!showAdmins);

//   return (
//     <div className='container mt-5'>
//       <header className='text-center mb-4'>
//         <h1>Voting Information</h1>
//       </header>
//       <div className='text-center'>
//         <div className='mb-3'>
//           <button
//             className='btn btn-primary'
//             onClick={toggleVoters}
//             aria-expanded={showVoters}
//           >
//             {showVoters ? "Hide Voter Information" : "Show Voter Information"}
//           </button>
//           <div className={`collapse ${showVoters ? "show" : ""}`}>
//             <div className='card card-body mt-2'>
//               <h2>For Voters</h2>
//               <ol>
//                 <li>
//                   <strong>Request Mobile Voting</strong>
//                   <br />
//                   If your jurisdiction supports mobile voting, submit a request
//                   to your elections coordinator to receive your ballot on your
//                   smartphone.
//                 </li>
//                 <li>
//                   <strong>Download Voatz</strong>
//                   <br />
//                   Download the app on your device, create an account with your
//                   personal email, and choose a security PIN.
//                 </li>
//                 <li>
//                   <strong>Verify Your Identity</strong>
//                   <br />
//                   Complete the verification process, which will “pair” your
//                   identity to your phone’s biometrics or PIN. All personally
//                   identifiable information is then deleted.
//                 </li>
//               </ol>
//             </div>
//           </div>
//         </div>

//         <div>
//           <button
//             className='btn btn-primary'
//             onClick={toggleAdmins}
//             aria-expanded={showAdmins}
//           >
//             {showAdmins
//               ? "Hide Administrator Information"
//               : "Show Administrator Information"}
//           </button>
//           <div className={`collapse ${showAdmins ? "show" : ""}`}>
//             <div className='card card-body mt-2'>
//               <h2>For Election Administrators</h2>
//               <ol>
//                 <li>
//                   <strong>Set Up Mobile Voting</strong>
//                   <br />
//                   Ensure your jurisdiction supports mobile voting and set up the
//                   necessary infrastructure.
//                 </li>
//                 <li>
//                   <strong>Manage Voter Registration</strong>
//                   <br />
//                   Verify and manage voter registrations through your election
//                   management system.
//                 </li>
//                 <li>
//                   <strong>Conduct Voter Education</strong>
//                   <br />
//                   Provide resources and training for voters on how to use the
//                   mobile voting system.
//                 </li>
//               </ol>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VotingInfo;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../styles/votingInfo.css"; // Import custom CSS

// const VotingInfo = () => {
//   const [activeSection, setActiveSection] = useState(null);

//   const toggleSection = (section) => {
//     setActiveSection(activeSection === section ? null : section);
//   };

//   return (
//     <div className='container mt-5'>
//       <header className='text-center mb-4'>
//         <h1>Voting Information</h1>
//       </header>
//       <div className='row justify-content-center'>
//         <div
//           className={`col-sm-6 mb-3 card mx-2 ${
//             activeSection === "voters" ? "active" : "blur"
//           }`}
//         >
//           <button
//             className='btn btn-primary w-100'
//             onClick={() => toggleSection("voters")}
//             aria-expanded={activeSection === "voters"}
//           >
//             {activeSection === "voters"
//               ? "Hide Voter Information"
//               : "Show Voter Information"}
//           </button>
//           {activeSection === "voters" && (
//             <div className='card-body mt-2'>
//               <h2>For Voters</h2>
//               <ol>
//                 <li>
//                   <strong>Request Mobile Voting</strong>
//                   <br />
//                   Submit a request to your elections coordinator for a mobile
//                   ballot.
//                 </li>
//                 <li>
//                   <strong>Download Voatz</strong>
//                   <br />
//                   Create an account with your email and set a security PIN.
//                 </li>
//                 <li>
//                   <strong>Verify Your Identity</strong>
//                   <br />
//                   Complete the verification process using biometrics or PIN.
//                 </li>
//               </ol>
//             </div>
//           )}
//         </div>

//         <div
//           className={`col-sm-6 mb-3 card mx-2 ${
//             activeSection === "admins" ? "active" : "blur"
//           }`}
//         >
//           <button
//             className='btn btn-primary w-100'
//             onClick={() => toggleSection("admins")}
//             aria-expanded={activeSection === "admins"}
//           >
//             {activeSection === "admins"
//               ? "Hide Administrator Information"
//               : "Show Administrator Information"}
//           </button>
//           {activeSection === "admins" && (
//             <div className='card-body mt-2'>
//               <h2>For Election Administrators</h2>
//               <ol>
//                 <li>
//                   <strong>Set Up Mobile Voting</strong>
//                   <br />
//                   Ensure infrastructure for mobile voting.
//                 </li>
//                 <li>
//                   <strong>Manage Voter Registration</strong>
//                   <br />
//                   Verify and manage voter registrations.
//                 </li>
//                 <li>
//                   <strong>Conduct Voter Education</strong>
//                   <br />
//                   Provide resources and training for mobile voting.
//                 </li>
//               </ol>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VotingInfo;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/votingInfo.css";
const VotingInfo = () => {
  const [activeTab, setActiveTab] = useState("voters");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='container mt-5'>
      <header className='text-center mb-4'>
        <h1>HOW TO USE QUIKVOTE</h1>
      </header>

      <ul className=' nav nav-tabs justify-content-center mb-4'>
        <li className='nav-item'>
          <button
            className={`nav-link ${activeTab === "voters" ? "active" : ""}`}
            onClick={() => handleTabClick("voters")}
          >
            For Voters
          </button>
        </li>
        <li className='nav-item'>
          <button
            className={`nav-link ${activeTab === "admins" ? "active" : ""}`}
            onClick={() => handleTabClick("admins")}
          >
            For Election Administrators
          </button>
        </li>
      </ul>
      <div className='card-content'>
        <div className='tab-content'>
          {activeTab === "voters" && (
            <div className='tab-pane fade show active'>
              <h2>For Voters</h2>
              <ol className='voter-steps'>
                <li>
                  <div className='step-icon'>1</div>
                  <strong>Use QuikVote Link</strong>
                  <p>
                    Create an account with your mobile number and email and set
                    Password If you Dont Have One .
                  </p>
                </li>
                <li>
                  <div className='step-icon'>2</div>{" "}
                  <strong>Verify Your Identity</strong>
                  <p>
                    Complete the verification process using verification code.
                  </p>
                </li>
                <li>
                  <div className='step-icon'>3</div>{" "}
                  <strong>Cast Your Vote</strong>
                  <p>
                    Submit Your Vote then Wait till election is Over for Final
                    result.
                  </p>
                </li>
              </ol>
            </div>
          )}

          {activeTab === "admins" && (
            <div className='tab-pane fade show active'>
              <h2>For Election Administrators</h2>
              <ol className='voter-steps'>
                {" "}
                <li>
                  <div className='step-icon'>1</div>{" "}
                  <strong>Set Up Mobile Voting</strong>
                  <p>Ensure infrastructure for mobile voting is in place.</p>
                </li>
                <li>
                  <div className='step-icon'>2</div>{" "}
                  <strong>Manage Voter Registration</strong>
                  <p>Verify and manage voter registrations.</p>
                </li>
                <li>
                  <div className='step-icon'>3</div>{" "}
                  <strong>Conduct Voter Education</strong>
                  <p>Provide resources and training for mobile voting.</p>
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingInfo;
