import React from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
const navigate = useNavigate();   
const handleGoBack = () => {
    navigate(-1);
  }   
  return (
    <div>
        <h1> ForgetPassword</h1>
    </div>
  );
}

export default ForgetPassword;