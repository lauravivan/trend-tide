const setCredentials = (
  auth = { isLoggedIn: false, token: null, uid: null }
) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

const getCredentials = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth || "";
};

const deleteCredentials = () => {
  if (localStorage.getItem("auth")) {
    localStorage.removeItem("auth");
  }
};

export { getCredentials, setCredentials, deleteCredentials };
