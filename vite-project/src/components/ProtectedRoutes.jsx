import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import PropTypes from 'prop-types';

//wrapper for routes that require authentication
export default function ProtectedRoutes({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    async function refreshToken() {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      if (!refreshToken) {
        setIsAuthorized(false);
        return;
      }

      try {
        const response = await api.post('/api/token/refresh/', {
          refresh: refreshToken,
        });
        if (response.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false);
        console.log(error);
      }
    }

    async function checkToken() {
      //check if token is there
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthorized(false);
        return;
      }
      //check if token is expired
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    }

    if (isAuthorized === null) {
      return <div>Loading...</div>;
    }

    checkToken().catch(() => {
      setIsAuthorized(false);
    });
  }, [isAuthorized]);

  return isAuthorized ? children : <Navigate to='/login' />;
}

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
