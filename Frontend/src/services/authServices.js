import axios from "axios";

export const registerUser = (user, thenBody, catchBody, finallyBody) => {
  axios({
    method: "post",
    url: "/api/register",
    data: user,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(thenBody)
    .catch(catchBody)
    .finally(finallyBody);
};

export const loginUser = (user, thenBody, catchBody, finallyBody) => {
  axios({
    method: "post",
    url: "/api/login",
    data: user,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(thenBody)
    .catch(catchBody)
    .finally(finallyBody);
};

export const uploadImage = async (data, thenBody, catchBody) => {
  await fetch("https://api.cloudinary.com/v1_1/dlwq5rgeu/image/upload", {
    method: "post",
    body: data,
  })
    .then((resp) => resp.json())
    .then(thenBody)
    .catch(catchBody);
};

export const updateUser = (user, thenBody, catchBody, finallyBody) => {
  axios({
    method: "put",
    url: "/api/me/update",
    data: user,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(thenBody)
    .catch(catchBody)
    .finally(finallyBody);
};

export const changePassword = (data, thenBody, catchBody, finallyBody) => {
  axios({
    method: "put",
    url: "/api/password/update",
    data: data,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(thenBody)
    .catch(catchBody)
    .finally(finallyBody);
};

export const forgotPassword = (user, thenBody, catchBody, finallyBody) => {
  axios({
    method: "post",
    url: "/api/password/forgot",
    data: user,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(thenBody)
    .catch(catchBody)
    .finally(finallyBody);
};

export const logoutUser = (thenBody, catchBody, finallyBody) => {
  axios({
    method: "get",
    url: "/api/logout",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(thenBody)
    .catch(catchBody)
    .finally(finallyBody);
};

export const loadUser = (thenBody, catchBody) => {
  axios({
    method: "get",
    url: "/api/me",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(thenBody)
    .catch(catchBody);
};
