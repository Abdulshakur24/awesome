import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Video from "../resuable/Video";
import { createVideos } from "../features/State";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Videos = () => {
  const dispatch = useDispatch();
  const array = useSelector((states) => states.state.videos);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const user_id = useSelector((state) => state.users.user.id);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios
        .get(`/videos/${user_id}`, { method: "GET" })
        .then((response) => {
          console.log(response);
          setCount(response.data.rows.length);
          dispatch(createVideos(response.data.rows));
          setTimeout(() => setLoading(false), 1200);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, [dispatch, user_id]);

  return (
    <div className="videos">
      {loading ? (
        <SkeletonTheme
          style={{ height: "100%", width: "100%" }}
          color="#753422"
          highlightColor="#b05b3b"
        >
          <p>
            <Skeleton className="skeleton" count={count} />
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
