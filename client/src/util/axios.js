import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_CLIENTURL + "/api",
  responseType: "json",
  withCredentials: true,
});