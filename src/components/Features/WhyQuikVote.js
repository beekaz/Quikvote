import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faLock,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import ScrollReveal from "scrollreveal";
import "../../styles/chooseQuikVote.css";

const WhyChooseQuikVote = () => {
  useEffect(() => {
    ScrollReveal().reveal(".feature-card", {
      delay: 200,
      distance: "50px",
      duration: 800,
      easing: "ease-out",
      origin: "bottom",
      reset: true,
    });
  }, []);
  return (
    <section id='why-choose' className='text-center my-5'>
      <h2 className='mb-4'>Why Use QuikVote</h2>
      <div className='row'>
        {features.map((feature, index) => (
          <div className='col-md-6 mb-4' key={index}>
            <div className='feature-card p-4'>
              <div className='feature-icon'>
                <FontAwesomeIcon
                  icon={feature.icon}
                  size='2x'
                  className='text-primary'
                />
              </div>
              <h5>{feature.title}</h5>
              <p>
                {feature.description}{" "}
                <a href={feature.link} className='learn-more'>
                  learn more
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const features = [
  {
    title: "Easy and convenient",
    description: "Voters choose where and when they vote",
    link: "#",
    icon: faClock,
  },
  {
    title: "Anonymous and secure",
    description: "Voters vote using secret ballots with verifiable results",
    link: "#",
    icon: faLock,
  },
  {
    title: "Reach voters easily",
    description: "Notify voters by email, text message, and mail",
    link: "#",
    icon: faEnvelope,
  },
  {
    title: "Speedy results",
    description: "Share reports with statistics and graphs when voting ends",
    link: "#",
    icon: faCheckCircle,
  },
];

export default WhyChooseQuikVote;
