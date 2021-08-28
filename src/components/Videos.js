import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Video from "../resuable/Video";
import { createVideos } from "../features/State";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Videos = () => {
  const dispatch = useDispatch();
  const array = useSelector((state) => state.state.videos);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      const time = [1600, 2000, 1000, 800, 4000];
      const pickRandom = Math.floor(Math.random() * time.length);
      axios
        .get("/videos", { method: "GET" })
        .then((response) => {
          setCount(response.data.rows.length);
          dispatch(createVideos(response.data.rows));
          setTimeout(() => setLoading(false), time[pickRandom]);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="videos">
      {!loading ? (
        <SkeletonTheme
          style={{ height: "100%", width: "100%" }}
          color="#753422"
          highlightColor="#b05b3b"
        >
          <p>
            <Skeleton
              className="skeleton"
              height={360}
              width={640}
              count={count}
            />
          </p>
        </SkeletonTheme>
      ) : (
        array.map(({ id, name, video_url }) => (
          <Video key={id} id={id} name={name} url={video_url} />
        ))
      )}
    </div>
  );
};

export default Videos;
