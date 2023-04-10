import React, { useState, useEffect } from "react";
//layout
import MainLayout from "../layouts/MainLayout";
//components
import { PostCard } from "../components/cards";
import { PostsForm } from "../components/forms";
//service
import { getPosts } from "../lib/services/actions";
//Loader
import { Loading } from "notiflix/build/notiflix-loading-aio";
//toaster
import { Notify } from "notiflix/build/notiflix-notify-aio";
//router
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [postsList, setPostsList] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    Loading.dots();
    getPosts()
      .then((data) => {
        Loading.remove();
        setPostsList(data.data);
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
    <MainLayout>
      <div className="row w-100">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="px-4 py-2">
            <div className="w-100 shadow bg-white border-radius px-4 py-2">
              <PostsForm fetchposts={fetchPosts} />
            </div>
            <div className="mt-3">
              {postsList && postsList.length > 0 ? (
                postsList.map((item) => (
                  <PostCard
                    data={item}
                    key={item._id}
                    fetchposts={fetchPosts}
                  />
                ))
              ) : (
                <div className="d-flex justify-content-center w-100 mt-5">
                  <h3>
                    No Posts Found
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </MainLayout>
  );
};

export default Home;
