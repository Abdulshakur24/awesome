import "./App.scss";
import logo from "./assets/logo.svg";
import { useState } from "react";
import axios from "./axios";
import { useDispatch } from "react-redux";
import { addImage, addVideo } from "./features/State";
import Videos from "./components/Videos";
import Images from "./components/Images";

const App = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [details, setDetails] = useState({
    name: "",
    url: "",
  });

  const [detailsVideos, setDetailsVdieos] = useState({
    video_url: "",
  });

  const { name, url } = details;
  const handleChange = (name) => (e) =>
    setDetails({ ...details, [name]: e.target.value });

  const { video_url } = detailsVideos;
  const handleChangeVideos = (name) => (e) =>
    setDetailsVdieos({ ...detailsVideos, [name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("images/create", details, { method: "POST" })
      .then((response) => {
        if (response.data.command === "INSERT") {
          const { id } = response.data.rows[0];
          dispatch(addImage({ ...details, id }));
          // setDetails({
          //   name: "",
          //   url: "",
          // });
        }
      });
  };
  const handleVideoSubmit = (e) => {
    e.preventDefault();
    setLoadingButton(true);
    axios
      .post("videos/create", detailsVideos, { method: "POST" })
      .then((response) => {
        if (response.data.command === "INSERT") {
          const { id } = response.data.rows[0];
          console.log({ ...detailsVideos, id });
          dispatch(addVideo({ ...detailsVideos, id }));
          setLoadingButton(false);
          // setDetailsVdieos({
          //   name: "",
          //   url: "",
          // });
        }
      });
  };

  return (
    <div className="App">
      <div className="header">
        <div className="container">
          <div className="left">
            <img src={logo} alt="" />
          </div>
        </div>
        <div
          onClick={() => setShow(!show)}
          className={`fixed ${show ? "opened" : "closed"}`}
        >
          <div className="container">
            <div className="sign">{show ? ">" : "<"}</div>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
              <h1>Images</h1>
              <input
                placeholder="Name"
                onChange={handleChange("name")}
                value={name}
                required
              />
              <input
                placeholder="Paste Image's URL here."
                onChange={handleChange("url")}
                value={url}
                required
              />
              <button>SUBMIT</button>
            </form>
          </div>
        </div>
        <div
          onClick={() => setShowVideo(!showVideo)}
          className={`fixed video ${showVideo ? "opened" : "closed"}`}
        >
          <div className="container">
            <div className="sign">{showVideo ? ">" : "<"}</div>
            <form
              onSubmit={handleVideoSubmit}
              onClick={(e) => e.stopPropagation()}
            >
              <h1>Videos</h1>
              <input
                placeholder="Paste Video's URL here."
                onChange={handleChangeVideos("video_url")}
                value={video_url}
                required
              />
              <button disabled={loadingButton}>SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
      <div className="images-app">
        <Images />
      </div>
      <div className="videos-app">
        <Videos />
      </div>
    </div>
  );
};

export default App;
