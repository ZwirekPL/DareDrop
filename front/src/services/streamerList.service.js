import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
// CREATE
export const createNewStreamer = async (newStreamerData) => {
  const config = {
    url: `${apiServerUrl}/streamers`,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: newStreamerData,
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
// STREAMER LIST
export const getStreamerList = async () => {
  const config = {
    url: `${apiServerUrl}/streamers`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  const { data, error } = await callExternalApi({ config });
  return {
    data: data || null,
    error,
  };
};
// VOTE
export const putVoteToDB = async (
  idStreamerToUpVote,
  updateStreamerVotesCount
) => {
  const config = {
    url: `${apiServerUrl}/streamers/${idStreamerToUpVote}/vote`,
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    data: updateStreamerVotesCount,
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
//STREAMER??
export const getInventoryHistory = async (user) => {
  const userName = user;
  const config = {
    url: `${apiServerUrl}/inventory/get/` + userName,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  const { data, error } = await callExternalApi({ config });
  return {
    data: data || null,
    error,
  };
};
