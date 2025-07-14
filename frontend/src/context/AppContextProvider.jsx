// src/context/AppContextProvider.jsx
import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { AppConstants } from "../util/constants";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContextProvider = ({ children }) => {

  axios.defaults.withCredentials = true;


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const backendURL = AppConstants.BACKEND_URL;

  const getUserData = async () => {
    try {
      const response = await axios.get(backendURL + "/profile");
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        toast.error("Unable to retrive profile");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const contextValue = {
    backendURL,

    isLoggedIn, setIsLoggedIn,
    userData, setUserData,
    getUserData,
  };


  const getAuthState = async () => {
    try {
      const response = await axios.get(backendURL + "/is-authenticated");
      if (response.status === 200 && response.data === true) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      if (error.response)
        console.log(error.message);
    }
  }

  useEffect(() => {
    getAuthState();
  }, [])
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
