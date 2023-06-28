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
  const goToStreamerSite = (index) => {};
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
      <tr key={index} onClick={goToStreamerSite(index)}>
        <td>{message.streamerName}</td>
        <td>{message.platform}</td>
        <td>
          <div className="container__controls">
            <div className="controls__up" onClick={() => handleUpVote(index)}>
              &#8679;<span className="controls__up-tooltiptext">Up vote</span>
            </div>
          </div>
        </td>
        <td>{message.voteCount}</td>
        <td>
          <div className="container__controls">
            <div
              className="controls__down"
              onClick={() => handleDownVote(index)}
            >
              &#8681;
              <span className="controls__down-tooltiptext">Down vote</span>
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
                  <th className="table-header" colSpan={3}>
                    Votes
                  </th>
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
