import axios from "axios";
import { BASE_URL } from "../../constants/api_routes";
import { useUser } from "../hooks";

const SetHeader = () => {
  const { user } = useUser();
  const headers = {
    Authorization: user ? `Bearer ${user.token}` : "",
  };
  return headers;
};

export const getUsers = () => {
  return axios
    .get(`${BASE_URL}/api/v1/user/all-users`, {
      headers: SetHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const userFollow = (id) => {
  return axios
    .post(`${BASE_URL}/api/v1/user/follow/${id}`,{}, {
      headers: SetHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const userUnfollow=(id)=>{
  return axios
    .post(
      `${BASE_URL}/api/v1/user/unfollow/${id}`,
      {},
      {
        headers: SetHeader(),
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });

}

export const getProfile = () => {
  return axios
    .get(`${BASE_URL}/api/v1/user/profile`, {
      headers: SetHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const profileUpdate = (data) => {
  return axios
    .put(`${BASE_URL}/api/v1/user/profile`, data, {
      headers: SetHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getstatistics = (id) => {
  return axios
    .get(`${BASE_URL}/api/v1/user/stats`, {
      headers: SetHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

