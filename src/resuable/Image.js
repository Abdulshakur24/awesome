import React from "react";
import { useDispatch } from "react-redux";
import { removeImage } from "../features/State";
import axios from "../axios";

const Image = ({ id, name, url }) => {
  const dispatch = useDispatch();

  const deleteDataFromDatabase = (e) => {
    e.preventDefault();
    axios.delete(`images/${id}`, { method: "DELETE" }).then((response) => {
      if (response.data.command === "DELETE") dispatch(removeImage(id));
    });
  };

  return (
    <div className="image">
      <div className="top">
        <div
          loading="lazy"
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
