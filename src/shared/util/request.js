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
  let response;

  try {
    if (method === "GET") {
      response = await fetch(url);

      if (response.ok) {
        const res = await response.json();

        return {
          status: "success",
          data: res,
          message: "",
        };
      } else {
        return {
          status: "failed",
          message: response.statusText,
        };
      }
    } else {
      if (!isJSON) {
        response = await fetch(url, {
          method: method,
          body: resource,
        });
      } else {
        response = await fetch(url, {
          method: method,
          body: JSON.stringify(resource),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      if (response.ok) {
        const res = await response.json();

        return {
          status: "success",
          message: res.message,
          token: res.token ? res.token : "",
          uid: res.uid ? res.uid : "",
        };
      } else {
        const res = await response.json();

        return {
          status: "failed",
          message: res.message,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getApiUrl = () => {
  return import.meta.env.VITE_BACKEND_URL;
};

export { sendRequest, getApiUrl };
