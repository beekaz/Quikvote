import React from "react";

// const AboutSection = () => {
//   return (
//     <section id='about' className='about-section py-5 bg-light'>
//       <div className='container'>
//         <h2>About QuikVote</h2>
//         <p>QuikVote was created to solve the issues of traditional voting...</p>
//         <p>
//           Connect with our team members on
//           <a href='https//www.linkedIn.com'>LinkedIn</a>
//           <a href='https://github.com/beekaz'>GitHub</a>
//           <a href='https://github.com/beekaz'>Twitter</a>
//         </p>
//       </div>
//     </section>
//   );
// };


// AboutSection Component
const AboutSection = () => {
  return (
    <section id="about" className="about">
      <h2>About the Election</h2>
      <div className="about-cards">
        <div className="card">
          <h3>Importance of Voting</h3>
          <p>Your vote is your voice. Make it count!</p>
        </div>
        <div className="card">
          <h3>Candidate Profiles</h3>
          <p>Learn about the candidates running for office.</p>
        </div>
        <div className="card">
          <h3>Voting Process</h3>
          <p>Understand how to vote and what to expect.</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
