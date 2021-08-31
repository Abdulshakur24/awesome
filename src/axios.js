import axios from "axios";

//build = http://localhost:5010
//production = https://awesome-backends.herokuapp.com/
const instance = axios.create({
  baseURL: "https://awesome-backends.herokuapp.com/",
});

export default instance;
