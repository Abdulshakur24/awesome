import "./App.scss";
import { useSelector } from "react-redux";
import logo from "./assets/logo.svg";
import Image from "./resuable/Image";
import { useEffect, useState } from "react";
import axios from "./axios";
import { useDispatch } from "react-redux";
import {
  addImage,
  addVideo,
  clearAllImages,
  createImages,
} from "./features/State";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Videos from "./components/Videos";

const App = () => {
  const array = useSelector((state) => state.state.images);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(10);
  const [confirm, setConfirm] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    url: "",
  });
  const [detailsVideos, setDetailsVdieos] = useState({
    videoName: "",
    videoUrl: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      const time = [1600, 2000, 1000, 800, 4000];
      const pickRandom = Math.floor(Math.random() * time.length);
      axios
        .get("images/", { method: "GET" })
        .then((resposne) => {
          setCount(resposne.data.length);
          dispatch(createImages(resposne.data.rows));
          setTimeout(() => setLoading(false), time[pickRandom]);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [dispatch]);

  const { name, url } = details;
  const handleChange = (name) => (e) =>
    setDetails({ ...details, [name]: e.target.value });

  const { videoName, videoUrl } = detailsVideos;
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
    axios
      .post("videos/create", detailsVideos, { method: "POST" })
      .then((response) => {
        if (response.data.command === "INSERT") {
          const { id } = response.data.rows[0];
          dispatch(addVideo({ ...detailsVideos, id }));
          // setDetailsVdieos({
          //   name: "",
          //   url: "",
          // });
        }
      });
  };

  const deleteAll = () => {
    axios.delete("images/delete/all", { method: "DELETE" }).then((response) => {
      if (response.data.command === "TRUNCATE") dispatch(clearAllImages());
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
                placeholder="Name"
                onChange={handleChangeVideos("videoName")}
                value={videoName}
                required
              />
              <input
                placeholder="Paste Video's URL here."
                onChange={handleChangeVideos("videoUrl")}
                value={videoUrl}
                required
              />
              <button>SUBMIT</button>
            </form>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="container">
          {loading ? (
            <SkeletonTheme
              style={{ height: "100%", width: "100%" }}
              color="#753422"
              highlightColor="#b05b3b"
            >
              <p>
                <Skeleton height={318} width={318} count={count} />
              </p>
            </SkeletonTheme>
          ) : (
            array.map(({ id, name, url }) => (
              <Image key={id} id={id} url={url} name={name} />
            ))
          )}
        </div>
      </div>
      <div className="footer">
        {!confirm ? (
          <button
            onClick={() => setConfirm(true)}
            disabled={array.length === 0}
          >
            CLEAR ALL IMAGES
          </button>
        ) : (
          <button>
            <h3>Are You Sure?</h3>
            <div>
              <p onClick={() => setConfirm(false)}>NO</p>
              <p onClick={deleteAll}>YES</p>
            </div>
          </button>
        )}
      </div>
      <div className="videos-app">
        <Videos />
      </div>
    </div>
  );
};

export default App;
