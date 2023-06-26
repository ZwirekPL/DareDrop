import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getUserItems = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/protected`,
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

export const getInventoryHistory = async (user) => {
  const userName = user;
  const config = {
    url: `${apiServerUrl}/api/messages/inventory/get/` + userName,
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
