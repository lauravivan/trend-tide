import { getEmailRegex, getPasswordRegex, getUserNameRegex } from "util/regex";

const validateEmail = (email) => {
  return getEmailRegex().test(email);
};

const validatePassword = (password) => {
  return getPasswordRegex().test(password);
};

const validateUserName = (username) => {
  return getUserNameRegex().test(username);
};

export { validateEmail, validatePassword, validateUserName };
