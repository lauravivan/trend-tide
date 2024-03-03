const validateEmail = (email) => {
  return /^(\w+)@(\w+)\.([a-z]{2,8})([\.a-z]{2,8})?$/.test(email);
};

const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{9,40}$/.test(password);
};

const validateUserName = (username) => {
  return /^(?=(?:.*[a-z]){3})[\w\d\S]{5,15}$/i.test(username);
};

const USERNAME_MAX_LENGTH = 15;
const EMAIL_MAX_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 40;
const POST_TITLE_MAX_LENGTH = 100;
const POST_CONTENT_MAX_LENGTH = 1200;

export {
  validateEmail,
  validatePassword,
  validateUserName,
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  POST_TITLE_MAX_LENGTH,
  POST_CONTENT_MAX_LENGTH,
};
