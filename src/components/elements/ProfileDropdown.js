import React, { useState } from "react";
//user
import { useUser } from "../../lib/hooks";
//router
import { useNavigate, NavLink } from "react-router-dom";

const ProfileDropdown = () => {
  const [showItems, setShowItems] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const dropDown = () => {
    setShowItems(!showItems);
  };
  const handleLogut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="profile-dropdown">
      <div className="profile_dropdown_container" onClick={dropDown}>
        <span className="nav-link-span">
          <img src="/images/account.png" />
          <p className="mb-0 profile_title">Profile</p>
        </span>
      </div>
      <div
        className="profile_dropdown_body"
        style={{ display: showItems ? "block" : "none" }}
      >
        <div className="text-end">
          <p className="profile_text mb-0">
            {user && `${user.firstName}${user.lastName}`}
          </p>
          <p className="profile_text mb-0">{user && user.email}</p>
          <p className="profile_text mb-0">{user && user.mobileNumber}</p>
        </div>
        <div>
          <div className="logout_button_wrapper sub-nav-link">
            <NavLink to="/dashboard" className="header-link">
              Dashboard
            </NavLink>
          </div>
          <div className="sub-nav-link">
            <NavLink to="/statistics" className="header-link">
              Statistics
            </NavLink>
          </div>

          <button className="logout_btn" onClick={handleLogut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
