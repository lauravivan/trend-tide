import { createContext, useContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  uid: null,
  signIn: () => {},
  signOut: () => {},
});

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, useAuthContext };
