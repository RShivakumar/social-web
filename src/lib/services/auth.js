import axios from "axios";
import { BASE_URL } from "../../constants/api_routes";


export const userLogin = (data) => {
  return axios
    .post(`${BASE_URL}/api/v1/user/login`, data)
    .then((res) => {
    return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const userRegister = (data) => {
  return axios
    .post(`${BASE_URL}/api/v1/user/signup`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
