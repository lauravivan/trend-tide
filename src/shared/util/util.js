const getUserNameText = () => {
  return "Can contain symbols (%,$,#,*), digits and letters, having between 5 and 15 characters, with at least 3 non-capital letters";
};

const getPasswordText = () => {
  return "Must contain between 9 and 40 characteres having at least one symbol, one capital letter, one digit and one non-capital letter";
};

const getEmailText = () => {
  return "Must contain @ and at least one .";
};

export { getUserNameText, getPasswordText, getEmailText };
