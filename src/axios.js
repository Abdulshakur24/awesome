import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5010/",
});

export default instance;
