import React from "react";
// import heroImg from "../../assets/images/image.png";
import '../../styles/navbar.css';
import "../../styles/hero.css"
import CreateElectionDropdown from "../Election/CreateElection";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons'; 



const HeroSection = () => {
  return (
    <section className=' hero hero-section  py-5'>
      <div className='container d-flex align-items-center'>
        <div className='col-md-6 slide-in'>
          <h1 className='ml-auto'>
            Welcome to <span>QuikVote</span>
          </h1>
          <p>Transforming Opinions into Action, One Click at a Time!</p>
          <p>
            Vote anytime, anywhere using your mobile device And Get Instant
            Results after voting closes.
          </p>
          <div>
            <CreateElectionDropdown />
          </div>
        </div>
        {/* <div className='col-md-6'>
          <img src={heroImg} alt='Young Man' className='img-fluid' />
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
