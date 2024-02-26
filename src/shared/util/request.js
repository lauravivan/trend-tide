/**
 * headers:
 * "Content-Type": "application/json"
 * Authorization: "Bearer " + token,
 */

const sendRequest = async ({
  method = "GET",
  url = undefined,
  resource = undefined,
  isJSON = true,
}) => {
  let response;

  try {
    if (method === "GET") {
      response = await fetch(url);
    } else {
      const data = {};

      data["method"] = method;

      if (isJSON) {
        data["headers"] = {
          "Content-Type": "application/json",
        };

        if (resource) {
          data["body"] = JSON.stringify(resource);
        }
      } else {
        data["body"] = resource;
      }

      response = await fetch(url, data);
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

const getApiUrl = () => {
  return import.meta.env.VITE_BACKEND_URL;
};

export { sendRequest, getApiUrl };
