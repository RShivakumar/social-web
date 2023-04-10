import React, { useRef, useState } from "react";
import { Report } from "notiflix/build/notiflix-report-aio";
//service
import { createPost } from "../../lib/services/actions";
//toaster
import { Notify } from "notiflix/build/notiflix-notify-aio";
//router
import { useNavigate } from "react-router-dom";
//Loader
import { Loading } from "notiflix/build/notiflix-loading-aio";

const PostsForm = (props) => {
  const fileRef = useRef();
  const navigate = useNavigate();
  const [state, setState] = useState({
    caption: "",
    files: [],
  });

  const uploadFile = (e) => {
    const choosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadfiles(choosenFiles);
  };

  const handleUploadfiles = (files) => {
    let arr = [...state.files];
    const fileFormats = ["image/png", "image/jpeg"];
    files.some((file) => {
      if (state.files.findIndex((f) => f.file.name === file.name) === -1) {
        if (fileFormats.includes(file.type)) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            arr.push({
              file: file,
              img: reader.result,
            });
            setState({
              ...state,
              files: arr,
            });
          };
        } else {
          Report.warning("", "Please upload png,jpg formats only", "Okay");
        }
      }
    });
  };

  const removeFile = (item) => {
    const arr = [...state.files];
    arr.splice(
      arr.findIndex((obj) => {
        return obj.img === item.img;
      }),
      1
    );
    setState({
      ...state,
      files: arr,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.caption || state.files.length > 0) {
      submitData();
    }
  };
  const submitData = () => {
    Loading.dots();
    const formData = new FormData();
    if (state.caption) {
      formData.append("caption", state.caption);
    }
    if (state.files.length > 0) {
      state.files.forEach((item) => {
        formData.append("post", item.file);
      });
    }
    createPost(formData)
      .then((data) => {
        Loading.remove();
        Notify.success(data.msg);
        setState({
          caption: "",
          files: [],
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="post-input"
        placeholder="What's on your mind"
        name="caption"
        value={state.caption}
        onChange={handleChange}
      />
      <div className="d-flex mt-2">
        {state.files &&
          state.files.length > 0 &&
          state.files.map((item, index) => {
            return (
              <div key={index} className="me-3 position-relative">
                <img
                  src="/images/cls.svg"
                  width="20"
                  className="email-img-remove"
                  onClick={() => removeFile(item)}
                />
                <img src={item.img} width="100" height="100" />
              </div>
            );
          })}
      </div>
      <div className="d-flex w-100 mt-3">
        <input
          type="file"
          ref={fileRef}
          className="d-none"
          multiple
          onChange={(e) => uploadFile(e)}
        />
        <button
          type="button"
          className="follow-btn"
          onClick={() => fileRef.current.click()}
        >
          Add Photo
        </button>
        <button type="submit" className="ms-2">
          Create post
        </button>
      </div>
    </form>
  );
};

export default PostsForm;
