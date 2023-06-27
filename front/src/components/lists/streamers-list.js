import React, { useEffect, useState } from "react";
import { getStreamerList, putVoteToDB } from "../../services/message.service";
import { PageLoader } from "../layout/page-loader";

export const StreamersTable = () => {
  const [message, setMessage] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getUserInv = async () => {
      setLoader(true);
      const { data, error } = await getStreamerList();
      if (data) {
        setMessage(data);
        setLoader(false);
      }
      if (error) {
        setMessage(error);
      }
    };
    getUserInv();
  }, []);

  const handleUpVote = (index) => {
    const idStreamerToUpVote = message[index]._id;
    const updateStreamerVotesCount = {
      voteCount: 1,
    };
    putVoteToDB(idStreamerToUpVote, updateStreamerVotesCount);
    window.location.reload();
  };

  const handleDownVote = (index) => {
    const idStreamerToUpVote = message[index]._id;
    const updateStreamerVotesCount = {
      voteCount: -1,
    };
    putVoteToDB(idStreamerToUpVote, updateStreamerVotesCount);
    window.location.reload();
  };

  const renderInventory = (message, index) => {
    return (
      <tr key={index}>
        <td>{message.streamerName}</td>
        <td>{message.platform}</td>
        <td>{message.voteCount}</td>
        <td>
          <div className="container__controls">
            <div className="controls__edit" onClick={() => handleUpVote(index)}>
              &#43;<span className="controls__edit-tooltiptext">Up votes</span>
            </div>
          </div>
        </td>
        <td>
          <div className="container__controls">
            <div
              className="controls__edit"
              onClick={() => handleDownVote(index)}
            >
              &#8722;
              <span className="controls__edit-tooltiptext">Down votes</span>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="streamersTable-body">
        <div className="table-responsive">
          {!loader && (
            <table>
              <thead>
                <tr>
                  <th className="table-header">Streamer Name</th>
                  <th className="table-header">Platform</th>
                  <th className="table-header">Votes</th>
                  <th className="table-header">Up Vote</th>
                  <th className="table-header">Down Vote</th>
                </tr>
              </thead>
              {!loader && message.length === 0 && (
                <tbody>
                  <tr>
                    <td colSpan="6">
                      <p className="storage__error">
                        The list is empty or a database error has occurred.
                        Please try again later or add a streamer.
                      </p>
                    </td>
                  </tr>
                </tbody>
              )}
              <tbody>{message.map(renderInventory)}</tbody>
            </table>
          )}
        </div>
        {loader && <PageLoader />}
      </div>
    </>
  );
};
