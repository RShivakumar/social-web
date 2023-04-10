export const LoginValidator = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    values.email &&
    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)
  ) {
    errors.email = "Please enter a valid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

export const signupValidator = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    values.email &&
    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)
  ) {
    errors.email = "Please enter a valid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  if (!values.gender) {
    errors.gender = "Gender is required";
  }
  if (!values.firstName) {
    errors.firstName = "Firstname is required";
  }
  if (!values.lastName) {
    errors.lastName = "Lastname is required";
  }
  if (!values.dob) {
    errors.dob = "Date of birth is required";
  }
  if (!values.countryCode) {
    errors.countryCode = "Country code is required";
  }

  if (!values.country) {
    errors.country = "Country is required";
  }
  if (!values.username) {
    errors.username = "User name is required";
  }
  if (!values.mobileNumber) {
    errors.mobileNumber = "Mobile number is required";
  } else if (!/^\d{10}$/.test(values.mobileNumber)) {
    errors.mobileNumber = "Please enter a valid phone number";
  }
  return errors;
};
