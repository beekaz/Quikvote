

import React, { useState } from "react";
import { auth } from "../../../Firebase/index"; // Adjust the import path
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../../styles/signup.css";
import welcomeImage from '../../../assets/images/illustration.png';
import { setLoginToken, setStoredUser } from "../../../Storage";
import { errorAlert, successAlert } from "../../../utils";
import { FirebaseError } from "firebase/app";
import { message } from "antd";
import { LoadingButton } from "@mui/lab";
import { useIsMutating } from "@tanstack/react-query";


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to handle navigation
  const isLoadings = useIsMutating();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      if (user) {
        const token = await user.getIdToken();
        setLoginToken(token);

        // Check if user role is set and navigate accordingly
        if (user.role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }

        message.success("Logged in successfully");
        setStoredUser(user);
      }

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
      // setIsSuccess(false);
    } finally {
      // setIsLoading(false);
    }
  };



  // const handleSignIn = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     navigate("/dashboard"); // Navigate to the dashboard or desired route after sign-in
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <div className='signup-container'>
      {/* Left section: Image and Welcome Message */}
      <div className='welcome-section'>
        <div className='welcome-text'>
          <h2>Hi, Welcome!</h2>
          <p>Login to proceed from here</p>
          <img src={welcomeImage} alt='Welcome' className='welcome-image' />
        </div>
      </div>
      <div className=' reveal signup-card'>
        <h2>Login</h2>
        <p>Provide your login credentials</p>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Display error message */}
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Ensure form submission is handled */}
          <div className='form-group'>
            <input
              name="email"
              type='email'
              className='form-control'
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              name="password"
              type='password'
              className='form-control'
              placeholder='Password'
              value={formData.password}
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
            Login
          </LoadingButton>



          {/* <button
            type='submit'
            id='login-button'
            className='  btn btn-primary'
          >
            Login
          </button> */}
          <p className='text-center'>
            Don't have an account? <a href='/signup'>Sign Up</a>
          </p>
        </form>
      </div>

    </div>
    // </div>
  );
};


export default Login;
