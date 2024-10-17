import React, { useEffect } from "react";
import "../../styles//targetAudience.css";
import ScrollReveal from "scrollreveal";

const TargetAudience = () => {
  useEffect(() => {
    ScrollReveal().reveal(".reveal", {
      delay: 200,
      distance: "50px",
      duration: 800,
      easing: "ease-out",
      origin: "buttom",
      reset: true,
    });
  }, []);
  return (
    <section id='target-container' className='text-center my-5'>
      <h2 className='mb-4'>QuikVote Serves</h2>
      <p className=' reveal mb-5'>
        A variety of organizations and groups that require effective and
        streamlined voting solutions.
      </p>
      <div className=' reveal row'>
        {audiences.map((audience, index) => (
          <div className='col-12 col-md-6 col-lg-4 mb-4' key={index}>
            <div className='card audience-card mb-4 h-100'>
              <div className='card-body d-flex flex-column'>
                <h5 className='card-title'>{audience.title}</h5>
                <p className='card-text flex-grow-1'>{audience.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Audience data
const audiences = [
  {
    title: "Professional Associations",
    description:
      "Facilitating voting processes for members and leadership elections.",
  },
  {
    title: "Unions",
    description: "Empowering union members with a transparent voting process.",
  },
  {
    title: "Political Parties",
    description: "Streamlining internal voting and decision-making.",
  },
  {
    title: "NGOs, Societies or Clubs",
    description: "Helping organizations conduct votes for various purposes.",
  },
  {
    title: "Colleges and Universities",
    description:
      "Assisting with student government elections and campus decisions.",
  },
  {
    title: "Homeowners' Associations",
    description: "Managing community voting and decision-making.",
  },
  {
    title: "Churches and Religious Groups",
    description: "Facilitating congregation voting for church matters.",
  },
  {
    title: "Clubs and decision Making",
    description:
      "Assist club decisions and member elections through Polls, Elections, Surveys, and Quizzes.",
  },
  {
    title: "Cooperatives and Credit Unions",
    description: "Helping cooperatives manage voting for member participation.",
  },
];

export default TargetAudience;
