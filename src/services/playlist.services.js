import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/playlist`,
});

service.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");
  config.headers = storedToken && { Authorization: `Bearer ${storedToken}` };
  return config;
});

const getListService = () => {
  return service.get("/all");
};

const createNewListService = (id, name) => {
  return service.post(`/${id}/new`, name);
};

const updateNewList = (idSong, playlistId) => {
  return service.patch(`/${idSong}/old`, { playlistId });
};

const getSingleListService = (id) => {
  return service.get(`/${id}/playlist`);
};

const deletePlaylistService = (id) => {
  return service.delete(`/${id}/delete-list`);
};

export {
  updateNewList,
  createNewListService,
  getListService,
  getSingleListService,
  deletePlaylistService,
};
