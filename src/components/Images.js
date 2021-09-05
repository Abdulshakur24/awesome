import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { clearAllImages, createImages } from "../features/State";
import Image from "../resuable/Image";
import axios from "../axios";

const Images = () => {
  const array = useSelector((state) => state.state.images);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.users.user.id);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      const time = [1600, 2000, 1000, 800, 4000];
      const pickRandom = Math.floor(Math.random() * time.length);
      axios
        .get(`images/${user_id}`, { method: "GET" })
        .then((resposne) => {
          setCount(resposne.data.rows.length);
          dispatch(createImages(resposne.data.rows));
          setTimeout(() => setLoading(false), time[pickRandom]);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [dispatch, user_id]);

  const deleteAll = () => {
    axios.delete("images/delete/all", { method: "DELETE" }).then((response) => {
      if (response.data.command === "TRUNCATE") dispatch(clearAllImages());
      else return;
      setConfirm(false);
    });
  };
  return (
    <div className="">
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
    </div>
  );
};

export default Images;
