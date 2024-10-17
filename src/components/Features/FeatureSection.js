// Features.js
import React from "react";
import FeatureCard from "./FeatureCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faMobileAlt,
  faEnvelope,
  faChartBar,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import featureData from "../../models/features.json";
import "../../styles/feature.css";

const iconMapping = {
  faUserCheck: <FontAwesomeIcon icon={faUserCheck} />,
  faMobileAlt: <FontAwesomeIcon icon={faMobileAlt} />,
  faEnvelope: <FontAwesomeIcon icon={faEnvelope} />,
  faChartBar: <FontAwesomeIcon icon={faChartBar} />,
  faHeadset: <FontAwesomeIcon icon={faHeadset} />,
};

const Features = () => {
  return (
    <section className='features py-5'>
      <div className='container text-center'>
        <h2>Key Features</h2>
        <p>
          Discover the powerful tools and capabilities we offer to make your
          voting experience seamless and efficient.
        </p>
        <div className='row'>
          {featureData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={iconMapping[feature.icon]}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
