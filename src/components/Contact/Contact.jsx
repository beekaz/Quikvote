import React from "react";
import "./contact.css";

const ContactSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // Add your form submission logic here
    console.log("Form submitted");
  };

  return (
    <section className='contact py-5'>
      <div className='container text-center'>
        <h2>Get In Touch</h2>
        <p>If you have any questions, feel free to reach out!</p>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Your Name'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              placeholder='Your Email'
              required
            />
          </div>
          <div className='form-group'>
            <textarea
              className='form-control'
              placeholder='Your Message'
              rows='4'
              required
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary'>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
