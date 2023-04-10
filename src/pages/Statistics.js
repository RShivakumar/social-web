import React, { useEffect, useState } from "react";
//components
import { PieChart } from "../components/elements";
//layout
import MainLayout from "../layouts/MainLayout";
//service
import { getstatistics } from "../lib/services/user";
//Loader
import { Loading } from "notiflix/build/notiflix-loading-aio";
//toaster
import { Notify } from "notiflix/build/notiflix-notify-aio";
//router
import { useNavigate } from "react-router-dom";
//user
import { useUser } from "../lib/hooks";

const Statistics = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [data, setData] = useState({});
  useEffect(() => {
    fetchStats();
  }, []);
  const fetchStats = () => {
    Loading.dots();
    getstatistics()
      .then((data) => {
        Loading.remove();

        setData(data.data);
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
      <div className="stats-wraper">
        {Object.keys(data).length > 0 ? (
          <>
            <div className="d-flex justify-content-center w-100">
              <h3>Total posts:{data.totalPosts}</h3>
              <h3 className="ms-3">Total Shares:{data.totalShared}</h3>
              <h3 className="ms-3">Total Shares:{data.totalUsers}</h3>
            </div>
            <div>
              {data.userStats.length > 0 &&
                data.userStats.map((item) => {
                  return (item.posts > 0) |
                    (item.shared > 0) |
                    (item.followers > 0) ? (
                    <div key={item._id} className="pie-wrapper">
                      <div className="pie-container">
                        <p className="username-title">
                          {item.username === user.username
                            ? "You"
                            : item.username}
                        </p>
                        <PieChart data={item} />
                      </div>
                    </div>
                  ) : null;
                })}
            </div>
          </>
        ) : (
          <div div className="d-flex justify-content-center w-100">
            <h3>No Data Found</h3>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Statistics;
