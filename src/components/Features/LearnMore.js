import React from "react";
import "../../styles/learnmore.css";

const LearnMore = () => {
  return (
    <section id='learn-more' className='text-center my-5'>
      <h2 className='mb-4'>Learn More</h2>
      <div className='video-container mb-5'>
        {/* I tried this it didnt work */}

        {/* <iframe
          width='560'
          height='315'
          src='https://youtube.com/shorts/PJnIbnBHiEQ?si=DKVOR9eHvMifpt8y'
          title='Learn about QuikVote'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        /> */}
      </div>
      <h3 className='mb-4'>Elections, Simplified</h3>
      <p className='mb-5'>
        QuikVote makes voting easier and more secure than ever before. Here’s
        how you can experience voting on the go!
      </p>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 mb-4'>
            <img
              src='/path/to/desktop-image.png'
              alt='Desktop Dashboard'
              className='img-fluid'
            />
            <h5 className='mt-2'>Administrator Dashboard</h5>
          </div>
          <div className='col-md-4 mb-4'>
            <img
              src='/path/to/mobile-image.png'
              alt='Mobile Voting'
              className='img-fluid'
            />
            <h5 className='mt-2'>Mobile Voting</h5>
          </div>
          <div className='col-md-4 mb-4'>
            <img
              src='/path/to/voter-portal-image.png'
              alt='Voter Portal'
              className='img-fluid'
            />
            <h5 className='mt-2'>Voter Access Portal</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;

/* <p>
        QuikVote provides a seamless voting experience with a user-friendly
        interface that ensures every voter can participate with ease. From
        personalized notifications to instant results, QuikVote takes the stress
        out of the voting process.
      </p> */

// Steps data
// const steps = [
//   {
//     title: "Register Your Account",
//     description: "Create your account using your email or phone number.",
//   },
//   {
//     title: "Log In",
//     description: "Access your dashboard with your credentials.",
//   },
//   {
//     title: "Cast Your Vote",
//     description: "Choose your preferred options and submit your vote.",
//   },
//   {
//     title: "View Results",
//     description:
//       "Check the results once voting ends and see real-time updates.",
//   },
// ];
