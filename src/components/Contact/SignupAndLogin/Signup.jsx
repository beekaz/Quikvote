import React, { useState } from "react";
import "../../../styles/signup.css";
import { FaVoteYea } from 'react-icons/fa';
import welcomeImage from '../../../assets/images/illustration.png';
import { auth, db } from "../../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { errorAlert, successAlert } from "../../../utils";
import { Navigate } from "react-router-dom";
import { useIsMutating } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { message } from "antd";
import { FirebaseError } from "firebase/app";


const Signup = () => {

  const [isLoading, setIsLoading] = useState();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullname: "",
    phone: "",
  });

  const isLoadings = useIsMutating();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData, "Checking data")

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const userId = `user${Date.now()}`;

      const userData = {
        ...formData,
        id: userId,
      };

      await setDoc(doc(db, 'users', user.uid), userData).then(() => {
        // setIsSuccess(true);
        message.success('registration successful');
        Navigate('/login');
      });
    } catch (error) {
  
      let errorMessage = "An unexpected error occurred.";

			if (error instanceof FirebaseError) {
				errorMessage = error.message.replace(/^Firebase: /, "");
			} else if (
				typeof error === "object" &&
				error !== null &&
				"response" in error
			) {
				// Handle specific error types
			}
      
      message.error(errorMessage)
      // errorAlert('Error registering user');
      // setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className='signup-container'>
      {/* Left section: Image and Welcome Message */}
      <div className='welcome-section'>
        <div className='welcome-text'>
          <h2>Hi, Welcome!</h2>
          <p>Your voice matters! Join us and make your opinion count.</p>
          <img src={welcomeImage} alt='Welcome' className='welcome-image' />
        </div>
      </div>
      <div className=' reveal signup-card'>
        <h2>Create an Account</h2>
        <p>Fill in the details below to create a new account.</p>
        <form className='signup-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              name='fullname' // Add name attribute
              className='form-control'
              placeholder='Your Name'
              value={formData.fullname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              name='email' // Add name attribute
              className='form-control'
              placeholder='Your Email'
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='number'
              name='phone' // Add name attribute
              className='form-control'
              placeholder='Your Phone Number'
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password' // Add name attribute
              className='form-control'
              placeholder='Password'
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='confirmPassword' // Add name attribute
              className='form-control'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <LoadingButton
            loading={isLoadings > 0}
            // color="primary"
            // disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            id='signup-button'
          >
            Sign Up
          </LoadingButton>


          {/* s */}
        </form>
        <p className='login-redirect'>
          Already have an account?
          <a href='/login'>Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
