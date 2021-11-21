import axios, * as Axios from "axios";
// @ts-ignore
import { AsyncStorage } from 'AsyncStorage';
import { createContext, useState, ReactNode, useEffect } from "react";

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
  setAuth: (auth: Auth) => Promise<void>;
};

const authContextEmpty: AuthContextProps = {
  authState: null,
  setAuth: (auth: Auth) => new Promise(() => { })
}

const AuthContext = createContext(authContextEmpty);

const configureAxiosHeaders = (auth: Auth) => {
  axios.defaults.headers.post["X-Auth-Token"] = auth.token;
  axios.defaults.headers.post["X-Auth-Username"] = auth.username;
};

const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState<Auth | null>(null);

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem(TOKEN_ALS_NAME);
      const authData = JSON.parse(authDataString || null) as Auth;
      // Configure axios headers
      configureAxiosHeaders(authData);
      setAuthState(authData);
    } catch (err) {
      setAuthState(null);
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (auth: Auth) => {
    try {
      await AsyncStorage.setItem(TOKEN_ALS_NAME, JSON.stringify(auth));
      // Configure axios headers
      configureAxiosHeaders(auth);
      setAuthState(auth);
      console.log(auth)
    } catch (error) {
      setAuthState(null);
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, TOKEN_ALS_NAME, API_URL };
