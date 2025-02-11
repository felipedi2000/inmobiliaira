import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {

  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth || !auth.isLoggedIn) {
    console.log("bien")
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children:PropTypes.node.isRequired
};

export default ProtectedRoute;
