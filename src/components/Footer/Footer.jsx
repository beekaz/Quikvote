import React from "react";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className='footer-section'>
      <div className='footer-bottom'>
        <p>&copy; 2024 QuikVote. All Rights Reserved.</p>
        <p>
          <a href='/terms'>Terms of Service</a> |{" "}
          <a href='/privacy'>Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
