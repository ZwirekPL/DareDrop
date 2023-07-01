import React from "react";
import { PageLayout } from "../components/layout/pageLayout";
import { Link, useLocation } from "react-router-dom";

export const StreamerPage = () => {
  const location = useLocation();
  const { streamerList } = location.state;
  return (
    <PageLayout>
      <div className="wrapperStreamerPage">
        <div className="streamerPageBody">
          <div className="avatarCol">
            <img src="/avatar-300x300.png" alt="Streamer Avatar" />
          </div>
          <div className="streamerInfo">
            <h2>Streamer Name:</h2>
            {streamerList && <h3>{streamerList.streamerName}</h3>}
            {!streamerList && (
              <h3>Data download error or missing streamer name. Try again</h3>
            )}
            <h4>Platform:</h4>
            {streamerList && <h5>{streamerList.platform}</h5>}
            {!streamerList && (
              <h5>
                Data download error or missing streamer platform. Try again
              </h5>
            )}
            <h6>Description:</h6>
            {streamerList && <p>{streamerList.description}</p>}
            {!streamerList && (
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
