import React from "react";
//components
import { Header } from "../components/navigation";


const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
