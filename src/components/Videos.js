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
    const fetchData = () => {
      setLoading(true);
      axios
        .get("/videos", { method: "GET" })
        .then((response) => {
          console.log(response.data.rows);
          setCount(response.data.rows.length);
          dispatch(createVideos(response.data.rows));
          setTimeout(() => setLoading(false), 1200);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="videos">
      {loading ? (
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
        array.map(({ id, video_url }) => (
          <Video key={id} id={id} url={video_url} />
        ))
      )}
    </div>
  );
};

export default Videos;
