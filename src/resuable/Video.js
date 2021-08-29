import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import axios from "../axios";
import { removeVideo } from "../features/State";

const Video = ({ id, url }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  console.log(url);
  const deleteVideoFromDatabase = (e) => {
    if (e.detail === 3) {
      setLoading(true);
      axios.delete(`videos/${id}`, { method: "DELETE" }).then((response) => {
        if (response.data.command === "DELETE") {
          dispatch(removeVideo(id));
          setLoading(false);
        } else setLoading(false);
      });
    }
  };

  return (
    <div className="video">
      <div className="container">
        <ReactPlayer className="player" type="text/html" controls url={url} />
        <button onClick={deleteVideoFromDatabase} disabled={loading}>
          Triple clicks to delete this video
        </button>
      </div>
    </div>
  );
};

export default Video;
