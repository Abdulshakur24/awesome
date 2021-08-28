import React from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import axios from "../axios";
import { removeVideo } from "../features/State";

const Video = ({ id, name, url }) => {
  const dispatch = useDispatch();
  const deleteVideoFromDatabase = () => {
    axios.delete(`videos/${id}`, { method: "DELETE" }).then((response) => {
      if (response.data.command === "DELETE") dispatch(removeVideo(id));
    });
  };

  return (
    <div className="video">
      <div className="container">
        <h2>{name}</h2>
        <ReactPlayer className="player" controls key={id} url={url} />
        <button onClick={deleteVideoFromDatabase}>Delete</button>
      </div>
    </div>
  );
};

export default Video;
