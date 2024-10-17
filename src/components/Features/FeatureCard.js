import React from "react";
import "../../styles/featurecard.css";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className='card'>
      <div className='icon'>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
