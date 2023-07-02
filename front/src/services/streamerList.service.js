import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

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

export const getStreamerData = async (streamerId) => {
  const config = {
    url: `${apiServerUrl}/streamers/${streamerId}`,
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
