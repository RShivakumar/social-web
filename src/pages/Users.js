import React, { useEffect, useState } from "react";
//components
import { UserCard } from "../components/cards";
//layout
import MainLayout from "../layouts/MainLayout";
//service
import { getUsers } from "../lib/services/user";
//Loader
import { Loading } from "notiflix/build/notiflix-loading-aio";
//toaster
import { Notify } from "notiflix/build/notiflix-notify-aio";
//router
import { useNavigate } from "react-router-dom";



const Users = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    fecthUserList();
  }, []);

  const fecthUserList = () => {
    Loading.dots();
    getUsers()
      .then((data) => {
        Loading.remove();
        setUserList(data.data);
      })
      .catch((error) => {
        console.log(error);
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
      <div className="px-4 py-2">
        <p className="users-headline">Users</p>
        <div className="row">
          {userList && userList.length > 0 ? (
            userList.map((item) => {
              return (
                <div className="col-md-3 mb-3" key={item._id}>
                  <UserCard data={item} fecthuserlist={fecthUserList} />
                </div>
              );
            })
          ) : (
            <div className="w-100 d-flex justify-content-center">
              <h3>No Data Found</h3>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Users;
