const validateEmail = (email) => {
  return /^(\w+)@(\w+)\.([a-z]{2,8})\.([a-z]{2,8})?$/.test(email);
};

const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{9,40}$/.test(password);
};

const validateUserName = (username) => {
  return /^(?=(?:.*[a-z]){3})[\w\d\S]{5,15}$/i.test(username);
};

export { validateEmail, validatePassword, validateUserName };
