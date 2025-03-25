
import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedRoute({ children }) {

  const user = localStorage.getItem("user");

  if (!user) {
    toast(`Please login to access the page`)
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default ProtectedRoute;
