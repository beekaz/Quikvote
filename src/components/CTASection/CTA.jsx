import React from "react";
import "../../styles/cta.css";

const CTASection = () => {
  return (
    <section className='cta py-5 text-center'>
      <div className='container'>
        <h2>Create Your first election</h2>
        <p>
          Don't believe us?
          <span> See for Yourself. </span>
        </p>
        <a href='/register' className='cta-button btn btn-primary'>
          Sign Up Now 
        </a>
      </div>
    </section>
  );
};

export default CTASection;