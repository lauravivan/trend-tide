/**
 * headers:
 * "Content-Type": "application/json"
 * Authorization: "Bearer " + token,
 */

const sendRequest = async ({
  method = "GET",
  url = "",
  resource = "",
  isJSON = true,
}) => {
  if (method === "GET") {
    return await fetch(url);
  }

  if (!isJSON) {
    return await fetch(url, {
      method: method,
      body: resource,
    });
  }

  return await fetch(url, {
    method: method,
    body: JSON.stringify(resource),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getApiUrl = () => {
  return import.meta.env.VITE_BACKEND_URL;
};

export { sendRequest, getApiUrl };
