/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { setCredentials, deleteCredentials, getCredentials } from "util/store";
import { AuthContext } from "context/authContext";

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    token: null,
    uid: null,
  });

  useEffect(() => {
    const credentials = getCredentials();

    setAuthState({
      isLoggedIn: credentials || false,
      token: credentials || null,
      uid: credentials || null,
    });
  }, []);

  const signIn = useCallback((token, uid) => {
    setCredentials({
      isLoggedIn: true,
      token: token,
      uid: uid,
    });
    setAuthState(getCredentials());
  }, []);

  const signOut = useCallback(() => {
    deleteCredentials();
    setAuthState({
      isLoggedIn: false,
      token: null,
      uid: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
