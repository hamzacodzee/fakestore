import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  
  // Declare login outside useEffect to make it accessible
  const login = localStorage.getItem("LoginDetails");

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  // Conditional rendering based on login status
  return login ? <Component /> : null;
};

export default Protected;
