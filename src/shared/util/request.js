/**
 * headers:
 * "Content-Type": "application/json"
 * Authorization: "Bearer " + token,
 */

const sendRequest = async (method = "GET", url, resource, headers) => {
  if (method === "GET") {
    return await fetch(url);
  }

  return await fetch(url, {
    method: method,
    body: JSON.stringify(resource),
    headers: headers,
  });
};

export default sendRequest;
