import client from "./client";
import Cookies from "js-cookie";

export const signUp = (params) => {
  return client.post("auth", params);
};

export const signIn = (params) => {
  return client.post("auth/sign_in", params);
};

export const signOut = () => {
  return client.delete("auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const getCurrentUser = () => {
  if (
    Cookies.get("_access_token") &&
    Cookies.get("_client") &&
    Cookies.get("_uid")
  ) {
    return client.get("/auth/sessions", {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
  }
};

export const editUser = (id, data) => {
  return client.put(`/users/${id}`, data);
};

export const getPosts = () => {
  return client.get("/posts");
};

export const getPost = (id) => {
  return client.get(`/posts/${id}`);
};

export const createPost = (data) => {
  return client.post("/posts", data);
};

export const editPost = (id, data) => {
  return client.patch(`/posts/${id}`, data);
};

export const deletePost = (id) => {
  return client.delete(`/posts/${id}`);
};

export const getCategories = () => {
  return client.get("/categories");
};
