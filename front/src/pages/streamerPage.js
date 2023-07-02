import React, { useState, useEffect } from "react";
import { getStreamerData } from "../services/streamerList.service";
import { PageLayout } from "../components/layout/pageLayout";
import { Link, useLocation } from "react-router-dom";
import { PageLoader } from "../components/layout/pageLoader";

export const StreamerPage = () => {
  const location = useLocation();
  const { streamerId } = location.state;
  const [streamerData, setStreamerList] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getUserInv = async () => {
      setLoader(true);
      const { data, error } = await getStreamerData(streamerId);
      if (data) {
        setStreamerList(data[0]);
        setLoader(false);
      }
      if (error) {
        setError(error);
        setLoader(false);
      }
    };
    getUserInv();
  }, [streamerId]);
  return (
    <PageLayout>
      <div className="wrapperStreamerPage">
        <div className="streamerPageBody">
          <div className="avatarCol">
            <img src="/avatar-300x300.png" alt="Streamer Avatar" />
          </div>
          {loader && <PageLoader />}
          <div className="streamerInfo">
            {!streamerData && error && <h2>{error.message}</h2>}
            <h2>Streamer Name:</h2>
            {streamerData && <h3>{streamerData.streamerName}</h3>}
            {!streamerData && (
              <h3>Data download error or missing streamer name. Try again</h3>
            )}
            <h4>Platform:</h4>
            {streamerData && <h5>{streamerData.platform}</h5>}
            {!streamerData && (
              <h5>
                Data download error or missing streamer platform. Try again
              </h5>
            )}
            <h6>Description:</h6>
            {streamerData && <p>{streamerData.description}</p>}
            {!streamerData && (
              <p>
                Data download error or missing streamer description. Try again
              </p>
            )}
          </div>
        </div>
        <Link id="back" className="button" to="/">
          Back
        </Link>
      </div>
    </PageLayout>
  );
};
