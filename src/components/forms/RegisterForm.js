import React, { useState, useEffect } from "react";
//validations
import { signupValidator } from "../../lib/validations";
//toaster
import { Notify } from "notiflix/build/notiflix-notify-aio";
//Loader
import { Loading } from "notiflix/build/notiflix-loading-aio";
//service
import { userRegister } from "../../lib/services/auth";
import { profileUpdate } from "../../lib/services/user";
//Date format
import { formatDOB, profileDOB } from "../../lib/helper";

const RegisterForm = (props) => {
  const [user, setUser] = useState({
    _id: "",
    gender: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    countryCode: "",
    mobileNumber: "",
    country: "",
    username: "",
  });
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUser({
      _id: props.profile ? props.profile._id : "",
      gender: props.profile ? props.profile.gender : "",
      email: props.profile ? props.profile.email : "",
      password: props.profile ? props.profile.password : "",
      firstName: props.profile ? props.profile.firstName : "",
      lastName: props.profile ? props.profile.lastName : "",
      dob: props.profile ? profileDOB(props.profile.dob) : "",
      countryCode: props.profile ? props.profile.countryCode : "",
      mobileNumber: props.profile ? props.profile.mobileNumber : "",
      country: props.profile ? props.profile.country : "",
      username: props.profile ? props.profile.username : "",
    });
  }, [props.profile && props.profile]);

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
    setErrors(signupValidator(user));
  };

  const submitData = () => {
    if (user._id) {
      const postData = {
        gender: user.gender,
        email: user.email,

        firstName: user.firstName,
        lastName: user.lastName,
        dob: formatDOB(user.dob),
        countryCode: user.countryCode,
        mobileNumber: parseInt(user.mobileNumber),
        country: user.country,
        username: user.username,
      };
      Loading.dots();
      profileUpdate(postData)
        .then((data) => {
          Loading.remove();
          Notify.success(data.msg);
          setSubmit(false);
          setErrors({});
        })
        .catch((error) => {
          Loading.remove();
          if (error.response.status === 400) {
            Notify.failure(error.response.data.msg);
          }
        });
    } else {
      const postData = {
        gender: user.gender,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: formatDOB(user.dob),
        countryCode: user.countryCode,
        mobileNumber: parseInt(user.mobileNumber),
        country: user.country,
        username: user.username,
      };
      Loading.dots();
      userRegister(postData)
        .then((data) => {
          Loading.remove();
          Notify.success(data.msg);
          setSubmit(false);
          setErrors({});
          setUser({
            gender: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            dob: "",
            countryCode: "",
            mobileNumber: "",
            country: "",
            username: "",
          });
          if (props.handlenavigate) {
            props.handlenavigate();
          }
        })
        .catch((error) => {
          Loading.remove();
          if (error.response.status === 400) {
            Notify.failure(error.response.data.msg);
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex w-100">
        <div>
          <input
            type="text"
            className="register-input"
            placeholder="First name"
            value={user.firstName}
            name="firstName"
            onChange={handleChange}
          />
          {errors.firstName && (
            <div
              className="form-control-feedback text-danger text-start"
              type="invalid"
            >
              {errors.firstName}
            </div>
          )}
        </div>
        <div className="ms-2">
          <input
            type="text"
            className="register-input"
            placeholder="Last name"
            value={user.lastName}
            name="lastName"
            onChange={handleChange}
          />
          {errors.lastName && (
            <div
              className="form-control-feedback text-danger text-start"
              type="invalid"
            >
              {errors.lastName}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2">
        <input
          type="text"
          className="register-input w-100"
          placeholder="User name"
          value={user.username}
          name="username"
          onChange={handleChange}
        />
        {errors.username && (
          <div
            className="form-control-feedback text-danger text-start"
            type="invalid"
          >
            {errors.username}
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          type="text"
          className="register-input w-100"
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
      {!props.profile && (
        <div className="mt-2">
          <input
            type="text"
            className="register-input w-100"
            placeholder="New password"
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
      )}

      <div className="mt-2">
        <input
          type="text"
          className="register-input w-100"
          placeholder="Country"
          value={user.country}
          name="country"
          onChange={handleChange}
        />
        {errors.country && (
          <div
            className="form-control-feedback text-danger text-start"
            type="invalid"
          >
            {errors.country}
          </div>
        )}
      </div>
      <div className="mt-2">
        <label>Date of birth</label>
        <input
          type="date"
          className="register-input w-100 mt-1"
          value={user.dob}
          name="dob"
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
        />
        {errors.dob && (
          <div
            className="form-control-feedback text-danger text-start"
            type="invalid"
          >
            {errors.dob}
          </div>
        )}
      </div>
      <div className="mt-2">
        <label>Gender</label>
        <div>
          <input
            type="radio"
            value="male"
            name="gender"
            onChange={handleChange}
            checked={user.gender === "male"}
          />
          <label className="ms-1">Male</label>
          <input
            type="radio"
            className="ms-3"
            value="female"
            name="gender"
            onChange={handleChange}
            checked={user.gender === "female"}
          />
          <label className="ms-1">Female</label>
          <input
            type="radio"
            className="ms-3"
            value="others"
            name="gender"
            onChange={handleChange}
            checked={user.gender === "others"}
          />
          <label className="ms-1">Others</label>
          {errors.gender && (
            <div
              className="form-control-feedback text-danger text-start"
              type="invalid"
            >
              {errors.gender}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2">
        <label>Mobile Number</label>
        <div className="row">
          <div className="col-md-4 pe-0">
            <input
              className="register-input w-100 mt-1"
              placeholder="Countrt code"
              value={user.countryCode}
              name="countryCode"
              onChange={handleChange}
            />
            {errors.countryCode && (
              <div
                className="form-control-feedback text-danger text-start"
                type="invalid"
              >
                {errors.countryCode}
              </div>
            )}
          </div>
          <div className="col-md-8">
            <input
              className="register-input w-100 mt-1"
              placeholder="Number"
              value={user.mobileNumber}
              name="mobileNumber"
              onChange={handleChange}
            />
            {errors.mobileNumber && (
              <div
                className="form-control-feedback text-danger text-start"
                type="invalid"
              >
                {errors.mobileNumber}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-100 mt-3 d-flex justify-content-center">
        <button type="submit" className="signup-btn">
          {props.profile ? "Update" : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
