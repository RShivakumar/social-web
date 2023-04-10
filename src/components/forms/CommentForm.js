import React, { useState } from "react";
//react-bootstrap
import { Button, Form } from "react-bootstrap";
//toaster
import { Notify } from "notiflix/build/notiflix-notify-aio";
//router
import { useNavigate } from "react-router-dom";
//Loader
import { Loading } from "notiflix/build/notiflix-loading-aio";
//service
import { addComment } from "../../lib/services/actions";

const CommentForm = (props) => {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      const data = {
        comment: comment,
      };
      addComment(props.id, data)
        .then((data) => {
          Loading.remove();
          setComment("");
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
    }
  };
  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="comment-input-wrapper">
        <Form.Control
          placeholder="Add comment"
          className="comment-input-control p-0"
          value={comment}
          onChange={(e) => handleChange(e)}
        />
        <Button type="submit" className="remarks-btn p-0">
          <img src="/images/send.png" className="send-img" alt="send" />
        </Button>
      </div>
    </form>

    // <form>
    //   <div className="comment-form-wrapper">
    //     <input
    //       type="text"
    //       className="comment-input"
    //       placeholder="Write a comment"
    //     />
    //   </div>
    // </form>
  );
};

export default CommentForm;
