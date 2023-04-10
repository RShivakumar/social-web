import React from "react";
//service
import { userFollow, userUnfollow } from "../../lib/services/user";
//Loader
import { Loading } from "notiflix/build/notiflix-loading-aio";
//toaster
import { Notify } from "notiflix/build/notiflix-notify-aio";
//router
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
  const navigate = useNavigate();
  const handleFollow = (id) => {
    Loading.dots();
    userFollow(id)
      .then((data) => {
        Loading.remove();
        props.fecthuserlist();
      })
      .catch((error) => {
        Loading.remove();
        if (error.response.status === 400) {
          Notify.failure(error.response.data.msg);
        } else if (error.response.status === 401) {
          Notify.failure(error.response.data.msg);
          localStorage.clear();
          navigate("/");
        } else if (error.response.data.msg === "jwt expired") {
          Notify.failure(error.response.data.msg);
          localStorage.clear();
          navigate("/");
        } else {
          Notify.failure(error.response.data.msg);
        }
      });
  };
  const handleUnfollow = (id) => {
    Loading.dots();
    userUnfollow(id)
      .then((data) => {
        Loading.remove();
        props.fecthuserlist();
      })
      .catch((error) => {
        Loading.remove();
        if (error.response.status === 400) {
          Notify.failure(error.response.data.msg);
        } else if (error.response.status === 401) {
          Notify.failure(error.response.data.msg);
          localStorage.clear();
          navigate("/");
        } else if (error.response.data.msg === "jwt expired") {
          Notify.failure(error.response.data.msg);
          localStorage.clear();
          navigate("/");
        } else {
          Notify.failure(error.response.data.msg);
        }
      });
  };
  return (
    <div className="user-card">
      <p className="user-title">{`${props.data.firstName} ${props.data.lastName}`}</p>
      {props.data.following ? (
        <div className="d-flex w-100">
          <div className="following-div">Following</div>
          <button
            type="button"
            className="follow-btn ms-3"
            onClick={() => handleUnfollow(props.data._id)}
          >
            Un follow
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="follow-btn"
          onClick={() => handleFollow(props.data._id)}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default UserCard;
