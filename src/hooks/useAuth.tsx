import axios from "axios";
import { createContext, useState, ReactNode, useCallback } from "react";

const TOKEN_ALS_NAME = 'auth';
const API_URL = 'https://146.59.45.158:8080';

type Props = {
  children: ReactNode;
}
type Auth = {
  username: string;
  token: string;
}
type AuthContextProps = {
  authState: Auth | null;
  setAuth: (auth: Auth | null) => void;
  getAuthState: () => Auth | null;
};

const authContextEmpty: AuthContextProps = {
  authState: null,
  setAuth: (auth: Auth | null) => null,
  getAuthState: () => null
}

const AuthContext = createContext(authContextEmpty);

const configureAxiosHeaders = (auth: Auth) => {
  axios.defaults.headers.post["X-Auth-Token"] = auth.token;
  axios.defaults.headers.post["X-Auth-Username"] = auth.username;
};

const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<Auth | null>(() => {
    const authDataString = localStorage.getItem(TOKEN_ALS_NAME);
    return authDataString ? JSON.parse(authDataString) : null;
  });

  // Get current auth state from AsyncStorage
  const getAuthState = useCallback(() => {
    try {
      const authDataString = localStorage.getItem(TOKEN_ALS_NAME);
      if (!authDataString)
        throw "No data in local storage";
      const authData = JSON.parse(authDataString) as Auth;
      // Configure axios headers
      configureAxiosHeaders(authData);
      setAuthState(authData);

      return authData;
    } catch (err) {
      setAuthState(null);
    }
    return null;
  }, []);

  // Update AsyncStorage & context state
  const setAuth = useCallback((auth: Auth | null) => {
    try {
      localStorage.setItem(TOKEN_ALS_NAME, JSON.stringify(auth));
      // Configure axios headers
      if (auth)
        configureAxiosHeaders(auth);
      setAuthState(auth);
    } catch (error) {
      setAuthState(null);
      Promise.reject(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuth, getAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, TOKEN_ALS_NAME, API_URL };
