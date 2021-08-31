import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeImage } from "../features/State";
import axios from "../axios";

const Image = ({ id, name, url }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const deleteDataFromDatabase = (e) => {
    setLoading(true);
    e.preventDefault();
    axios.delete(`images/${id}`, { method: "DELETE" }).then((response) => {
      if (response.data.command === "DELETE") {
        dispatch(removeImage(id));
        setLoading(false);
      }
    });
  };

  return (
    <div className={`image ${loading ? "loading" : "unloaded"}`}>
      <div className="top">
        <div
          className="actual"
          style={{
            backgroundImage: `url(${url})`,
          }}
          onClick={deleteDataFromDatabase}
          alt=""
        >
          <div>
            <p>{name}</p>
            <button>REMOVE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
