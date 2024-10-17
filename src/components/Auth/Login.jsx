// import React, { useState } from "react";
// import { auth } from "../../../Firebase/Firebase"; // Adjust the import path
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = us// import React, { useState } from "react";
// import { auth } from "../../../Firebase/Firebase"; // Adjust the import path
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Hook to handle navigation

//   const handleSignIn = async (event) => {
//     event.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/dashboard"); // Navigate to the dashboard or desired route after sign-in
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className='auth-container'>
//       <h2>Login</h2>
//       <p>
//         {" "}
//         Dont haver an account?
//         <span>
//           {" "}
//           <a href='/'> Get Started </a>
//         </span>
//       </p>
//       <form>
//         <div className='form-group'>
//           <input
//             type='email'
//             className='form-control'
//             placeholder='Email'
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <input
//             type='password'
//             className='form-control'
//             placeholder='Password'
//             required
//           />
//         </div>
//         <button type='submit' className='btn btn-primary'>
//           Login
//         </button>
//         <p className='text-center'>
//           Don't have an account? <a href='/signup'>Sign Up</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;eState("");
//   const navigate = useNavigate(); // Hook to handle navigation

//   const handleSignIn = async (event) => {
//     event.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/dashboard"); // Navigate to the dashboard or desired route after sign-in
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className='auth-container'>
//       <h2>Login</h2>
//       <p>
//         {" "}
//         Dont haver an account?
//         <span>
//           {" "}
//           <a href='/'> Get Started </a>
//         </span>
//       </p>
//       <form>
//         <div className='form-group'>
//           <input
//             type='email'
//             className='form-control'
//             placeholder='Email'
//             required
//           />
//         </div>
//         <div className='form-group'>
//           <input
//             type='password'
//             className='form-control'
//             placeholder='Password'
//             required
//           />
//         </div>
//         <button type='submit' className='btn btn-primary'>
//           Login
//         </button>
//         <p className='text-center'>
//           Don't have an account? <a href='/signup'>Sign Up</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { auth } from "../../../Firebase/index"; // Adjust the import path
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../../../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to handle navigation

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Navigate to the dashboard or desired route after sign-in
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='auth-container'>
      <h2>Login</h2>
      <p>
        Don't have an account?{" "}
        <span>
          <a href='/signup'> Get Started </a>
        </span>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      <form onSubmit={handleSignIn}>
        {" "}
        {/* Ensure form submission is handled */}
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            placeholder='Email'
            value={email} // Bind to state
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder='Password'
            value={password} // Bind to state
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            required
          />
        </div>
        <button
          type='submit'
          id='login-button'
          className='  btn btn-primary'
        >
          Login
        </button>
        <p className='text-center'>
          Don't have an account? <a href='/signup'>Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
