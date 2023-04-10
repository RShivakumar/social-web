import React, { useState } from "react";
//components
import { CommentForm } from "../forms";
import { CustomModal, ReplyAccordion } from "../elements";
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faShare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
//service
import { postReact, sharePost } from "../../lib/services/actions";
//Loader
import { Loading } from "notiflix/build/notiflix-loading-aio";
//toaster
import { Notify } from "notiflix/build/notiflix-notify-aio";
//router
import { useNavigate } from "react-router-dom";
//user
import { useUser } from "../../lib/hooks";
import { getPostDate } from "../../lib/helper";

const PostCard = (props) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [comment, setComment] = useState(false);
  const [reply, setReply] = useState(false);
  const handleReact = (id, likes) => {
    Loading.dots();
    const data = {
      like: likes.includes(user._id) ? false : true,
    };
    postReact(id, data)
      .then((data) => {
        Loading.remove();
        props.fetchposts();
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
  const handleShare = (id) => {
    Loading.dots();

    sharePost(id, user._id)
      .then((data) => {
        Loading.remove();
        props.fetchposts();
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
    <>
      <div className="post-card mb-5">
        <div className="w-100 d-flex align-items-center mb-3">
          <img src="/images/account.png" className="align-self-center" />
          <div className="align-self-center ms-2">
            <p className="post-user-title align-self-center mb-0">
              {props.data.userId === user._id
                ? "You"
                : `${props.data.firstName}${props.data.lastName}`}
            </p>
            <p>{getPostDate(props.data.createdAt)}</p>
          </div>
        </div>
        {props.data.caption && <p>{props.data.caption}</p>}
        {props.data.media.length > 0 &&
          props.data.media.map((item) => {
            return <img src={item.url} key={item._id} className="w-100" />;
          })}
        <div className="action_count_div">
          <FontAwesomeIcon icon={faThumbsUp} color="blue" />
          <span className="ms-1">{props.data.likes.length}</span>
          <div className="ms-auto d-flex">
            <span className="me-3">
              <span>{props.data.comments.length}</span>
              <FontAwesomeIcon icon={faMessage} className="ms-1" />
            </span>
            <span>
              <span>{props.data.shared.length}</span>
              <FontAwesomeIcon icon={faShare} className="ms-1" />
            </span>
          </div>
        </div>
        <div className="actions_div">
          <span
            className="cursor"
            style={{
              color: props.data.likes.includes(user._id) ? "blue" : "#65676b",
            }}
            onClick={() => handleReact(props.data._id, props.data.likes)}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            <span className="ms-1">Like</span>
          </span>
          <span className="ms-5 cursor" onClick={() => setComment(true)}>
            <FontAwesomeIcon icon={faMessage} />
            <span className="ms-1">Comment</span>
          </span>
          <span
            className="ms-5 cursor"
            onClick={() => handleShare(props.data._id)}
          >
            <FontAwesomeIcon icon={faShare} />
            <span className="ms-1">Share</span>
          </span>
        </div>
      </div>
      <CustomModal
        centered
        show={comment}
        backdrop="static"
        handleclose={() => setComment(false)}
        className="custom-modal"
      >
        <div className="comment-section">
          {props.data.comments.length > 0 &&
            props.data.comments.map((item) => {
              return (
                <div key={item._id}>
                  <div className="comment-box mt-4">
                    <div className="reason-box mb-0">
                      <p className="reason mb-0">{item.text}</p>
                    </div>
                  </div>
                  <ReplyAccordion
                    data={item}
                    id={props.data._id}
                    fetchposts={props.fetchposts}
                  />
                </div>
              );
            })}
        </div>
        <div style={{ width: "100%", height: "50px" }}>
          <CommentForm id={props.data._id} fetchposts={props.fetchposts} />
        </div>
      </CustomModal>
    </>
  );
};

export default PostCard;
