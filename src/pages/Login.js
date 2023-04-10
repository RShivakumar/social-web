import React from "react";
//components
import { LoginForm } from "../components/forms";
//css
import "../styles/login.css";
//router
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <h3 className="title">Fashopi</h3>
      <div className="login-card">
        <div className="header_block">
          <span>Log in to Fashopi</span>
        </div>
        <LoginForm handlenavigate={()=>navigate("/home")} />
        <div className="hr-line"></div>
        <div className="pt-2">
          <button className="create-btn" onClick={() => navigate("/register")}>
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
