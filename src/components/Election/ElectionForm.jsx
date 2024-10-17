import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateElectionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    biography: "",
    campaignSlogan: "",
    contactInformation: {
      email: "",
      twitter: "",
      website: "",
    },
    education: "",
    location: "",
    partyAffiliation: "",
    photo: "",
    policies: [],
    position: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contactInformation")) {
      setFormData({
        ...formData,
        contactInformation: {
          ...formData.contactInformation,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePolicyChange = (index, value) => {
    const newPolicies = [...formData.policies];
    newPolicies[index] = value;
    setFormData({ ...formData, policies: newPolicies });
  };

  const addPolicy = () => {
    setFormData({ ...formData, policies: [...formData.policies, ""] });
  };

  const removePolicy = (index) => {
    const newPolicies = formData.policies.filter((_, i) => i !== index);
    setFormData({ ...formData, policies: newPolicies });
  };

  const saveElectionData = async () => {
    setLoading(true); // Start loading

    try {
      const docRef = await addDoc(collection(db, "candidates"), {
        ...formData,
      });
      console.log("Document written with ID: ", docRef.id);
      setLoading(false); // Stop loading
      toast.success("Election successfully created!", { autoClose: 2000 });
    } catch (e) {
      console.error("Error adding document: ", e);
      setLoading(false); // Stop loading on error
      toast.error("Error creating election. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    saveElectionData();
  };
  //  const saveElectionData = async (formData) => {
  //    try {
  //      const docRef = await addDoc(collection(db, "candidates"), {
  //        ...formData, // Spread formData to include all fields
  //      });
  //      console.log("Document written with ID: ", docRef.id);
  //    } catch (e) {
  //      console.error("Error adding document: ", e);
  //    }
  //  };

  //  const handleSubmit = (e) => {
  //    e.preventDefault();
  //    saveElectionData(formData);
  //  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  // };

  return (
    <form onSubmit={handleSubmit} className='container mt-5'>
      <h2 className='mb-4'>Create Election</h2>
      <div className='row mb-3'>
        <div className='col-md-6'>
          <input
            type='text'
            className='form-control'
            name='fullName'
            value={formData.fullName}
            placeholder='Full Name'
            onChange={handleChange}
          />
        </div>
        <div className='col-md-6'>
          <input
            type='number'
            className='form-control'
            name='age'
            value={formData.age}
            placeholder='Age'
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='mb-3'>
        <textarea
          name='biography'
          className='form-control'
          value={formData.biography}
          placeholder='Biography'
          onChange={handleChange}
          rows='3'
        />
      </div>

      <div className='mb-3'>
        <input
          type='text'
          className='form-control'
          name='campaignSlogan'
          value={formData.campaignSlogan}
          placeholder='Campaign Slogan'
          onChange={handleChange}
        />
      </div>

      <div className='row mb-3'>
        <div className='col-md-4'>
          <input
            type='email'
            className='form-control'
            name='contactInformation.email'
            value={formData.contactInformation.email}
            placeholder='Email'
            onChange={handleChange}
          />
        </div>
        <div className='col-md-4'>
          <input
            type='text'
            className='form-control'
            name='contactInformation.twitter'
            value={formData.contactInformation.twitter}
            placeholder='Twitter'
            onChange={handleChange}
          />
        </div>
        <div className='col-md-4'>
          <input
            type='text'
            className='form-control'
            name='contactInformation.website'
            value={formData.contactInformation.website}
            placeholder='Website'
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col-md-6'>
          <input
            type='text'
            className='form-control'
            name='education'
            value={formData.education}
            placeholder='Education'
            onChange={handleChange}
          />
        </div>
        <div className='col-md-6'>
          <input
            type='text'
            className='form-control'
            name='location'
            value={formData.location}
            placeholder='Location'
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='mb-3'>
        <input
          type='text'
          className='form-control'
          name='partyAffiliation'
          value={formData.partyAffiliation}
          placeholder='Party Affiliation'
          onChange={handleChange}
        />
      </div>

      <div className='mb-3'>
        <input
          type='text'
          className='form-control'
          name='photo'
          value={formData.photo}
          placeholder='Photo URL'
          onChange={handleChange}
        />
        {formData.photo && (
          <img
            src={formData.photo}
            alt='Candidate'
            style={{ width: "100px", height: "auto", marginTop: "10px" }}
          />
        )}
      </div>

      <div className='mb-3'>
        <input
          type='text'
          className='form-control'
          name='position'
          value={formData.position}
          placeholder='Position'
          onChange={handleChange}
        />
      </div>

      <h4>Policies</h4>
      {formData.policies.map((policy, index) => (
        <div key={index} className='mb-2'>
          <input
            type='text'
            className='form-control'
            value={policy}
            onChange={(e) => handlePolicyChange(index, e.target.value)}
            placeholder={`Policy ${index + 1}`}
          />
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => removePolicy(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className='d-flex justify-content-start mb-3'>
        <button
          type='button'
          className='btn btn-secondary me-3'
          onClick={addPolicy}
        >
          Add Policy
        </button>
      </div>
      {/* {formData.policies.map((policy, index) => (
        <div key={index} className='mb-2'>
          <input
            type='text'
            className='form-control'
            value={policy}
            onChange={(e) => handlePolicyChange(index, e.target.value)}
            placeholder={`Policy ${index + 1}`}
          />
        </div> */}
      <div className='d-flex justify-content-start mb-3'>
        {/* <button
          type='button'
          className='btn btn-secondary me-3'
          onClick={addPolicy}
        >
          Add Policy
        </button> */}

        <button type='submit' className='btn btn-primary'>
          Create Election
        </button>
        <ToastContainer />
      </div>
    </form>
  );
};

export default CreateElectionForm;

// Second sameple

// import React, { useState } from "react";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../Firebase/index";

// const CreateElectionForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     age: "",
//     biography: "",
//     campaignSlogan: "",
//     contactInformation: {
//       email: "",
//       twitter: "",
//       website: "",
//     },
//     education: "",
//     location: "",
//     partyAffiliation: "",
//     photo: "",
//     policies: [],
//     position: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("contactInformation")) {
//       setFormData({
//         ...formData,
//         contactInformation: {
//           ...formData.contactInformation,
//           [name.split(".")[1]]: value,
//         },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handlePolicyChange = (index, value) => {
//     const newPolicies = [...formData.policies];
//     newPolicies[index] = value;
//     setFormData({ ...formData, policies: newPolicies });
//   };

//   const addPolicy = () => {
//     setFormData({ ...formData, policies: [...formData.policies, ""] });
//   };

//  const removePolicy = (index) => {
//    const newPolicies = formData.policies.filter((_, i) => i !== index);
//    setFormData({ ...formData, policies: newPolicies });
//  };

//   const saveElectionData = async () => {
//     try {
//       const docRef = await addDoc(collection(db, "candidates"), {
//         ...formData,
//       });
//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting form data:", formData);
//     saveElectionData();
//   };
// //  const saveElectionData = async (formData) => {
// //    try {
// //      const docRef = await addDoc(collection(db, "candidates"), {
// //        ...formData, // Spread formData to include all fields
// //      });
// //      console.log("Document written with ID: ", docRef.id);
// //    } catch (e) {
// //      console.error("Error adding document: ", e);
// //    }
// //  };

// //  const handleSubmit = (e) => {
// //    e.preventDefault();
// //    saveElectionData(formData);
// //  };
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   onSubmit(formData);
//   // };

//   return (
//     <form onSubmit={handleSubmit} className='container mt-5'>
//       <h2 className='mb-4'>Create Election</h2>
//       <div className='row mb-3'>
//         <div className='col-md-6'>
//           <input
//             type='text'
//             className='form-control'
//             name='fullName'
//             value={formData.fullName}
//             placeholder='Full Name'
//             onChange={handleChange}
//           />
//         </div>
//         <div className='col-md-6'>
//           <input
//             type='number'
//             className='form-control'
//             name='age'
//             value={formData.age}
//             placeholder='Age'
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className='mb-3'>
//         <textarea
//           name='biography'
//           className='form-control'
//           value={formData.biography}
//           placeholder='Biography'
//           onChange={handleChange}
//           rows='3'
//         />
//       </div>

//       <div className='mb-3'>
//         <input
//           type='text'
//           className='form-control'
//           name='campaignSlogan'
//           value={formData.campaignSlogan}
//           placeholder='Campaign Slogan'
//           onChange={handleChange}
//         />
//       </div>

//       <div className='row mb-3'>
//         <div className='col-md-4'>
//           <input
//             type='email'
//             className='form-control'
//             name='contactInformation.email'
//             value={formData.contactInformation.email}
//             placeholder='Email'
//             onChange={handleChange}
//           />
//         </div>
//         <div className='col-md-4'>
//           <input
//             type='text'
//             className='form-control'
//             name='contactInformation.twitter'
//             value={formData.contactInformation.twitter}
//             placeholder='Twitter'
//             onChange={handleChange}
//           />
//         </div>
//         <div className='col-md-4'>
//           <input
//             type='text'
//             className='form-control'
//             name='contactInformation.website'
//             value={formData.contactInformation.website}
//             placeholder='Website'
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className='row mb-3'>
//         <div className='col-md-6'>
//           <input
//             type='text'
//             className='form-control'
//             name='education'
//             value={formData.education}
//             placeholder='Education'
//             onChange={handleChange}
//           />
//         </div>
//         <div className='col-md-6'>
//           <input
//             type='text'
//             className='form-control'
//             name='location'
//             value={formData.location}
//             placeholder='Location'
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className='mb-3'>
//         <input
//           type='text'
//           className='form-control'
//           name='partyAffiliation'
//           value={formData.partyAffiliation}
//           placeholder='Party Affiliation'
//           onChange={handleChange}
//         />
//       </div>

//       <div className='mb-3'>
//         <input
//           type='text'
//           className='form-control'
//           name='photo'
//           value={formData.photo}
//           placeholder='Photo URL'
//           onChange={handleChange}
//         />
//         {formData.photo && (
//           <img
//             src={formData.photo}
//             alt='Candidate'
//             style={{ width: "100px", height: "auto", marginTop: "10px" }}
//           />
//         )}
//       </div>

//       <div className='mb-3'>
//         <input
//           type='text'
//           className='form-control'
//           name='position'
//           value={formData.position}
//           placeholder='Position'
//           onChange={handleChange}
//         />
//       </div>

//       <h4>Policies</h4>
//       {formData.policies.map((policy, index) => (
//         <div key={index} className='mb-2'>
//           <input
//             type='text'
//             className='form-control'
//             value={policy}
//             onChange={(e) => handlePolicyChange(index, e.target.value)}
//             placeholder={`Policy ${index + 1}`}
//           />
//           <button
//             type='button'
//             className='btn btn-danger'
//             onClick={() => removePolicy(index)}
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       <div className='d-flex justify-content-start mb-3'>
//         <button
//           type='button'
//           className='btn btn-secondary me-3'
//           onClick={addPolicy}
//         >
//           Add Policy
//         </button>
//       </div>
//       {/* {formData.policies.map((policy, index) => (
//         <div key={index} className='mb-2'>
//           <input
//             type='text'
//             className='form-control'
//             value={policy}
//             onChange={(e) => handlePolicyChange(index, e.target.value)}
//             placeholder={`Policy ${index + 1}`}
//           />
//         </div> */}
//       <div className='d-flex justify-content-start mb-3'>
//         {/* <button
//           type='button'
//           className='btn btn-secondary me-3'
//           onClick={addPolicy}
//         >
//           Add Policy
//         </button> */}

//         <button type='submit' className='btn btn-primary'>
//           Create Election
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CreateElectionForm;

// First Sample
