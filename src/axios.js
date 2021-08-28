import axios from "axios";

const instance = axios.create({
  baseURL: "https://awesome-backends.herokuapp.com/",
});

export default instance;
