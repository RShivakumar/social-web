import React from "react";
//user
import { useUser } from "../../lib/hooks";
//router
import { Navigate } from "react-router-dom";

const RequireAuthRoute = ({ children }) => {
  const { user } = useUser();
  if (user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default RequireAuthRoute;
