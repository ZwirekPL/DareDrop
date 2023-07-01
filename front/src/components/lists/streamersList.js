import React, { useEffect, useState } from "react";
import {
  getStreamerList,
  putVoteToDB,
} from "../../services/streamerList.service";
import { PageLoader } from "../layout/pageLoader";
import { Link } from "react-router-dom";

export const StreamersTable = () => {
  const [streamerList, setStreamerList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getUserInv = async () => {
      setLoader(true);
      const { data, error } = await getStreamerList();
      if (data) {
        setStreamerList(data);
        setLoader(false);
      }
      if (error) {
        setStreamerList(error);
      }
    };
    getUserInv();
  }, []);

  const handleUpVote = (index) => {
    const idStreamerToUpVote = streamerList[index]._id;
    const updateStreamerVotesCount = {
      voteCount: 1,
    };
    putVoteToDB(idStreamerToUpVote, updateStreamerVotesCount);
    window.location.reload();
  };

  const handleDownVote = (index) => {
    const idStreamerToUpVote = streamerList[index]._id;
    const updateStreamerVotesCount = {
      voteCount: -1,
    };
    putVoteToDB(idStreamerToUpVote, updateStreamerVotesCount);
    window.location.reload();
  };

  const renderInventory = (streamerList, index) => {
    return (
      <tr key={index}>
        <td>{streamerList.streamerName}</td>
        <td>{streamerList.platform}</td>
        <td>
          <div className="container__controls">
            <div className="controls__up" onClick={() => handleUpVote(index)}>
              &#8679;<span className="controls__up-tooltiptext">Up vote</span>
            </div>
          </div>
        </td>
        <td>{streamerList.voteCount}</td>
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
        <td>
          <Link
            id="listButton"
            className="button"
            to="/streamer"
            state={{ streamerList: streamerList }}
          >
            Go To Streamer Site
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="streamersTableBody">
        <div className="tableResponsive">
          {!loader && (
            <table>
              <thead>
                <tr>
                  <th className="tableHeader">Streamer Name</th>
                  <th className="tableHeader">Platform</th>
                  <th className="tableHeader" colSpan={3}>
                    Votes
                  </th>
                </tr>
              </thead>
              {!loader && streamerList.length === 0 && (
                <tbody>
                  <tr>
                    <td colSpan="6">
                      <p className="tableError">
                        The list is empty or a database error has occurred.
                        Please try again later or add a streamer.
                      </p>
                    </td>
                  </tr>
                </tbody>
              )}
              <tbody>{streamerList.map(renderInventory)}</tbody>
            </table>
          )}
        </div>
        {loader && <PageLoader />}
      </div>
    </>
  );
};
