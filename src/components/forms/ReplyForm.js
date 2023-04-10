import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
//toaster
import { Notify } from "notiflix/build/notiflix-notify-aio";
//router
import { useNavigate } from "react-router-dom";
//Loader
import { Loading } from "notiflix/build/notiflix-loading-aio";
//service
import { replyOnComment } from "../../lib/services/actions";

const ReplyForm = (props) => {
  const navigate = useNavigate();
  const [reply, setReply] = useState("");
  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply) {
      Loading.dots();
      const data = {
        reply: reply,
      };
      replyOnComment(props.id, props.data._id, data)
        .then((data) => {
          Loading.remove();
          setReply("");
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
    <form className="reply-form" onSubmit={handleSubmit}>
      <div className="reply-input-wrapper">
        <Form.Control
          placeholder="Add reply"
          className="comment-input-control p-0"
          value={reply}
          onChange={(e) => handleChange(e)}
        />
        <Button type="submit" className="remarks-btn p-0">
          <img src="/images/send.png" className="send-img" alt="send" />
        </Button>
      </div>
    </form>
  );
};

export default ReplyForm;
