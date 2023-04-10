import React from "react";
//router
import { NavLink } from "react-router-dom";
//user
import { useUser } from "../../lib/hooks";
import { ProfileDropdown } from "../elements";

const Header = () => {
  const user = useUser();
  return (
    <div className="default-navbar">
      <div>
        <NavLink to="/">
          <img src="/images/bb.png" width={50} height={50} />
        </NavLink>
      </div>
      <div className="nav ms-3">
        <div className="sub-nav-link">
          <NavLink to="/home" className="header-link">
            Home
          </NavLink>
          <NavLink to="/users" className="header-link">
          Users
          </NavLink>
        </div>
      </div>
      <div className="ms-auto sub-nav-link nav">
        {user && user ? (
          <ProfileDropdown />
        ) : (
          <NavLink to="/login" className="header-link">
            <span className="nav-link-span">
              <img src="/images/account.png" />
              <p className="mb-0">Login</p>
            </span>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
