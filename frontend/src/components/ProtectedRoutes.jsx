// ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import authService from "./services/authService";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        const isValidToken = await authService.verifyToken(token);
        setIsAuthenticated(isValidToken);
        setIsLoading(false);
      } catch (error) {
        console.error("Token verification failed:", error.message);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
