import React, { useEffect, useState } from "react";
//components
import { PostCard } from "../components/cards";
import { RegisterForm } from "../components/forms";
//layout
import MainLayout from "../layouts/MainLayout";
import { Nav, Tab } from "react-bootstrap";
//services
import { getMyPosts } from "../lib/services/actions";
import { getProfile } from "../lib/services/user";
//Loader
import { Loading } from "notiflix/build/notiflix-loading-aio";
//toaster
import { Notify } from "notiflix/build/notiflix-notify-aio";
//router
import { useNavigate } from "react-router-dom";
//user
import { useUser } from "../lib/hooks";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("posts");
  const [profile, setProfile] = useState({});
  const [postsList, setPostsList] = useState([]);
  const handleTab = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    fetchMyPosts();
    fetchUserDetails();
 
  }, []);

  const fetchMyPosts = () => {
    Loading.dots();
    getMyPosts()
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

  const fetchUserDetails = () => {
    Loading.dots();
    getProfile()
      .then((data) => {
        Loading.remove();

        setProfile(data.data);
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
      <div className="p-4">
        <Tab.Container
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          onSelect={(k) => handleTab(k)}
        >
          <Nav className="dashboard-nav">
            <Nav.Item>
              <Nav.Link eventKey="posts" className="dashboard-nav-link">
                My Posts
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="ms-4">
              <Nav.Link eventKey="profile" className="dashboard-nav-link">
                My Profile
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="posts" className="px-2">
              <div className="dashboard-content-box mt-5">
                <div className="row w-100">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    {postsList && postsList.length > 0 ? (
                      postsList.map((item) => {
                        return (
                          <PostCard
                            data={item}
                            key={item._id}
                            fetchposts={fetchMyPosts}
                          />
                        );
                      })
                    ) : (
                      <div className="w-100 justify-content-center d-flex">
                        <h3>No Data Found</h3>
                      </div>
                    )}
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="profile">
              <div className="row w-100 mt-4">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="dashboard-content-box">
                    <div className="register-card">
                      <div className="register-header">
                        <div className="register-header-title">Profile</div>
                      </div>
                      <div className="register-form-container">
                        <RegisterForm profile={profile} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
