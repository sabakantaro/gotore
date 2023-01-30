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

export const getUser = (id) => {
  return client.get(`/users/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const editUser = (id, data) => {
  return client.put(`/users/${id}`, data);
};

export const getCategories = () => {
  return client.get("/categories");
};

export const getcities = () => {
  return client.get("/cities");
};

export const createParticipate = (data) => {
  return client.post("/participates", data);
};

export const getChatRooms = () => {
  return client.get("/chat_rooms", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const getChatRoom = (id) => {
  return client.get(`/chat_rooms/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const createMessage = (data) => {
  return client.post("/messages", data);
};

export const getEvents = () => {
  return client.get("/events", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const searchEvents = (keyword, datetime) => {
  return client.get(`/events`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
    params: {
      keyword: keyword,
      datetime: datetime,
    },
  });
};

export const getEvent = (id) => {
  return client.get(`/events/${id}`);
};

export const createEvent = (data) => {
  return client.post("/events", data);
};

export const editEvent = (id, data) => {
  return client.patch(`/events/${id}`, data);
};

export const deleteEvent = (id) => {
  return client.delete(`/events/${id}`);
};

export const getNotifications = () => {
  return client.get("/notifications", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const updateNotification = (id) => {
  return client.patch(`/notifications/${id}`);
};

export const createEventsFavorites = (eventId, data) => {
  return client.post(`/events/${eventId}/events_favorites`, data);
};

export const deleteEventsFavorites = (eventId) => {
  return client.delete(`/events/${eventId}/events_favorites`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const follow = (userId, data) => {
  return client.post(`/users/${userId}/relationships`, data);
};

export const unfollow = (userId) => {
  return client.delete(`/users/${userId}/relationships`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const getFollowings = (userId) => {
  return client.get(`/users/${userId}/followings`);
};

export const getFollowers = (userId) => {
  return client.get(`/users/${userId}/followers`);
};

export const evaluate = (id, data) => {
  return client.post(`/users/${id}/evaluations`, data);
};

export const createComment = (eventId, data) => {
  return client.post(`/events/${eventId}/comments`, data);
};

export const deleteComment = (eventId, id) => {
  return client.delete(`/events/${eventId}/comments/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
