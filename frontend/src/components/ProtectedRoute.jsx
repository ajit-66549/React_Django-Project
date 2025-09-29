import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api.js";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { usestate } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = usestate(null);

  // function to refresh the access token
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN); // getting refresh token from local storage

    // try sending response to the location with the refresh token that gives a new access token
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      // if the response was suucessfull set the new access token to local storage
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  // function checks if we need to refresh the token or not
  // see if we have access token, if yes check expired or not, if expired refresh the access token
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN); // getting access token from local storage

    // checking we have token or not
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    // decode the token and get the expiration date
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  // untill isAuthorized state has null, keeps on checking the token
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // returns wrapped children if authorized, else redirect to the login page
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
