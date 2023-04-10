import React, { useEffect, useState } from "react";
//validations
import { LoginValidator } from "../../lib/validations";
//toaster
import { Notify } from "notiflix/build/notiflix-notify-aio";
//Loader
import { Loading } from "notiflix/build/notiflix-loading-aio";
//service
import { userLogin } from "../../lib/services/auth";

const LoginForm = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submit) {
      submitData();
    }
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    setErrors(LoginValidator(user));
  };

  const submitData = () => {
    Loading.dots();
    userLogin(user)
      .then((data) => {
        Loading.remove();
        localStorage.setItem("user", JSON.stringify(data.data));
        setSubmit(false);
        setErrors({});
        setUser({
          email: "",
          password: "",
        });
        props.handlenavigate();
      })
      .catch((error) => {
        Loading.remove();
        if (error.response.status === 400) {
          Notify.failure(error.response.data.msg);
        }
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          className="login-input"
          placeholder="Email address"
          value={user.email}
          name="email"
          onChange={handleChange}
        />
        {errors.email && (
          <div
            className="form-control-feedback text-danger text-start"
            type="invalid"
          >
            {errors.email}
          </div>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          className="login-input"
          placeholder="Password"
          value={user.password}
          name="password"
          onChange={handleChange}
        />
        {errors.password && (
          <div
            className="form-control-feedback text-danger text-start"
            type="invalid"
          >
            {errors.password}
          </div>
        )}
      </div>
      <div className="btn-wrapper">
        <button className="login-btn" type="submit">
          Log in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
