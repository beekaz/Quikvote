import React from "react";
import "../../../styles/signup.css";
import { FaVoteYea } from 'react-icons/fa';
import welcomeImage from '../../../assets/images/illustration.png';
// const Signup = () => {
//   return (
//     <div className='auth-container'>
//       <h2>Sign Up</h2>
//       <form>
//         <div className='form-group'>
//           <input
//             type='text'
//             className='form-control'
//             placeholder='Full Name'
//             required
//           />
//         </div>
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
//           Sign Up
//         </button>
//         <p className='text-center'>
//           Already have an account? <a href='/login'>Login</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;



// const Signup = () => {
//   return (
//     <div className='signup-container'>
//       <div className='signup-card'>
//         <h2>Create an Account</h2>
//         <p>Fill in the details below to create a new account.</p>
//         <form className='signup-form'>
//           <div className='form-group'>
//             <input
//               type='text'
//               className='form-control'
//               placeholder='Your Name'
//               required
//             />
//           </div>
//           <div className='form-group'>
//             <input
//               type='email'
//               className='form-control'
//               placeholder='Your Email'
//               required
//             />
//           </div>
//           <div className='form-group'>
//             <input
//               type='password'
//               className='form-control'
//               placeholder='Password'
//               required
//             />
//           </div>
//           <div className='form-group'>
//             <input
//               type='password'
//               className='form-control'
//               placeholder='Confirm Password'
//               required
//             />
//           </div>
//           <button type='submit' className='btn btn-primary'>
//             Sign Up
//           </button>
//         </form>
//         <p className='login-redirect'>
//           Already have an account? <a href='/login'>Login here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


const Signup = () => {
 
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
        <form className='signup-form'>
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
            <input
              type='number'
              className='form-control'
              placeholder='Your Phone Number'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              placeholder='Confirm Password'
              required
            />
          </div>
          <button type='submit' id='signup-button' className='btn btn-primary'>
            Sign Up
          </button>
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
