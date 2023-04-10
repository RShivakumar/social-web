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

export const createPost = (data) => {
  return axios
    .post(`${BASE_URL}/api/v1/post/create-post`, data, {
      headers: SetHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getPosts = () => {
  return axios
    .get(`${BASE_URL}/api/v1/post/list-posts`, {
      headers: SetHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const postReact = (id,data) => {
  return axios
    .post(`${BASE_URL}/api/v1/post/post-react/${id}`, data, {
      headers: SetHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const addComment = (id, data) => {
  return axios
    .post(`${BASE_URL}/api/v1/post/comment/${id}`, data, {
      headers: SetHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const replyOnComment = (postId,commentId, data) => {
  return axios
    .post(
      `${BASE_URL}/api/v1/post/comment-reply/${postId}/${commentId}`,
      data,
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
};

export const getMyPosts = () => {
  return axios
    .get(`${BASE_URL}/api/v1/post/my-posts`, {
      headers: SetHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const sharePost = (postId,userId) => {
  return axios
    .post(`${BASE_URL}/api/v1/post/share-post/${postId}/${userId}`,{}, {
      headers: SetHeader(),
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};







