import React from "react";
//components
import { RegisterForm } from "../components/forms";
//styles
import "../styles/login.css";
//router
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="register-container">
      <h3 className="title">Fashopi</h3>
      <div className="register-card">
        <div className="register-header">
          <div className="register-header-title">Create a new account</div>
          <div class="reg-sub-title">It's quick and easy.</div>
        </div>
        <div className="register-form-container">
          <RegisterForm handlenavigate={() => navigate("/")} />
        </div>
        <div className="w-100 d-flex justify-content-center">
          <NavLink className="login-link" to="/">
            Already have an account?
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
