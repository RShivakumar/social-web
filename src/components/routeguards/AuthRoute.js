import React from "react";
//user
import { useUser } from "../../lib/hooks";
//router
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { user } = useUser();
  if (user) {
    return <Navigate to="/home" />;
  } else {
    return children;
  }
};

export default AuthRoute;
